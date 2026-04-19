import React from 'react'
import { StyleSheet, View, type ViewProps } from 'react-native'
import { useTheme } from '../../theme'

export function AppCard({ style, ...props }: ViewProps) {
  const { theme } = useTheme()
  return (
    <View
      className="rounded-2xl border p-4"
      style={[styles.card, { backgroundColor: theme.bg.card, borderColor: theme.border }, style]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
})
