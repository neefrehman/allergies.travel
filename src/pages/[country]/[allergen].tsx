import fs from "fs";
import type { ParsedUrlQuery } from "querystring";

import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import type { Allergen } from "data/schemas";
import { getAllCountryData, getCountryData } from "data/fetchers";

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
    const paths: { params: ParsedUrlQuery; locale: string }[] = [];
    const allergenPaths = ["nuts"]; // TODO: allergen paths

    locales?.forEach(locale => {
        allergenPaths.forEach(allergen => {
            getAllCountryData(fs, { locale }).forEach(country =>
                paths.push({
                    params: { country: country.slug, allergen },
                    locale,
                })
            );
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
    const { title: countryTitle } = getCountryData(fs, { locale, slug });
    const allergenTitle =
        typeof params?.allergen === "string" ? params.allergen : "";

    return { props: { countryTitle, allergenTitle, locales } };
};
