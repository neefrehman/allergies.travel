import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";

import Lights from "./lights";
import Planet from "./planet";
import Stars from "./stars";
import Controls from "./controls";

import "./style.css";

const PeanutPlanet = () => {
    const [planetHasLoaded, setPlanetHasLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => setPlanetHasLoaded(true), 2000);
    }, []);

    return (
        <Canvas
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
            </Suspense>

            <Stars />
            <Controls planetHasLoaded={planetHasLoaded} />
        </Canvas>
    );
};

export default PeanutPlanet;
