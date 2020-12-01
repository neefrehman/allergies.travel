import React, { useContext, useMemo } from "react";
import { useThree } from "react-three-fiber";
import { animated, useSpring } from "react-spring";
import { OrbitControls } from "drei";

import { IsDebugContext } from "context/IsDebug";

interface ControlsProps {
    initialCameraZ: number;
    willZoom: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Controls = ({
    initialCameraZ,
    willZoom,
    setTitleIsVisible,
}: ControlsProps) => {
    const { gl, camera } = useThree();
    const isDebug = useContext(IsDebugContext);

    const AnimatedOrbitControls = useMemo(() => animated(OrbitControls), []);

    useSpring({
        from: { z: initialCameraZ },
        z: 20,
        config: { mass: 5.2, tension: 320, friction: 150 },
        onFrame: ({ z }) => {
            camera.position.z = z; // Will be deprecated in v9 https://github.com/react-spring/react-three-fiber/discussions/505
        },
        onRest: () => setTitleIsVisible(true),
        immediate: !willZoom, // TODO: test jaring-ness of appearance for low-motion preference
    });

    const { rotationSpeed } = useSpring({
        from: { rotationSpeed: 0 },
        rotationSpeed: 0.28,
        config: { mass: 10, tension: 15, friction: 250 },
    });

    return (
        <AnimatedOrbitControls
            target={[0, 0, 0]}
            args={[camera, gl.domElement]}
            autoRotate
            autoRotateSpeed={rotationSpeed}
            enablePan={isDebug}
            enableZoom={isDebug}
            enableRotate={isDebug}
        />
    );
};
