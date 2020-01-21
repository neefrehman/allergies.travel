import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./lights";
import Planet from "./planet";
import Stars from "./stars";
import Controls from "./controls";

// TODO: Split peanut-planet THREE bundle from main js bundle on index -> faster loading

const PeanutPlanet = () => {
    const initialCameraZ = 1050;

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
                <Stars count={1000} />
                <Controls initialCameraZ={initialCameraZ} />
            </Suspense>
        </Canvas>
    );
};

export default PeanutPlanet;
