import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UpdateMode } from '../../models/common/update-mode.enum'
import type { Product } from '../../models/domain/product.model'
import {
  initialResourceListState,
  type ResourceListState,
} from '../../models/store/resource-list.model'
import {
  emptyCatalogProduct,
  toCatalogProduct,
  type CatalogProduct,
} from '../../models/views/catalog.model'
import { productsApi } from '../../api/resources/products.api'

export type IProductsState = ResourceListState<CatalogProduct>

export const initialState: IProductsState = initialResourceListState(emptyCatalogProduct)

function rejectedMessage(payload: unknown): string {
  return typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
}

export const fetchProductsAsync = createAsyncThunk<CatalogProduct[], void>(
  'products/fetchProductsAsync',
  async (_, thunkApi) => {
    try {
      const rows = await productsApi.list({ _start: 0, _end: 120, lang: 'en' })
      return (rows as Product[]).map(toCatalogProduct)
    } catch (e: unknown) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Request failed')
    }
  },
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: state => {
      state.isLoading = true
    },
    fetchProductsSuccess: (state, action: PayloadAction<CatalogProduct[]>) => {
      state.isLoading = false
      state.initialFetch = false
      state.items = action.payload
      state.errors = ''
    },
    fetchProductsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    editProductSuccess: (state, action: PayloadAction<CatalogProduct>) => {
      state.items = state.items.map(p => (p.id === action.payload.id ? action.payload : p))
      state.updateMode = UpdateMode.NONE
    },
    addProductSuccess: (state, action: PayloadAction<CatalogProduct>) => {
      state.items = [...state.items, action.payload]
      state.updateMode = UpdateMode.NONE
    },
    setActiveProduct: (state, action: PayloadAction<CatalogProduct>) => {
      state.active = action.payload
    },
    setProductUpdateMode: (state, action: PayloadAction<UpdateMode>) => {
      state.updateMode = action.payload
    },
    setProductsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    resetProducts: () => initialResourceListState<CatalogProduct>(emptyCatalogProduct),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductsAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.items = action.payload
        state.errors = ''
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.errors = rejectedMessage(action.payload)
        state.items = []
      })
  },
})

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsError,
  editProductSuccess,
  addProductSuccess,
  setActiveProduct,
  setProductUpdateMode,
  setProductsSearching,
  resetProducts,
} = productsSlice.actions

export const productsReducer = productsSlice.reducer
