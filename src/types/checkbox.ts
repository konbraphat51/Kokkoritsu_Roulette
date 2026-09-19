/** One selectable entry rendered by CheckboxGroup. */
export interface CheckboxOption<TValue extends string> {
  readonly value: TValue
  readonly label: string
}
