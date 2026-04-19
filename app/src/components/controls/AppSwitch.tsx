import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type AppSwitchProps = { label: string; value: boolean; onValueChange: (value: boolean) => void }

export function AppSwitch({ label, value, onValueChange }: AppSwitchProps) {
  const { theme } = useTheme()
  return (
    <View className="min-h-11 flex-row items-center justify-between" style={styles.row}>
      <Text style={[styles.label, { color: theme.text.primary }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ true: theme.palette.primary }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: { fontSize: 15, fontWeight: '600' },
})
