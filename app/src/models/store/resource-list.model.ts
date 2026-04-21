import { UpdateMode } from '../common/update-mode.enum'

export type ResourceListState<TItem, TActive = TItem> = {
  items: TItem[]
  errors: string
  active: TActive
  isLoading: boolean
  isSearching: boolean
  initialFetch: boolean
  updateMode: UpdateMode
}

export function initialResourceListState<TItem, TActive = TItem>(
  activePlaceholder: TActive,
): ResourceListState<TItem, TActive> {
  return {
    items: [] as TItem[],
    errors: '',
    active: activePlaceholder,
    isLoading: false,
    isSearching: false,
    initialFetch: true,
    updateMode: UpdateMode.NONE,
  }
}
