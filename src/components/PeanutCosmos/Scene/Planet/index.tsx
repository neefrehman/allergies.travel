import React, { memo } from "react";
import { useLoader } from "react-three-fiber";
import { useSpring, animated } from "react-spring/three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import planetModel from "./models/peanut-planet.obj";
import { DistortedObject } from "./DistortObject";

interface PlanetProps {
    willRotate: boolean;
}

export const Planet = memo(
    ({ willRotate }: PlanetProps) => {
        const planetObj = useLoader(OBJLoader, planetModel);

        const scale = window.innerWidth > 500 ? 4 : 3;

        const { rotation }: { rotation: [number, number, number] } = useSpring({
            rotation: [0, -0.3, 0],
            from: { rotation: [0, -24, 0] },
            config: { mass: 3, tension: 355, friction: 235 },
            immediate: !willRotate,
        });

        return (
            <>
                <fog attach="fog" args={["#090b1f", 0, 640]} />
                <animated.group
                    scale={[scale, scale, scale]}
                    position={[0, -0.3, 0]}
                    rotation={rotation}
                >
                    {/* terrain */}
                    <DistortedObject
                        object={planetObj}
                        color="#24714f"
                        distort={0.32}
                        speed={0}
                        // TODO: experiment with more physical material props: https://threejs.org/docs/#api/en/materials/MeshPhysicalMaterial
                        reflectivity={1.6 /* IDEA: isWinter ? 7 : 1.6 :) */}
                    />
                    {/* ocean */}
                    <DistortedObject
                        object={planetObj.clone()}
                        color="#2f5596"
                        distort={0.06}
                        speed={0.03}
                        reflectivity={1.1}
                    />
                </animated.group>
            </>
        );
    },
    (previous, next) => {
        if (previous.willRotate !== next.willRotate) return false;
        return true;
    }
);
