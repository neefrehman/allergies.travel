import { useState, useEffect } from "react";

export const usePrefersReducedMotion = () => {
    const QUERY = "(prefers-reduced-motion: reduce)";
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        window.matchMedia(QUERY).matches
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(QUERY);
        const listener = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQueryList.addListener(listener);
        return () => mediaQueryList.removeListener(listener);
    }, []);

    return prefersReducedMotion;
};
