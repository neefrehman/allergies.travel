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

        const originalVertexCount = newGeometry.attributes.position.count;
        const newVertexCount = Math.floor(originalVertexCount * simplePercent);

        const simplifiedGeometry = modifier.modify(
            originalGeometry,
            newVertexCount
        );
        simplifiedGeometry.computeVertexNormals(); // TODO: remove if colours will be handled by shaders

        return simplifiedGeometry;
    };

    useEffect(() => {
        groupRef.current.traverse(child => {
            if (child instanceof THREE.Mesh) {
                // eslint-disable-next-line no-param-reassign
                child.geometry = getSimplifiedGeometry(child.geometry); // FIXME: this is recursive so reduces every rerender. cloning the initial group and using it's geometry doesnt work 🤔
            }
        });
    }, [modifier, simplePercent]);

    return groupRef;
};
