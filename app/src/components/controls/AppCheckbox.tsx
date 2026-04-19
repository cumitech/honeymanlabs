import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type AppCheckboxProps = { label: string; checked: boolean; onToggle: () => void }

export function AppCheckbox({ label, checked, onToggle }: AppCheckboxProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      className="min-h-11 flex-row items-center gap-2.5"
      style={styles.row}
      onPress={onToggle}
    >
      <View
        className="h-[18px] w-[18px] rounded"
        style={[
          styles.box,
          {
            borderColor: theme.border,
            backgroundColor: checked ? theme.palette.primary : 'transparent',
          },
        ]}
      />
      <Text style={[styles.label, { color: theme.text.primary }]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 10 },
  box: { width: 18, height: 18, borderRadius: 4, borderWidth: 1.5 },
  label: { fontSize: 15, fontWeight: '500' },
})
