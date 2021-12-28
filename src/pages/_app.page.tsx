import React from "react";
import type { ReactNode } from "react";
import type { AppProps } from "next/app";

import { IsDebugProvider } from "context/IsDebug";
import { PrefersReducedMotionProvider } from "context/PrefersReducedMotion";
import { HomePageAnimationHasRunProvider } from "context/HomePageAnimationHasRun";
import { globalStyles } from "styles/GlobalStyles";

import "styles/reset.css";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <IsDebugProvider>
    <PrefersReducedMotionProvider>
      <HomePageAnimationHasRunProvider>{children}</HomePageAnimationHasRunProvider>
    </PrefersReducedMotionProvider>
  </IsDebugProvider>
);

const App = ({ Component, pageProps }: AppProps) => {
  globalStyles();

  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
};

export default App;
