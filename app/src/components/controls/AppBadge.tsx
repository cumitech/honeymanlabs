import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type AppBadgeProps = { label: string }

export function AppBadge({ label }: AppBadgeProps) {
  const { theme } = useTheme()
  return (
    <View
      className="self-start rounded-full px-2.5 py-1"
      style={[styles.badge, { backgroundColor: theme.palette.primary }]}
    >
      <Text style={[styles.label, { color: theme.text.onPrimary }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  label: { fontSize: 12, fontWeight: '700' },
})
