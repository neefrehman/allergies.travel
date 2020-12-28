import fs from "fs";
import type { ParsedUrlQuery } from "querystring";

import type { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import type { CountryContent } from "scripts/generateBaseCountryData";

interface CountryPageProps {
    countryData: { name: string; flag: string };
    locales: string[];
}

const CountryPage = ({ countryData }: CountryPageProps) => (
    <p>
        {countryData.name} - {countryData.flag}
    </p>
);

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const countryPaths: { params: ParsedUrlQuery; locale?: string }[] = [];

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

    // const title = data.title;
    // const allergens = data.allergens;
    // const cuisineDescription = data.cuisineDescription;
    // const baseInfo = data.baseInfo;

    const countryData = { name: data.title, flag: data.baseInfo.flag };

    return { props: { countryData, locales } };
};

export default CountryPage;
