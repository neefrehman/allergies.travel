import React, { useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { lerp } from "Utils/lerp";

import planetModel from "./models/peanut-planet.obj";
import { useObjSimplification } from "./useGroupSimplification";

interface PlanetProps {
    willRotate: boolean;
}

// TODO: two identical models placed over each other (blue and green)
// Green given terrain using glsl-noise OR static meshDistortMaterial from Drei: https://github.com/react-spring/drei#meshdistortmaterial

export const Planet = ({ willRotate }: PlanetProps) => {
    const ROTATION_END = -0.3;
    const [rotationY, setRotationY] = useState(willRotate ? -21 : ROTATION_END);

    const planetObj = useLoader(OBJLoader, planetModel);
    const simplificationRef = useObjSimplification(0.12);

    useFrame(() => {
        if (rotationY < 5) setRotationY(lerp(rotationY, ROTATION_END, 0.024));
    });

    const scale = window.innerWidth > 500 ? 4 : 3;

    return (
        <>
            <fog attach="fog" args={["#090b1f", 1, willRotate ? 700 : 70]} />
            <primitive
                ref={simplificationRef}
                object={planetObj}
                scale={[scale, scale, scale]}
                position={[0, -0.3, 0]}
                rotation={[0, rotationY, 0]}
            />
        </>
    );
};
