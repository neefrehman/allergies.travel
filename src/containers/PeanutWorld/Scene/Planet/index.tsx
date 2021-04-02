import React, { memo, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { animated, useSpring } from "react-spring/three";
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
        const clonedObject = useMemo(() => planetObj.clone(), [
            planetObj,
        ]) as Group;

        const scale = window.innerWidth > 500 ? 4 : 3;

        const { rotation } = useSpring({
            rotation: [0, -0.3, 0],
            from: { rotation: [0, -22, 0] },
            config: { mass: 3, tension: 355, friction: 235 },
            immediate: !willRotate,
        });

        return (
            <animated.group
                scale={[scale, scale, scale]}
                position={[0, -0.3, 0]}
                rotation={(rotation as unknown) as [number, number, number]}
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
        );
    },
    (previous, next) => {
        if (previous.willRotate !== next.willRotate) return false;
        return true;
    }
);
