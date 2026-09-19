<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CheckboxGroup from './CheckboxGroup.vue'
import DeviationRangeFilter from './DeviationRangeFilter.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { REGION_NAMES, type RegionId } from '@/data/prefectures'
import type { CheckboxOption } from '@/types/checkbox'
import type { UniversityType } from '@/types/university'

defineProps<{
  lowerBound: number
  upperBound: number
}>()

const emit = defineEmits<{ reset: [] }>()

const types = defineModel<UniversityType[]>('types', { required: true })
const regions = defineModel<RegionId[]>('regions', { required: true })
const minDeviation = defineModel<number>('minDeviation', { required: true })
const maxDeviation = defineModel<number>('maxDeviation', { required: true })

const { t } = useI18n()
const { localize } = useLocalizedText()

const typeOptions = computed<readonly CheckboxOption<UniversityType>[]>(() => [
  { value: 'national', label: t('filters.national') },
  { value: 'public', label: t('filters.public') },
])

const regionOptions = computed<readonly CheckboxOption<RegionId>[]>(() =>
  (Object.keys(REGION_NAMES) as RegionId[]).map((region) => ({
    value: region,
    label: localize(REGION_NAMES[region]),
  })),
)
</script>

<template>
  <fieldset class="filter-panel">
    <legend>{{ t('filters.legend') }}</legend>
    <CheckboxGroup v-model="types" :title="t('filters.type')" :options="typeOptions" />
    <CheckboxGroup v-model="regions" :title="t('filters.region')" :options="regionOptions" />
    <DeviationRangeFilter
      v-model:min="minDeviation"
      v-model:max="maxDeviation"
      :lower-bound="lowerBound"
      :upper-bound="upperBound"
    />
    <button type="button" class="filter-panel__reset" @click="emit('reset')">
      {{ t('filters.reset') }}
    </button>
  </fieldset>
</template>

<style scoped>
.filter-panel {
  display: grid;
  gap: var(--space-4);
}

.filter-panel__reset {
  justify-self: start;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: var(--space-1) var(--space-4);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
</style>
