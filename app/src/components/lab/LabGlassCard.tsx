import React from 'react'
import { StyleSheet, View, type ViewProps } from 'react-native'
import { useTheme } from '../../theme'

type LabGlassCardProps = ViewProps & {
  emphasis?: boolean
}

export function LabGlassCard({ style, emphasis, children, ...rest }: LabGlassCardProps) {
  const { theme, mode } = useTheme()
  const bg = mode === 'dark' ? 'rgba(28, 24, 18, 0.55)' : 'rgba(255, 255, 255, 0.5)'
  const border = emphasis
    ? mode === 'dark'
      ? 'rgba(255, 184, 0, 0.22)'
      : 'rgba(255, 165, 0, 0.28)'
    : theme.border

  return (
    <View
      style={[styles.card, { backgroundColor: bg, borderColor: border }, style]}
      {...rest}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
})
