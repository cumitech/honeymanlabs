import { configureStore } from '@reduxjs/toolkit'
import { apiariesReducer } from './slices/apiaries.slice'
import { articlesReducer } from './slices/articles.slice'
import { beekeepersReducer } from './slices/beekeepers.slice'
import { cartReducer } from './slices/cart-slice'
import { labTestsReducer } from './slices/lab-tests.slice'
import { languageReducer } from './slices/language-slice'
import { ordersReducer } from './slices/orders.slice'
import { productsReducer } from './slices/products.slice'
import { sessionReducer } from './slices/session-slice'
import { uiReducer } from './slices/ui-slice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    session: sessionReducer,
    cart: cartReducer,
    products: productsReducer,
    apiaries: apiariesReducer,
    articles: articlesReducer,
    beekeepers: beekeepersReducer,
    labTests: labTestsReducer,
    orders: ordersReducer,
    language: languageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
