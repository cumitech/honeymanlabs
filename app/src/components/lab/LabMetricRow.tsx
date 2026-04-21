import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

type LabMetricRowProps = {
  label: string
  valueLabel: string
  fill: number
}

export function LabMetricRow({ label, valueLabel, fill }: LabMetricRowProps) {
  const { theme } = useTheme()
  const pct = Math.max(0, Math.min(1, fill))

  return (
    <View style={styles.row}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: theme.text.primary }]}>{label}</Text>
        <Text style={[styles.value, { color: theme.text.primary }]}>{valueLabel}</Text>
      </View>
      <View style={[styles.track, { backgroundColor: theme.bg.muted }]}>
        <View
          style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: theme.palette.primary }]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
  },
  value: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 15,
  },
  track: {
    height: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
})
