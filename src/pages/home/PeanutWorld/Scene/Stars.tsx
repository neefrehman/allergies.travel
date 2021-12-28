import React, { useCallback, useMemo } from "react";
import { useSpring, animated } from "@react-spring/three";

interface StarsProps {
  count: number;
  maxDistance: number;
}

export const Stars = ({ count, maxDistance }: StarsProps) => {
  const getAxisPosition = useCallback(
    ({ minDistance = 0 } = {}) =>
      (minDistance + Math.random() * maxDistance) * (Math.random() > 0.5 ? -1 : 1),
    [maxDistance]
  );

  const starPositionsArray = useMemo(() => {
    const positions = [...Array(count)].map(() => [
      getAxisPosition(),
      getAxisPosition(),
      getAxisPosition({ minDistance: 50 }),
    ]);
    return new Float32Array(positions.flat(1));
  }, [count, getAxisPosition]);

  const { opacity } = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={count}
          array={starPositionsArray}
          itemSize={3}
        />
      </bufferGeometry>
      <animated.pointsMaterial
        size={maxDistance * 0.002}
        sizeAttenuation
        color="white"
        transparent
        opacity={opacity}
        fog={false}
      />
    </points>
  );
};
