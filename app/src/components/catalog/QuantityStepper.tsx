import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'

export type QuantityStepperProps = {
  quantity: number
  canDecrement: boolean
  canIncrement: boolean
  onDecrement: () => void
  onIncrement: () => void
}

export function QuantityStepper({
  quantity,
  canDecrement,
  canIncrement,
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
  const { theme, mode } = useTheme()
  const barBg = mode === 'light' ? '#FAF6EE' : theme.bg.muted
  const circleBg = mode === 'light' ? '#EDE6D8' : theme.bg.surface
  const labelColor = theme.text.primary
  const valueColor = theme.text.primary
  const iconColor = theme.text.primary
  const ripple =
    Platform.OS === 'android'
      ? { color: `${theme.palette.primary}22`, borderless: true }
      : undefined

  return (
    <View style={[styles.bar, { backgroundColor: barBg, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: labelColor }]}>Quantity</Text>
      <View style={styles.stepper}>
        <Pressable
          onPressIn={() => {
            lightHaptic()
            if (canDecrement) onDecrement()
          }}
          disabled={!canDecrement}
          accessibilityRole="button"
          accessibilityLabel="Decrease quantity"
          accessibilityState={{ disabled: !canDecrement }}
          android_ripple={ripple}
          style={({ pressed }) => [
            styles.stepHit,
            { backgroundColor: circleBg, opacity: !canDecrement ? 0.38 : pressed ? 0.82 : 1 },
          ]}
        >
          <MaterialCommunityIcons name="minus" size={20} color={iconColor} />
        </Pressable>
        <Text style={[styles.value, { color: valueColor }]} accessibilityLiveRegion="polite">
          {quantity}
        </Text>
        <Pressable
          onPressIn={() => {
            lightHaptic()
            if (canIncrement) onIncrement()
          }}
          disabled={!canIncrement}
          accessibilityRole="button"
          accessibilityLabel="Increase quantity"
          accessibilityState={{ disabled: !canIncrement }}
          android_ripple={ripple}
          style={({ pressed }) => [
            styles.stepHit,
            { backgroundColor: circleBg, opacity: !canIncrement ? 0.38 : pressed ? 0.82 : 1 },
          ]}
        >
          <MaterialCommunityIcons name="plus" size={20} color={iconColor} />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 54,
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontFamily: fontFamily.sansBold,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepHit: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    minWidth: 32,
    marginHorizontal: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
})
