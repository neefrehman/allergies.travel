import React, { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
// import { EffectComposer, Noise } from "@react-three/postprocessing";
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
import { ZoomIntoView } from "./ZoomIntoView";

export const PeanutWorldScene = memo(
    ({ setTitleIsVisible }: PeanutWorldProps) => {
        const { colors } = useTheme();

        const hasMounted = useHasMounted();
        const isDebug = useIsDebugContext();
        const prefersReducedMotion = usePrefersReducedMotionContext();
        const [
            hasRunThisSession,
            setHasRunThisSession,
        ] = useHomePageAnimationHasRunContext();

        const isShortAnimation = prefersReducedMotion || hasRunThisSession; // FIXME: rotation and orbit issues

        const INITIAL_CAMERA_Z = isShortAnimation ? 26 : 2100;
        const ORBIT_SPEED = prefersReducedMotion ? 0.1 : 0.26;

        const onRest = () => {
            setHasRunThisSession(true);
            setTitleIsVisible(true);
        };

        return (
            <Canvas
                camera={{ position: [0, 0, 20] }}
                style={{
                    backgroundColor: colors.spaceNavy,
                    transition: "opacity 3000ms",
                    opacity: prefersReducedMotion && hasMounted ? "0" : "1",
                    pointerEvents: isDebug ? "initial" : "none",
                }}
            >
                <Suspense fallback={null}>
                    <ZoomIntoView
                        initialCameraZ={INITIAL_CAMERA_Z}
                        onRest={onRest}
                    >
                        <Lights />
                        <Planet willRotate={!isShortAnimation} />
                        <Stars count={1000} />
                    </ZoomIntoView>
                    <Controls
                        orbitSpeedMax={ORBIT_SPEED}
                        userControllable={isDebug ?? false}
                    />
                    {/* FIXME: hook error & This (mostly) removes the fog effect */}
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
