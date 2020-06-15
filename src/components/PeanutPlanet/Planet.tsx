import React, { useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import lerp from "Utils/lerp";

import planetModel from "./models/peanut_planet.obj";

const scale = window.innerWidth > 500 ? 1 : 0.75;

interface PlanetProps {
    willRotate: boolean;
}

const Planet = ({ willRotate }: PlanetProps) => {
    const planetObj = useLoader(OBJLoader, planetModel);
    const [rotationY, setRotationY] = useState(willRotate ? -20 : 5);

    useFrame(() => {
        if (rotationY < 5) setRotationY(lerp(rotationY, 5, 0.025));
    });

    return (
        <>
            {/* until three js publishes updated fog types: https://github.com/mrdoob/three.js/pull/19641 */
            /* @ts-ignore */}
            <fog attach="fog" args={["#090b1f", 1, willRotate ? 700 : 70]} />
            <primitive
                object={planetObj}
                scale={[scale, scale, scale]}
                position={[0, -0.3, 0]}
                rotation={[0, rotationY, 0]}
            />
        </>
    );
};

export default Planet;
