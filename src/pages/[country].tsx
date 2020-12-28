import fs from "fs";
import type { ParsedUrlQuery } from "querystring";

import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import type {
    Allergen,
    BaseCountryData,
    CountryContent,
    CuisineDescription,
} from "scripts/generateBaseCountryData";

interface CountryPageProps {
    title: string;
    allergens: Allergen[];
    cuisineDescription: CuisineDescription | undefined;
    baseInfo: BaseCountryData;
    locales: string[];
}

const CountryPage = ({
    title,
    allergens,
    cuisineDescription,
    baseInfo,
    locales,
}: CountryPageProps) => (
    <>
        <h1>
            {title} - {baseInfo.flag}
        </h1>
        {baseInfo.name.official && <p>{baseInfo.name.official}</p>}
        {allergens && allergens.map(allergen => <h3>{allergen.name}</h3>)}
        {cuisineDescription && <p>{cuisineDescription}</p>}
        <p>capital: {baseInfo.capital}</p>
        <p>region: {baseInfo.region}</p>
        <p>subregion: {baseInfo.subregion}</p>
        <p>
            currencies:
            {baseInfo.currencies?.map(currency => currency.name).join(", ")}
        </p>
        <p>
            languages:
            {baseInfo.languages?.map(language => language.name).join(", ")}
        </p>
    </>
);

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const countryPaths: { params: ParsedUrlQuery; locale: string }[] = [];

    locales?.forEach(locale => {
        fs.readdirSync(`src/data/countries/${locale}`).forEach(file => {
            countryPaths.push({
                params: { country: file.replace(".json", "") },
                locale,
            });
        });
    });

    return { paths: countryPaths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
    params,
    locale,
    locales,
}) => {
    const data: CountryContent = await import(
        `../data/countries/${locale}/${params?.country}.json`
    );

    const title = data.title;
    const allergens = data.allergens ?? null;
    const cuisineDescription = data.cuisineDescription ?? null;
    const baseInfo = data.baseInfo;

    return { props: { title, allergens, cuisineDescription, baseInfo, locales } };
};

export default CountryPage;
