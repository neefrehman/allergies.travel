/**
 * Performs a linear interpolation between two numbers
 *
 * @param {number} start First value
 * @param {number} end Second value
 * @param {number} alpha the amount of interpolation. A value between 0 and 1
 * @returns {number} The interpolated value
 */
export default (start: number, end: number, alpha: number): number => {
    return start * (1 - alpha) + end * alpha;
};
