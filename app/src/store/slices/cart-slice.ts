import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { clearCredentials } from './session-slice'
import type { CatalogProduct } from '../../models/views/catalog.model'

export type CartLine = {
  catalogProductId: string
  title: string
  sizeLabel: string
  priceCfa: number
  quantity: number
}

type CartState = {
  items: CartLine[]
}

const initialState: CartState = {
  items: [],
}

function lineKey(id: string) {
  return id
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CatalogProduct>) => {
      const p = action.payload
      const key = lineKey(p.id)
      const existing = state.items.find(i => i.catalogProductId === key)
      if (existing) {
        existing.quantity += 1
        return
      }
      const title = p.sizeLabel ? `${p.title}, ${p.sizeLabel}` : p.title
      state.items.push({
        catalogProductId: p.id,
        title,
        sizeLabel: p.sizeLabel,
        priceCfa: p.priceCfa,
        quantity: 1,
      })
    },
    incrementLine: (state, action: PayloadAction<string>) => {
      const line = state.items.find(i => i.catalogProductId === action.payload)
      if (line) line.quantity += 1
    },
    decrementLine: (state, action: PayloadAction<string>) => {
      const idx = state.items.findIndex(i => i.catalogProductId === action.payload)
      if (idx === -1) return
      const line = state.items[idx]!
      if (line.quantity <= 1) {
        state.items.splice(idx, 1)
        return
      }
      line.quantity -= 1
    },
    removeLine: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.catalogProductId !== action.payload)
    },
    clearCart: state => {
      state.items = []
    },
  },
  extraReducers: builder => {
    builder.addCase(clearCredentials, () => initialState)
  },
})

export const { addToCart, incrementLine, decrementLine, removeLine, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
