<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { RouletteStatus } from '@/composables/useRoulette'
import type { University } from '@/types/university'

const props = defineProps<{
  status: RouletteStatus
  highlighted: University | null
  candidateCount: number
}>()

const { t } = useI18n()
const { localize } = useLocalizedText()

const displayText = computed(() => {
  if (props.candidateCount === 0) {
    return t('roulette.empty')
  }
  if (props.highlighted === null) {
    return t('roulette.idle')
  }
  return localize(props.highlighted.name)
})
</script>

<template>
  <div
    class="display"
    :class="{
      'display--spinning': status === 'spinning',
      'display--settled': status === 'settled',
      'display--empty': candidateCount === 0,
    }"
  >
    <p class="display__count">{{ t('roulette.candidates', { count: candidateCount }) }}</p>
    <p class="display__name" aria-live="polite" :aria-busy="status === 'spinning'">
      {{ displayText }}
    </p>
  </div>
</template>

<style scoped>
.display {
  display: grid;
  gap: var(--space-2);
  place-items: center;
  min-height: 160px;
  padding: var(--space-5) var(--space-4);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: linear-gradient(160deg, var(--color-bg-elevated), var(--color-bg-subtle));
  box-shadow: var(--shadow-card);
  text-align: center;
  transition: border-color 200ms ease;
}

.display--spinning {
  border-color: var(--color-accent-strong);
}

.display--settled {
  border-color: var(--color-accent);
}

.display--empty .display__name {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.display__count {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.display__name {
  margin: 0;
  font-size: clamp(1.4rem, 5vw, 2.6rem);
  font-weight: 800;
  line-height: 1.3;
  word-break: keep-all;
}

.display--spinning .display__name {
  color: var(--color-accent-strong);
  opacity: 0.85;
}

.display--settled .display__name {
  color: var(--color-accent);
  animation: pop 420ms ease-out;
}

@keyframes pop {
  0% {
    transform: scale(0.82);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .display--settled .display__name {
    animation: none;
  }
}
</style>
