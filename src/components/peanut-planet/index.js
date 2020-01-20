import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./lights";
import Planet from "./planet";
import Stars from "./stars";
import Controls from "./controls";

const PeanutPlanet = () => {
    const initialCameraZ = 1000;

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
                <fog attach="fog" args={["#090b1f", 1, 700]} />
                <Planet />
                <Stars />
                <Controls initialCameraZ={initialCameraZ} />
            </Suspense>
        </Canvas>
    );
};

export default PeanutPlanet;
