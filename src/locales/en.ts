import type ja from './ja'

/** English UI messages, structurally identical to the Japanese catalogue. */
const en: typeof ja = {
  app: {
    title: 'Kokkoritsu Roulette',
    subtitle: 'Pick one national or public university at random',
  },
  mode: {
    legend: 'Draw mode',
    uniform: 'Uniform',
    uniformDescription: 'Every university has the same chance',
    weighted: 'Deviation-weighted',
    weightedDescription: 'Higher deviation values are picked more often',
  },
  strength: {
    label: 'Weighting strength',
    hint: 'A strength of 0 behaves exactly like the uniform draw',
    current: 'Current strength: {value}',
  },
  filters: {
    legend: 'Narrow the candidates',
    type: 'Establishment',
    national: 'National',
    public: 'Public',
    region: 'Region',
    selectAll: 'Select all',
    clearAll: 'Clear all',
    deviationRange: 'Deviation value range',
    from: 'Min',
    to: 'Max',
    reset: 'Reset filters',
  },
  roulette: {
    spin: 'Spin the roulette',
    spinning: 'Spinning…',
    again: 'Spin again',
    idle: 'Press the button to draw',
    empty: 'No university matches the filters. Please widen them.',
    candidates: 'Candidates: {count}',
  },
  result: {
    heading: 'Result',
    deviationValue: 'Deviation value',
    probability: 'Selection chance',
    type: 'Establishment',
    prefecture: 'Location',
    searchOnWeb: 'Search on the web',
  },
  probabilityTable: {
    heading: 'Probability table',
    show: 'Show probability table',
    hide: 'Hide probability table',
    rank: 'Rank',
    university: 'University',
    deviationValue: 'Deviation value',
    probability: 'Probability',
  },
  history: {
    heading: 'Draw history',
    empty: 'No draw yet',
    clear: 'Clear history',
  },
  locale: {
    label: 'Language',
    ja: '日本語',
    en: 'English',
  },
  footer: {
    disclaimer:
      'Deviation values are approximate reference figures based on publicly available tables, not official statistics. This site is for entertainment only.',
    source: 'Source code',
  },
}

export default en
