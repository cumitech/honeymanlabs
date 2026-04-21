import { useCallback } from 'react'
import type { UpdateMode } from '../../models/common/update-mode.enum'
import type { LabRecentTest } from '../../models/views/lab-feed.model'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addLabTestSuccess,
  editLabTestSuccess,
  fetchLabTestsAsync,
  fetchLabTestsError,
  fetchLabTestsRequest,
  fetchLabTestsSuccess,
  resetLabTests,
  setActiveLabTest,
  setLabTestUpdateMode,
  setLabTestsSearching,
} from '../../store/slices/lab-tests.slice'
import { useInitialFetch } from '../shared/initial-fetch.hook'

export const useLabTests = () => {
  const dispatch = useAppDispatch()
  const {
    items: labTests,
    errors,
    active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
  } = useAppSelector(s => s.labTests)

  const loadLabTests = useCallback(() => {
    if (!initialFetch) return
    void dispatch(fetchLabTestsAsync(undefined))
  }, [dispatch, initialFetch])

  useInitialFetch(loadLabTests, initialFetch)

  const requestFetch = useCallback(() => dispatch(fetchLabTestsRequest(undefined)), [dispatch])
  const applyFetchSuccess = useCallback(
    (payload: LabRecentTest[]) => dispatch(fetchLabTestsSuccess(payload)),
    [dispatch],
  )
  const applyFetchError = useCallback(
    (message: string) => dispatch(fetchLabTestsError(message)),
    [dispatch],
  )
  const replaceLabTest = useCallback(
    (row: LabRecentTest) => dispatch(editLabTestSuccess(row)),
    [dispatch],
  )
  const appendLabTest = useCallback(
    (row: LabRecentTest) => dispatch(addLabTestSuccess(row)),
    [dispatch],
  )
  const selectLabTest = useCallback(
    (row: LabRecentTest) => dispatch(setActiveLabTest(row)),
    [dispatch],
  )
  const changeUpdateMode = useCallback(
    (mode: UpdateMode) => dispatch(setLabTestUpdateMode(mode)),
    [dispatch],
  )
  const setSearching = useCallback(
    (value: boolean) => dispatch(setLabTestsSearching(value)),
    [dispatch],
  )
  const clearLabTests = useCallback(() => dispatch(resetLabTests(undefined)), [dispatch])

  return {
    labTests,
    errors,
    activeLabTest: active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
    error: errors || null,
    loading: initialFetch || isLoading,
    loadLabTests,
    requestFetch,
    applyFetchSuccess,
    applyFetchError,
    replaceLabTest,
    appendLabTest,
    selectLabTest,
    changeUpdateMode,
    setSearching,
    clearLabTests,
  }
}
