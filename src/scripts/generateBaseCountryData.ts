/* eslint-disable @typescript-eslint/no-var-requires */
import * as fs from "fs";

import type { Country } from "world-countries";

import { kebabCaseWithDiacriticHandling } from "../utils/kebabCase";
import { deepMerge } from "../utils/deepMerge";
import { ISO_639_1_TO_3, ISO_639_3_TO_1 } from "../utils/languageCodeMap";
import type { ISO_639_1, ISO_639_3 } from "../utils/languageCodeMap";

// eslint-disable-next-line import/no-extraneous-dependencies
const prettier = require("prettier");
const countryData: Country[] = require("world-countries"); // require needed to avoid `world_countries_1["default"]` error

const supportedLocales: ISO_639_1[] = require("../../next.config").i18n.locales;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
    class DisplayNames {
        constructor(
            locales: string | string[],
            options: { type: "region" | "language" | "currency" | "script" }
        );

        public of: (code: string) => string;
    }
}

/**
 * Generates the base country data we will use in the site, from the
 * world-countries package. This happens for each locale, and adheres to
 * the CMS schema defined in admin/config.yml
 *
 * @remarks
 * Requires node >= 12.0 and full-icu support to enable `Intl.DisplayNames`
 *
 * This file must be compiled to js and then run, (ts-node has bugs with
 * import statements). Use `npm run generateCountryData` to do this easily.
 */
const generateBaseCountryData = async () => {
    const prettierConfig = await prettier.resolveConfig("./.prettierrc");

    if (!fs.existsSync(`src/data/countries`)) {
        fs.mkdirSync(`src/data/countries`);
    }

    supportedLocales.forEach(locale => {
        const regionName = new Intl.DisplayNames(locale, { type: "region" });
        const languageName = new Intl.DisplayNames(locale, { type: "language" });
        const currencyName = new Intl.DisplayNames(locale, { type: "currency" });

        const transformedCountryData: Pick<
            CountryContent,
            "title" | "slug" | "baseInfo"
        >[] = countryData.map(country => {
            const localisedCountryName = country.translations[
                ISO_639_1_TO_3[locale]
            ] ?? {
                common: regionName.of(country.cca2),
                official: country.name.official,
            };

            return {
                title: localisedCountryName.common,
                slug: kebabCaseWithDiacriticHandling(country.name.common),
                baseInfo: {
                    name: {
                        common: localisedCountryName.common,
                        official: localisedCountryName.official,
                        native: Object.entries(country.name.native).map(
                            ([code, { official, common }]) => ({
                                languageCode: ISO_639_3_TO_1[code as ISO_639_3],
                                official,
                                common,
                            })
                        ),
                    },
                    capital: country.capital[0], // Need automated i18n somehow?
                    region: country.region, // Need automated i18n somehow?
                    subregion: country.subregion, // Need automated i18n somehow?
                    languages: Object.entries(country.languages).map(
                        ([code, name]) => ({
                            languageCode: ISO_639_3_TO_1[code as ISO_639_3],
                            name:
                                languageName.of(code).length >= 2
                                    ? languageName.of(code)
                                    : name,
                        })
                    ),
                    currencies: Object.entries(country.currencies).map(
                        ([code, { name, symbol }]) => ({
                            currencyCode: code,
                            name:
                                currencyName.of(code).length >= 3
                                    ? currencyName.of(code)
                                    : name,
                            symbol,
                        })
                    ),
                    flag: country.flag, // TODO: fallback for no emoji devices (windows)?: https://github.com/danalloway/detect-emoji-support
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
            };
        });

        const directory = `src/data/countries/${locale}`;

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        transformedCountryData.forEach(country => {
            const fileName = `${directory}/${country.slug}.json`;

            let finalisedData = country;

            if (fs.existsSync(fileName)) {
                // Merge new base data into existing data, while keeping additions from the CMS
                const previousData: CountryContent = JSON.parse(
                    fs.readFileSync(fileName, "utf8")
                );
                finalisedData = deepMerge(previousData, country);
            }

            const formattedData = prettier.format(JSON.stringify(finalisedData), {
                ...prettierConfig,
                parser: "json",
            });

            fs.writeFileSync(fileName, formattedData);
        });
    });
};

generateBaseCountryData();

fs.unlinkSync("src/utils/deepMerge.js");
fs.unlinkSync("src/utils/kebabCase.js");
fs.unlinkSync("src/utils/invertObject.js");
fs.unlinkSync("src/utils/languageCodeMap.js");
fs.unlinkSync("src/scripts/generateBaseCountryData.js");

// TODO: find better home for these - types/content.ts?
export type BaseCountryData = Pick<Country, "region" | "subregion" | "flag"> & {
    name: {
        common: string;
        official: string;
        native: { languageCode: ISO_639_1; common: string; official: string }[];
    };
    capital: string;
    languages: { languageCode: ISO_639_1; name: string }[];
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
    slug: string;
    descriptionInCuisine: string;
    foundIn: Food[];
}

export interface Food {
    foodName: string;
    description: string;
    infoUrl: string;
}

export interface CuisineDescription {
    description: string;
    sourceUrl?: string;
}

export interface CountryContent {
    title: string;
    slug: string;
    lastModified?: string;
    allergens: Allergen[];
    cuisineDescription?: CuisineDescription;
    baseInfo: BaseCountryData;
}
