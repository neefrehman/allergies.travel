import React, { useState } from "react";
import styled from "@emotion/styled";
import type { GetStaticProps } from "next";
import Head from "next/head";

import { CountryCard } from "components/CountryCard";
import { getAllCountryData, getTranslationStrings } from "data/fetchers";
import { generateSitemap } from "scripts/generateSitemap";
import { Title } from "components/Title";
import { sluggify } from "utils/sluggify";
import type { TranslationStrings } from "data/schemas";
import { createTranslator } from "utils/i18n/createTranslator";
import PeanutWorld from "containers/PeanutWorld";
import { ErrorBoundary } from "components/ErrorBoundary";

const IntroContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.spaceNavy};
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
`;

const CountryCardGrid = styled.ul`
    margin-top: 3em;
    list-style: none;
    display: grid;
    gap: 3em;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 10em;
`;

interface HomePageProps {
    countryData: { name: string; flag: string; slug: string }[];
    locales: string[];
    translations: TranslationStrings;
}

const HomePage = ({ countryData, translations }: HomePageProps) => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);

    const t = createTranslator(translations);

    return (
        <>
            <Head>
                <title>{t("common.appName")}</title>
            </Head>

            <IntroContainer>
                <ErrorBoundary fallback={<Title isVisible />}>
                    <PeanutWorld setTitleIsVisible={setTitleIsVisible} />
                    <Title isVisible={titleIsVisible} />
                </ErrorBoundary>
            </IntroContainer>

            {countryData.length > 0 && (
                <div>
                    <CountryCardGrid>
                        {countryData.map(({ name, flag, slug }) => (
                            <li key={name}>
                                <CountryCard
                                    countryName={name}
                                    countryFlag={flag}
                                    linkPath={slug}
                                />
                            </li>
                        ))}
                    </CountryCardGrid>
                </div>
            )}
        </>
    );
};

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
    locale,
    locales,
}) => {
    const translations = getTranslationStrings({ locale });

    const countryData = getAllCountryData({ locale }).map(
        ({ title, baseInfo, slug }) => ({
            name: title,
            flag: baseInfo.flag,
            slug,
        })
    );

    const locallySortedCountryData = countryData.sort((a, b) => {
        const nameA = sluggify(a.name);
        const nameB = sluggify(b.name);
        // eslint-disable-next-line no-nested-ternary
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    if (process.env.NODE_ENV === "production") {
        generateSitemap();
    }

    return {
        props: {
            countryData: locallySortedCountryData,
            locales: locales ?? ["en"],
            translations,
        },
    };
};
