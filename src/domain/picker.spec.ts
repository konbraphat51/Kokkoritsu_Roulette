import { describe, expect, it } from 'vitest'
import type { University } from '@/types/university'
import { pickFromDistribution } from './picker'
import { buildDistribution } from './weighting'

function makeUniversity(id: string, deviationValue: number): University {
  return {
    id,
    name: { ja: id, en: id },
    type: 'national',
    prefectureCode: 13,
    deviationValue,
  }
}

const POOL: readonly University[] = [
  makeUniversity('low', 45),
  makeUniversity('mid', 55),
  makeUniversity('high', 70),
]

describe('pickFromDistribution', () => {
  it('returns null for an empty distribution', () => {
    expect(pickFromDistribution([], () => 0.5)).toBeNull()
  })

  it('maps the start of the random range to the first entry', () => {
    const distribution = buildDistribution(POOL, 'uniform')

    expect(pickFromDistribution(distribution, () => 0)?.id).toBe('low')
  })

  it('maps the end of the random range to the last entry', () => {
    const distribution = buildDistribution(POOL, 'uniform')

    expect(pickFromDistribution(distribution, () => 0.999999)?.id).toBe('high')
  })

  it('selects each uniform bucket in order', () => {
    const distribution = buildDistribution(POOL, 'uniform')

    expect(pickFromDistribution(distribution, () => 0.5)?.id).toBe('mid')
  })

  it('reproduces the configured weights over many draws', () => {
    const distribution = buildDistribution(POOL, 'weighted', 4)
    const sampleCount = 60_000
    // Deterministic low-discrepancy sweep across [0, 1) instead of a real RNG.
    const counts = new Map<string, number>()
    for (let index = 0; index < sampleCount; index += 1) {
      const value = (index + 0.5) / sampleCount
      const picked = pickFromDistribution(distribution, () => value)
      counts.set(picked!.id, (counts.get(picked!.id) ?? 0) + 1)
    }

    for (const entry of distribution) {
      const observed = (counts.get(entry.university.id) ?? 0) / sampleCount
      expect(observed).toBeCloseTo(entry.probability, 3)
    }
  })
})
