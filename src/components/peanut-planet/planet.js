import React, { useRef } from "react";
import { useLoader } from "react-three-fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import planetModel from "./models/planet.gltf";

const Planet = props => {
    const ref = useRef();
    const gltf = useLoader(GLTFLoader, planetModel, loader => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("./models/draco-gltf/");
        loader.setDRACOLoader(dracoLoader);
    });

    return (
        <group ref={ref} {...props}>
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
                                    6.0000020953568285,
                                    5.999997807471086,
                                    5.999999297157107
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

export default Planet;
