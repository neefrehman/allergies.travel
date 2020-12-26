/**
 * Recursively merges and dedupes two objects or arrays together
 *
 * @params target - the target object (or array) to be written over
 * @params source - the source of incoming data (in our case a new object from the `world-countries` database)
 */
export const deepMerge = <
    A extends Record<string | number, any>,
    B extends Record<string | number, any>
>(
    target: A,
    source: B
): A & B => {
    if (Array.isArray(source) && Array.isArray(target)) {
        /* eslint-disable-next-line no-param-reassign */ /* @ts-expect-error - it can be an array :( */
        source = [
            ...source,
            ...target.filter(
                item => !JSON.stringify(source).includes(JSON.stringify(item)) // not the best comparison - what if one value in an object changes? would add entry instead of overwrite: https://jsbin.com/habowuguye/edit?js,console
            ),
        ];
    } else {
        Object.keys(source).forEach(key => {
            if (source[key] instanceof Object && target[key] instanceof Object) {
                Object.assign(source[key], deepMerge(target[key], source[key]));
            }
        });
    }

    return Object.assign(target || ({} as A), source);
};
