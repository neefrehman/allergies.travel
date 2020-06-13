import React from "react";
import { useLoader } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import planetModel from "./models/peanut_planet.obj";

const Planet = () => {
    const planetObj = useLoader(OBJLoader, planetModel);

    // TODO: add decreasing rotation of planet on mount, opposite direction to camera rotation
    return <primitive object={planetObj} />;
};

export default Planet;
