import React, { useRef } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { useSpring } from "react-spring";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = ({ planetHasLoaded = true }) => {
    const { gl, camera } = useThree();
    const ref = useRef();
    const initialCameraZ = 200;

    // eslint-disable-next-line no-unused-vars
    const { z } = useSpring({
        from: { z: initialCameraZ },
        z: planetHasLoaded ? 15 : initialCameraZ,
        config: {
            duration: 500,
            mass: 9,
            tension: 250,
            friction: 60
        }
    });

    useFrame(({ clock }) => {
        // TODO: Swap clock-based value with z^
        // camera.position.z = z;
        camera.position.z = planetHasLoaded
            ? 200 + Math.sin(clock.getElapsedTime()) * 30
            : initialCameraZ;
        ref.current.update();
    });

    return (
        <orbitControls
            ref={ref}
            args={[camera, gl.domElement]}
            autoRotate={planetHasLoaded}
            autoRotateSpeed={0.4}
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            enableDamping
            dampingFactor={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
        />
    );
};

export default Controls;
