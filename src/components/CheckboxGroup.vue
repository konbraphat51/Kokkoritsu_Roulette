<script setup lang="ts" generic="TValue extends string">
import { useI18n } from 'vue-i18n'
import type { CheckboxOption } from '@/types/checkbox'

const props = defineProps<{
  title: string
  options: readonly CheckboxOption<TValue>[]
}>()

const model = defineModel<TValue[]>({ required: true })

const { t } = useI18n()

function selectAll(): void {
  model.value = props.options.map((option) => option.value)
}

function clearAll(): void {
  model.value = []
}
</script>

<template>
  <div class="checkbox-group">
    <div class="checkbox-group__header">
      <span class="checkbox-group__title">{{ title }}</span>
      <span class="checkbox-group__actions">
        <button type="button" @click="selectAll">{{ t('filters.selectAll') }}</button>
        <button type="button" @click="clearAll">{{ t('filters.clearAll') }}</button>
      </span>
    </div>
    <ul class="checkbox-group__list">
      <li v-for="option in options" :key="option.value">
        <label class="checkbox-group__item">
          <input v-model="model" type="checkbox" :value="option.value" />
          <span>{{ option.label }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.checkbox-group {
  display: grid;
  gap: var(--space-2);
}

.checkbox-group__header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.checkbox-group__title {
  font-weight: 700;
}

.checkbox-group__actions {
  display: flex;
  gap: var(--space-2);
}

.checkbox-group__actions button {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0 var(--space-3);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.checkbox-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
}

.checkbox-group__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-bg-subtle);
  cursor: pointer;
  font-size: 0.85rem;
}

.checkbox-group__item input {
  accent-color: var(--color-accent);
}
</style>
