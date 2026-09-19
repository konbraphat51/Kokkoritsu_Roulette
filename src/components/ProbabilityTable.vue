<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UniversityBadge from './UniversityBadge.vue'
import { useLocalizedText } from '@/composables/useLocalizedText'
import type { WeightedUniversity } from '@/domain/weighting'
import { formatPercentage } from '@/utils/format'

const props = defineProps<{ distribution: readonly WeightedUniversity[] }>()

const { t } = useI18n()
const { localize } = useLocalizedText()

const isOpen = ref(false)

/** Highest probability first, so the effect of the weighting is obvious. */
const rows = computed(() =>
  [...props.distribution].sort((left, right) => right.probability - left.probability),
)
</script>

<template>
  <section class="probability-table">
    <button type="button" class="probability-table__toggle" @click="isOpen = !isOpen">
      {{ isOpen ? t('probabilityTable.hide') : t('probabilityTable.show') }}
    </button>

    <div v-if="isOpen" class="probability-table__scroll">
      <table>
        <caption class="probability-table__caption">
          {{
            t('probabilityTable.heading')
          }}
        </caption>
        <thead>
          <tr>
            <th scope="col">{{ t('probabilityTable.rank') }}</th>
            <th scope="col">{{ t('probabilityTable.university') }}</th>
            <th scope="col">{{ t('probabilityTable.deviationValue') }}</th>
            <th scope="col">{{ t('probabilityTable.probability') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row.university.id">
            <td>{{ index + 1 }}</td>
            <td class="probability-table__name">
              <UniversityBadge :type="row.university.type" />
              <span>{{ localize(row.university.name) }}</span>
            </td>
            <td>{{ row.university.deviationValue.toFixed(1) }}</td>
            <td>{{ formatPercentage(row.probability) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.probability-table__toggle {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg-subtle);
  font-size: 0.9rem;
}

.probability-table__scroll {
  max-height: 420px;
  overflow: auto;
  margin-top: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.probability-table__caption {
  padding: var(--space-3);
  font-weight: 700;
  text-align: left;
}

th,
td {
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--color-border);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

th:nth-child(2),
td:nth-child(2) {
  text-align: left;
}

thead th {
  position: sticky;
  top: 0;
  background: var(--color-bg-elevated);
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.probability-table__name {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
