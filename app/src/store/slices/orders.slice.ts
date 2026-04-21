import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UpdateMode } from '../../models/common/update-mode.enum'
import type { Order } from '../../models/domain/order.model'
import {
  initialResourceListState,
  type ResourceListState,
} from '../../models/store/resource-list.model'
import {
  emptyTraceOrder,
  toTraceOrder,
  type TraceOrder,
} from '../../models/views/trace-order.model'
import { ordersApi } from '../../api/resources/orders.api'

export type IOrdersState = ResourceListState<TraceOrder>

export const initialState: IOrdersState = initialResourceListState(emptyTraceOrder)

function rejectedMessage(payload: unknown): string {
  return typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
}

export const fetchOrdersAsync = createAsyncThunk<TraceOrder[], void>(
  'orders/fetchOrdersAsync',
  async (_, thunkApi) => {
    try {
      const rows = await ordersApi.list({ _start: 0, _end: 100, lang: 'en' })
      return (rows as Order[]).map(toTraceOrder)
    } catch (e: unknown) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Request failed')
    }
  },
)

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersRequest: state => {
      state.isLoading = true
    },
    fetchOrdersSuccess: (state, action: PayloadAction<TraceOrder[]>) => {
      state.isLoading = false
      state.initialFetch = false
      state.items = action.payload
      state.errors = ''
    },
    fetchOrdersError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    editOrderSuccess: (state, action: PayloadAction<TraceOrder>) => {
      state.items = state.items.map(o => (o.id === action.payload.id ? action.payload : o))
      state.updateMode = UpdateMode.NONE
    },
    addOrderSuccess: (state, action: PayloadAction<TraceOrder>) => {
      state.items = [...state.items, action.payload]
      state.updateMode = UpdateMode.NONE
    },
    setActiveOrder: (state, action: PayloadAction<TraceOrder>) => {
      state.active = action.payload
    },
    setOrderUpdateMode: (state, action: PayloadAction<UpdateMode>) => {
      state.updateMode = action.payload
    },
    setOrdersSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    resetOrders: () => initialResourceListState<TraceOrder>(emptyTraceOrder),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrdersAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.items = action.payload
        state.errors = ''
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.errors = rejectedMessage(action.payload)
        state.items = []
      })
  },
})

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersError,
  editOrderSuccess,
  addOrderSuccess,
  setActiveOrder,
  setOrderUpdateMode,
  setOrdersSearching,
  resetOrders,
} = ordersSlice.actions

export const ordersReducer = ordersSlice.reducer
