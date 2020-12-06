import React, { createContext, useState } from "react";

import { useIsomorphicLayoutEffect } from "hooks/useIsomorphicLayouteffect";
import { getFromSearchParams } from "utils/getFromSearchParams";

import type { SimpleProviderProps } from "./types";

/** Global context for reduced motion a11y preference */
export const PrefersReducedMotionContext = createContext(false);

/** Global context provider for reduced motion a11y preference */
export const PrefersReducedMotionProvider = ({
    children,
}: SimpleProviderProps) => {
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
