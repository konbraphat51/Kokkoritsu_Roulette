<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { WEIGHT_STRENGTH_RANGE } from '@/domain/weighting'

const model = defineModel<number>({ required: true })

const { t } = useI18n()
</script>

<template>
  <div class="strength">
    <label class="strength__label" for="weight-strength">{{ t('strength.label') }}</label>
    <input
      id="weight-strength"
      v-model.number="model"
      type="range"
      :min="WEIGHT_STRENGTH_RANGE.min"
      :max="WEIGHT_STRENGTH_RANGE.max"
      :step="WEIGHT_STRENGTH_RANGE.step"
    />
    <output class="strength__value" for="weight-strength">
      {{ t('strength.current', { value: model.toFixed(1) }) }}
    </output>
    <p class="strength__hint">{{ t('strength.hint') }}</p>
  </div>
</template>

<style scoped>
.strength {
  display: grid;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.strength__label {
  font-weight: 700;
}

.strength input[type='range'] {
  width: 100%;
  accent-color: var(--color-accent);
}

.strength__value {
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
  font-weight: 700;
}

.strength__hint {
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
</style>
