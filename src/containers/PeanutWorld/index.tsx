import React, { lazy, memo, Suspense } from "react";

export interface PeanutWorldProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutWorld = memo(
    ({ setTitleIsVisible }: PeanutWorldProps) => {
        const cpuCoreCount = navigator?.hardwareConcurrency ?? 6;
        const isLowPerformance = cpuCoreCount < 4;
        // @ts-expect-error: connection does exist
        const connection = navigator?.connection?.effectiveType ?? "4g";
        const isLowConnectivity = connection === "slow-2g" || connection === "2g";

        const shouldFallback = isLowPerformance || isLowConnectivity;

        const Scene = shouldFallback // `./${shouldFallback ? "FallbackImage" : "Scene"}` has big bundle size increase. not helped by `webpackInclude`
            ? lazy(() => import("./FallbackImage"))
            : lazy(() => import("./Scene"));

        return (
            <Suspense fallback={null}>
                <Scene setTitleIsVisible={setTitleIsVisible} />
            </Suspense>
        );
    },
    (previous, next) => {
        if (previous.setTitleIsVisible !== next.setTitleIsVisible) return false;
        return true;
    }
);

// Default export required for simple dynamic importing
export default PeanutWorld;
