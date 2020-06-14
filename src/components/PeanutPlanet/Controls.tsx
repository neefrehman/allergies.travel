import React, { useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSpring } from "react-spring";
import { OrbitControls } from "drei";

import lerp from "utils/lerp";

interface ControlsProps {
    initialCameraZ: number;
    titleIsVisible: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls = ({
    initialCameraZ,
    titleIsVisible,
    setTitleIsVisible
}: ControlsProps) => {
    const { gl, camera } = useThree();
    const [rotationSpeed, setRotationSpeed] = useState(0);

    // Will be deprecated in v9 https://github.com/react-spring/react-three-fiber/discussions/505
    useSpring({
        from: {
            z: initialCameraZ
        },
        z: 20,
        config: {
            mass: 5.2,
            tension: 310,
            friction: 150
        },
        onFrame: ({ z }) => {
            camera.position.z = z;
        },
        onRest: () => setTitleIsVisible(true)
    });

    useFrame(() => {
        if (rotationSpeed < 0.3) {
            setRotationSpeed(
                lerp(rotationSpeed, 0.305, titleIsVisible ? 0.003 : 0.001)
            );
        }
    });

    return (
        <OrbitControls
            target={[0, 0, 0]}
            args={[camera, gl.domElement]}
            autoRotate
            autoRotateSpeed={rotationSpeed}
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
        />
    );
};

export default Controls;
