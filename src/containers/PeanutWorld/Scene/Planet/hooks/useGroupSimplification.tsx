import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
    const initialGroupRef = useRef<THREE.Group | null>(null);
    const modifier = useMemo(() => new SimplifyModifier(), []);

    const getSimplifiedGeometry = useCallback(
        (originalGeom: THREE.BufferGeometry) => {
            const newGeom = originalGeom.clone();

            const originalVertexCount = newGeom.attributes.position.count;
            const newVertexCount = Math.floor(
                originalVertexCount * simplePercent
            );

            const simplifiedGeom = modifier.modify(originalGeom, newVertexCount);
            simplifiedGeom.computeVertexNormals();

            return simplifiedGeom;
        },
        [modifier, simplePercent]
    );

    useEffect(() => {
        if (!initialGroupRef.current && groupElementRef.current) {
            initialGroupRef.current = groupElementRef.current?.clone() as THREE.Group;
        }
    }, []);

    useEffect(() => {
        if (initialGroupRef.current && groupElementRef.current) {
            groupElementRef.current.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    // eslint-disable-next-line no-param-reassign
                    child.geometry = getSimplifiedGeometry(child.geometry); // this is recursive so cumulatively reduces every rerender. even though the cloned original ref is used 🤔
                }
            });
        }
    }, [getSimplifiedGeometry, modifier, simplePercent]);

    return groupElementRef;
};
