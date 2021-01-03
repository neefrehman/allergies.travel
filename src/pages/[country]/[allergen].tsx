import React from "react";
import type { GetStaticPaths, GetStaticProps } from "next";

import type { Allergen } from "data/schemas";
import {
    getAllAllergens,
    getAllCountryData,
    getCountryData,
} from "data/fetchers";

interface AllergenPageProps {
    countryTitle: string;
    allergenTitle: Allergen[];
}

const AllergenPage = ({ countryTitle, allergenTitle }: AllergenPageProps) => (
    <h1>
        {countryTitle} — {allergenTitle}
    </h1>
);

export default AllergenPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const paths: {
        params: { country: string; allergen: string };
        locale: string;
    }[] = [];

    locales?.forEach(locale => {
        getAllCountryData({ locale }).forEach(country => {
            getAllAllergens().forEach(allergen => {
                paths.push({
                    params: { country: country.slug, allergen },
                    locale,
                });
            });
        });
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
    params,
    locale,
    locales,
}) => {
    const slug = typeof params?.country === "string" ? params.country : "";
    const { title: countryTitle } = getCountryData({ locale, slug });
    const allergenTitle =
        typeof params?.allergen === "string" ? params.allergen : "";

    return { props: { countryTitle, allergenTitle, locales } };
};
