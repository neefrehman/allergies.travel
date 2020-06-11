import React, { useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSpring } from "react-spring/three";
import { OrbitControls } from "drei";
import { Vector3 } from "three";

import lerp from "utils/lerp";

const Controls = ({ initialCameraZ, titleIsVisible, setTitleIsVisible }) => {
    const { gl, camera } = useThree();
    const [rotationSpeed, setRotationSpeed] = useState(0);

    const { z } = useSpring({
        from: { z: initialCameraZ },
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
            target={new Vector3(0, 0, 0)}
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
