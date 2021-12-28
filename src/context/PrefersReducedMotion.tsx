import React, { createContext, useContext, useState } from "react";

import { useIsomorphicLayoutEffect } from "hooks/useIsomorphicLayoutEffect";
import { getFromSearchParams } from "utils/getFromSearchParams";

import type { SimpleProviderProps } from "./types";

type PrefersReducedMotionContextValue = boolean | null;

export const PrefersReducedMotionContext =
  createContext<PrefersReducedMotionContextValue>(null);

export const PrefersReducedMotionProvider = ({ children }: SimpleProviderProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    if (prefersReducedMotion === false) {
      const reducedMotionFromParams = getFromSearchParams("reducedMotion");
      setPrefersReducedMotion(reducedMotionFromParams === true);
    }

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return (
    <PrefersReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </PrefersReducedMotionContext.Provider>
  );
};

export const usePrefersReducedMotionContext =
  (): PrefersReducedMotionContextValue => {
    const value = useContext(PrefersReducedMotionContext);

    if (value === null) {
      throw new Error(
        "PrefersReducedMotionContext was used before it was initialised"
      );
    }

    return value;
  };
