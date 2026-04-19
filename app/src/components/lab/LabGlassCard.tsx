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
      ? 'rgba(255, 184, 0, 0.35)'
      : 'rgba(255, 165, 0, 0.45)'
    : theme.border

  return (
    <View
      style={[
        styles.card,
        emphasis && styles.cardEmphasis,
        { backgroundColor: bg, borderColor: border },
        style,
      ]}
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
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardEmphasis: {
    shadowColor: 'rgba(255, 184, 0, 0.45)',
    shadowOpacity: 0.22,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
})
