import React from "react";
import { useLoader } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

// import planetModel from "./models/peanut_planet.obj";

const Planet = () => {
    const planetObj = useLoader(OBJLoader, "static/models/peanut_planet.obj");

    return <primitive object={planetObj} />;
};

export default Planet;
