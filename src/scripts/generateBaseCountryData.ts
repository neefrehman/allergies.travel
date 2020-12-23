import * as fs from "fs";

import type { Country } from "world-countries";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const countryData: Country[] = require("world-countries");

// Added here instead of from utils/ to avid the extra tsc compiling
const kebabCaseWithDiacriticHandling = (string: string) => {
    const matches =
        string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            ) ?? [];

    return matches.map(x => x.toLowerCase()).join("-");
};

/**
 * Generates the base country data we will use in the site, from the
 * world-countries package.
 *
 * @remarks
 * Requires node >= 12.0
 *
 * For QoL this file must be compiled to js and then run, as ts-node
 * won't yet work with import statements. Use `npm run generateCountryData`
 * to do this easily.
 */
const generateBaseCountryData = () => {
    const requiredCountryData: { info: BaseCountryData }[] = countryData.map(
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

    if (fs.existsSync(directory)) {
        fs.rmdirSync(directory, { recursive: true });
    }

    fs.mkdirSync(directory);

    requiredCountryData.forEach(country => {
        // TODO: Object.assign(oldObject, currentObject) - need to read and parse files first
        // This will enable us to overwrite the baseData keys while keeping the CMs injected content.
        // const prevData: BaseCountryData = JSON.parse(
        //     fs.readFileSync(
        //         `${directory}/${kebabCaseWithDiacriticHandling(
        //             country.info.name.common
        //         )}.json`,
        //         "utf8"
        //     )
        // );

        fs.writeFileSync(
            `${directory}/${kebabCaseWithDiacriticHandling(
                country.info.name.common
            )}.json`,
            JSON.stringify(country)
        );
    });
};

generateBaseCountryData();

export type BaseCountryData = Pick<Country, "region" | "subregion" | "flag"> & {
    name: {
        common: string;
        official: string;
        native: { languageCode: string; common: string; official: string }[];
    };
    capital: string;
    languages: { languageCode: string; name: string }[];
    translations: { languageCode: string; common: string; official: string }[];
    currencies: { name: string; symbol: string; currencyCode: string }[];
    coordinates: { latitude: number; longitude: number };
    codes: {
        cca2: string;
        cca3: string;
        ccn3: string;
    };
};
