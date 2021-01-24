import React, { useState, lazy, Suspense } from "react";
import styled from "@emotion/styled";
import type { GetStaticProps } from "next";

import { useHasMounted } from "hooks/useHasMounted";
import { ErrorBoundary } from "components/ErrorBoundary";
import { CountryCard } from "components/CountryCard";
import { getAllCountryData } from "data/fetchers";
import { generateSitemap } from "scripts/generateSitemap";
import { Title } from "components/Title";
import { sluggify } from "utils/sluggify";

const PeanutWorld = lazy(() => import("components/PeanutWorld"));
// ^Fix for `cannot use import statement outside a module` issue with three/jsm: https://github.com/react-spring/react-three-fiber/discussions/504

const IntroContainer = styled.div<{ isRounded: boolean }>`
    background-color: ${({ theme }) => theme.colors.spaceNavy};
    position: relative;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    transition: clip-path 1200ms ease-out; /* TODO: better easing */
    will-change: clip-path;

    clip-path: ${({ isRounded }) =>
        isRounded
            ? "inset(clamp(8px, 1vw, 16px) round clamp(60px, 7vw, 80px))"
            : "inset(0 round 0)"};
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
}

const HomePage = ({ countryData }: HomePageProps) => {
    const [titleIsVisible, setTitleIsVisible] = useState(false);
    const hasMounted = useHasMounted();

    return (
        <>
            <IntroContainer isRounded={titleIsVisible}>
                {hasMounted && (
                    <ErrorBoundary fallback={<Title isVisible />}>
                        <Suspense fallback={null}>
                            <PeanutWorld setTitleIsVisible={setTitleIsVisible} />
                            <Title isVisible={titleIsVisible} />
                        </Suspense>
                    </ErrorBoundary>
                )}
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

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
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
        props: { countryData: locallySortedCountryData, locales },
    };
};
