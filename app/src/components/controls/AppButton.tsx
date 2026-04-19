import React from 'react'
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native'
import { useTheme } from '../../theme'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type AppButtonProps = {
  label: string
  onPress: () => void
  variant?: Variant
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

export function AppButton({ label, onPress, variant = 'primary', disabled, style }: AppButtonProps) {
  const { theme } = useTheme()
  const tone = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    ghost: 'transparent',
    danger: theme.status.error,
  }[variant]

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: tone,
          borderColor: theme.border,
          opacity: disabled ? 0.5 : pressed ? 0.86 : 1,
        },
        variant === 'ghost' && styles.ghost,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: variant === 'ghost' ? theme.text.primary : theme.text.onPrimary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ghost: { borderWidth: 1 },
  text: { fontSize: 15, fontWeight: '700', letterSpacing: 0.2 },
})
