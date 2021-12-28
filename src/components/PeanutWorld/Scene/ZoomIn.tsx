import React from "react";
import type { ReactNode } from "react";
import { animated, useSpring } from "@react-spring/three";
import type { Vector3 } from "three";

interface ZoomInProps {
  from: number;
  to: number;
  onRest: () => void;
  children: ReactNode;
}

/**
 * Creates dolly zoom effect for children. Used because `OrbitControls` camera
 * position can't be animated with react-spring
 */
export const ZoomIn = ({ from, to, onRest, children }: ZoomInProps) => {
  const { position } = useSpring({
    position: [0, 0, -to],
    from: { position: [0, 0, -from] },
    config: { mass: 5.2, tension: 320, friction: 150, precision: 0.01 }, // TODO: more experimentation with config
    onRest,
  });

  return (
    <animated.group position={position as unknown as Vector3}>
      {children}
    </animated.group>
  );
};
