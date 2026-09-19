<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { SelectionMode } from '@/domain/weighting'

const model = defineModel<SelectionMode>({ required: true })

const { t } = useI18n()

const MODES: readonly SelectionMode[] = ['uniform', 'weighted']
</script>

<template>
  <fieldset class="mode-selector">
    <legend>{{ t('mode.legend') }}</legend>
    <div class="mode-selector__options">
      <label
        v-for="mode in MODES"
        :key="mode"
        class="mode-selector__option"
        :class="{ 'mode-selector__option--active': model === mode }"
      >
        <input v-model="model" type="radio" name="selection-mode" :value="mode" />
        <span class="mode-selector__label">{{ t(`mode.${mode}`) }}</span>
        <span class="mode-selector__description">{{ t(`mode.${mode}Description`) }}</span>
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.mode-selector__options {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.mode-selector__option {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-3);
  align-items: center;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);
  cursor: pointer;
}

.mode-selector__option--active {
  border-color: var(--color-accent);
  box-shadow: inset 0 0 0 1px var(--color-accent);
}

.mode-selector__label {
  font-weight: 700;
}

.mode-selector__description {
  grid-column: 2;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.4;
}
</style>
