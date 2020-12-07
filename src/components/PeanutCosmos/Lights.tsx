import React, { useState } from "react";
import { useFrame, Vector3 } from "react-three-fiber";

export const Lights = () => {
    const [spotlightPos, setSpotlightPos] = useState<Vector3>([0, 15, 15]);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime * 0.06;
        const spotLightX = Math.sin(time) * 15;
        const spotLightZ = Math.cos(time) * 15;
        setSpotlightPos([spotLightX, 25, spotLightZ]);
    });

    return (
        <>
            <ambientLight intensity={0.27} color="#ffffff" />
            <spotLight
                castShadow
                intensity={0.65}
                color="#ffffff"
                angle={Math.PI / 8}
                position={spotlightPos}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
        </>
    );
};
