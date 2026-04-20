import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact, fireWarningNotification } from '../../utils/safe-haptics'

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name']

export function MenuFooterActionRow({
  icon,
  label,
  iconColor,
  labelColor,
  onPress,
  useWarningHaptic = false,
  iconWellBackgroundColor,
}: {
  icon: IconName
  label: string
  iconColor: string
  labelColor: string
  onPress: () => void | Promise<void>
  useWarningHaptic?: boolean
  iconWellBackgroundColor?: string
}) {
  const iconNode = <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
  return (
    <Pressable
      onPress={() => {
        if (useWarningHaptic) fireWarningNotification()
        else fireLightImpact()
        void Promise.resolve(onPress())
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.signOutPressable, pressed && { opacity: 0.88 }]}
    >
      <View style={styles.signOutRow}>
        {iconWellBackgroundColor != null ? (
          <View style={[styles.signOutIconWell, { backgroundColor: iconWellBackgroundColor }]}>{iconNode}</View>
        ) : (
          <View style={styles.signOutIconSlot}>{iconNode}</View>
        )}
        <Text style={[styles.signOutLabel, { color: labelColor }]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  )
}

export function MenuChevronRow({
  icon,
  label,
  onPress,
  iconColor,
  labelColor,
}: {
  icon: IconName
  label: string
  onPress: () => void
  iconColor: string
  labelColor: string
}) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={() => {
        fireLightImpact()
        onPress()
      }}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.chevronPressable, pressed && { opacity: 0.88 }]}
    >
      <View style={styles.row}>
        <View style={styles.iconSlot}>
          <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
        </View>
        <Text style={[styles.rowLabel, { color: labelColor }]}>{label}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={theme.text.muted}
          style={styles.rowChevron}
        />
      </View>
    </Pressable>
  )
}

export function MenuSignOutRow({
  label,
  onPress,
  iconWellBackgroundColor,
}: {
  label?: string
  onPress: () => void | Promise<void>
  iconWellBackgroundColor?: string
}) {
  const { theme } = useTheme()
  const destructive = theme.status.error
  return (
    <MenuFooterActionRow
      icon="logout-variant"
      label={label ?? 'Sign out'}
      iconColor={destructive}
      labelColor={destructive}
      onPress={onPress}
      useWarningHaptic
      iconWellBackgroundColor={iconWellBackgroundColor}
    />
  )
}

const styles = StyleSheet.create({
  signOutPressable: {
    width: '100%',
    alignSelf: 'stretch',
    minHeight: 52,
    paddingVertical: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  signOutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
  },
  signOutIconSlot: {
    width: 32,
    marginRight: 10,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutIconWell: {
    width: 40,
    height: 40,
    borderRadius: 12,
    marginRight: 12,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutLabel: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
  },
  chevronPressable: {
    width: '100%',
    alignSelf: 'stretch',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    minHeight: 52,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  iconSlot: {
    width: 32,
    marginRight: 10,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
  },
  rowChevron: {
    flexShrink: 0,
  },
})
