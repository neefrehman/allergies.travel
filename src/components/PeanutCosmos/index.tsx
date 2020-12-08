import React, { lazy, memo, Suspense } from "react";
import { useDetectGPU } from "@react-three/drei";

export interface PeanutCosmosProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutCosmos = memo(
    ({ setTitleIsVisible }: PeanutCosmosProps) => {
        const gpu = useDetectGPU();
        const isLowPerformance = gpu?.tier < 1 ?? false;

        // @ts-expect-error: connection does exist. And there's a fallback where the api isn't supported.
        const connection = navigator?.connection?.effectiveType ?? "4g"; // default for safari, which should be fast?
        const isLowConnectivity = connection === "slow-2g" || connection === "2g";

        const shouldFallback = isLowPerformance || isLowConnectivity;

        let Scene: React.LazyExoticComponent<React.FC<PeanutCosmosProps>>;
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
