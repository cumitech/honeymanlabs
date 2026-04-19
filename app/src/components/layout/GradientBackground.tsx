import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, type ColorValue, type ViewStyle } from 'react-native'
import { tokens } from '../../theme/tokens'

type GradientBackgroundProps = {
  colors?: readonly [string, string] | readonly [string, string, string]
  style?: ViewStyle
  children: React.ReactNode
}

const DEFAULT_GRADIENT: readonly [string, string] = [
  tokens.colors.light.surfaceContainer,
  tokens.colors.light.muted,
]

export function GradientBackground({
  colors = DEFAULT_GRADIENT,
  style,
  children,
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      className="flex-1"
      colors={colors as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.base, style]}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({ base: { flex: 1 } })
