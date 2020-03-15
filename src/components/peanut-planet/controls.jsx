import React, { useRef, useState } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { useSpring } from "react-spring";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import lerp from "../../utils/lerp";

extend({ OrbitControls });

const Controls = ({ initialCameraZ, titleIsVisible, setTitleIsVisible }) => {
    const { gl, camera } = useThree();
    const ref = useRef();
    const [rotationSpeed, setRotationSpeed] = useState(0);

    const { z } = useSpring({
        from: { z: initialCameraZ },
        z: 20,
        config: {
            mass: 5.2,
            tension: 310,
            friction: 175
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
        ref.current.update();
    });

    return (
        <orbitControls
            target={[0, 0, 0]}
            ref={ref}
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
