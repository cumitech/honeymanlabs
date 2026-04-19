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
    shadowColor: '#1B1200',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
})
