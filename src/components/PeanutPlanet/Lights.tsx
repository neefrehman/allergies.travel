import React from "react";

const Lights = () => (
    <>
        <ambientLight intensity={0.3} />
        <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" />
        <spotLight
            castShadow
            intensity={4}
            angle={Math.PI / 8}
            position={[15, 25, 5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
        {/* @ts-ignore */}
        <fog attach="fog" args={["#090b1f", 1, 700]} />
    </>
);

export default Lights;
