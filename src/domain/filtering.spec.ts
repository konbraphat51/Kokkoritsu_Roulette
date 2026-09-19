import { describe, expect, it } from 'vitest'
import type { University } from '@/types/university'
import { deviationBounds, filterUniversities, type UniversityFilter } from './filtering'

const HOKKAIDO_NATIONAL: University = {
  id: 'a',
  name: { ja: 'A', en: 'A' },
  type: 'national',
  prefectureCode: 1,
  deviationValue: 62.5,
}

const TOKYO_PUBLIC: University = {
  id: 'b',
  name: { ja: 'B', en: 'B' },
  type: 'public',
  prefectureCode: 13,
  deviationValue: 45,
}

const POOL = [HOKKAIDO_NATIONAL, TOKYO_PUBLIC]

const WIDE_FILTER: UniversityFilter = {
  types: ['national', 'public'],
  regions: ['hokkaido-tohoku', 'kanto', 'chubu', 'kinki', 'chugoku-shikoku', 'kyushu-okinawa'],
  minDeviation: 0,
  maxDeviation: 100,
}

describe('filterUniversities', () => {
  it('keeps every university when no dimension excludes any', () => {
    expect(filterUniversities(POOL, WIDE_FILTER)).toHaveLength(2)
  })

  it('filters by establishment type', () => {
    const result = filterUniversities(POOL, { ...WIDE_FILTER, types: ['public'] })

    expect(result.map((university) => university.id)).toEqual(['b'])
  })

  it('filters by region', () => {
    const result = filterUniversities(POOL, { ...WIDE_FILTER, regions: ['hokkaido-tohoku'] })

    expect(result.map((university) => university.id)).toEqual(['a'])
  })

  it('filters by deviation range inclusively', () => {
    const result = filterUniversities(POOL, {
      ...WIDE_FILTER,
      minDeviation: 45,
      maxDeviation: 45,
    })

    expect(result.map((university) => university.id)).toEqual(['b'])
  })

  it('returns an empty pool when the dimensions do not overlap', () => {
    const result = filterUniversities(POOL, { ...WIDE_FILTER, types: [], regions: [] })

    expect(result).toEqual([])
  })
})

describe('deviationBounds', () => {
  it('returns the minimum and maximum deviation values', () => {
    expect(deviationBounds(POOL)).toEqual({ min: 45, max: 62.5 })
  })

  it('returns a zero range for an empty pool', () => {
    expect(deviationBounds([])).toEqual({ min: 0, max: 0 })
  })
})
