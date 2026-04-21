import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UpdateMode } from '../../models/common/update-mode.enum'
import type { LabTest } from '../../models/domain/lab-test.model'
import {
  initialResourceListState,
  type ResourceListState,
} from '../../models/store/resource-list.model'
import {
  emptyLabRecentTest,
  toLabRecentTest,
  type LabRecentTest,
} from '../../models/views/lab-feed.model'
import { labTestsApi } from '../../api/resources/lab-tests.api'

export type ILabTestsState = ResourceListState<LabRecentTest>

export const initialState: ILabTestsState = initialResourceListState(emptyLabRecentTest)

function rejectedMessage(payload: unknown): string {
  return typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
}

export const fetchLabTestsAsync = createAsyncThunk<LabRecentTest[], void>(
  'labTests/fetchLabTestsAsync',
  async (_, thunkApi) => {
    try {
      const rows = await labTestsApi.list({ _start: 0, _end: 40, lang: 'en' })
      return (rows as LabTest[]).map(toLabRecentTest)
    } catch (e: unknown) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Request failed')
    }
  },
)

export const labTestsSlice = createSlice({
  name: 'labTests',
  initialState,
  reducers: {
    fetchLabTestsRequest: state => {
      state.isLoading = true
    },
    fetchLabTestsSuccess: (state, action: PayloadAction<LabRecentTest[]>) => {
      state.isLoading = false
      state.initialFetch = false
      state.items = action.payload
      state.errors = ''
    },
    fetchLabTestsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    editLabTestSuccess: (state, action: PayloadAction<LabRecentTest>) => {
      state.items = state.items.map(t => (t.id === action.payload.id ? action.payload : t))
      state.updateMode = UpdateMode.NONE
    },
    addLabTestSuccess: (state, action: PayloadAction<LabRecentTest>) => {
      state.items = [...state.items, action.payload]
      state.updateMode = UpdateMode.NONE
    },
    setActiveLabTest: (state, action: PayloadAction<LabRecentTest>) => {
      state.active = action.payload
    },
    setLabTestUpdateMode: (state, action: PayloadAction<UpdateMode>) => {
      state.updateMode = action.payload
    },
    setLabTestsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    resetLabTests: () => initialResourceListState<LabRecentTest>(emptyLabRecentTest),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLabTestsAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchLabTestsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.items = action.payload
        state.errors = ''
      })
      .addCase(fetchLabTestsAsync.rejected, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.errors = rejectedMessage(action.payload)
        state.items = []
      })
  },
})

export const {
  fetchLabTestsRequest,
  fetchLabTestsSuccess,
  fetchLabTestsError,
  editLabTestSuccess,
  addLabTestSuccess,
  setActiveLabTest,
  setLabTestUpdateMode,
  setLabTestsSearching,
  resetLabTests,
} = labTestsSlice.actions

export const labTestsReducer = labTestsSlice.reducer
