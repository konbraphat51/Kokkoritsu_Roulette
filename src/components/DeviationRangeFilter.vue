<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  /** Lowest deviation value present in the full dataset. */
  lowerBound: number
  /** Highest deviation value present in the full dataset. */
  upperBound: number
}>()

const min = defineModel<number>('min', { required: true })
const max = defineModel<number>('max', { required: true })

const { t } = useI18n()

const STEP = 0.5

// Keep the two handles from crossing: each one clamps against the other.
const minValue = computed({
  get: () => min.value,
  set: (value: number) => {
    min.value = Math.min(value, max.value)
  },
})

const maxValue = computed({
  get: () => max.value,
  set: (value: number) => {
    max.value = Math.max(value, min.value)
  },
})
</script>

<template>
  <div class="deviation-range">
    <span class="deviation-range__title">{{ t('filters.deviationRange') }}</span>
    <div class="deviation-range__controls">
      <label class="deviation-range__field">
        <span>{{ t('filters.from') }}</span>
        <input
          v-model.number="minValue"
          type="number"
          :min="props.lowerBound"
          :max="props.upperBound"
          :step="STEP"
        />
      </label>
      <span class="deviation-range__separator" aria-hidden="true">–</span>
      <label class="deviation-range__field">
        <span>{{ t('filters.to') }}</span>
        <input
          v-model.number="maxValue"
          type="number"
          :min="props.lowerBound"
          :max="props.upperBound"
          :step="STEP"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.deviation-range {
  display: grid;
  gap: var(--space-2);
}

.deviation-range__title {
  font-weight: 700;
}

.deviation-range__controls {
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
}

.deviation-range__field {
  display: grid;
  gap: var(--space-1);
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.deviation-range__field input {
  width: 6.5rem;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}

.deviation-range__separator {
  padding-bottom: var(--space-2);
}
</style>
