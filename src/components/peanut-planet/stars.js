import React, { useMemo } from "react";

const Stars = ({ count = 1000, xOff = 0, yOff = 0, zOff = 50 }) => {
    const positionsArray = useMemo(() => {
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
    }, [count]);

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={positionsArray.length / 3}
                    array={positionsArray}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                size={2}
                sizeAttenuation
                color="white"
                transparent
                opacity={1}
                fog={false}
            />
        </points>
    );
};

export default Stars;
