import type { University } from '@/types/university'

/** Selection modes offered by the roulette. */
export type SelectionMode = 'uniform' | 'weighted'

/** Default bias strength applied in weighted mode. */
export const DEFAULT_WEIGHT_STRENGTH = 4

/** Inclusive range accepted for the bias strength slider. */
export const WEIGHT_STRENGTH_RANGE = { min: 0, max: 10, step: 0.5 } as const

/** A university paired with its selection weight and resulting probability. */
export interface WeightedUniversity {
  readonly university: University
  readonly weight: number
  readonly probability: number
}

/**
 * Computes the raw selection weight of a deviation value.
 *
 * The deviation value is first normalised to [0, 1] across the candidate pool,
 * then fed into `exp(strength * normalised)`. This keeps the weight strictly
 * increasing in the deviation value, and collapses to a uniform distribution
 * when `strength` is 0, so both modes share a single code path.
 */
function computeWeight(
  deviationValue: number,
  minDeviation: number,
  maxDeviation: number,
  strength: number,
): number {
  if (maxDeviation <= minDeviation) {
    return 1
  }
  const normalized = (deviationValue - minDeviation) / (maxDeviation - minDeviation)
  return Math.exp(strength * normalized)
}

/**
 * Builds the selection distribution for a candidate pool.
 *
 * In `uniform` mode every candidate receives the same weight; in `weighted`
 * mode higher deviation values receive exponentially larger weights.
 */
export function buildDistribution(
  candidates: readonly University[],
  mode: SelectionMode,
  strength: number = DEFAULT_WEIGHT_STRENGTH,
): readonly WeightedUniversity[] {
  if (candidates.length === 0) {
    return []
  }

  const effectiveStrength = mode === 'weighted' ? Math.max(0, strength) : 0
  const deviations = candidates.map((candidate) => candidate.deviationValue)
  const minDeviation = Math.min(...deviations)
  const maxDeviation = Math.max(...deviations)

  const weights = candidates.map((candidate) =>
    computeWeight(candidate.deviationValue, minDeviation, maxDeviation, effectiveStrength),
  )
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

  return candidates.map((university, index) => {
    const weight = weights[index] ?? 1
    return { university, weight, probability: weight / totalWeight }
  })
}
