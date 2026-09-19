<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouletteStatus } from '@/composables/useRoulette'

const props = defineProps<{
  status: RouletteStatus
  disabled: boolean
}>()

const emit = defineEmits<{ spin: [] }>()

const { t } = useI18n()

const label = computed(() => {
  if (props.status === 'spinning') {
    return t('roulette.spinning')
  }
  return props.status === 'settled' ? t('roulette.again') : t('roulette.spin')
})
</script>

<template>
  <button
    type="button"
    class="spin-button"
    :disabled="disabled || status === 'spinning'"
    @click="emit('spin')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.spin-button {
  width: 100%;
  padding: var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-strong));
  color: #1a1000;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  box-shadow: var(--shadow-card);
  transition: transform 120ms ease;
}

.spin-button:not(:disabled):hover {
  transform: translateY(-2px);
}

.spin-button:not(:disabled):active {
  transform: translateY(1px);
}
</style>
