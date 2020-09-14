import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import { usePrefersReducedMotion } from "hooks/usePrefersReducedMotion";

import { Lights } from "./Lights";
import { Stars } from "./Stars";
import { Planet } from "./Planet";
import { Controls } from "./Controls";

// TODO: low-performance fallback - fps counter and lower res at threshold? With Stats from drei?

interface PeanutPlanetProps {
    titleIsVisible: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutPlanet = ({
    titleIsVisible,
    setTitleIsVisible,
}: PeanutPlanetProps) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const INITIAL_CAMERA_Z = prefersReducedMotion ? 40 : 2100;

    return (
        <Canvas
            concurrent
            camera={{ position: [0, 0, INITIAL_CAMERA_Z] }}
            style={{
                background: "#061923",
                height: "100vh",
                width: "100vw",
            }}
            shadowMap
        >
            <Suspense fallback={null}>
                <Lights />
                <Planet willRotate={!prefersReducedMotion} />
                <Stars count={1000} />
                <Controls
                    initialCameraZ={INITIAL_CAMERA_Z}
                    titleIsVisible={titleIsVisible}
                    setTitleIsVisible={setTitleIsVisible}
                />
            </Suspense>
        </Canvas>
    );
};

export default PeanutPlanet;
