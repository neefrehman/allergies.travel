import React, { memo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { useTheme } from "@emotion/react";

import { useHomePageAnimationHasRunContext } from "context/HomePageAnimationHasRun";
import { useHasMounted } from "hooks/useHasMounted";
import { useTimeout } from "hooks/useTimeout";
import { useIsDebugContext } from "context/IsDebug";
import { usePrefersReducedMotionContext } from "context/PrefersReducedMotion";

import type { PeanutWorldProps } from "..";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";

const PeanutWorldScene = memo(
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

        useTimeout(() => setHasRunThisSession(true), 3000); // TODO test hasRunThisSession

        const INITIAL_CAMERA_Z = isShortAnimation ? 26 : 2100;
        const ORBIT_SPEED = prefersReducedMotion ? 0.1 : 0.28;

        return (
            <Canvas
                camera={{ position: [0, 0, INITIAL_CAMERA_Z] }}
                style={{
                    backgroundColor: colors.spaceNavy,
                    transition: "opacity 3000ms",
                    opacity: prefersReducedMotion && hasMounted ? "0" : "1",
                    pointerEvents: isDebug ? "initial" : "none",
                }}
            >
                <Suspense fallback={null}>
                    <Lights />
                    <Planet willRotate={!isShortAnimation} />
                    {/* Doesnt solve the stutter when the planet enters the scene */}
                    <Preload all />
                    <Stars count={1000} />
                    <Controls
                        initialCameraZ={INITIAL_CAMERA_Z}
                        orbitSpeedMax={ORBIT_SPEED}
                        userControllable={isDebug ?? false}
                        setTitleIsVisible={setTitleIsVisible}
                    />
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
