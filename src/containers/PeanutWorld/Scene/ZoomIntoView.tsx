import React from "react";
import type { ReactNode } from "react";
import { animated, useSpring } from "@react-spring/three";
import type { Vector3 } from "three";

interface ZoomIntoViewProps {
    from: number;
    onRest: () => void;
    children: ReactNode;
}

/**
 * Creates dolly zoom effect for children. Used as `OrbitControls` camera
 * position can't be animated with react-spring
 */
export const ZoomIntoView = ({ from, onRest, children }: ZoomIntoViewProps) => {
    const { position } = useSpring({
        position: [0, 0, 0],
        from: { position: [0, 0, -from] },
        config: { mass: 5.2, tension: 320, friction: 150 }, // TODO: more experimentation with config
        onRest: () => setTimeout(() => onRest(), 200),
    });

    return (
        <>
            <fog attach="fog" args={["#030515", 0, 500]} />
            <animated.group position={(position as unknown) as Vector3}>
                {children}
            </animated.group>
        </>
    );
};
