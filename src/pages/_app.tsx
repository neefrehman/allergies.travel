import React from "react";
import { ThemeProvider } from "@emotion/react";
import { AppProps } from "next/app";

import { GlobalStyles } from "styles/GlobalStyles";
import { theme } from "styles/theme";
import { IsDebugProvider } from "context/IsDebug";
import { PrefersReducedMotionProvider } from "context/PrefersReducedMotion";

const App = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <IsDebugProvider>
            <PrefersReducedMotionProvider>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
            </PrefersReducedMotionProvider>
        </IsDebugProvider>
    </ThemeProvider>
);

export default App;
