/** Japanese UI messages. */
export default {
  app: {
    title: '国公立大学ルーレット',
    subtitle: '国公立大学から1校をランダムに選びます',
  },
  mode: {
    legend: '抽選モード',
    uniform: '均等',
    uniformDescription: 'すべての大学が同じ確率で選ばれます',
    weighted: '偏差値重み付け',
    weightedDescription: '偏差値が高いほど選ばれやすくなります',
  },
  strength: {
    label: '重み付けの強さ',
    hint: '0 にすると均等抽選と同じになります',
    current: '現在の強さ: {value}',
  },
  filters: {
    legend: '対象を絞り込む',
    type: '設置区分',
    national: '国立',
    public: '公立',
    region: '地域',
    selectAll: 'すべて選択',
    clearAll: 'すべて解除',
    deviationRange: '偏差値の範囲',
    from: '下限',
    to: '上限',
    reset: '絞り込みをリセット',
  },
  roulette: {
    spin: 'ルーレットを回す',
    spinning: '抽選中…',
    again: 'もう一度回す',
    idle: 'ボタンを押して抽選してください',
    empty: '条件に合う大学がありません。絞り込みを見直してください。',
    candidates: '候補: {count}校',
  },
  result: {
    heading: '抽選結果',
    deviationValue: '偏差値',
    probability: '選出確率',
    type: '設置区分',
    prefecture: '所在地',
    searchOnWeb: 'Webで検索',
  },
  probabilityTable: {
    heading: '確率一覧',
    show: '確率一覧を表示',
    hide: '確率一覧を隠す',
    rank: '順位',
    university: '大学',
    deviationValue: '偏差値',
    probability: '確率',
  },
  history: {
    heading: '抽選履歴',
    empty: 'まだ抽選していません',
    clear: '履歴を消去',
  },
  locale: {
    label: '言語',
    ja: '日本語',
    en: 'English',
  },
  footer: {
    disclaimer:
      '偏差値は公開されている目安を基にした参考値であり、公式な数値ではありません。本サイトは娯楽目的です。',
    source: 'ソースコード',
  },
} as const
