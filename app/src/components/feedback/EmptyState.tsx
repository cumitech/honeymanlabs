import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type EmptyStateProps = {
  title: string
  description?: string
  ctaLabel?: string
  onPressCta?: () => void
}

export function EmptyState({ title, description, ctaLabel, onPressCta }: EmptyStateProps) {
  const { theme } = useTheme()
  return (
    <View
      className="items-center gap-2 rounded-2xl border p-4"
      style={[styles.root, { borderColor: theme.border, backgroundColor: theme.bg.card }]}
    >
      <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, { color: theme.text.muted }]}>{description}</Text>
      ) : null}
      {ctaLabel && onPressCta ? (
        <Pressable
          className="mt-2 rounded-[10px] px-3.5 py-2.5"
          style={[styles.button, { backgroundColor: theme.palette.primary }]}
          onPress={onPressCta}
        >
          <Text style={[styles.buttonText, { color: theme.text.onPrimary }]}>{ctaLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { borderWidth: 1, borderRadius: 14, padding: 16, alignItems: 'center', gap: 8 },
  title: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  description: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  button: { marginTop: 8, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  buttonText: { fontSize: 14, fontWeight: '700' },
})
