import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { ComponentProps } from 'react'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

export type HeaderRightProps = {
  onPress: () => void
  accessibilityLabel: string
  iconName?: IconName
  badgeCount?: number
}

export const HeaderRight = ({
  onPress,
  accessibilityLabel,
  iconName = 'cart-outline',
  badgeCount,
}: HeaderRightProps) => {
  const { theme } = useTheme()
  const showBadge = typeof badgeCount === 'number' && badgeCount > 0

  return (
    <Pressable
      onPressIn={lightHaptic}
      onPress={onPress}
      style={styles.hit}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <MaterialCommunityIcons name={iconName} size={24} color={theme.text.primary} />
      {showBadge ? (
        <View style={[styles.badge, { backgroundColor: theme.palette.primary }]}>
          <Text style={[styles.badgeText, { color: theme.text.onPrimary }]}>
            {badgeCount! > 9 ? '9+' : String(badgeCount)}
          </Text>
        </View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  hit: {
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: fontFamily.sansBold,
  },
})
