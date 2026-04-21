import React from 'react'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '../../theme'
import { lightHaptic } from '../../utils'

type DrawerMenuButtonProps = {
  onOpenDrawer: () => void
}

export function DrawerMenuButton({ onOpenDrawer }: DrawerMenuButtonProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPressIn={lightHaptic}
      onPress={onOpenDrawer}
      hitSlop={10}
      accessibilityLabel="Open menu"
      style={({ pressed }) => [{ opacity: pressed ? 0.55 : 1, padding: 4 }]}
    >
      <MaterialCommunityIcons name="menu" size={22} color={theme.text.primary} />
    </Pressable>
  )
}
