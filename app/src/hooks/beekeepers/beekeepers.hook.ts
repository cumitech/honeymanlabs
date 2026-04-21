import { useCallback } from 'react'
import type { UpdateMode } from '../../models/common/update-mode.enum'
import type { FeaturedBeekeeper } from '../../models/store/beekeeper-featured.model'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addBeekeeperSuccess,
  editBeekeeperSuccess,
  fetchBeekeepersAsync,
  fetchBeekeepersError,
  fetchBeekeepersRequest,
  fetchBeekeepersSuccess,
  resetBeekeepers,
  setActiveBeekeeper,
  setBeekeeperUpdateMode,
  setBeekeepersSearching,
} from '../../store/slices/beekeepers.slice'
import { useInitialFetch } from '../shared/initial-fetch.hook'

export type { FeaturedBeekeeper } from '../../models/store/beekeeper-featured.model'

export const useBeekeepers = () => {
  const dispatch = useAppDispatch()
  const {
    items: beekeepers,
    errors,
    active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
  } = useAppSelector(s => s.beekeepers)

  const loadBeekeepers = useCallback(() => {
    if (!initialFetch) return
    void dispatch(fetchBeekeepersAsync(undefined))
  }, [dispatch, initialFetch])

  useInitialFetch(loadBeekeepers, initialFetch)

  const requestFetch = useCallback(() => dispatch(fetchBeekeepersRequest(undefined)), [dispatch])
  const applyFetchSuccess = useCallback(
    (payload: FeaturedBeekeeper[]) => dispatch(fetchBeekeepersSuccess(payload)),
    [dispatch],
  )
  const applyFetchError = useCallback(
    (message: string) => dispatch(fetchBeekeepersError(message)),
    [dispatch],
  )
  const replaceBeekeeper = useCallback(
    (row: FeaturedBeekeeper) => dispatch(editBeekeeperSuccess(row)),
    [dispatch],
  )
  const appendBeekeeper = useCallback(
    (row: FeaturedBeekeeper) => dispatch(addBeekeeperSuccess(row)),
    [dispatch],
  )
  const selectBeekeeper = useCallback(
    (row: FeaturedBeekeeper) => dispatch(setActiveBeekeeper(row)),
    [dispatch],
  )
  const changeUpdateMode = useCallback(
    (mode: UpdateMode) => dispatch(setBeekeeperUpdateMode(mode)),
    [dispatch],
  )
  const setSearching = useCallback(
    (value: boolean) => dispatch(setBeekeepersSearching(value)),
    [dispatch],
  )
  const clearBeekeepers = useCallback(() => dispatch(resetBeekeepers(undefined)), [dispatch])

  return {
    beekeepers,
    errors,
    activeBeekeeper: active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
    error: errors || null,
    loading: initialFetch || isLoading,
    loadBeekeepers,
    requestFetch,
    applyFetchSuccess,
    applyFetchError,
    replaceBeekeeper,
    appendBeekeeper,
    selectBeekeeper,
    changeUpdateMode,
    setSearching,
    clearBeekeepers,
  }
}
