import * as fs from "fs";

import type { Country } from "world-countries";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const countryData: Country[] = require("world-countries");

// Added here instead of from utils/ to avid the extra tsc compiling
const kebabCaseWithDiacriticHandling = (string: string) =>
    string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map(x => x.toLowerCase())
        .join("-");

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
    const requiredCountryData: BaseCountryData[] = countryData.map(country => ({
        name: country.name,
        currencies: country.currencies,
        languages: country.languages,
        capital: country.capital,
        region: country.region,
        subregion: country.subregion,
        translations: country.translations,
        latlng: country.latlng,
        flag: country.flag,
        cca2: country.cca2,
        cca3: country.cca3,
        ccn3: country.ccn3,
    }));

    const directory = "src/data/countries/base";

    if (fs.existsSync(directory)) {
        fs.rmdirSync(directory, { recursive: true });
    }

    fs.mkdirSync(directory);

    requiredCountryData.forEach(country => {
        fs.writeFileSync(
            `${directory}/${kebabCaseWithDiacriticHandling(
                country.name.common
            )}.json`,
            JSON.stringify(country)
        );
    });
};

generateBaseCountryData();

export type BaseCountryData = Pick<
    Country,
    | "name"
    | "currencies"
    | "languages"
    | "capital"
    | "region"
    | "subregion"
    | "translations"
    | "latlng"
    | "flag"
    | "cca2"
    | "cca3"
    | "ccn3"
>;
