import fs from "fs";

import type { CountryContent, TranslationStrings } from "./schemas";

export const getTranslationStrings = ({
    locale = "en",
    filterNamespaces,
}: {
    locale?: string;
    filterNamespaces?: string[];
}): TranslationStrings => {
    const siteCopyFolder = "src/data/site-copy";

    const rawTranslations: {
        [namespace: string]: { key: string; value: string }[];
    } = JSON.parse(
        fs.readFileSync(`${siteCopyFolder}/${locale}/site-copy.json`, "utf-8")
    );
    // TODO: assert all values from english version exist?

    let translations = Object.keys(rawTranslations).reduce((acc, namespace) => {
        if (typeof rawTranslations[namespace] === "string") {
            return { ...acc }; // for title and lastModified widgets in CMS
        }
        const values = Object.values(rawTranslations[namespace]);
        const entries = values.map(
            ({ key, value }) => [key, value] as [key: string, value: string]
        );
        const newNamespace = Object.fromEntries(entries);
        return { ...acc, [namespace]: newNamespace };
    }, {} as TranslationStrings);

    if (filterNamespaces) {
        translations = Object.keys(translations)
            .filter(key => filterNamespaces.includes(key))
            .reduce((acc, key) => {
                // eslint-disable-next-line no-param-reassign
                acc[key] = translations[key];
                return acc;
            }, {} as TranslationStrings);
    }

    return translations;
};

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
