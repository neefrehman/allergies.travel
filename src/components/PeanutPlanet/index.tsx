import React, { Suspense, useContext } from "react";
import { Canvas } from "react-three-fiber";
import { useTheme } from "@emotion/react";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";

import { IsDebugContext } from "context/IsDebug";
import { PrefersReducedMotionContext } from "context/PrefersReducedMotion";

// TODO: low-performance fallback - fps counter and lower res at threshold? With Stats from drei?

interface PeanutPlanetProps {
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutPlanet = ({ setTitleIsVisible }: PeanutPlanetProps) => {
    const { colors } = useTheme();
    const isDebug = useContext(IsDebugContext);
    const prefersReducedMotion = useContext(PrefersReducedMotionContext);

    const INITIAL_CAMERA_Z = 2100;

    return (
        <Canvas
            concurrent
            camera={{ position: [0, 0, INITIAL_CAMERA_Z] }}
            style={{
                backgroundColor: colors.spaceNavy,
                pointerEvents: !isDebug ? "none" : "initial",
            }}
            shadowMap
        >
            <Suspense fallback={null}>
                <Lights />
                <Planet willRotate={!prefersReducedMotion} />
                <Stars count={1000} />
                <Controls
                    willZoom={!prefersReducedMotion}
                    initialCameraZ={INITIAL_CAMERA_Z}
                    setTitleIsVisible={setTitleIsVisible}
                />
            </Suspense>
        </Canvas>
    );
};

export default PeanutPlanet;
