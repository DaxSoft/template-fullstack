/**
 * Convert X min to secs
 * @param sec
 */

export function min(sec: number): number {
    return sec * 60;
}

/**
 * @description Convert X hour to seconds
 * @param value
 */

export function hour(value: number): number {
    return value * 60 * 60;
}

/**
 * Convert the X sec to Y mili
 * @param value
 */

export function secToMs(value: number): number {
    return value * 1000;
}

/**
 * Convert the X min to Y mili
 * @param value
 */

export function minToMs(value: number): number {
    return value * 60000;
}

/**
 * Convert the X hours to Y mili
 * @param value
 */

export function hourToMs(value: number): number {
    return value * 3.6e6;
}

/**
 * Convert the X days to Y mili
 * @param value
 */

export function dayToMs(value: number): number {
    return value * 8.64e7;
}

/**
 * Convert the X weeks to Y mili
 * @param value
 */

export function weekToMs(value: number): number {
    return value * 6.048e8;
}

/**
 * Convert the X months to Y mili
 * @param value
 */

export function monthToMs(value: number): number {
    return value * 2.628e9;
}
