import React, { Suspense, useContext } from "react";
import { Canvas } from "react-three-fiber";
import { useTheme } from "@emotion/react";

import { IsDebugContext } from "context/IsDebug";
import { PrefersReducedMotionContext } from "context/PrefersReducedMotion";
import { useHasMounted } from "hooks/useHasMounted";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";

// TODO: low-performance fallback - fps counter and lower res at threshold? With Stats from drei?

interface PeanutPlanetProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutPlanet = ({ setTitleIsVisible }: PeanutPlanetProps) => {
    const { colors } = useTheme();
    const isDebug = useContext(IsDebugContext);
    const prefersReducedMotion = useContext(PrefersReducedMotionContext);
    // const hasRunThisSession = useContext(HomePageAnimationHasRunContext); // TODO
    // const isShortAnimation = prefersReducedMotion || hasRunThisSession;
    const hasMounted = useHasMounted();

    const INITIAL_CAMERA_Z = prefersReducedMotion ? 26 : 2100;
    const ORBIT_SPEED = prefersReducedMotion ? 0.12 : 0.28;

    return (
        <Canvas
            concurrent
            camera={{ position: [0, 0, INITIAL_CAMERA_Z] }}
            shadowMap
            style={{
                backgroundColor: colors.spaceNavy,
                transition: "opacity 3000ms",
                opacity: prefersReducedMotion && !hasMounted ? "0" : "1",
                pointerEvents: !isDebug ? "none" : "initial",
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
};

export default PeanutPlanet;
