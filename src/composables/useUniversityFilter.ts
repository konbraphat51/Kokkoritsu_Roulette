import { computed, ref } from 'vue'
import { REGION_NAMES, type RegionId } from '@/data/prefectures'
import { deviationBounds, filterUniversities } from '@/domain/filtering'
import type { University, UniversityType } from '@/types/university'

const ALL_TYPES: readonly UniversityType[] = ['national', 'public']
const ALL_REGIONS = Object.keys(REGION_NAMES) as RegionId[]

/** Reactive filter state plus the resulting candidate pool. */
export function useUniversityFilter(universities: readonly University[]) {
  const bounds = deviationBounds(universities)

  const types = ref<UniversityType[]>([...ALL_TYPES])
  const regions = ref<RegionId[]>([...ALL_REGIONS])
  const minDeviation = ref(bounds.min)
  const maxDeviation = ref(bounds.max)

  const candidates = computed(() =>
    filterUniversities(universities, {
      types: types.value,
      regions: regions.value,
      minDeviation: minDeviation.value,
      maxDeviation: maxDeviation.value,
    }),
  )

  const reset = (): void => {
    types.value = [...ALL_TYPES]
    regions.value = [...ALL_REGIONS]
    minDeviation.value = bounds.min
    maxDeviation.value = bounds.max
  }

  return { bounds, types, regions, minDeviation, maxDeviation, candidates, reset }
}
