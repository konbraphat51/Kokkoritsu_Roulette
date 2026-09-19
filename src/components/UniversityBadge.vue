<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { UniversityType } from '@/types/university'

defineProps<{ type: UniversityType }>()

const { t } = useI18n()
</script>

<template>
  <span class="badge" :class="`badge--${type}`">{{ t(`filters.${type}`) }}</span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0 var(--space-3);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f1424;
}

.badge--national {
  background: var(--color-national);
}

.badge--public {
  background: var(--color-public);
}
</style>
