/* eslint-disable import/no-extraneous-dependencies */
import * as fs from "fs";

import fetch from "node-fetch";
import prettier from "prettier";
import countryData from "world-countries";

import { deepMerge } from "../utils/deepMerge";
import { sluggify } from "../utils/sluggify";
import { regionNameMappings as previousRegionMappings } from "../utils/i18n/regionNameMappings";
import { capitalNameMappings as previousCapitalMappings } from "../utils/i18n/capitalNameMappings";
import { subregionNameMappings as previousSubregionMappings } from "../utils/i18n/subregionNameMappings";
import nextConfig from "../../next.config";

const supportedLocales = nextConfig.i18n.locales;

/**
 * Uses the geonames API to fetch and cache localised location names that Intl.DisplayNames
 * can't create for us (region, capital, etc.). these are then used by `generateBaseCountryData.ts`
 *
 * @remarks — VSCode says many of the `await` calls have no effect, but they do!
 */
const generateLocalisedLocationMappings = async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc");

    const directory = "src/utils/i18n";
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    const getLocalisedName = async (
        nameInEnglish: string,
        locale: string
    ): Promise<string> => {
        /* eslint-disable no-console */
        try {
            console.log(`querying: ${nameInEnglish} in ${locale}`);
            const geonamesResponse = await fetch(
                `http://api.geonames.org/searchJSON?q=${sluggify(
                    nameInEnglish
                )}&maxRows=1&username=neef&lang=${locale}`
            );
            const data = (await geonamesResponse.json()) as {
                geonames?: { name?: string }[];
            };
            const localisedName = data?.geonames?.[0].name ?? nameInEnglish;
            return localisedName;
        } catch (err) {
            console.log(err);
            return nameInEnglish;
        }
        /* eslint-enable no-console */
    };

    const locationTypeData: {
        [locationType: string]: {
            previousMapping: { [location: string]: { [locale: string]: string } };
            newData: string[];
        };
    } = {
        capitals: {
            previousMapping: previousCapitalMappings,
            newData: countryData.map(country => country.capital[0]),
        },
        regions: {
            previousMapping: previousRegionMappings,
            newData: [...new Set(countryData.map(country => country.region))], // need overwiriting: Americas
        },
        subregions: {
            previousMapping: previousSubregionMappings,
            newData: [...new Set(countryData.map(country => country.subregion))], // need overwiriting: Central Europe, Middle Africa
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
                        !previouslyQueriedLocales.includes(locale) &&
                        locale !== "en"
                );

                const localisedLocationNames = await newLocalesToQueryFor.reduce(
                    async (localesAccumulator, currentLocale) => {
                        const awaitedLocalesAccumulator = await localesAccumulator;

                        return {
                            ...awaitedLocalesAccumulator,
                            [currentLocale]: await getLocalisedName(
                                currentLocationNameInEnglish,
                                currentLocale
                            ),
                        };
                    },
                    {}
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
            {}
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

generateLocalisedLocationMappings();
