<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import UniversityBadge from './UniversityBadge.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import { getPrefecture } from '@/data/prefectures'
import { formatPercentage } from '@/utils/format'
import type { University } from '@/types/university'

const props = defineProps<{
  university: University
  /** Probability with which this university was drawn, in [0, 1]. */
  probability: number
}>()

const { t } = useI18n()
const { localize } = useLocalizedText()

const prefectureName = computed(() =>
  localize(getPrefecture(props.university.prefectureCode).name),
)

const searchUrl = computed(
  () => `https://www.google.com/search?q=${encodeURIComponent(props.university.name.ja)}`,
)
</script>

<template>
  <section class="result">
    <h2 class="result__heading">{{ t('result.heading') }}</h2>
    <p class="result__name">{{ localize(university.name) }}</p>
    <dl class="result__facts">
      <div class="result__fact">
        <dt>{{ t('result.type') }}</dt>
        <dd><UniversityBadge :type="university.type" /></dd>
      </div>
      <div class="result__fact">
        <dt>{{ t('result.prefecture') }}</dt>
        <dd>{{ prefectureName }}</dd>
      </div>
      <div class="result__fact">
        <dt>{{ t('result.deviationValue') }}</dt>
        <dd>{{ university.deviationValue.toFixed(1) }}</dd>
      </div>
      <div class="result__fact">
        <dt>{{ t('result.probability') }}</dt>
        <dd>{{ formatPercentage(probability) }}</dd>
      </div>
    </dl>
    <a class="result__link" :href="searchUrl" target="_blank" rel="noopener noreferrer">
      {{ t('result.searchOnWeb') }}
    </a>
  </section>
</template>

<style scoped>
.result {
  padding: var(--space-5);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
}

.result__heading {
  margin: 0;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
}

.result__name {
  margin: var(--space-2) 0 var(--space-4);
  font-size: clamp(1.3rem, 4vw, 2rem);
  font-weight: 800;
  color: var(--color-accent);
}

.result__facts {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  margin: 0;
}

.result__fact dt {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.result__fact dd {
  margin: var(--space-1) 0 0;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.result__link {
  display: inline-block;
  margin-top: var(--space-4);
  color: var(--color-national);
  font-size: 0.85rem;
}
</style>
