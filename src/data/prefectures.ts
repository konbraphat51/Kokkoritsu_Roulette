import type { LocalizedText } from '@/types/university'

/** Region groups used for filtering, ordered from north to south. */
export type RegionId =
  'hokkaido-tohoku' | 'kanto' | 'chubu' | 'kinki' | 'chugoku-shikoku' | 'kyushu-okinawa'

export interface Prefecture {
  readonly code: number
  readonly name: LocalizedText
  readonly region: RegionId
}

export const REGION_NAMES: Readonly<Record<RegionId, LocalizedText>> = {
  'hokkaido-tohoku': { ja: '北海道・東北', en: 'Hokkaido & Tohoku' },
  kanto: { ja: '関東', en: 'Kanto' },
  chubu: { ja: '中部', en: 'Chubu' },
  kinki: { ja: '近畿', en: 'Kinki' },
  'chugoku-shikoku': { ja: '中国・四国', en: 'Chugoku & Shikoku' },
  'kyushu-okinawa': { ja: '九州・沖縄', en: 'Kyushu & Okinawa' },
}

/** Raw rows: [JIS code, Japanese name, English name, region]. */
const PREFECTURE_ROWS: ReadonlyArray<readonly [number, string, string, RegionId]> = [
  [1, '北海道', 'Hokkaido', 'hokkaido-tohoku'],
  [2, '青森県', 'Aomori', 'hokkaido-tohoku'],
  [3, '岩手県', 'Iwate', 'hokkaido-tohoku'],
  [4, '宮城県', 'Miyagi', 'hokkaido-tohoku'],
  [5, '秋田県', 'Akita', 'hokkaido-tohoku'],
  [6, '山形県', 'Yamagata', 'hokkaido-tohoku'],
  [7, '福島県', 'Fukushima', 'hokkaido-tohoku'],
  [8, '茨城県', 'Ibaraki', 'kanto'],
  [9, '栃木県', 'Tochigi', 'kanto'],
  [10, '群馬県', 'Gunma', 'kanto'],
  [11, '埼玉県', 'Saitama', 'kanto'],
  [12, '千葉県', 'Chiba', 'kanto'],
  [13, '東京都', 'Tokyo', 'kanto'],
  [14, '神奈川県', 'Kanagawa', 'kanto'],
  [15, '新潟県', 'Niigata', 'chubu'],
  [16, '富山県', 'Toyama', 'chubu'],
  [17, '石川県', 'Ishikawa', 'chubu'],
  [18, '福井県', 'Fukui', 'chubu'],
  [19, '山梨県', 'Yamanashi', 'chubu'],
  [20, '長野県', 'Nagano', 'chubu'],
  [21, '岐阜県', 'Gifu', 'chubu'],
  [22, '静岡県', 'Shizuoka', 'chubu'],
  [23, '愛知県', 'Aichi', 'chubu'],
  [24, '三重県', 'Mie', 'kinki'],
  [25, '滋賀県', 'Shiga', 'kinki'],
  [26, '京都府', 'Kyoto', 'kinki'],
  [27, '大阪府', 'Osaka', 'kinki'],
  [28, '兵庫県', 'Hyogo', 'kinki'],
  [29, '奈良県', 'Nara', 'kinki'],
  [30, '和歌山県', 'Wakayama', 'kinki'],
  [31, '鳥取県', 'Tottori', 'chugoku-shikoku'],
  [32, '島根県', 'Shimane', 'chugoku-shikoku'],
  [33, '岡山県', 'Okayama', 'chugoku-shikoku'],
  [34, '広島県', 'Hiroshima', 'chugoku-shikoku'],
  [35, '山口県', 'Yamaguchi', 'chugoku-shikoku'],
  [36, '徳島県', 'Tokushima', 'chugoku-shikoku'],
  [37, '香川県', 'Kagawa', 'chugoku-shikoku'],
  [38, '愛媛県', 'Ehime', 'chugoku-shikoku'],
  [39, '高知県', 'Kochi', 'chugoku-shikoku'],
  [40, '福岡県', 'Fukuoka', 'kyushu-okinawa'],
  [41, '佐賀県', 'Saga', 'kyushu-okinawa'],
  [42, '長崎県', 'Nagasaki', 'kyushu-okinawa'],
  [43, '熊本県', 'Kumamoto', 'kyushu-okinawa'],
  [44, '大分県', 'Oita', 'kyushu-okinawa'],
  [45, '宮崎県', 'Miyazaki', 'kyushu-okinawa'],
  [46, '鹿児島県', 'Kagoshima', 'kyushu-okinawa'],
  [47, '沖縄県', 'Okinawa', 'kyushu-okinawa'],
]

export const PREFECTURES: readonly Prefecture[] = PREFECTURE_ROWS.map(([code, ja, en, region]) => ({
  code,
  name: { ja, en },
  region,
}))

const PREFECTURE_BY_CODE = new Map(PREFECTURES.map((prefecture) => [prefecture.code, prefecture]))

/** Looks up a prefecture by JIS code; throws on unknown codes to fail fast. */
export function getPrefecture(code: number): Prefecture {
  const prefecture = PREFECTURE_BY_CODE.get(code)
  if (!prefecture) {
    throw new Error(`Unknown prefecture code: ${code}`)
  }
  return prefecture
}
