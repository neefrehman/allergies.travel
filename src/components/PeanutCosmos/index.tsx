import React, { lazy, memo, Suspense } from "react";
import { useDetectGPU } from "@react-three/drei";

import { PeanutCosmosSceneProps } from "./Scene";

const PeanutCosmos = memo(
    ({ setTitleIsVisible }: PeanutCosmosSceneProps) => {
        const gpu = useDetectGPU();
        const isLowPerformance = parseFloat(gpu.tier) < 2;

        // @ts-expect-error connection does exist. And I've created a fallback anyway.
        const connection = navigator?.connection?.effectiveType ?? "4g"; // default for safari which doesn't support the api - should be fast?
        const isLowconnectivity = connection === "slow-2g" || connection === "2g";

        const shouldFallback = isLowPerformance || isLowconnectivity;

        let Scene: React.LazyExoticComponent<React.FC<PeanutCosmosSceneProps>>;
        if (shouldFallback) Scene = lazy(() => import("./FallbackImage"));
        else Scene = lazy(() => import("./Scene")); // ternary wont work: import(shouldFallback ? "./FallbackImage" : "./Scene");

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

export default PeanutCosmos;
