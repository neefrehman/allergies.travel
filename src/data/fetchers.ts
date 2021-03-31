import fs from "fs";

import type {
    AllergenRelation,
    CountryContent,
    RawTranslationSchema,
    RawTranslationStrings,
    TranslationStrings,
} from "./schemas";

/**
 * Formats translations from an array of keys and values, to an object of key-value pairs
 */
export const formatTranslations = (
    rawTranslations: RawTranslationStrings
): TranslationStrings =>
    Object.keys(rawTranslations).reduce((acc, namespace) => {
        const values = Object.values(rawTranslations[namespace]);
        const entries = values.map(
            ({ key, value }) => [key, value] as [key: string, value: string]
        );
        const newNamespace = Object.fromEntries(entries);
        return {
            ...acc,
            [namespace]: newNamespace,
        };
    }, {});

/**
 * Fetches and formats the translations for the site's copy for a given locale
 */
export const getTranslationStrings = ({
    locale = "en",
    filterNamespaces,
}: {
    locale?: string;
    filterNamespaces?: string[];
}): TranslationStrings => {
    const siteCopyFolder = "src/data/site-copy";

    const namespaces = fs
        .readdirSync(`${siteCopyFolder}/${locale}`)
        .map(namespace => namespace.replace(".json", ""))
        .filter(namespace => filterNamespaces?.includes(namespace) ?? true);

    const rawTranslations = namespaces.reduce((acc, namespace) => {
        const currentTranslations: RawTranslationSchema = JSON.parse(
            fs.readFileSync(
                `${siteCopyFolder}/${locale}/${namespace}.json`,
                "utf-8"
            )
        );
        return {
            ...acc,
            [namespace]: currentTranslations.copy,
        };
    }, {} as RawTranslationStrings);

    return formatTranslations(rawTranslations);
};

const countriesFolder = "src/data/countries";

/**
 * Fetches all country data in a given locale
 */
export const getAllCountryData = ({
    locale = "en",
}: {
    locale?: string;
}): CountryContent[] => {
    const countryContentArray = fs
        .readdirSync(`${countriesFolder}/${locale}`)
        .map(currentFile => {
            const currentCountryData: CountryContent = JSON.parse(
                fs.readFileSync(
                    `${countriesFolder}/${locale}/${currentFile}`,
                    "utf8"
                )
            );
            // TODO fetch public posts only ("published" boolean in CMS schema?)
            return currentCountryData;
        });

    return countryContentArray;
};

/**
 * Fetches a single country's data in a given locale
 */
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

const allergensFolder = "src/data/allergens";

/**
 * Fetches all possible allergens
 */
export const getAllAllergens = ({
    locale = "en",
}: {
    locale?: string;
}): string[] => {
    const allergenArray = fs
        .readdirSync(`${allergensFolder}/${locale}`)
        .map(currentFile => {
            const allergenData: AllergenRelation = JSON.parse(
                fs.readFileSync(
                    `${allergensFolder}/${locale}/${currentFile}`,
                    "utf8"
                )
            );
            return allergenData.title;
        });

    return allergenArray;
};

/**
 * Fetches all allergens found in a given country
 */
export const getAllAllergensInCountry = ({
    slug,
    locale = "en",
}: {
    slug: string;
    locale?: string;
}): string[] => {
    const countryData = getCountryData({ locale, slug });
    return countryData?.allergens?.map(allergen => allergen.name) ?? [];
};
