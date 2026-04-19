import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer } from './slices/session-slice'
import { uiReducer } from './slices/ui-slice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    session: sessionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
