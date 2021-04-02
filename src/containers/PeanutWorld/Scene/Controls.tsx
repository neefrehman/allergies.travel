import React, { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

// eslint-disable-next-line import/order
// import { useContext } from "react";
// import { IsDebugContext } from "context/IsDebug";
// import { PrefersReducedMotionContext } from "context/PrefersReducedMotion";

interface ControlsProps {
    orbitSpeedMax: number;
    userControllable: boolean;
}

export const Controls = ({ orbitSpeedMax, userControllable }: ControlsProps) => {
    const { gl, camera } = useThree();

    /*
        Context only returns default values on this layer. Resorted to prop drilling as in the parent it works fine.
        Comments left for future investigation. Looks like this component doesn't rerender when
        context values change? Although the console.log does happen multiple times for other state changes...
        Why? it's not memo-ised (the below memo isn't the cause). And context is changed with setState. 🤔
    */
    // const isDebug = useContext(IsDebugContext);
    // const prefersReducedMotion = useContext(PrefersReducedMotionContext);
    // console.log(isDebug, prefersReducedMotion);

    const AnimatedOrbitControls = useMemo(() => animated(OrbitControls), []);

    const { orbitSpeed } = useSpring({
        orbitSpeed: orbitSpeedMax,
        from: { orbitSpeed: 0 },
        config: { mass: 10, tension: 15, friction: 340 },
    });

    return (
        <AnimatedOrbitControls
            target={[0, 0, 0]}
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
