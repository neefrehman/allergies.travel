/* eslint-disable no-underscore-dangle, no-param-reassign */
import React, { useEffect, useMemo } from "react";
import {
    MeshPhysicalMaterial,
    MeshPhysicalMaterialParameters,
} from "three/src/materials/Materials";
import { Shader } from "three/src/renderers/shaders/ShaderLib";
import { Group } from "three/src/objects/Group";
import { useFrame } from "react-three-fiber";
import glsl from "glslify";

import { useCustomMaterial } from "./hooks/useCustomMaterial.tsx";

interface Uniform<T> {
    value: T;
}

/** Adapted from drei's MeshDistortMaterial, with some changes to the noise output. */
export class DistortPhysicalMaterialImpl extends MeshPhysicalMaterial {
    _time: Uniform<number>;
    _distort: Uniform<number>;
    _radius: Uniform<number>;

    constructor(materialParameters: MeshPhysicalMaterialParameters = {}) {
        super(materialParameters);
        this.setValues(materialParameters);

        this._time = { value: 0 };
        this._distort = { value: 0.4 };
        this._radius = { value: 1 };
    }

    onBeforeCompile(shader: Shader) {
        shader.uniforms.time = this._time;
        shader.uniforms.radius = this._radius;
        shader.uniforms.distort = this._distort;

        shader.vertexShader =
            glsl`
                #pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
                uniform float time;
                uniform float radius;
                uniform float distort;
            ` + shader.vertexShader;

        shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            // TODO: update characteristics of noise for better terrain
            glsl`
                float noiseScale = 1.8; // Continent size
                
                float noise = snoise3(vec3(position / noiseScale + time));
                vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
            `
        );
    }

    get time() {
        return this._time.value;
    }

    set time(v) {
        this._time.value = v;
    }

    get distort() {
        return this._distort.value;
    }

    set distort(v) {
        this._distort.value = v;
    }

    get radius() {
        return this._radius.value;
    }

    set radius(v) {
        this._radius.value = v;
    }
}

interface DistortedObjectProps {
    object: Group;
    radius?: number;
    distort?: number;
    speed?: number;
}

/**
 * An adaptation of MeshDistortMaterial from drei, to work with `useCustomMaterial`, so that
 * we can apply the distort effect to our imported .obj files.
 * @link https://github.com/pmndrs/drei/blob/master/src/MeshDistortMaterial.tsx
 */
export const DistortedObject = ({
    object,
    distort = 1,
    radius = 1,
    speed = 1,
    ...materialParams
}: DistortedObjectProps & MeshPhysicalMaterialParameters) => {
    const material = useMemo(
        () => new DistortPhysicalMaterialImpl(materialParams),
        [materialParams]
    );

    const objectRef = useCustomMaterial(material);

    useEffect(() => {
        material.time = Math.random() * 10000;
        material.radius = radius;
        material.distort = distort;
    }, [distort, radius, material]);

    useFrame(() => {
        if (speed !== 0) material.time += 0.02 * speed;
    });

    return <primitive ref={objectRef} object={object} />;
};
