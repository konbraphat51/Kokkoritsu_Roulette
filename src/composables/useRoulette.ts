import { onUnmounted, readonly, ref, type Ref } from 'vue'
import { pickFromDistribution } from '@/domain/picker'
import { defaultRandomSource, type RandomSource } from '@/domain/random'
import type { WeightedUniversity } from '@/domain/weighting'
import type { University } from '@/types/university'

export type RouletteStatus = 'idle' | 'spinning' | 'settled'

export interface RouletteOptions {
  /** Total spin duration in milliseconds. */
  readonly durationMs?: number
  /** Interval between name changes at the start of the spin. */
  readonly initialTickMs?: number
  /** Interval between name changes just before the spin stops. */
  readonly finalTickMs?: number
  readonly randomSource?: RandomSource
}

const DEFAULT_OPTIONS = {
  durationMs: 2600,
  initialTickMs: 60,
  finalTickMs: 260,
} as const

/**
 * Drives the spin animation and produces the final draw.
 *
 * The animation only shuffles which candidate is shown; the settled result is
 * drawn once from the real distribution, so the visual pacing can change
 * without affecting the probabilities.
 */
export function useRoulette(
  distribution: Ref<readonly WeightedUniversity[]>,
  options: RouletteOptions = {},
) {
  const { durationMs, initialTickMs, finalTickMs } = { ...DEFAULT_OPTIONS, ...options }
  const randomSource = options.randomSource ?? defaultRandomSource

  const status = ref<RouletteStatus>('idle')
  const highlighted = ref<University | null>(null)
  const result = ref<University | null>(null)

  let timerId: ReturnType<typeof setTimeout> | null = null

  const clearTimer = (): void => {
    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }
  }

  /** Eases the tick interval from fast to slow so the spin appears to decelerate. */
  const tickIntervalAt = (progress: number): number =>
    initialTickMs + (finalTickMs - initialTickMs) * progress * progress

  const spin = (): void => {
    if (status.value === 'spinning' || distribution.value.length === 0) {
      return
    }

    const finalPick = pickFromDistribution(distribution.value, randomSource)
    if (finalPick === null) {
      return
    }

    status.value = 'spinning'
    result.value = null

    const startedAt = performance.now()

    const tick = (): void => {
      const elapsed = performance.now() - startedAt
      if (elapsed >= durationMs) {
        highlighted.value = finalPick
        result.value = finalPick
        status.value = 'settled'
        timerId = null
        return
      }

      const progress = elapsed / durationMs
      const candidates = distribution.value
      const index = Math.floor(randomSource() * candidates.length)
      highlighted.value = candidates[index]?.university ?? finalPick
      timerId = setTimeout(tick, tickIntervalAt(progress))
    }

    tick()
  }

  /** Clears the current result without touching filters or mode. */
  const reset = (): void => {
    clearTimer()
    status.value = 'idle'
    highlighted.value = null
    result.value = null
  }

  onUnmounted(clearTimer)

  return {
    status: readonly(status),
    highlighted,
    result,
    spin,
    reset,
  }
}
