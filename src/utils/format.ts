/**
 * Formats a probability in [0, 1] as a percentage string.
 * Small probabilities keep three decimals so rare candidates do not read as 0%.
 */
export function formatPercentage(probability: number): string {
  const percentage = probability * 100
  const fractionDigits = percentage < 0.1 ? 3 : 2
  return `${percentage.toFixed(fractionDigits)}%`
}
