import React from 'react'
import { StyleSheet, View, type ViewProps } from 'react-native'
import { useTheme } from '../../theme'

type SettingsMenuCardProps = ViewProps & {
  children: React.ReactNode
}

export function SettingsMenuCard({ children, style, ...rest }: SettingsMenuCardProps) {
  const { theme, mode } = useTheme()
  const fill = mode === 'light' ? '#FFFFFF' : theme.bg.card

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: fill,
          borderColor: theme.border,
          shadowColor: mode === 'dark' ? 'rgba(0,0,0,0.45)' : 'rgba(27, 18, 0, 0.08)',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}

export function SettingsMenuDivider() {
  const { theme } = useTheme()
  return <View style={[styles.divider, { backgroundColor: theme.border }]} />
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 14,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
    padding: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 52,
  },
})
