import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./Lights";
import Planet from "./Planet";
import Stars from "./Stars";
import Controls from "./Controls";

// TODO: Split peanut-planet THREE bundle from main js bundle on index page -> faster loading?
// TODO: prefers-reduced-motion fallback

interface PeanutPlanetProps {
    titleIsVisible: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PeanutPlanet = ({
    titleIsVisible,
    setTitleIsVisible
}: PeanutPlanetProps) => {
    const initialCameraZ = 2100;

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
                <Planet />
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
