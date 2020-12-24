/** Swaps an objects keys with its values */
export const invertObject = (obj: Record<string, string>) =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
