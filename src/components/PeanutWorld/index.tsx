import React, { lazy, memo, Suspense } from "react";
import type { LazyExoticComponent, FC } from "react";

export interface PeanutWorldProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutWorld = memo(
    ({ setTitleIsVisible }: PeanutWorldProps) => {
        const cpuCoreCount = navigator?.hardwareConcurrency ?? 6;
        const isLowPerformance = cpuCoreCount < 4;

        // @ts-expect-error: connection does exist
        const connection = navigator?.connection?.effectiveType ?? "4g"; // fallback for safari, which should be fast?
        const isLowConnectivity = connection === "slow-2g" || connection === "2g";

        const shouldFallback = isLowPerformance || isLowConnectivity;

        let Scene: LazyExoticComponent<FC<PeanutWorldProps>>;
        if (shouldFallback) Scene = lazy(() => import("./FallbackImage"));
        else Scene = lazy(() => import("./Scene")); // `./${shouldFallback ? "FallbackImage" : "Scene"}` causes .blend webpack warning due to bundling attempt

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
