import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

type ProfileEditLinkProps = { label?: string; onPress?: () => void }

export function ProfileEditLink({ label = 'Edit', onPress }: ProfileEditLinkProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPressIn={fireLightImpact}
      onPress={onPress}
      hitSlop={10}
      style={({ pressed }) => [
        styles.editChip,
        {
          borderColor: theme.border,
          backgroundColor: pressed ? theme.bg.muted : theme.bg.card,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Text style={[styles.editLink, { color: theme.palette.primary }]}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  editChip: {
    minHeight: 30,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editLink: {
    fontFamily: fontFamily.sansBold,
    fontSize: 12,
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
})
