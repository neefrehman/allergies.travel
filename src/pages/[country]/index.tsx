import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import type { Allergen, BaseCountryData, CuisineDescription } from "data/schemas";
import { getCountryData } from "data/fetchers";

interface CountryPageProps {
    countryIsNotPublished?: boolean;
    title: string;
    allergens: Allergen[];
    cuisineDescription: CuisineDescription | null;
    baseInfo: BaseCountryData;
    locales: string[];
}

const CountryPage = ({
    countryIsNotPublished = false,
    title,
    allergens,
    cuisineDescription,
    baseInfo,
    locales,
}: CountryPageProps) => {
    const router = useRouter();

    // TODO: componentise these fallbacks as containers so [allergen].tsx can use them too
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    // TODO: componentise these fallbacks as containers so [allergen].tsx can use them too
    if (countryIsNotPublished) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
                <h1>We currenlty dont have data for this country. Add some?</h1>
            </>
        );
    }

    return (
        // TODO: generate meta images: https://github.com/dsumer/portfolio/blob/master/src/pages/api/og-image.ts
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
};

export default CountryPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const countryPaths: { params: { country: string }; locale: string }[] = [];

    /* `fallback: true` now will generate and cache pages upon request instead of at build time. */
    /* TODO: still return most viewed countries? */
    // locales?.forEach(locale => {
    //     getAllCountryData({ locale }).forEach(country =>
    //         countryPaths.push({ params: { country: country.slug }, locale })
    //     );
    // });

    return { paths: countryPaths, fallback: true };
};

export const getStaticProps: GetStaticProps<CountryPageProps> = async ({
    params,
    locale,
    locales,
}) => {
    const slug = typeof params?.country === "string" ? params.country : "";
    const countryData = getCountryData({ locale, slug });

    if (!countryData) {
        return { notFound: true };
    }

    // if (!countryData.published) {
    //     return { props: { countryIsNotPublished: true } as CountryPageProps };
    // }

    const {
        title,
        allergens = [],
        cuisineDescription = null,
        baseInfo,
    } = countryData;

    return {
        props: {
            title,
            allergens,
            cuisineDescription,
            baseInfo,
            locales: locales ?? ["en"],
        },
        revalidate: 86_400, // Next will regenerate this page at most once per day
    };
};
