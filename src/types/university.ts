/** Localized label shared by every displayable domain value. */
export interface LocalizedText {
  readonly ja: string
  readonly en: string
}

/** Establishment category of a Japanese national/public university. */
export type UniversityType = 'national' | 'public'

/** A single national or public (kokkoritsu) university entry. */
export interface University {
  /** Stable slug used as list key and for URL-safe references. */
  readonly id: string
  readonly name: LocalizedText
  readonly type: UniversityType
  /** JIS prefecture code (1-47). */
  readonly prefectureCode: number
  /**
   * Representative entrance-exam deviation value (hensachi).
   * Approximate faculty-average reference figure, not an official statistic.
   */
  readonly deviationValue: number
}
