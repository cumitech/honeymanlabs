import { useCallback } from 'react'
import type { UpdateMode } from '../../models/common/update-mode.enum'
import type { ApiaryListItem } from '../../models/views/apiary-view.model'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addApiarySuccess,
  editApiarySuccess,
  fetchApiariesAsync,
  fetchApiariesError,
  fetchApiariesRequest,
  fetchApiariesSuccess,
  resetApiaries,
  setActiveApiary,
  setApiariesSearching,
  setApiaryUpdateMode,
} from '../../store/slices/apiaries.slice'
import { useInitialFetch } from '../shared/initial-fetch.hook'

export const useApiaries = () => {
  const dispatch = useAppDispatch()
  const {
    items: apiaries,
    errors,
    active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
  } = useAppSelector(s => s.apiaries)

  const loadApiaries = useCallback(() => {
    if (!initialFetch) return
    void dispatch(fetchApiariesAsync(undefined))
  }, [dispatch, initialFetch])

  useInitialFetch(loadApiaries, initialFetch)

  const requestFetch = useCallback(() => dispatch(fetchApiariesRequest(undefined)), [dispatch])
  const applyFetchSuccess = useCallback(
    (payload: ApiaryListItem[]) => dispatch(fetchApiariesSuccess(payload)),
    [dispatch],
  )
  const applyFetchError = useCallback(
    (message: string) => dispatch(fetchApiariesError(message)),
    [dispatch],
  )
  const replaceApiary = useCallback(
    (row: ApiaryListItem) => dispatch(editApiarySuccess(row)),
    [dispatch],
  )
  const appendApiary = useCallback(
    (row: ApiaryListItem) => dispatch(addApiarySuccess(row)),
    [dispatch],
  )
  const selectApiary = useCallback(
    (row: ApiaryListItem) => dispatch(setActiveApiary(row)),
    [dispatch],
  )
  const changeUpdateMode = useCallback(
    (mode: UpdateMode) => dispatch(setApiaryUpdateMode(mode)),
    [dispatch],
  )
  const setSearching = useCallback(
    (value: boolean) => dispatch(setApiariesSearching(value)),
    [dispatch],
  )
  const clearApiaries = useCallback(() => dispatch(resetApiaries(undefined)), [dispatch])

  return {
    apiaries,
    errors,
    activeApiary: active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
    error: errors || null,
    loading: initialFetch || isLoading,
    loadApiaries,
    requestFetch,
    applyFetchSuccess,
    applyFetchError,
    replaceApiary,
    appendApiary,
    selectApiary,
    changeUpdateMode,
    setSearching,
    clearApiaries,
  }
}
