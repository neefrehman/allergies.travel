/* eslint-disable no-void */
/* eslint-disable no-param-reassign */
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { useSpring } from "react-spring";

import Stars from "./stars";
import Controls from "./controls";
import Planet from "./planet";

import "./style.css";

const Zoom = () => {
    // eslint-disable-next-line no-return-assign
    useFrame(({ clock, camera }) =>
        camera.updateProjectionMatrix(
            void (camera.position.z =
                50 + Math.sin(clock.getElapsedTime()) * 30)
        )
    );
    return null;
};

const PeanutPlanet = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    // FIXME: z not working
    const { z } = useSpring({
        from: { z: 200 },
        z: loaded ? 15 : 200,
        config: {
            duration: 500,
            mass: 9.5,
            tension: 246,
            friction: 64
        }
    });

    return (
        <Canvas
            style={{
                background: "#061923",
                height: "100vh",
                width: "100vw"
            }}
            camera={{ position: [0, 0, 200 /* z */] }}
            shadowMap
        >
            <ambientLight intensity={0.4} />
            <pointLight
                intensity={20}
                position={[-10, -25, -10]}
                color="#200f20"
            />
            <spotLight
                castShadow
                intensity={4}
                angle={Math.PI / 8}
                position={[15, 25, 5]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <fog attach="fog" args={["#090b1f", 1, 800]} />

            <Suspense fallback={z.toString()}>
                {/* TODO: callback to trigger spring-zoom only once planet is loaded */}
                <Planet />
            </Suspense>

            <Stars />
            <Controls />
            <Zoom />
        </Canvas>
    );
};

export default PeanutPlanet;
