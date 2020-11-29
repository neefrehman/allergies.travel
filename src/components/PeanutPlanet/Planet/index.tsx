import React from "react";
import { useLoader } from "react-three-fiber";
import { useSpring, animated } from "react-spring/three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import planetModel from "./models/peanut-planet.obj";
import { useGroupSimplification } from "./useGroupSimplification";

interface PlanetProps {
    willRotate: boolean;
}

// TODO: two identical models placed over each other (blue and green)
// Green given terrain using glsl-noise OR static meshDistortMaterial from Drei: https://github.com/react-spring/drei#meshdistortmaterial

export const Planet = ({ willRotate }: PlanetProps) => {
    const planetObj = useLoader(OBJLoader, planetModel);
    const simplifiedGroupRef = useGroupSimplification(0.15);

    const scale = window.innerWidth > 500 ? 4 : 3;

    const { rotation } = useSpring({
        from: { rotation: [0, -24, 0] },
        rotation: [0, -0.3, 0],
        config: { mass: 3, tension: 355, friction: 235 },
        immediate: !willRotate,
    });

    return (
        <>
            <fog attach="fog" args={["#090b1f", 0, willRotate ? 540 : 100]} />
            <animated.group
                ref={simplifiedGroupRef}
                scale={[scale, scale, scale]}
                position={[0, -0.3, 0]}
                rotation={rotation}
            >
                <primitive object={planetObj} />
            </animated.group>
        </>
    );
};
