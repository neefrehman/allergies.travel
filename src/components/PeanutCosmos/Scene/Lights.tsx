import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { SpotLight } from "three";

export const Lights = () => {
    const DIST = 15;
    const Y_DIST = 25;

    const frontLight = useRef<SpotLight>();
    const backLight = useRef<SpotLight>();

    useFrame(({ clock }) => {
        const time = clock.elapsedTime * 0.06;

        frontLight.current.position.x = Math.sin(time) * -DIST;
        frontLight.current.position.z = Math.cos(time) * DIST;

        backLight.current.position.x = Math.sin(time) * DIST;
        backLight.current.position.z = Math.cos(time) * -DIST;
    });

    return (
        <>
            <ambientLight intensity={0.25} color="#ffffff" />
            <spotLight
                ref={frontLight}
                castShadow
                intensity={0.42}
                color="#ffffff"
                position={[0, Y_DIST, DIST]}
                angle={Math.PI / 8}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <spotLight
                ref={backLight}
                castShadow
                intensity={0.06}
                color="#ffffff"
                position={[DIST, -Y_DIST, 0]}
                angle={Math.PI / 8}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
        </>
    );
};
