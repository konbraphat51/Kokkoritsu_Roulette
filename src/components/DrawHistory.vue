<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { University } from '@/types/university'

defineProps<{ entries: readonly University[] }>()

const emit = defineEmits<{ clear: [] }>()

const { t } = useI18n()
const { localize } = useLocalizedText()
</script>

<template>
  <section class="history">
    <div class="history__header">
      <h2 class="history__heading">{{ t('history.heading') }}</h2>
      <button v-if="entries.length > 0" type="button" @click="emit('clear')">
        {{ t('history.clear') }}
      </button>
    </div>
    <p v-if="entries.length === 0" class="history__empty">{{ t('history.empty') }}</p>
    <ol v-else class="history__list">
      <li v-for="(entry, index) in entries" :key="`${entry.id}-${index}`">
        {{ localize(entry.name) }}
      </li>
    </ol>
  </section>
</template>

<style scoped>
.history__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
}

.history__heading {
  margin: 0;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
}

.history__header button {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0 var(--space-3);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.history__empty {
  margin: var(--space-2) 0 0;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.history__list {
  margin: var(--space-2) 0 0;
  padding-left: 1.4em;
  font-size: 0.9rem;
}
</style>
