import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier";

/**
 * A fork of Drei's `useSimplification` hook that allowes it to work on groups
 * and .obj model primitives by traversing to find the mesh.
 *
 * @link https://github.com/pmndrs/drei/blob/master/src/useSimplification.tsx
 */
export const useGroupSimplification = (simplePercent: number) => {
    const groupRef = useRef<THREE.Group>();
    const modifier = useMemo(() => new SimplifyModifier(), []);

    const getSimplifiedGeometry = (
        originalGeometry: THREE.BufferGeometry | THREE.Geometry
    ) => {
        const newGeometry =
            originalGeometry instanceof THREE.BufferGeometry
                ? originalGeometry.clone()
                : new THREE.BufferGeometry().fromGeometry(originalGeometry);

        const originalVerticesCount = newGeometry.attributes.position.count;
        const newVerticesCount = Math.floor(
            originalVerticesCount * simplePercent
        );

        const simplifiedGeometry = modifier.modify(
            originalGeometry,
            newVerticesCount
        );
        simplifiedGeometry.computeVertexNormals(); // TODO: remove if colours will be handled by shaders

        return simplifiedGeometry;
    };

    useEffect(() => {
        groupRef.current.traverse(child => {
            if (child instanceof THREE.Mesh) {
                // eslint-disable-next-line no-param-reassign
                child.geometry = getSimplifiedGeometry(child.geometry);
            }
        });
    }, [modifier, simplePercent]);

    return groupRef;
};
