import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import type { PointsMaterial } from "three";

export const Stars = ({ count = 1000, xOff = 0, yOff = 0, zOff = 50 }) => {
    const points = useRef<PointsMaterial>();

    useFrame(() => {
        if (points.current.opacity < 1) points.current.opacity += 0.02;
    });

    const starPositionArray = useMemo(() => {
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push(
                (xOff + Math.random() * 1000) *
                    (Math.round(Math.random()) ? -1 : 1)
            );
            positions.push(
                (yOff + Math.random() * 1000) *
                    (Math.round(Math.random()) ? -1 : 1)
            );
            positions.push(
                (zOff + Math.random() * 1000) *
                    (Math.round(Math.random()) ? -1 : 1)
            );
        }
        return new Float32Array(positions);
    }, [count, xOff, yOff, zOff]);

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={count}
                    array={starPositionArray}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                ref={points}
                attach="material"
                size={2}
                sizeAttenuation
                color="white"
                transparent
                opacity={0}
                fog={false}
            />
        </points>
    );
};
