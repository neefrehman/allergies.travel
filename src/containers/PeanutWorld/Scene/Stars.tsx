import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/three";

const getAxisPosition = (offset: number) =>
    (offset + Math.random() * 1000) * (Math.round(Math.random()) ? -1 : 1);

export const Stars = ({ count = 1000, xOff = 0, yOff = 0, zOff = 50 }) => {
    const starPositionsArray = useMemo(() => {
        const positions = [...Array(count)].flatMap(() => [
            getAxisPosition(xOff),
            getAxisPosition(yOff),
            getAxisPosition(zOff),
        ]);
        return new Float32Array(positions);
    }, [count, xOff, yOff, zOff]);

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
                size={2}
                sizeAttenuation
                color="white"
                transparent
                opacity={opacity}
                fog={false}
            />
        </points>
    );
};
