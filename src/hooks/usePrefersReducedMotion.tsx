import { useState, useEffect } from "react";

// TODO: abstract to shared state? Context + provider would cause rerenders across the
// tree whenever things change. Zustand or Jotai?
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

    return prefersReducedMotion;
};
