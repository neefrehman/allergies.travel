/** Recursively merges two objects together */
export const deepMerge = <
    A extends Record<string, any>,
    B extends Record<string, any>
>(
    target: A,
    source: B
): A & B => {
    Object.keys(source).forEach(key => {
        if (source[key] instanceof Object)
            Object.assign(source[key], deepMerge(target[key], source[key]));
    });

    return Object.assign(target, source);
};
