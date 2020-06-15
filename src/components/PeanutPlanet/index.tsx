import React, { Suspense, lazy, useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./Lights";
import Stars from "./Stars";

const Planet = lazy(() => import("./Planet"));
const Controls = lazy(() => import("./Controls"));
// ^Fix for `cannot use import statement outside a module`: https://github.com/react-spring/react-three-fiber/discussions/504

// TODO: low-connectivity fallback - static image instead?
// TODO: low-performance fallback - fps counter and lower res or static image?

interface PeanutPlanetProps {
    titleIsVisible: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutPlanet = ({
    titleIsVisible,
    setTitleIsVisible
}: PeanutPlanetProps) => {
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [initialCameraZ, setInitialCameraZ] = useState(2100);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setIsReducedMotion(true);
            setInitialCameraZ(40);
        }
    });

    return (
        <Canvas
            concurrent
            camera={{ position: [0, 0, initialCameraZ] }}
            style={{
                background: "#061923",
                height: "100vh",
                width: "100vw"
            }}
            shadowMap
        >
            <Suspense fallback={null}>
                <Lights />
                <Planet willRotate={!isReducedMotion} />
                <Stars count={1000} />
                <Controls
                    initialCameraZ={initialCameraZ}
                    titleIsVisible={titleIsVisible}
                    setTitleIsVisible={setTitleIsVisible}
                />
            </Suspense>
        </Canvas>
    );
};

export default PeanutPlanet;
