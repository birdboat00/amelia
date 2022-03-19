export type Nullable<T> = T | null;

/**
 * Clamps the given number between the given
 * minimum and maximum values.
 * @param {number} num the number to clamp
 * @param {number} min the minimum
 * @param {number} max the maximum
 * @returns {number} the result between the minimum and maximum values
 */
 export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}

/**
 * Contrains the given number between the given
 * minimum and maximum values.
 * Same as {@link clamp}
 * @param {number} num the number to be contrained
 * @param {number} low the minimum
 * @param {number} high the maximum
 * @returns {number}
 */
export function constrain(num: number, low: number, high: number): number {
    return clamp(num, low, high);
}

/**
 * Generate a random number between the minimum and maximum
 * @param {number} min minimum
 * @param {number} max maximum
 * @returns {number}
 */
export function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

/**
 * Generate random number between the minimum and maximum
 * and round it to an integer value.
 * @param {number} min minimum
 * @param {number} max maximum
 * @returns {number}
 */
export function randomRangeInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Maps a number from one range to another.
 * @param {number} n the number to be converted
 * @param {number} start1 lower bound of the values current range
 * @param {number} stop1 upper bound of the values current range
 * @param {number} start2 lower bound of the values new range
 * @param {number} stop2 upper bound of the values new range
 * @param {boolean} bounds contrain the value to the newly mapped range
 * @returns {number}
 */
export function map(n: number, start1: number, stop1: number, start2: number, stop2: number, bounds: boolean): number {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!bounds) {
        return newval;
    }

    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    } else {
        return constrain(newval, stop2, start2);
    }
}

/**
 * Returns a value that will increment and decrement
 * between the range of 0 and the {@link length}.
 *
 * This requires the value {@link t} to be a
 * self-incrementing value (for examples the
 * app iterations)
 * @param {number} t value
 * @param {number} length maximum
 * @returns {number}
 */
export function pingpong(t: number, length: number): number {
    const min = 0;
    const max = length;
    const range = max - min;
    const mult = t / range;
    const asc = mult % 2 == 0;
    const mod = t % range;

    return asc ? mod + max : max - mod;
}

/**
 * Calculates the distance between two points in
 * two dimensions.
 * @param {number} a x coordiante of the first point
 * @param {number} b y coordinate of the first point
 * @param {number} c x coordinate of the second point
 * @param {number} d y coordinate of the second point
 * @returns {number} The distance between the two points.
 */
export const dist = (a: number, b: number, c: number, d: number): number => {
    return Math.hypot(a - c, b - d);
};