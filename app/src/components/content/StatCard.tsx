import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type StatCardProps = { label: string; value: string | number }

export function StatCard({ label, value }: StatCardProps) {
  const { theme } = useTheme()
  return (
    <View
      className="rounded-2xl border p-3.5"
      style={[styles.card, { borderColor: theme.border, backgroundColor: theme.bg.card }]}
    >
      <Text style={[styles.value, { color: theme.text.primary }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.text.muted }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 14, padding: 14 },
  value: { fontSize: 24, fontWeight: '700' },
  label: { fontSize: 13, marginTop: 4 },
})
