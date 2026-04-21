import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UpdateMode } from '../../models/common/update-mode.enum'
import type { Apiary } from '../../models/domain/apiary.model'
import {
  initialResourceListState,
  type ResourceListState,
} from '../../models/store/resource-list.model'
import {
  emptyApiaryListItem,
  toApiaryListItem,
  type ApiaryListItem,
} from '../../models/views/apiary-view.model'
import { apiariesApi } from '../../api/resources/apiaries.api'

export type IApiariesState = ResourceListState<ApiaryListItem>

export const initialState: IApiariesState = initialResourceListState(emptyApiaryListItem)

function rejectedMessage(payload: unknown): string {
  return typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
}

export const fetchApiariesAsync = createAsyncThunk<ApiaryListItem[], void>(
  'apiaries/fetchApiariesAsync',
  async (_, thunkApi) => {
    try {
      const rows = await apiariesApi.list({ _start: 0, _end: 100, lang: 'en' })
      return (rows as Apiary[]).map(toApiaryListItem)
    } catch (e: unknown) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Request failed')
    }
  },
)

export const apiariesSlice = createSlice({
  name: 'apiaries',
  initialState,
  reducers: {
    fetchApiariesRequest: state => {
      state.isLoading = true
    },
    fetchApiariesSuccess: (state, action: PayloadAction<ApiaryListItem[]>) => {
      state.isLoading = false
      state.initialFetch = false
      state.items = action.payload
      state.errors = ''
    },
    fetchApiariesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    editApiarySuccess: (state, action: PayloadAction<ApiaryListItem>) => {
      state.items = state.items.map(a => (a.id === action.payload.id ? action.payload : a))
      state.updateMode = UpdateMode.NONE
    },
    addApiarySuccess: (state, action: PayloadAction<ApiaryListItem>) => {
      state.items = [...state.items, action.payload]
      state.updateMode = UpdateMode.NONE
    },
    setActiveApiary: (state, action: PayloadAction<ApiaryListItem>) => {
      state.active = action.payload
    },
    setApiaryUpdateMode: (state, action: PayloadAction<UpdateMode>) => {
      state.updateMode = action.payload
    },
    setApiariesSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    resetApiaries: () => initialResourceListState<ApiaryListItem>(emptyApiaryListItem),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchApiariesAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchApiariesAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.items = action.payload
        state.errors = ''
      })
      .addCase(fetchApiariesAsync.rejected, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.errors = rejectedMessage(action.payload)
        state.items = []
      })
  },
})

export const {
  fetchApiariesRequest,
  fetchApiariesSuccess,
  fetchApiariesError,
  editApiarySuccess,
  addApiarySuccess,
  setActiveApiary,
  setApiaryUpdateMode,
  setApiariesSearching,
  resetApiaries,
} = apiariesSlice.actions

export const apiariesReducer = apiariesSlice.reducer
