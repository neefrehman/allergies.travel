import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier";

/**
 * @deprecated Simplification is now done in blender for smaller filesizes
 *
 * A fork of Drei's `useSimplification` hook that allowes it to work on groups
 * and .obj model primitives by traversing to find the mesh.
 *
 * @link https://github.com/pmndrs/drei/blob/master/src/useSimplification.tsx
 */
export const useGroupSimplification = (simplePercent: number) => {
    const groupElementRef = useRef<THREE.Group>(null);
    const initialGroupRef = useRef(null);
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
        simplifiedGeometry.computeVertexNormals();

        return simplifiedGeometry;
    };

    useEffect(() => {
        if (!initialGroupRef.current) {
            initialGroupRef.current = groupElementRef.current?.clone();
        }
    }, []);

    useEffect(() => {
        if (initialGroupRef.current && groupElementRef.current) {
            groupElementRef.current.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    // eslint-disable-next-line no-param-reassign
                    child.geometry = getSimplifiedGeometry(child.geometry); // this is recursive so cululatively reduces every rerender. even though the cloned original ref is used 🤔
                }
            });
        }
    }, [modifier, simplePercent]);

    return groupElementRef;
};
