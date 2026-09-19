import { describe, expect, it } from 'vitest'
import type { University } from '@/types/university'
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

describe('buildDistribution', () => {
  it('returns an empty distribution for an empty pool', () => {
    expect(buildDistribution([], 'weighted')).toEqual([])
  })

  it('assigns equal probabilities in uniform mode', () => {
    const distribution = buildDistribution(POOL, 'uniform')

    for (const entry of distribution) {
      expect(entry.probability).toBeCloseTo(1 / POOL.length)
    }
  })

  it('ignores the strength argument in uniform mode', () => {
    const distribution = buildDistribution(POOL, 'uniform', 10)

    for (const entry of distribution) {
      expect(entry.probability).toBeCloseTo(1 / POOL.length)
    }
  })

  it('gives higher deviation values a higher probability in weighted mode', () => {
    const [low, mid, high] = buildDistribution(POOL, 'weighted', 4)

    expect(low!.probability).toBeLessThan(mid!.probability)
    expect(mid!.probability).toBeLessThan(high!.probability)
  })

  it('collapses to a uniform distribution when strength is zero', () => {
    const distribution = buildDistribution(POOL, 'weighted', 0)

    for (const entry of distribution) {
      expect(entry.probability).toBeCloseTo(1 / POOL.length)
    }
  })

  it('always produces probabilities that sum to one', () => {
    const total = buildDistribution(POOL, 'weighted', 7).reduce(
      (sum, entry) => sum + entry.probability,
      0,
    )

    expect(total).toBeCloseTo(1)
  })

  it('falls back to equal weights when every deviation value is identical', () => {
    const flatPool = [makeUniversity('a', 50), makeUniversity('b', 50)]

    const distribution = buildDistribution(flatPool, 'weighted', 8)

    expect(distribution[0]!.probability).toBeCloseTo(0.5)
    expect(distribution[1]!.probability).toBeCloseTo(0.5)
  })
})
