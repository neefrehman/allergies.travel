import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./lights";
import Planet from "./planet";
import Stars from "./stars";
import Controls from "./controls";

import "./style.css";

const PeanutPlanet = () => (
    <Canvas
        // camera={{ position: [0, 0, 15] }}
        style={{
            background: "#061923",
            height: "100vh",
            width: "100vw"
        }}
        shadowMap
    >
        <Lights />
        <fog attach="fog" args={["#090b1f", 1, 700]} />

        <Suspense fallback={null}>
            {/* TODO: callback to trigger zoom only once planet is loaded? */}
            <Planet />
            <Controls />
        </Suspense>

        <Stars />
    </Canvas>
);

export default PeanutPlanet;
