import React, { lazy, memo, Suspense } from "react";
import type { LazyExoticComponent, FC } from "react";
import { useDetectGPU } from "@react-three/drei";

export interface PeanutCosmosProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutCosmos = memo(
    ({ setTitleIsVisible }: PeanutCosmosProps) => {
        const gpu = useDetectGPU();
        const isLowPerformance = gpu?.tier < 1 ?? false;

        // @ts-expect-error: connection does exist
        const connection = navigator?.connection?.effectiveType ?? "4g"; // fallback for safari, which should be fast?
        const isLowConnectivity = connection === "slow-2g" || connection === "2g";

        const shouldFallback = isLowPerformance || isLowConnectivity;

        let Scene: LazyExoticComponent<FC<PeanutCosmosProps>>;
        if (shouldFallback) Scene = lazy(() => import("./FallbackImage"));
        else Scene = lazy(() => import("./Scene")); // `./${shouldFallback ? "FallbackImage" : "Scene"}` causes blender file to create webpack warning due to prebundling attempt

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
