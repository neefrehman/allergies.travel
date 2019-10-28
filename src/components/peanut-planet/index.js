import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";

import Stars from "./stars";
import Controls from "./controls";
import Planet from "./planet";

import "./style.css";

const PeanutPlanet = () => (
    <Canvas
        style={{
            background: "#061923",
            height: "100vh",
            width: "100vw"
        }}
        camera={{ position: [0, 0, 15] }}
        shadowMap
    >
        <ambientLight intensity={0.8} />
        <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" />
        <spotLight
            castShadow
            intensity={4}
            angle={Math.PI / 8}
            position={[15, 25, 5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
        <fog attach="fog" args={["#090b1f", 0, 25]} />
        <Suspense fallback={null}>
            <Planet />
        </Suspense>
        <Stars />
        <Controls
            autoRotate
            autoRotateSpeed={0.4}
            enablePan={false}
            enableZoom
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
        />
    </Canvas>
);

export default PeanutPlanet;
