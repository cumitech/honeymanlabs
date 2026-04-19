import React, { createContext, useContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { createSemanticTheme, type SemanticTheme } from '../theme/semantic'
import type { ThemeMode } from '../theme/tokens'

type ThemeContextValue = {
  theme: SemanticTheme
  mode: ThemeMode
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

type ThemeProviderProps = {
  children: React.ReactNode
  mode?: ThemeMode
}

export function ThemeProvider({ children, mode }: ThemeProviderProps) {
  const system = useColorScheme()
  const resolvedMode: ThemeMode = mode ?? (system === 'dark' ? 'dark' : 'light')
  const theme = useMemo(() => createSemanticTheme(resolvedMode), [resolvedMode])

  return (
    <ThemeContext.Provider value={{ theme, mode: resolvedMode }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }
  return context
}
