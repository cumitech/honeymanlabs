import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LangType } from '../../models/common/language.model'

type LanguageState = {
  langKey: LangType
}

const initialState: LanguageState = {
  langKey: 'en',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LangType>) => {
      state.langKey = action.payload
    },
  },
})

export const { setLanguage } = languageSlice.actions
export const languageReducer = languageSlice.reducer
