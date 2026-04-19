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
          shadowColor: mode === 'dark' ? '#000000' : '#1B1200',
          shadowOpacity: mode === 'dark' ? 0.1 : 0.04,
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
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    elevation: 1,
    padding: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 52,
  },
})
