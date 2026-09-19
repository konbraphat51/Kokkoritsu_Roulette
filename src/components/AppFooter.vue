<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const REPOSITORY_URL = 'https://github.com/konbraphat/Kokkoritsu_Roulette'
</script>

<template>
  <footer class="app-footer">
    <p class="app-footer__disclaimer">{{ t('footer.disclaimer') }}</p>
    <a :href="REPOSITORY_URL" target="_blank" rel="noopener noreferrer">{{ t('footer.source') }}</a>
  </footer>
</template>

<style scoped>
.app-footer {
  display: grid;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

.app-footer__disclaimer {
  margin: 0;
}

.app-footer a {
  color: var(--color-national);
}
</style>
