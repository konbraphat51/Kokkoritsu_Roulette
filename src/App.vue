<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import DrawHistory from './components/DrawHistory.vue'
import FilterPanel from './components/FilterPanel.vue'
import ModeSelector from './components/ModeSelector.vue'
import ProbabilityTable from './components/ProbabilityTable.vue'
import ResultCard from './components/ResultCard.vue'
import RouletteDisplay from './components/RouletteDisplay.vue'
import SpinButton from './components/SpinButton.vue'
import WeightStrengthSlider from './components/WeightStrengthSlider.vue'
import { useRoulette } from '@/composables/useRoulette'
import { useUniversityFilter } from '@/composables/useUniversityFilter'
import { UNIVERSITIES } from '@/data/universities'
import { buildDistribution, DEFAULT_WEIGHT_STRENGTH, type SelectionMode } from '@/domain/weighting'
import type { University } from '@/types/university'

const MAX_HISTORY_ENTRIES = 10

const mode = ref<SelectionMode>('uniform')
const strength = ref(DEFAULT_WEIGHT_STRENGTH)
const history = ref<University[]>([])

const filter = useUniversityFilter(UNIVERSITIES)

const distribution = computed(() =>
  buildDistribution(filter.candidates.value, mode.value, strength.value),
)

const { status, highlighted, result, spin, reset } = useRoulette(distribution)

const resultProbability = computed(() => {
  if (result.value === null) {
    return 0
  }
  const entry = distribution.value.find((item) => item.university.id === result.value?.id)
  return entry?.probability ?? 0
})

// A settled draw is recorded once; newest first, capped to keep the list short.
watch(result, (drawn) => {
  if (drawn !== null) {
    history.value = [drawn, ...history.value].slice(0, MAX_HISTORY_ENTRIES)
  }
})

// Changing the pool invalidates the displayed result, so clear it.
watch(
  () => filter.candidates.value,
  () => {
    if (status.value !== 'spinning') {
      reset()
    }
  },
)
</script>

<template>
  <div class="app">
    <AppHeader />

    <main class="app__main">
      <section class="app__stage">
        <RouletteDisplay
          :status="status"
          :highlighted="highlighted"
          :candidate-count="filter.candidates.value.length"
        />
        <SpinButton
          :status="status"
          :disabled="filter.candidates.value.length === 0"
          @spin="spin"
        />
        <ResultCard
          v-if="result !== null && status === 'settled'"
          :university="result"
          :probability="resultProbability"
        />
      </section>

      <section class="app__controls">
        <ModeSelector v-model="mode" />
        <WeightStrengthSlider v-if="mode === 'weighted'" v-model="strength" />
        <FilterPanel
          v-model:types="filter.types.value"
          v-model:regions="filter.regions.value"
          v-model:min-deviation="filter.minDeviation.value"
          v-model:max-deviation="filter.maxDeviation.value"
          :lower-bound="filter.bounds.min"
          :upper-bound="filter.bounds.max"
          @reset="filter.reset"
        />
        <ProbabilityTable :distribution="distribution" />
        <DrawHistory :entries="history" @clear="history = []" />
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  display: grid;
  gap: var(--space-5);
  max-width: 1080px;
  margin: 0 auto;
  padding: var(--space-5) var(--space-4) var(--space-6);
}

.app__main {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr;
}

.app__stage,
.app__controls {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

@media (min-width: 900px) {
  .app__main {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
