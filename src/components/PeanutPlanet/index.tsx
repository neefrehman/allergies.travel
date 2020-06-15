import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./Lights";
import Stars from "./Stars";
import Planet from "./Planet";
import Controls from "./Controls";

// TODO: low-performance fallback - fps counter and lower res at threshold? With Stats from drei?

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
