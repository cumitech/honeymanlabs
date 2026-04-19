import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type Variant = 'success' | 'info' | 'warning' | 'error'
type AlertBannerProps = { message: string; variant?: Variant; dismissible?: boolean }

export function AlertBanner({ message, variant = 'info', dismissible = true }: AlertBannerProps) {
  const { theme } = useTheme()
  const [hidden, setHidden] = useState(false)
  if (hidden) return null

  return (
    <View
      className="flex-row items-center gap-3 rounded-xl border p-3"
      style={[styles.root, { borderColor: theme.border, backgroundColor: theme.bg.card }]}
    >
      <Text style={[styles.message, { color: theme.status[variant] }]}>{message}</Text>
      {dismissible && (
        <Pressable className="min-h-8 justify-center px-1" onPress={() => setHidden(true)}>
          <Text style={[styles.dismiss, { color: theme.text.muted }]}>Dismiss</Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  message: { flex: 1, fontSize: 14, fontWeight: '600' },
  dismiss: { fontSize: 12, fontWeight: '600' },
})
