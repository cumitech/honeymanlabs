import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type ListItemProps = {
  title: string
  subtitle?: string
  left?: React.ReactNode
  right?: React.ReactNode
  onPress?: () => void
}

export function ListItem({ title, subtitle, left, right, onPress }: ListItemProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={onPress}
      className="min-h-[62px] flex-row items-center rounded-2xl border px-3.5"
      style={({ pressed }) => [
        styles.row,
        { borderColor: theme.border, backgroundColor: theme.bg.card, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      {left ? <View style={styles.left}>{left}</View> : null}
      <View className="flex-1" style={styles.body}>
        <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.text.muted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    minHeight: 62,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: { marginRight: 10 },
  body: { flex: 1 },
  title: { fontSize: 15, fontWeight: '700' },
  subtitle: { fontSize: 13, marginTop: 3, lineHeight: 18 },
})
