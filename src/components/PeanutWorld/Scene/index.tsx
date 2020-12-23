import React, { memo, Suspense, useContext } from "react";
import { Canvas } from "react-three-fiber";
import { useTheme } from "@emotion/react";

import { IsDebugContext } from "context/IsDebug";
import { PrefersReducedMotionContext } from "context/PrefersReducedMotion";
import { HomePageAnimationHasRunContext } from "context/HomePageAnimationHasRun";
import { useHasMounted } from "hooks/useHasMounted";
import { useTimeout } from "hooks/useTimeout";

import type { PeanutWorldProps } from "..";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";

const PeanutWorldScene = memo(
    ({ setTitleIsVisible }: PeanutWorldProps) => {
        const { colors } = useTheme();

        const hasMounted = useHasMounted();
        const isDebug = useContext(IsDebugContext);
        const prefersReducedMotion = useContext(PrefersReducedMotionContext);
        const [hasRunThisSession, setHasRunThisSession] = useContext(
            HomePageAnimationHasRunContext
        );
        const isShortAnimation = prefersReducedMotion || hasRunThisSession;

        useTimeout(() => setHasRunThisSession(true), 3000); // TODO test hasRunThisSession

        const INITIAL_CAMERA_Z = isShortAnimation ? 26 : 2100;
        const ORBIT_SPEED = prefersReducedMotion ? 0.1 : 0.28;

        return (
            <Canvas
                concurrent
                camera={{ position: [0, 0, INITIAL_CAMERA_Z] }}
                shadowMap
                style={{
                    backgroundColor: colors.spaceNavy,
                    transition: "opacity 3000ms",
                    opacity: prefersReducedMotion && !hasMounted ? "0" : "1",
                    pointerEvents: isDebug ? "initial" : "none",
                }}
            >
                <Suspense fallback={null}>
                    <Lights />
                    <Planet willRotate={!prefersReducedMotion} />
                    <Stars count={1000} />
                    <Controls
                        initialCameraZ={INITIAL_CAMERA_Z}
                        orbitSpeedMax={ORBIT_SPEED}
                        userControllable={isDebug}
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
