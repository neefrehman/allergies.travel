import React, { useRef, useState } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { useSpring } from "react-spring";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
    const { gl, camera } = useThree();
    const ref = useRef();

    const [zoomFinished, setZoomFinished] = useState(false);

    const { z } = useSpring({
        from: { z: 380 },
        z: 20,
        config: {
            mass: 0.1,
            tension: 200,
            friction: 180
        },
        onRest: () => setZoomFinished(true)
    });

    // TODO: find a way to hand off values back to the camera prop in Canvas once zoom is over
    // Otherwise autoRotate get's whacked!
    useFrame(() => {
        camera.position.z = z.value;
        ref.current.update();
        console.log(z.value, camera.position.z);
    });

    return (
        <orbitControls
            ref={ref}
            args={[camera, gl.domElement]}
            autoRotate={zoomFinished}
            autoRotateSpeed={0.3}
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
