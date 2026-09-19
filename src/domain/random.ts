/**
 * Source of uniform random numbers in [0, 1).
 * Injected so that selection logic stays deterministic under test.
 */
export type RandomSource = () => number

/** Default source backed by the platform RNG. */
export const defaultRandomSource: RandomSource = () => Math.random()
