import * as THREE from "three";
import { useEffect, useRef } from "react";

/**
 * A hook that will traverse a group (in our case a rendered .obj) and replace it's material
 */
export const useCustomMaterial = (material: THREE.Material) => {
  const groupElementRef = useRef<THREE.Group>(null);
  const originalMaterial = useRef<THREE.Material | null>(null);

  useEffect(() => {
    if (!originalMaterial.current) {
      groupElementRef.current?.traverse(child => {
        if (child instanceof THREE.Mesh) {
          originalMaterial.current = (child.material as THREE.Material).clone();
        }
      });
    }
  }, []);

  // TODO: fix flash of old material on slow loads
  useEffect(() => {
    if (originalMaterial.current && groupElementRef.current) {
      groupElementRef.current?.traverse(child => {
        if (child instanceof THREE.Mesh) {
          // eslint-disable-next-line no-param-reassign
          child.material = material;
        }
      });
    }
  }, [material]);

  return groupElementRef;
};
