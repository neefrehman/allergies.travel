import React, { useContext, useMemo } from "react";
import { useThree } from "react-three-fiber";
import { animated, useSpring } from "react-spring";
import { OrbitControls } from "drei";

import { IsDebugContext } from "context/IsDebug";
import { PrefersReducedMotionContext } from "context/PrefersReducedMotion";

interface ControlsProps {
    initialCameraZ: number;
    orbitSpeedMax: number;
    userControllable: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Controls = ({
    initialCameraZ,
    orbitSpeedMax,
    userControllable,
    setTitleIsVisible,
}: ControlsProps) => {
    const { gl, camera } = useThree();

    // context only returned default on this layer strangely. resorted to prop drilling.
    // const isDebug = useContext(IsDebugContext);
    // const prefersReducedMotion = useContext(PrefersReducedMotionContext);
    // console.log(isDebug, prefersReducedMotion);

    const AnimatedOrbitControls = useMemo(() => animated(OrbitControls), []);

    useSpring({
        from: { z: initialCameraZ },
        z: 20,
        config: { mass: 5.2, tension: 320, friction: 150 }, // TODO: more experimentation with config
        onFrame: ({ z }) => {
            camera.position.z = z; // Will be deprecated in v9 https://github.com/react-spring/react-three-fiber/discussions/505
        },
        onRest: () => setTitleIsVisible(true),
    });

    const { orbitSpeed } = useSpring({
        from: { orbitSpeed: 0 },
        orbitSpeed: orbitSpeedMax,
        config: { mass: 10, tension: 15, friction: 250 }, // TODO: more experimentation with config
    });

    return (
        <AnimatedOrbitControls
            target={[0, 0, 0]}
            args={[camera, gl.domElement]}
            autoRotate
            autoRotateSpeed={(orbitSpeed as unknown) as number} // Fix for: Type '{ interpolate: InterpolationChain... }' not assignable to type 'number'
            enablePan={userControllable}
            enableZoom={userControllable}
            enableRotate={userControllable}
        />
    );
};
