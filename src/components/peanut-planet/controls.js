import React, { useRef } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });
const Controls = props => {
    const { gl, camera } = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());
    return (
        <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
    );
};

export default Controls;

// https://react-spring-visualizer.com/#scale
// react-spring config:
// {
//   mass: 9.5,
//   tension: 246,
//   friction: 64
// }
