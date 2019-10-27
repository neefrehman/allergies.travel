import React, { Suspense, useRef, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import * as THREE from "three";
import {
    Canvas,
    useLoader,
    useFrame,
    useThree,
    extend
} from "react-three-fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Planet = props => {
    const groupRef = useRef();
    const gltf = useLoader(GLTFLoader, "./planet.gltf");

    return (
        <group ref={groupRef} {...props}>
            <scene name="OSG_Scene">
                <object3D
                    name="RootNode_(gltf_orientation_matrix)"
                    rotation={[-1.5707963267948963, 0, 0]}
                >
                    <object3D name="RootNode_(model_correction_matrix)">
                        <object3D name="Root">
                            <object3D
                                name="planet001"
                                position={[
                                    -0.0032900000000000013,
                                    0.023690000000000006,
                                    -6.33114
                                ]}
                                rotation={[
                                    0.23801904073457583,
                                    -0.5453875094307201,
                                    0.5622765917510457
                                ]}
                                scale={[
                                    7.0000020953568285,
                                    6.999997807471086,
                                    6.999999297157107
                                ]}
                            >
                                <mesh name="planet001">
                                    <bufferGeometry
                                        attach="geometry"
                                        {...gltf.__$[5].geometry}
                                    />
                                    <meshStandardMaterial
                                        attach="material"
                                        {...gltf.__$[5].material}
                                        name="scene"
                                        roughness={1}
                                    />
                                </mesh>
                                <mesh name="planet001" receiveShadow castShadow>
                                    <bufferGeometry
                                        attach="geometry"
                                        {...gltf.__$[6].geometry}
                                    />
                                    <meshStandardMaterial
                                        attach="material"
                                        {...gltf.__$[6].material}
                                        name="scene"
                                        roughness={1}
                                    />
                                </mesh>
                            </object3D>
                        </object3D>
                    </object3D>
                </object3D>
            </scene>
        </group>
    );
};

const Stars = ({ count = 5000 }) => {
    const positions = useMemo(() => {
        const positionsArray = [];
        for (let i = 0; i < count; i++) {
            positionsArray.push(
                (50 + Math.random() * 1000) *
                    (Math.round(Math.random()) ? -1 : 1)
            );
            positionsArray.push(
                (50 + Math.random() * 1000) *
                    (Math.round(Math.random()) ? -1 : 1)
            );
            positionsArray.push(
                (50 + Math.random() * 1000) *
                    (Math.round(Math.random()) ? -1 : 1)
            );
        }
        return new Float32Array(positions);
    }, [count]);

    return (
        <points>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={["attributes", "position"]}
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                size={2}
                sizeAttenuation
                color="white"
                transparent
                opacity={0.8}
                fog={false}
            />
        </points>
    );
};

extend({ OrbitControls });

const Controls = props => {
    const { gl, camera } = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());
    return (
        <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
    );
};

const PeanutPlanet = () => (
    <Canvas
        style={{
            background: "#061923"
        }}
        camera={{ position: [0, 0, 15] }}
        shadowMap
    >
        <ambientLight intensity={0.4} />
        <pointLight intensity={20} position={[-10, -25, -10]} color="#200f20" />
        <spotLight
            castShadow
            intensity={4}
            angle={Math.PI / 8}
            position={[15, 25, 5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
        <fog attach="fog" args={["#090b1f", 0, 25]} />
        <Suspense fallback={null}>
            <Planet />
        </Suspense>
        <Stars />
        <Controls
            autoRotate
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.5}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
        />
    </Canvas>
);

export default PeanutPlanet;
