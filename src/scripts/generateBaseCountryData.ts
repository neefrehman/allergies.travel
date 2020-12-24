import * as fs from "fs";

import type { Country } from "world-countries";

import { kebabCaseWithDiacriticHandling } from "../utils/kebabCase";
import { deepMerge } from "../utils/deepMerge";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const countryData: Country[] = require("world-countries"); // require needed to avoid `world_countries_1["default"]` error

/**
 * Generates the base country data we will use in the site, from the
 * world-countries package.
 *
 * @remarks
 * Requires node >= 12.0
 *
 * This file must be compiled to js and then run, (ts-node has bugs with
 * import statements). Use `npm run generateCountryData` to do this easily.
 */
const generateBaseCountryData = () => {
    const transformedCountryData: { info: BaseCountryData }[] = countryData.map(
        country => ({
            title: country.name.common,
            info: {
                name: {
                    ...country.name,
                    native: Object.entries(country.name.native).map(
                        ([code, { official, common }]) => ({
                            languageCode: code,
                            official,
                            common,
                        })
                    ),
                },
                capital: country.capital[0],
                region: country.region,
                subregion: country.subregion,
                languages: Object.entries(country.languages).map(
                    ([code, name]) => ({
                        languageCode: code,
                        name,
                    })
                ),
                translations: Object.entries(country.translations).map(
                    ([code, { official, common }]) => ({
                        languageCode: code,
                        official,
                        common,
                    })
                ),
                currencies: Object.entries(country.currencies).map(
                    ([code, { name, symbol }]) => ({
                        name,
                        symbol,
                        currencyCode: code,
                    })
                ),
                flag: country.flag,
                codes: {
                    cca2: country.cca2,
                    cca3: country.cca3,
                    ccn3: country.ccn3,
                },
                coordinates: {
                    latitude: country.latlng[0],
                    longitude: country.latlng[1],
                },
            },
        })
    );

    const directory = "src/data/countries";

    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }

    transformedCountryData.forEach(country => {
        const fileName = `${directory}/${kebabCaseWithDiacriticHandling(
            country.info.name.common
        )}.json`;

        let dataToSend: Partial<CountryContent> = country;

        if (fs.existsSync(fileName)) {
            // Merge new base data into existing data, while keeping additions from the CMS
            const previousData: CountryContent = JSON.parse(
                fs.readFileSync(fileName, "utf8")
            );
            dataToSend = deepMerge(previousData, country); // FIXME: deep merge fix needed: https://jsbin.com/habowuguye/edit?js,console
        }

        fs.writeFileSync(fileName, JSON.stringify(dataToSend));
    });
};

generateBaseCountryData();

fs.unlinkSync("src/utils/deepMerge.js");
fs.unlinkSync("src/utils/kebabCase.js");
fs.unlinkSync("src/scripts/generateBaseCountryData.js");

// TODO: find better home
export type BaseCountryData = Pick<Country, "region" | "subregion" | "flag"> & {
    name: {
        common: string;
        official: string;
        native: { languageCode: string; common: string; official: string }[];
    };
    capital: string;
    languages: { languageCode: string; name: string }[];
    translations?: { languageCode: string; common: string; official: string }[];
    currencies?: { name: string; symbol: string; currencyCode: string }[];
    coordinates: { latitude: number; longitude: number };
    codes?: {
        cca2?: string;
        cca3?: string;
        ccn3?: string;
    };
};

export interface Allergen {
    allergenName: string;
    foundIn: string[];
}

export interface CuisineDescription {
    description: string;
    sourceUrl?: string;
}

export interface CountryContent {
    title: string;
    lastModified?: string;
    allergens: Allergen[];
    cuisineDescription?: CuisineDescription;
    info: BaseCountryData;
}
