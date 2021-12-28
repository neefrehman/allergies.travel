import React, { memo, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { OBJLoader } from "three-stdlib";
import type { Group } from "three/src/objects/Group";

import planetModel from "./models/peanut-planet.obj";
import { DistortedObject } from "./DistortObject";

const fullRotation = Math.PI * 2;

interface PlanetProps {
  willRotate: boolean;
}

/**
 * Creates a planet's terrain by overlapping duplicated OBJ's and colouring their
 * materials. Also handles rotation via a spring
 */
export const Planet = memo(
  ({ willRotate }: PlanetProps) => {
    const planetObj = useLoader(OBJLoader, planetModel) as Group;
    const clonedObject = useMemo(() => planetObj.clone(), [planetObj]);

    const scale = window.innerWidth > 500 ? 2 : 1.5;

    const { rotation } = useSpring({
      rotation: [0, fullRotation * 0.02, 0],
      from: { rotation: [0, -fullRotation * 2.5, 0] },
      delay: willRotate ? 200 : 0,
      config: { mass: 3, tension: 400, friction: 250, precision: 0.001 },
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
          reflectivity={1.6}
        />
        <DistortedObject
          object={clonedObject}
          color="#2f5596" // ocean
          distort={0.06}
          reflectivity={1.1}
        />
      </animated.group>
    );
  },
  (previous, next) => {
    if (previous.willRotate !== next.willRotate) {
      return false;
    }
    return true;
  }
);

Planet.displayName = "Planet";
