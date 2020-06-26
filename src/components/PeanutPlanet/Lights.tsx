import React from "react";

const Lights = () => (
    <>
        <ambientLight intensity={0.5} color="#2F98D0" />
        {/* TODO: swap light color once planet colouring is done with shaders */}
        {/* TODO: light rotates around planet for sun-like effect */}
        <pointLight intensity={2} position={[-10, -25, -10]} color="#5CBF62" />
        <spotLight
            castShadow
            intensity={2}
            color="#5CBF62"
            angle={Math.PI / 8}
            position={[15, 25, 5]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
        />
    </>
);

export default Lights;
