import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UpdateMode } from '../../models/common/update-mode.enum'
import type { Beekeeper } from '../../models/domain/beekeeper.model'
import {
  emptyFeaturedBeekeeper,
  toFeaturedBeekeeper,
  type FeaturedBeekeeper,
} from '../../models/store/beekeeper-featured.model'
import {
  initialResourceListState,
  type ResourceListState,
} from '../../models/store/resource-list.model'
import { beekeepersApi } from '../../api/resources/beekeepers.api'

export type IBeekeepersState = ResourceListState<FeaturedBeekeeper>

export const initialState: IBeekeepersState = initialResourceListState(emptyFeaturedBeekeeper)

function rejectedMessage(payload: unknown): string {
  return typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
}

export const fetchBeekeepersAsync = createAsyncThunk<FeaturedBeekeeper[], void>(
  'beekeepers/fetchBeekeepersAsync',
  async (_, thunkApi) => {
    try {
      const rows = await beekeepersApi.list({ _start: 0, _end: 20, lang: 'en' })
      return (rows as Beekeeper[]).map(toFeaturedBeekeeper)
    } catch (e: unknown) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Request failed')
    }
  },
)

export const beekeepersSlice = createSlice({
  name: 'beekeepers',
  initialState,
  reducers: {
    fetchBeekeepersRequest: state => {
      state.isLoading = true
    },
    fetchBeekeepersSuccess: (state, action: PayloadAction<FeaturedBeekeeper[]>) => {
      state.isLoading = false
      state.initialFetch = false
      state.items = action.payload
      state.errors = ''
    },
    fetchBeekeepersError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    editBeekeeperSuccess: (state, action: PayloadAction<FeaturedBeekeeper>) => {
      state.items = state.items.map(b => (b.id === action.payload.id ? action.payload : b))
      state.updateMode = UpdateMode.NONE
    },
    addBeekeeperSuccess: (state, action: PayloadAction<FeaturedBeekeeper>) => {
      state.items = [...state.items, action.payload]
      state.updateMode = UpdateMode.NONE
    },
    setActiveBeekeeper: (state, action: PayloadAction<FeaturedBeekeeper>) => {
      state.active = action.payload
    },
    setBeekeeperUpdateMode: (state, action: PayloadAction<UpdateMode>) => {
      state.updateMode = action.payload
    },
    setBeekeepersSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    resetBeekeepers: () => initialResourceListState<FeaturedBeekeeper>(emptyFeaturedBeekeeper),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBeekeepersAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchBeekeepersAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.items = action.payload
        state.errors = ''
      })
      .addCase(fetchBeekeepersAsync.rejected, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.errors = rejectedMessage(action.payload)
        state.items = []
      })
  },
})

export const {
  fetchBeekeepersRequest,
  fetchBeekeepersSuccess,
  fetchBeekeepersError,
  editBeekeeperSuccess,
  addBeekeeperSuccess,
  setActiveBeekeeper,
  setBeekeeperUpdateMode,
  setBeekeepersSearching,
  resetBeekeepers,
} = beekeepersSlice.actions

export const beekeepersReducer = beekeepersSlice.reducer
