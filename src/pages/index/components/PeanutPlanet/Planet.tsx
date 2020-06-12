/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from "react";
import { useLoader } from "react-three-fiber";
// import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// ^Cannot use import statement outside a module: https://github.com/react-spring/react-three-fiber/discussions/504

import planetModel from "./models/peanut_planet.obj";

let OBJLoader;

const Planet = () => {
    OBJLoader = require("three/examples/jsm/loaders/OBJLoader").OBJLoader;

    const planetObj = useLoader(OBJLoader, planetModel);

    // TODO: add decreasing rotation of planet on mount, opposite direction to camera rotation
    return <primitive object={planetObj} />;
};

export default Planet;
