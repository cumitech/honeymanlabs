import { useCallback } from 'react'
import type { UpdateMode } from '../../models/common/update-mode.enum'
import type { TraceOrder } from '../../models/views/trace-order.model'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addOrderSuccess,
  editOrderSuccess,
  fetchOrdersAsync,
  fetchOrdersError,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  resetOrders,
  setActiveOrder,
  setOrderUpdateMode,
  setOrdersSearching,
} from '../../store/slices/orders.slice'
import { useInitialFetch } from '../shared/initial-fetch.hook'

export const useOrders = () => {
  const dispatch = useAppDispatch()
  const {
    items: orders,
    errors,
    active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
  } = useAppSelector(s => s.orders)

  const loadOrders = useCallback(() => {
    if (!initialFetch) return
    void dispatch(fetchOrdersAsync(undefined))
  }, [dispatch, initialFetch])

  useInitialFetch(loadOrders, initialFetch)

  const requestFetch = useCallback(() => dispatch(fetchOrdersRequest(undefined)), [dispatch])
  const applyFetchSuccess = useCallback(
    (payload: TraceOrder[]) => dispatch(fetchOrdersSuccess(payload)),
    [dispatch],
  )
  const applyFetchError = useCallback(
    (message: string) => dispatch(fetchOrdersError(message)),
    [dispatch],
  )
  const replaceOrder = useCallback((row: TraceOrder) => dispatch(editOrderSuccess(row)), [dispatch])
  const appendOrder = useCallback((row: TraceOrder) => dispatch(addOrderSuccess(row)), [dispatch])
  const selectOrder = useCallback((row: TraceOrder) => dispatch(setActiveOrder(row)), [dispatch])
  const changeUpdateMode = useCallback(
    (mode: UpdateMode) => dispatch(setOrderUpdateMode(mode)),
    [dispatch],
  )
  const setSearching = useCallback(
    (value: boolean) => dispatch(setOrdersSearching(value)),
    [dispatch],
  )
  const clearOrders = useCallback(() => dispatch(resetOrders(undefined)), [dispatch])

  return {
    orders,
    errors,
    activeOrder: active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
    error: errors || null,
    loading: initialFetch || isLoading,
    loadOrders,
    requestFetch,
    applyFetchSuccess,
    applyFetchError,
    replaceOrder,
    appendOrder,
    selectOrder,
    changeUpdateMode,
    setSearching,
    clearOrders,
  }
}
