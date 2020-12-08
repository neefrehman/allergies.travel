import React, { useState } from "react";
import { useFrame, Vector3 } from "react-three-fiber";

export const Lights = () => {
    const DIST = 15;
    const Y_DIST = 25;

    const [spotlightPos, setSpotlightPos] = useState<Vector3>([0, Y_DIST, DIST]);
    const [backlightPos, setBacklightPos] = useState<Vector3>([DIST, -Y_DIST, 0]);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime * 0.06;

        const spotLightX = Math.sin(time) * -DIST;
        const spotLightZ = Math.cos(time) * DIST;
        setSpotlightPos([spotLightX, Y_DIST, spotLightZ]);

        const backLightX = Math.sin(time) * DIST;
        const backLightZ = Math.cos(time) * -DIST;
        setBacklightPos([backLightX, -Y_DIST, backLightZ]);
    });

    return (
        <>
            <ambientLight intensity={0.27} color="#ffffff" />
            <spotLight
                castShadow
                intensity={0.45}
                color="#ffffff"
                angle={Math.PI / 8}
                position={spotlightPos}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <spotLight
                castShadow
                intensity={0.11}
                color="#ffffff"
                angle={Math.PI / 8}
                position={backlightPos}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
        </>
    );
};
