import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import type { Allergen } from "data/schemas";
import {
    getAllAllergens,
    getAllCountryData,
    getCountryData,
} from "data/fetchers";

interface AllergenPageProps {
    countryIsNotPublished?: boolean;
    noAllergenDataForCountry?: boolean;
    countryTitle: string;
    allergenTitle: string;
    locales: string[];
}

const AllergenPage = ({
    countryIsNotPublished = false,
    noAllergenDataForCountry = false,
    countryTitle,
    allergenTitle,
    locales,
}: AllergenPageProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (countryIsNotPublished) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
                <h1>We currently dont have data for this country, add some?</h1>
            </>
        );
    }

    if (noAllergenDataForCountry) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
                <h1>
                    Currently we dont have any information about {allergenTitle}{" "}
                    in {countryTitle}. that doesnt mean it doesnt exist there
                </h1>
            </>
        );
    }

    return (
        <h1>
            {countryTitle} — {allergenTitle}
        </h1>
    );
};

export default AllergenPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const paths: {
        params: { country: string; allergen: string };
        locale: string;
    }[] = [];

    /* `fallback: true` now will generate and cache pages upon request instead of at build time. */
    // locales?.forEach(locale => {
    //     getAllCountryData({ locale }).forEach(country => {
    //         country.allergens?.forEach(allergen => {
    //             paths.push({
    //                 params: { country: country.slug, allergen: allergen.name },
    //                 locale,
    //             });
    //         });
    //     });
    // });

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<AllergenPageProps> = async ({
    params,
    locale,
    locales,
}) => {
    const { country: countryParam, allergen: allergenParam } = params ?? {};
    const slug = typeof countryParam === "string" ? countryParam : "";
    const countryData = getCountryData({ locale, slug });

    // TODO: look into 404s with unsupported locales

    if (!countryData) {
        return { notFound: true };
    }

    // if (!countryData.published) {
    //     return { props: { countryIsNotPublished: true } as AllergenPageProps };
    // }

    const countryTitle = countryData.title;
    const allergenTitle = typeof allergenParam === "string" ? allergenParam : "";

    return {
        props: {
            countryTitle,
            allergenTitle,
            locales: locales ?? ["en"],
            // noAllergenDataForCountry: !countryData.allergens?.find(
            //     allergen => allergen.name === allergenTitle
            // ),
        },
        revalidate: 86_400, // Next will regenerate this page at most once per day
    };
};
