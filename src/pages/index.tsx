import fs from "fs";

import React, { useState, lazy, Suspense } from "react";
import styled from "@emotion/styled";
import type { GetStaticProps } from "next";

import { useHasMounted } from "hooks/useHasMounted";
import { ErrorBoundary } from "components/ErrorBoundary";
import type { CountryContent } from "scripts/generateBaseCountryData";
import { CountryCard } from "components/CountryCard";

import { Title } from "HomeComponents/Title";

const PeanutWorld = lazy(() => import("components/PeanutWorld"));
// ^Fix for `cannot use import statement outside a module` issue with three/jsm: https://github.com/react-spring/react-three-fiber/discussions/504

const IntroContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.spaceNavy};
    position: relative;
    height: 100vh;
    width: 100vw;
`;

const CountryCardGrid = styled.ul`
    margin-top: 3em;
    list-style: none;
    display: grid;
    gap: 2em;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 40px;
`;

interface HomePageProps {
    countryData: { name: string; flag: string; slug: string }[];
    locales: string[];
}

const HomePage = ({ countryData }: HomePageProps) => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);
    const hasMounted = useHasMounted();

    return (
        <>
            <IntroContainer>
                {hasMounted && (
                    <ErrorBoundary fallback={<Title isVisible />}>
                        <Suspense fallback={null}>
                            <PeanutWorld setTitleIsVisible={setTitleIsVisible} />
                            <Title isVisible={titleIsVisible} />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </IntroContainer>

            <div>
                <CountryCardGrid>
                    {countryData.map(({ name, flag, slug }) => (
                        <CountryCard name={name} flag={flag} slug={slug} />
                    ))}
                </CountryCardGrid>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
    const countryData: { name: string; flag: string; slug: string }[] = [];

    fs.readdirSync(`src/data/countries/${locale}`).forEach(async file => {
        const data: CountryContent = await import(
            `../data/countries/${locale}/${file}`
        );
        const name = data.title;
        countryData.push({ name, flag: data.baseInfo.flag, slug: data.slug });
    });

    const locallyAlphabetisedCountryData = countryData.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        // eslint-disable-next-line no-nested-ternary
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0; // FIXME: not working here but does work in the client?
    });

    // TODO fetch public posts only ("published" boolean in CMS schema?)

    // if (process.env.NODE_ENV === "production") {
    //     generateSitemap(path, fs);
    // }

    return {
        props: { countryData: locallyAlphabetisedCountryData, locales },
    };
};;

export default HomePage;
