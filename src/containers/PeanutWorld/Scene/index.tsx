import React, { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Preload } from "@react-three/drei";
import { useTheme } from "@emotion/react";

import { useHomePageAnimationHasRunContext } from "context/HomePageAnimationHasRun";
import { useHasMounted } from "hooks/useHasMounted";
import { useIsDebugContext } from "context/IsDebug";
import { usePrefersReducedMotionContext } from "context/PrefersReducedMotion";

import type { PeanutWorldProps } from "..";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";
import { ZoomIn } from "./ZoomIn";

export const PeanutWorldScene = memo(
    ({ setTitleIsVisible }: PeanutWorldProps) => {
        const { colors } = useTheme();

        const hasMounted = useHasMounted();
        const isDebug = useIsDebugContext() ?? false;
        const prefersReducedMotion = usePrefersReducedMotionContext();
        const [hasRun, setHasRun] = useHomePageAnimationHasRunContext();

        const isShortAnimation = prefersReducedMotion || hasRun; // FIXME: rotation and orbit issues

        const ORBIT_SPEED = prefersReducedMotion ? 0.1 : 0.26;
        const ZOOM_START = isShortAnimation ? 26 : 2100;
        const ZOOM_END = 15;

        const onZoomRest = () => {
            setHasRun(true);
            setTitleIsVisible(true);
        };

        return (
            <Canvas
                style={{
                    backgroundColor: colors.spaceNavy,
                    transition: "opacity 3000ms",
                    opacity: prefersReducedMotion && hasMounted ? "0" : "1",
                    pointerEvents: isDebug ? "initial" : "none",
                }}
            >
                <Suspense fallback={null}>
                    <Preload all />
                    <ZoomIn from={ZOOM_START} to={ZOOM_END} onRest={onZoomRest}>
                        <Planet willRotate={!isShortAnimation} />
                        <Lights />
                        <Stars count={1000} />
                    </ZoomIn>
                    <Controls
                        targetZ={ZOOM_END}
                        orbitSpeedMax={ORBIT_SPEED}
                        userControllable={isDebug}
                    />
                    {/* FIXME: breaks until resize & (mostly) removes the fog effect */}
                    {/* <EffectComposer>
                        <Noise opacity={0.04} />
                    </EffectComposer> */}
                </Suspense>
            </Canvas>
        );
    },
    (previous, next) => {
        if (previous.setTitleIsVisible !== next.setTitleIsVisible) return false;
        return true;
    }
);

// Default export required for simple dynamic importing
export default PeanutWorldScene;
