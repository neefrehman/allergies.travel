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
    countryIsNotFound?: boolean;
    countryIsNotPublished?: boolean;
    noAllergenDataForCountry?: boolean;
    countryTitle: string;
    allergenTitle: string;
    locales: string[];
}

const AllergenPage = ({
    countryIsNotFound = false,
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

    if (countryIsNotFound || countryIsNotPublished) {
        return (
            <>
                <Head>
                    <meta name="robots" content="noindex" />
                </Head>
                <h1>
                    {countryIsNotPublished
                        ? "We currenlty don't have data for this country, consider adding some [link]"
                        : "This country is not found"}
                </h1>
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
    /* TODO: still return most viewed countries? and allergens? */
    // locales?.forEach(locale => {
    //     getAllCountryData({ locale }).forEach(country => {
    //         getAllAllergens().forEach(allergen => {
    //             paths.push({
    //                 params: { country: country.slug, allergen },
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
    const slug = typeof params?.country === "string" ? params.country : "";
    const countryData = getCountryData({ locale, slug });

    if (!countryData) {
        return { props: { countryIsNotFound: true } as AllergenPageProps };
    }

    // if (!countryData.published) {
    //     return { props: { countryIsNotPublished: true } as AllergenPageProps };
    // }

    const { title: countryTitle } = countryData;
    const allergenTitle =
        typeof params?.allergen === "string" ? params.allergen : "";

    // if (
    //     !countryData.allergens?.find(allergen => allergen.name === allergenTitle)
    // ) {
    //     return {
    //         props: {
    //             noAllergenDataForCountry: true,
    //             countryTitle,
    //             allergenTitle,
    //         } as AllergenPageProps,
    //     };
    // }

    return {
        props: {
            countryTitle,
            allergenTitle,
            locales: locales ?? ["en"],
        },
        revalidate: 86_400, // Next will regenerate this page at most once per day
    };
};
