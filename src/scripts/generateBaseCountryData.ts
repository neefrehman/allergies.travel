/* eslint-disable import/no-extraneous-dependencies */
import * as fs from "fs";

import prettier from "prettier";
import countryData from "world-countries";

import type { CountryContent } from "data/schemas";

import nextConfig from "../../next.config";
import { sluggify } from "../utils/sluggify";
import { deepMerge } from "../utils/deepMerge";
import { ISO_639_1_TO_3, ISO_639_3_TO_1 } from "../utils/i18n/languageCodeMappings";
import type { ISO_639_1, ISO_639_3 } from "../utils/i18n/languageCodeMappings";
import { subregionNameMappings } from "../utils/i18n/subregionNameMappings";
import { regionNameMappings } from "../utils/i18n/regionNameMappings";
import { capitalNameMappings } from "../utils/i18n/capitalNameMappings";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
    class DisplayNames {
        constructor(locales: string | string[], options: { type: "region" | "language" | "currency" | "script" }); // prettier-ignore
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
    const supportedLocales = nextConfig.i18n.locales as ISO_639_1[];

    const countriesFolder = "src/data/countries";
    if (!fs.existsSync(countriesFolder)) {
        fs.mkdirSync(countriesFolder);
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
                slug: sluggify(country.name.common),
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
                    capital: capitalNameMappings[country.capital[0]][locale],
                    region: regionNameMappings[country.region][locale],
                    subregion: subregionNameMappings[country.subregion][locale],
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
                    flag: country.flag,
                    // flag: {
                    //     emoji: country.flag,
                    //     svg: await import(`world-countries/data/${country.cca3.toLowerCase()}.svg`), // TODO: fallback for no emoji devices (windows). need to detect support somehow
                    // },
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

        const directory = `${countriesFolder}/${locale}`;

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        transformedCountryData.forEach(country => {
            const fileName = `${directory}/${country.slug}.json`;

            let finalisedData = country;

            if (fs.existsSync(fileName)) {
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
