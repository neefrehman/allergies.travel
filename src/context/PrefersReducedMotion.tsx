import React, { createContext, ReactNode, useState } from "react";

import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayouteffect";

/** Global context for debug mode */
export const PrefersReducedMotionContext = createContext(false);

/** Global context provider for debug mode */
export const PrefersReducedMotionProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const QUERY = "(prefers-reduced-motion: reduce)";
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        window.matchMedia(QUERY).matches
    );

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
