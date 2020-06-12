/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSpring } from "react-spring";
// Cannot use import statement outside a module: https://github.com/react-spring/gltfjsx/issues/20
// import { OrbitControls } from "drei";

import lerp from "utils/lerp";

let OrbitControls;

interface ControlsProps {
    initialCameraZ: any; // otherwise z.value in useFrame won't work
    titleIsVisible: boolean;
    setTitleIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Controls = ({
    initialCameraZ,
    titleIsVisible,
    setTitleIsVisible
}: ControlsProps) => {
    OrbitControls = require("drei").OrbitControls;

    const { gl, camera } = useThree();
    const [rotationSpeed, setRotationSpeed] = useState(0);

    const { z } = useSpring({
        from: {
            z: initialCameraZ
        },
        z: 20,
        config: {
            mass: 5.2,
            tension: 310,
            friction: 150
        },
        onRest: () => setTitleIsVisible(true)
    });

    useFrame(() => {
        if (camera.position.z > 20) camera.position.z = z.value;
        if (rotationSpeed < 0.3) {
            setRotationSpeed(
                lerp(rotationSpeed, 0.305, titleIsVisible ? 0.003 : 0.0009)
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
