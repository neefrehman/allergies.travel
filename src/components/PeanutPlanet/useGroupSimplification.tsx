import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier";

/**
 * A fork of Drei's `useSimplification` hook that allowes it to work on groups
 * and .obj model primitives by traversing to find the mesh.
 *
 * @link https://github.com/pmndrs/drei/blob/master/src/useSimplification.tsx
 */
export function useObjSimplification(simplePercent: number) {
    const simplificationRef = useRef<THREE.Group>();
    const originalGeometry = useRef<THREE.BufferGeometry | THREE.Geometry>();

    const modifier = useMemo(() => new SimplifyModifier(), []);

    useEffect(() => {
        simplificationRef.current.traverse(child => {
            if (child instanceof THREE.Mesh) {
                originalGeometry.current = child.geometry.clone();
            }
        });

        let geometry = new THREE.BufferGeometry();

        if (originalGeometry.current instanceof THREE.BufferGeometry) {
            geometry = originalGeometry.current.clone();
        } else {
            geometry = geometry.fromGeometry(originalGeometry.current);
        }

        const originalVerticesCount = geometry.attributes.position.count;
        const newVerticesCount = Math.floor(
            originalVerticesCount * simplePercent
        );

        simplificationRef.current.traverse(child => {
            if (child instanceof THREE.Mesh) {
                // eslint-disable-next-line no-param-reassign
                child.geometry = modifier.modify(geometry, newVerticesCount);
            }
        });
    }, [modifier, simplePercent]);

    return simplificationRef;
}
