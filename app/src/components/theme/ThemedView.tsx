import React from 'react'
import { View, type ViewProps } from 'react-native'
import { useTheme } from '../../context/ThemeProvider'

export function ThemedView({ style, ...props }: ViewProps) {
  const { theme } = useTheme()
  return <View style={[{ backgroundColor: theme.bg.surface }, style]} {...props} />
}
