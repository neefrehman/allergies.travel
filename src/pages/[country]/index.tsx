import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";

import type { Allergen, BaseCountryData, CuisineDescription } from "data/schemas";
import { getAllCountryData, getCountryData } from "data/fetchers";

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
    // TODO: generate meta images - like readng.co
    <>
        <h1>
            {title} {baseInfo.flag}
        </h1>
        {baseInfo.name.official && <p>{baseInfo.name.official}</p>}
        {allergens.length > 0 &&
            allergens.map(allergen => <h3>{allergen.name}</h3>)}
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

export default CountryPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const countryPaths: { params: { country: string }; locale: string }[] = [];

    locales?.forEach(locale => {
        getAllCountryData({ locale }).forEach(country =>
            countryPaths.push({ params: { country: country.slug }, locale })
        );
    });

    return { paths: countryPaths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
    params,
    locale,
    locales,
}) => {
    const slug = typeof params?.country === "string" ? params.country : "";
    const countryData = getCountryData({ locale, slug });

    const {
        title,
        allergens = [],
        cuisineDescription = null,
        baseInfo,
    } = countryData;

    return { props: { title, allergens, cuisineDescription, baseInfo, locales } };
};
