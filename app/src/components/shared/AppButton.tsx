import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import type { SemanticTheme } from '../../theme/semantic'
import type { ThemeMode } from '../../theme/tokens'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'ctaHero'
  | 'ctaCompact'
  | 'onboarding'
  | 'category'
  | 'categoryIcon'

export type AppButtonProps = {
  variant?: AppButtonVariant
  label?: string
  onPress: () => void
  disabled?: boolean
  loading?: boolean
  loadingOpacity?: number
  opacityWhenBusy?: number
  /** Pill category chip (shop filters). */
  selected?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  accessibilityLabel?: string
}

export function AppButton({
  variant = 'primary',
  label,
  onPress,
  disabled = false,
  loading = false,
  loadingOpacity,
  opacityWhenBusy = 0.85,
  selected = false,
  style,
  textStyle,
  children,
  accessibilityLabel,
}: AppButtonProps) {
  const { theme, mode } = useTheme()

  if (variant === 'category' || variant === 'categoryIcon') {
    return (
      <CategoryAppButton
        variant={variant}
        label={label}
        onPress={onPress}
        disabled={disabled}
        selected={selected}
        style={style}
        children={children}
        accessibilityLabel={accessibilityLabel}
        theme={theme}
        mode={mode}
      />
    )
  }

  const isCta = variant === 'ctaHero' || variant === 'ctaCompact'
  const isDisabled = Boolean(disabled || loading)
  const busyOpacity = loadingOpacity ?? opacityWhenBusy
  const ctaOpacity = loading ? busyOpacity : disabled && !loading ? 0.55 : 1

  const toneBg: Record<string, string> = {
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
    ghost: 'transparent',
    danger: theme.status.error,
    ctaHero: theme.palette.primary,
    ctaCompact: theme.palette.primary,
    onboarding: theme.palette.primary,
  }

  const labelColor: Record<string, string> = {
    primary: theme.text.onPrimary,
    secondary: theme.text.onPrimary,
    ghost: theme.text.primary,
    danger: theme.text.onPrimary,
    ctaHero: theme.bg.surface,
    ctaCompact: theme.bg.surface,
    onboarding: theme.text.onPrimary,
  }

  const spinnerColor = labelColor[variant] ?? theme.text.onPrimary

  const dim =
    variant === 'ctaHero'
      ? CTA_HERO
      : variant === 'ctaCompact'
        ? CTA_COMPACT
        : variant === 'onboarding'
          ? ONBOARDING
          : DEFAULT_DIM

  const bg = toneBg[variant] ?? theme.palette.primary
  const color = labelColor[variant] ?? theme.text.onPrimary

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [
        styles.base,
        dim.container,
        variant === 'primary' || variant === 'secondary' || variant === 'danger'
          ? { borderColor: theme.border }
          : null,
        variant === 'ghost' ? [styles.ghostBorder, { borderColor: theme.border }] : null,
        variant === 'onboarding' ? [styles.onboardingBorder, { borderColor: theme.border }] : null,
        {
          backgroundColor: bg,
          opacity: isCta
            ? ctaOpacity
            : disabled
              ? 0.5
              : pressed
                ? 0.86
                : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={[styles.label, dim.text, { color }, textStyle]}>{label}</Text>
      )}
    </Pressable>
  )
}

function CategoryAppButton({
  variant,
  label,
  onPress,
  disabled,
  selected,
  style,
  children,
  accessibilityLabel,
  theme,
  mode,
}: {
  variant: 'category' | 'categoryIcon'
  label?: string
  onPress: () => void
  disabled?: boolean
  selected: boolean
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  accessibilityLabel?: string
  theme: SemanticTheme
  mode: ThemeMode
}) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const idleBorderColor = mode === 'dark' ? 'rgba(253, 246, 234, 0.14)' : 'rgba(26, 16, 0, 0.10)'
  const idleLabelColor = mode === 'dark' ? theme.text.primary : theme.palette.accent
  const activeLabelColor = mode === 'dark' ? theme.text.primary : theme.text.onPrimary
  const chipFill = mode === 'dark' ? 'rgba(253, 246, 234, 0.06)' : 'rgba(129, 81, 0, 0.04)'
  const chipFillPressed = mode === 'dark' ? 'rgba(253, 246, 234, 0.12)' : 'rgba(129, 81, 0, 0.10)'
  const chipFillActive = mode === 'dark' ? 'rgba(255, 184, 0, 0.26)' : theme.palette.primary
  const chipFillActivePressed =
    mode === 'dark' ? 'rgba(255, 184, 0, 0.34)' : 'rgba(255, 165, 0, 0.82)'

  const handlePressIn = () => {
    if (!disabled) fireLightImpact()
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start()
  }

  const isIcon = variant === 'categoryIcon'

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={
          isIcon ? { disabled: !!disabled } : { selected, disabled: !!disabled }
        }
        style={({ pressed }) => [
          isIcon ? styles.chipIcon : styles.chip,
          styles.chipLift,
          {
            borderColor: isIcon ? idleBorderColor : selected ? theme.palette.primary : idleBorderColor,
            backgroundColor: isIcon
              ? pressed
                ? chipFillPressed
                : chipFill
              : selected
                ? pressed
                  ? chipFillActivePressed
                  : chipFillActive
                : pressed
                  ? chipFillPressed
                  : chipFill,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        {!isIcon && selected ? (
          <View style={[styles.selectedDot, { backgroundColor: theme.palette.primary }]} />
        ) : null}
        {!isIcon && label ? (
          <Text
            style={[
              styles.chipLabel,
              {
                color: selected ? activeLabelColor : idleLabelColor,
                fontFamily: selected ? fontFamily.sansBold : fontFamily.sansMedium,
                marginLeft: selected ? 6 : 0,
              },
            ]}
          >
            {label}
          </Text>
        ) : null}
        {isIcon ? children : null}
      </Pressable>
    </Animated.View>
  )
}

const CTA_HERO = {
  container: { minHeight: 64, borderRadius: 999, alignItems: 'center' as const, justifyContent: 'center' as const },
  text: { fontSize: 38, lineHeight: 42, fontFamily: fontFamily.accent, letterSpacing: 0.3 },
}

const CTA_COMPACT = {
  container: { minHeight: 56, borderRadius: 999, alignItems: 'center' as const, justifyContent: 'center' as const },
  text: { fontSize: 28, lineHeight: 32, fontFamily: fontFamily.accent, letterSpacing: 0.3 },
}

const ONBOARDING = {
  container: {
    minHeight: 54,
    borderRadius: 999,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: 14,
  },
  text: {
    fontFamily: fontFamily.sansBold,
    fontSize: 18,
    letterSpacing: 0.2,
    textTransform: 'capitalize' as const,
  },
}

const DEFAULT_DIM = {
  container: {
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
  },
  text: { fontSize: 15, fontWeight: '700' as const, letterSpacing: 0.2 },
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostBorder: {
    borderWidth: 1,
  },
  onboardingBorder: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: {},
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
    minHeight: 40,
    justifyContent: 'center',
  },
  chipIcon: {
    borderWidth: 1,
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLift: {
    shadowColor: '#1B1200',
    shadowOpacity: 0.035,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  selectedDot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    opacity: 0.85,
  },
  chipLabel: {
    fontSize: 13.5,
    letterSpacing: 0.15,
  },
})
