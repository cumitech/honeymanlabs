import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { setThemePreference, type ThemePreference } from '../../store/slices/ui-slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fontFamily, useTheme } from '../../theme'

const OPTIONS: {
  value: ThemePreference
  label: string
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
}[] = [
  { value: 'light', label: 'Light', icon: 'white-balance-sunny' },
  { value: 'dark', label: 'Dark', icon: 'weather-night' },
  { value: 'system', label: 'System', icon: 'theme-light-dark' },
]

export function AppearanceThemeSection() {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const preference = useAppSelector(s => s.ui.themePreference)

  return (
    <View className="mb-6">
      <Text
        style={{
          fontFamily: fontFamily.sansBold,
          fontSize: 13,
          color: theme.text.muted,
          marginBottom: 10,
          letterSpacing: 0.6,
        }}
      >
        APPEARANCE
      </Text>
      <View className="flex-row gap-2">
        {OPTIONS.map(opt => {
          const selected = preference === opt.value
          return (
            <Pressable
              key={opt.value}
              onPress={() => dispatch(setThemePreference(opt.value))}
              className="min-h-[44px] flex-1 flex-row items-center justify-center gap-1.5 rounded-xl px-2"
              style={{
                backgroundColor: selected ? theme.palette.primary : theme.bg.muted,
                borderWidth: selected ? 0 : StyleSheet.hairlineWidth,
                borderColor: theme.border,
              }}
            >
              <MaterialCommunityIcons
                name={opt.icon}
                size={18}
                color={selected ? theme.text.onPrimary : theme.text.primary}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: fontFamily.sansMedium,
                  fontSize: 13,
                  color: selected ? theme.text.onPrimary : theme.text.primary,
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
