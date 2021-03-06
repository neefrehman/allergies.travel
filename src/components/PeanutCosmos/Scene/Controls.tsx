import React, { useMemo } from "react";
import { useThree } from "react-three-fiber";
import { animated, useSpring } from "react-spring";
import { OrbitControls } from "@react-three/drei/OrbitControls";

// eslint-disable-next-line import/order
// import { useContext } from "react";
// import { IsDebugContext } from "context/IsDebug";
// import { PrefersReducedMotionContext } from "context/PrefersReducedMotion";

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

    useSpring({
        z: 20,
        from: { z: initialCameraZ },
        config: { mass: 5.2, tension: 320, friction: 150 }, // TODO: more experimentation with config
        onFrame: ({ z }) => {
            if (camera.position?.z !== 20) camera.position.z = z; // Will be deprecated in v9 https://github.com/react-spring/react-three-fiber/discussions/505
        },
        onRest: () => setTitleIsVisible(true),
    });

    const { orbitSpeed } = useSpring({
        orbitSpeed: orbitSpeedMax,
        from: { orbitSpeed: 0 },
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
