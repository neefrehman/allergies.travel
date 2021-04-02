import React, { lazy, memo, Suspense } from "react";

import { useHasMounted } from "hooks/useHasMounted";

export interface PeanutWorldProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutWorld = memo(
    ({ setTitleIsVisible }: PeanutWorldProps) => {
        const hasMounted = useHasMounted();

        if (!hasMounted) {
            return null; // dont't render during SSR as Suspense and navigator will cause errors
        }

        // @ts-expect-error: connection does exist!
        const connection = navigator?.connection?.effectiveType ?? "4g";
        const cpuCoreCount = navigator?.hardwareConcurrency ?? 6;
        const isLowConnectivity = connection === "slow-2g" || connection === "2g";
        const isLowPerformance = cpuCoreCount < 4;

        const shouldFallback = isLowConnectivity || isLowPerformance;

        const Scene = shouldFallback // `./${shouldFallback ? "FallbackImage" : "Scene"}` causes BIG bundle size increase. not helped by `webpackInclude`
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

// Default export required for simpler dynamic importing
export default PeanutWorld;
