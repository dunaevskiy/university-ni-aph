/**
 * Returns integer between min (inc.) and max (inc.)
 */
export const randomBetween = (minimum: number, maximum: number) =>
	~~(Math.random() * (maximum - minimum + 1)) + minimum;
