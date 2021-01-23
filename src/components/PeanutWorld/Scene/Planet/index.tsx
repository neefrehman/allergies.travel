import React, { memo, useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useSpring, animated } from "react-spring/three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import type { Group } from "three/src/objects/Group";

import planetModel from "./models/peanut-planet.obj";
import { DistortedObject } from "./DistortObject";

interface PlanetProps {
    willRotate: boolean;
}

export const Planet = memo(
    ({ willRotate }: PlanetProps) => {
        const planetObj = useLoader(OBJLoader, planetModel) as Group;
        const clonedObject = useMemo(() => planetObj.clone(), [planetObj]);

        const scale = window.innerWidth > 500 ? 4 : 3;

        const { rotation }: { rotation: [number, number, number] } = useSpring({
            rotation: [0, -0.3, 0],
            from: { rotation: [0, -22, 0] },
            config: { mass: 3, tension: 355, friction: 235 },
            immediate: !willRotate,
        });

        return (
            <>
                <fog attach="fog" args={["#090b1f", 0, 540]} />
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
                        reflectivity={1.6}
                    />
                    {/* ocean */}
                    <DistortedObject
                        object={clonedObject}
                        color="#2f5596"
                        distort={0.06}
                        speed={0.03}
                        reflectivity={1.1}
                    />
                </animated.group>

                {/* This (mostly) removes the fog effect */}
                <EffectComposer>
                    <Noise opacity={0.04} />
                </EffectComposer>
            </>
        );
    },
    (previous, next) => {
        if (previous.willRotate !== next.willRotate) return false;
        return true;
    }
);
