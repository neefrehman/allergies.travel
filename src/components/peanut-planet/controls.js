import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { useSpring } from "react-spring";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
    const { gl, camera } = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());

    const [loaded, setLoaded] = useState(false);
    useEffect(() => setLoaded(true), []);

    // eslint-disable-next-line no-unused-vars
    const { z } = useSpring({
        from: { z: 200 },
        z: loaded ? 15 : 200,
        config: {
            duration: 500,
            mass: 9.5,
            tension: 246,
            friction: 64
        }
    });

    camera.position.set(0, 0, 15);

    return (
        <orbitControls
            ref={ref}
            args={[camera, gl.domElement]}
            autoRotate
            autoRotateSpeed={0.4}
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
        />
    );
};

export default Controls;
