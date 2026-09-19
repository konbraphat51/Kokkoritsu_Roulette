import { getPrefecture, type RegionId } from '@/data/prefectures'
import type { University, UniversityType } from '@/types/university'

/** User-controlled narrowing applied before the draw. */
export interface UniversityFilter {
  readonly types: readonly UniversityType[]
  readonly regions: readonly RegionId[]
  readonly minDeviation: number
  readonly maxDeviation: number
}

/** Smallest and largest deviation values present in a pool. */
export function deviationBounds(universities: readonly University[]): {
  min: number
  max: number
} {
  if (universities.length === 0) {
    return { min: 0, max: 0 }
  }
  const values = universities.map((university) => university.deviationValue)
  return { min: Math.min(...values), max: Math.max(...values) }
}

/** Returns the universities matching every active filter dimension. */
export function filterUniversities(
  universities: readonly University[],
  filter: UniversityFilter,
): readonly University[] {
  return universities.filter((university) => {
    if (!filter.types.includes(university.type)) {
      return false
    }
    if (!filter.regions.includes(getPrefecture(university.prefectureCode).region)) {
      return false
    }
    return (
      university.deviationValue >= filter.minDeviation &&
      university.deviationValue <= filter.maxDeviation
    )
  })
}
