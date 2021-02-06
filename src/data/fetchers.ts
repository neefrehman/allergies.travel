import fs from "fs";

import type {
    CountryContent,
    RawTranslationData,
    TranslationStrings,
} from "./schemas";

/** Fetches and formats the translations for the site's copy for a given locale */
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
        .map(namespace => namespace.replace(".json", ""));

    const filteredNamespaces = filterNamespaces
        ? namespaces.filter(namespace => filterNamespaces.includes(namespace))
        : namespaces;

    const rawTranslations: {
        [namespace: string]: { key: string; value: string }[];
    } = filteredNamespaces.reduce((acc, namespace) => {
        const currentTranslations: RawTranslationData = JSON.parse(
            fs.readFileSync(
                `${siteCopyFolder}/${locale}/${namespace}.json`,
                "utf-8"
            )
        );
        return { ...acc, [namespace]: currentTranslations.copy };
    }, {});

    const formattedTranslations = Object.keys(rawTranslations).reduce(
        (acc, namespace) => {
            if (typeof rawTranslations[namespace] === "string") {
                return { ...acc }; // for title and lastModified widgets in CMS
            }
            const values = Object.values(rawTranslations[namespace]);
            const entries = values.map(
                ({ key, value }) => [key, value] as [key: string, value: string]
            );
            const newNamespace = Object.fromEntries(entries);
            return { ...acc, [namespace]: newNamespace };
        },
        {} as TranslationStrings
    );

    return formattedTranslations;
};

const countriesFolder = "src/data/countries";

/** Fetches all country data in a given locale */
export const getAllCountryData = ({
    locale = "en",
}: {
    locale?: string;
}): CountryContent[] => {
    const countryContentArray = fs
        .readdirSync(`${countriesFolder}/${locale}`)
        .reduce((acc, currentFile) => {
            const currentCountryData: CountryContent = {
                slug: currentFile.replace(".json", ""),
                ...JSON.parse(
                    fs.readFileSync(
                        `${countriesFolder}/${locale}/${currentFile}`,
                        "utf8"
                    )
                ),
            };
            // TODO fetch public posts only ("published" boolean in CMS schema?)
            return [...acc, currentCountryData];
        }, [] as CountryContent[]);

    return countryContentArray;
};

/** Fetches a single country's data in a given locale */
export const getCountryData = ({
    slug,
    locale = "en",
}: {
    slug: string;
    locale?: string;
}): Omit<CountryContent, "slug"> | null => {
    let data: Omit<CountryContent, "slug"> | null;

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
