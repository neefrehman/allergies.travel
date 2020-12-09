import React from "react";
import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";
import Head from "next/head";

import { GlobalStyles } from "styles/GlobalStyles";
import { theme } from "styles/theme";
import { IsDebugProvider } from "context/IsDebug";
import { PrefersReducedMotionProvider } from "context/PrefersReducedMotion";
import { HomePageAnimationHasRunProvider } from "context/HomePageAnimationHasRun";

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>allergies.travel</title>
        </Head>

        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <IsDebugProvider>
                <PrefersReducedMotionProvider>
                    <HomePageAnimationHasRunProvider>
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <Component {...pageProps} />
                    </HomePageAnimationHasRunProvider>
                </PrefersReducedMotionProvider>
            </IsDebugProvider>
        </ThemeProvider>
    </>
);

export default App;
