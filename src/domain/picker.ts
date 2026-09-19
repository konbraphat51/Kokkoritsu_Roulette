import type { University } from '@/types/university'
import { defaultRandomSource, type RandomSource } from './random'
import type { WeightedUniversity } from './weighting'

/**
 * Draws one entry from a pre-computed distribution.
 *
 * Uses inverse-transform sampling over the cumulative weights, so the cost is
 * linear in the pool size and the result honours the exact probabilities.
 * Returns `null` for an empty pool instead of throwing, because an empty pool
 * is a normal UI state (all filters excluded).
 */
export function pickFromDistribution(
  distribution: readonly WeightedUniversity[],
  randomSource: RandomSource = defaultRandomSource,
): University | null {
  if (distribution.length === 0) {
    return null
  }

  const totalWeight = distribution.reduce((sum, entry) => sum + entry.weight, 0)
  let threshold = randomSource() * totalWeight

  for (const entry of distribution) {
    threshold -= entry.weight
    if (threshold < 0) {
      return entry.university
    }
  }

  // Reached only through floating-point drift at the very end of the range.
  return distribution[distribution.length - 1]?.university ?? null
}
