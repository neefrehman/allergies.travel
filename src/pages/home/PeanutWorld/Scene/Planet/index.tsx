import React, { memo, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { OBJLoader } from "three-stdlib";
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

    const scale = window.innerWidth > 500 ? 2 : 1.5;

    const { rotation } = useSpring({
      rotation: [0, -0.3, 0],
      from: { rotation: [0, -22, 0] },
      config: { mass: 3, tension: 350, friction: 250 },
      immediate: !willRotate,
    });

    return (
      <animated.group
        scale={[scale, scale, scale]}
        position={[0, -0.3, 0]}
        rotation={rotation as unknown as [number, number, number]}
      >
        <DistortedObject
          object={planetObj}
          color="#24714f" // terrain
          distort={0.32}
          speed={0}
          reflectivity={1.6}
        />
        <DistortedObject
          object={clonedObject}
          color="#2f5596" // ocean
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

Planet.displayName = "Planet";
