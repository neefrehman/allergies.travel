/* eslint-disable import/no-extraneous-dependencies, no-console */
import * as fs from "fs";

import fetch from "node-fetch";
import prettier from "prettier";
import countryData from "world-countries";

import { deepMerge } from "../src/utils/deepMerge";
import { sluggify } from "../src/utils/sluggify";
import { regionNameMappings as previousRegionMappings } from "../src/utils/i18n/regionNameMappings";
import { capitalNameMappings as previousCapitalMappings } from "../src/utils/i18n/capitalNameMappings";
import { subregionNameMappings as previousSubregionMappings } from "../src/utils/i18n/subregionNameMappings";
import nextConfig from "../next.config";

type GeonamesResponse = {
    geonames?: { name?: string }[];
};

type LocationTypeInputData = {
    [locationType: string]: {
        previousMapping: { [location: string]: { [locale: string]: string } };
        newData: string[];
    };
};

type LocalisedLocationNames = {
    [locale: string]: string;
};

type LocalisedLocationNamesDict = {
    [locationNameInEnglish: string]: LocalisedLocationNames;
};

/**
 * Uses the geonames API to fetch and cache localised location names that Intl.DisplayNames
 * can't create for us (region, capital, etc.). these are then used by `generateBaseCountryData.ts`
 */
const generateLocalisedLocationMappings = async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc");
    const supportedLocales = nextConfig.i18n.locales;

    const directory = "src/utils/i18n";
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    const fetchLocalisedName = async (
        nameInEnglish: string,
        locale: string
    ): Promise<string> => {
        try {
            console.log(`querying: ${nameInEnglish} in ${locale}`);
            const geonamesResponse = await fetch(
                `http://api.geonames.org/searchJSON?q=${sluggify(
                    nameInEnglish
                )}&maxRows=1&username=neef&lang=${locale}`
            );
            const data: GeonamesResponse = await geonamesResponse.json();
            return data.geonames?.[0].name ?? nameInEnglish;
        } catch (err) {
            console.log(err);
            return nameInEnglish;
        }
    };

    const locationTypeData: LocationTypeInputData = {
        capitals: {
            previousMapping: previousCapitalMappings,
            newData: countryData.map(country => country.capital[0]),
        },
        regions: {
            previousMapping: previousRegionMappings,
            newData: [...new Set(countryData.map(country => country.region))], // needs overwiriting: Americas
        },
        subregions: {
            previousMapping: previousSubregionMappings,
            newData: [...new Set(countryData.map(country => country.subregion))], // needs overwiriting: Central Europe, Middle Africa
        },
    };

    Object.keys(locationTypeData).forEach(async key => {
        const { previousMapping, newData } = locationTypeData[key];

        const newMappedData = await newData.reduce(
            async (locationsAccumulator, currentLocationNameInEnglish) => {
                const awaitedLocationsAccumulator = await locationsAccumulator;

                const previouslyQueriedLocales = Object.keys(
                    previousMapping[currentLocationNameInEnglish] ?? {}
                );

                const newLocalesToQueryFor = supportedLocales.filter(
                    locale =>
                        !previouslyQueriedLocales.includes(locale) && locale !== "en"
                );

                const localisedLocationNames = await newLocalesToQueryFor.reduce(
                    async (localesAccumulator, currentLocale) => {
                        const awaitedLocalesAccumulator = await localesAccumulator;

                        return {
                            ...awaitedLocalesAccumulator,
                            [currentLocale]: await fetchLocalisedName(
                                currentLocationNameInEnglish,
                                currentLocale
                            ),
                        };
                    },
                    {} as Promise<LocalisedLocationNames>
                );

                const localisedCurrentLocationNameMapping = {
                    [currentLocationNameInEnglish]: {
                        en: currentLocationNameInEnglish,
                        ...localisedLocationNames,
                    },
                };

                return {
                    ...awaitedLocationsAccumulator,
                    ...localisedCurrentLocationNameMapping,
                };
            },
            {} as Promise<LocalisedLocationNamesDict>
        );

        const mergedData = deepMerge(previousMapping, newMappedData);

        const dataVariableName = `${key.slice(0, -1)}NameMappings`;
        const formattedData = prettier.format(
            `
            /**
             * auto-generated by scripts/generateLocalisedLocationMappings.ts
             */
            export const ${dataVariableName}: Record<string, Record<string, string>> = 
                ${JSON.stringify(mergedData)};
            `,
            { ...prettierConfig, parser: "typescript" }
        );

        fs.writeFileSync(`${directory}/${dataVariableName}.ts`, formattedData);
    });
};

generateLocalisedLocationMappings()
    .then(() => console.log("Location name mappings generated"))
    .catch(error => console.log("error generating location name mappings", error));
