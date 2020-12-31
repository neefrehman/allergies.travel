import type fs from "fs";

import type { CountryContent } from "./schemas";

// TODO await import(slug) vs JSON.parse(fsInstance.readFileSync("slug"))

const countriesFolder = "src/data/countries";

export const getAllCountryData = (
    fsInstance: typeof fs,
    { locale = "en" }: { locale?: string }
): CountryContent[] => {
    const countryContentArray = fsInstance
        .readdirSync(`${countriesFolder}/${locale}`)
        .reduce((acc, currentFile) => {
            const currentCountryData: CountryContent = JSON.parse(
                fsInstance.readFileSync(
                    `${countriesFolder}/${locale}/${currentFile}`,
                    "utf8"
                )
            );
            // TODO fetch public posts only ("published" boolean in CMS schema?)
            return [...acc, currentCountryData];
        }, [] as CountryContent[]);

    return countryContentArray;
};

export const getCountryData = (
    fsInstance: typeof fs,
    { slug, locale = "en" }: { slug: string; locale?: string }
): CountryContent =>
    JSON.parse(
        fsInstance.readFileSync(
            `${countriesFolder}/${locale}/${slug}.json`,
            "utf8"
        )
    );

const allergensFolder = "src/data/allergens";
