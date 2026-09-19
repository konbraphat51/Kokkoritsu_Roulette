<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { persistLocale, SUPPORTED_LOCALES, type AppLocale } from '@/i18n'

const { t, locale } = useI18n()

function select(next: AppLocale): void {
  locale.value = next
  persistLocale(next)
  document.documentElement.lang = next
}
</script>

<template>
  <div class="locale-switcher" role="group" :aria-label="t('locale.label')">
    <button
      v-for="option in SUPPORTED_LOCALES"
      :key="option"
      type="button"
      class="locale-switcher__button"
      :class="{ 'locale-switcher__button--active': locale === option }"
      :aria-pressed="locale === option"
      @click="select(option)"
    >
      {{ t(`locale.${option}`) }}
    </button>
  </div>
</template>

<style scoped>
.locale-switcher {
  display: inline-flex;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}

.locale-switcher__button {
  background: transparent;
  border: none;
  padding: var(--space-1) var(--space-4);
  font-size: 0.85rem;
}

.locale-switcher__button--active {
  background: var(--color-accent);
  color: #1a1000;
  font-weight: 700;
}
</style>
