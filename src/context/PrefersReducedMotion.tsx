import React, { createContext, useContext, useState } from "react";

import { useIsomorphicLayoutEffect } from "hooks/useIsomorphicLayoutEffect";
import { getFromSearchParams } from "utils/getFromSearchParams";

import type { SimpleProviderProps } from "./types";

type PrefersReducedMotionContextValue = boolean | null;

/**
 * Global context for reduced motion a11y preference
 */
export const PrefersReducedMotionContext =
  createContext<PrefersReducedMotionContextValue>(null);

/**
 * Global context provider for reduced motion a11y preference
 */
export const PrefersReducedMotionProvider = ({ children }: SimpleProviderProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const QUERY = "(prefers-reduced-motion: reduce)";

  useIsomorphicLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    try {
      mediaQueryList.addEventListener("change", listener); // Chrome & FF
    } catch {
      mediaQueryList.addListener(listener); // Safari
    }

    if (prefersReducedMotion === false) {
      const reducedMotionfromParams = getFromSearchParams("reducedMotion");
      setPrefersReducedMotion(reducedMotionfromParams);
    }

    return () => {
      try {
        mediaQueryList.removeEventListener("change", listener);
      } catch {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);

  return (
    <PrefersReducedMotionContext.Provider value={prefersReducedMotion}>
      {children}
    </PrefersReducedMotionContext.Provider>
  );
};

/**
 * Global context receiver hook for reduced motion a11y preference
 */
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
