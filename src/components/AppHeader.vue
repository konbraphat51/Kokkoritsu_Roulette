<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LocaleSwitcher from './LocaleSwitcher.vue'

const { t } = useI18n()
</script>

<template>
  <header class="app-header">
    <div class="app-header__titles">
      <h1 class="app-header__title">🎡 {{ t('app.title') }}</h1>
      <p class="app-header__subtitle">{{ t('app.subtitle') }}</p>
    </div>
    <LocaleSwitcher />
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.app-header__title {
  margin: 0;
  font-size: clamp(1.4rem, 4vw, 2.1rem);
}

.app-header__subtitle {
  margin: var(--space-1) 0 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
