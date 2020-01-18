import React, { useRef } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const Controls = () => {
    const { gl, camera } = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());

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
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
        />
    );
};

export default Controls;
