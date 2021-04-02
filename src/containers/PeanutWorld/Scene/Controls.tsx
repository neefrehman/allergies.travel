import React from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

// eslint-disable-next-line import/order
// import { useIsDebugContext } from "context/IsDebug";
// import { usePrefersReducedMotionContext } from "context/PrefersReducedMotion";

interface ControlsProps {
    targetZ: number;
    orbitSpeedMax: number;
    userControllable: boolean;
}

const AnimatedOrbitControls = animated(OrbitControls);

export const Controls = ({
    targetZ,
    orbitSpeedMax,
    userControllable,
}: ControlsProps) => {
    const { gl, camera } = useThree();

    /*
        Context only returns intial values on this layer. Resorted to prop drilling as in the parent it works fine.
        Comments left for future investigation. Looks like this component doesn't rerender when
        context values change? Although the console.log does happen multiple times for other state changes...
        Why? it's not memo-ised. And context is changed with setState. 🤔
    */
    // const isDebug = useIsDebugContext();
    // const prefersReducedMotion = usePrefersReducedMotionContext();
    // console.log(isDebug, prefersReducedMotion);

    const { orbitSpeed } = useSpring({
        orbitSpeed: orbitSpeedMax,
        from: { orbitSpeed: 0 },
        config: { mass: 10, tension: 15, friction: 340 },
    });

    return (
        <AnimatedOrbitControls
            target={[0, 0, -targetZ]}
            args={[camera, gl.domElement]}
            autoRotate
            autoRotateSpeed={(orbitSpeed as unknown) as number}
            enableDamping
            enablePan={userControllable}
            enableZoom={userControllable}
            enableRotate={userControllable}
        />
    );
};
