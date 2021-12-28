/** Swaps an objects keys with its values */
export const invertObject = <T extends Record<PropertyKey, PropertyKey>>(
  obj: T
): { [K in keyof T as T[K]]: K } =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])) as {
    [K in keyof T as T[K]]: K;
  };
