import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type ThemePreference = 'system' | 'light' | 'dark'

type UiState = {
  themePreference: ThemePreference
}

const initialState: UiState = {
  themePreference: 'system',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemePreference: (state, action: PayloadAction<ThemePreference>) => {
      state.themePreference = action.payload
    },
    hydrateThemePreference: (state, action: PayloadAction<ThemePreference | null | undefined>) => {
      const v = action.payload
      if (v === 'light' || v === 'dark' || v === 'system') {
        state.themePreference = v
      }
    },
  },
})

export const { setThemePreference, hydrateThemePreference } = uiSlice.actions
export const uiReducer = uiSlice.reducer
