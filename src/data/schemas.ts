import type { Country } from "world-countries";

import type { ISO_639_1 } from "utils/i18n/languageCodeMappings";

export type TranslationNamespaces = "common" | "home" | "country";

export interface RawTranslationData {
    title: string;
    lastModified: string;
    copy: { key: string; value: string }[];
}

export interface TranslationStrings {
    [nameSpace: string]: Record<string, string>;
}

export interface CountryContent {
    slug: string;
    title: string;
    lastModified?: string;
    published: boolean;
    baseInfo: BaseCountryData;
    cuisineDescription?: CuisineDescription;
    allergens?: Allergen[];
}

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

// TODO: supersets and aliases of allergens. i.e. "nuts", "seafood", "tree nuts"
export interface Allergen {
    name: string;
    slug: string;
    descriptionInCuisine: string;
    foundIn: Food[];
}

// TODO: Foods assigned to whole regions as well as countries. Another relation?
export interface Food {
    name: string;
    description: string;
    infoUrl: string;
}

export interface CuisineDescription {
    description: string;
    sourceUrl?: string;
}
