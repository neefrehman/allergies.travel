import type { Country } from "world-countries";

import type { ISO_639_1 } from "utils/i18n/languageCodeMappings";

export interface CountryContent {
    title: string;
    // TODO: remove slug from csm and only read from fs?
    slug: string;
    baseInfo: BaseCountryData;
    lastModified?: string;
    allergens?: Allergen[];
    cuisineDescription?: CuisineDescription;
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
