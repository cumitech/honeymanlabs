import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { useTheme } from '../../theme'

type AppSelectProps = {
  label: string
  value?: string
  placeholder?: string
  onPress: () => void
}

export function AppSelect({
  label,
  value,
  placeholder = 'Select an option',
  onPress,
}: AppSelectProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      className="min-h-11 justify-center rounded-[10px] border px-3"
      onPress={onPress}
      style={[styles.box, { borderColor: theme.border }]}
    >
      <Text style={[styles.label, { color: theme.text.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: value ? theme.text.primary : theme.text.muted }]}>
        {value ?? placeholder}
      </Text>
    </Pressable>
  )
}

export const AppPicker = AppSelect

const styles = StyleSheet.create({
  box: {
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  label: { fontSize: 11 },
  value: { fontSize: 14, fontWeight: '600', marginTop: 2 },
})
