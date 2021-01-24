import fs from "fs";

import type { CountryContent } from "./schemas";

// TODO await import(slug) vs JSON.parse(fs.readFileSync("slug"))

const countriesFolder = "src/data/countries";

export const getAllCountryData = ({
    locale = "en",
}: {
    locale?: string;
}): CountryContent[] => {
    const countryContentArray = fs
        .readdirSync(`${countriesFolder}/${locale}`)
        .reduce((acc, currentFile) => {
            const currentCountryData: CountryContent = JSON.parse(
                fs.readFileSync(
                    `${countriesFolder}/${locale}/${currentFile}`,
                    "utf8"
                )
            );
            // TODO fetch public posts only ("published" boolean in CMS schema?)
            return [...acc, currentCountryData];
        }, [] as CountryContent[]);

    return countryContentArray;
};

export const getCountryData = ({
    slug,
    locale = "en",
}: {
    slug: string;
    locale?: string;
}): CountryContent | null => {
    let data: CountryContent | null;

    try {
        data = JSON.parse(
            fs.readFileSync(`${countriesFolder}/${locale}/${slug}.json`, "utf8")
        );
    } catch {
        data = null;
    }

    return data;
};

// TODO: const allergensFolder = "src/data/allergens";
export const getAllAllergens = () => ["nuts"];
