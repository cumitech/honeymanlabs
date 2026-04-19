import React from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { hydrateThemePreference, type ThemePreference } from '../store/slices/ui-slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { ThemeProvider } from './ThemeProvider'
import type { ThemeMode } from '../theme/tokens'

import { THEME_PREFERENCE_STORAGE_KEY } from '../constants'

function parseStored(value: string | null): ThemePreference | null {
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value
  }
  return null
}

type ThemeReduxBridgeProps = {
  children: React.ReactNode
}

export function ThemeReduxBridge({ children }: ThemeReduxBridgeProps) {
  const dispatch = useAppDispatch()
  const preference = useAppSelector(s => s.ui.themePreference)
  const systemScheme = useColorScheme()

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const raw = await AsyncStorage.getItem(THEME_PREFERENCE_STORAGE_KEY)
        if (!cancelled) {
          dispatch(hydrateThemePreference(parseStored(raw)))
        }
      } catch {
        if (!cancelled) {
          dispatch(hydrateThemePreference(null))
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [dispatch])

  React.useEffect(() => {
    void AsyncStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference)
  }, [preference])

  const resolvedMode: ThemeMode =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference

  return <ThemeProvider mode={resolvedMode}>{children}</ThemeProvider>
}
