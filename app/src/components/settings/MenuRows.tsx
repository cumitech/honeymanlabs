import React from 'react'
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact, fireWarningNotification } from '../../utils/safe-haptics'

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name']

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
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.88 }]}
    >
      <View style={styles.iconSlot}>
        <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={[styles.rowLabel, { color: labelColor }]}>{label}</Text>
      <MaterialCommunityIcons name="chevron-right" size={22} color={theme.text.muted} />
    </Pressable>
  )
}

export function MenuSignOutRow({
  label,
  onPress,
}: {
  label?: string
  onPress: () => void | Promise<void>
}) {
  const { theme } = useTheme()
  const destructive = theme.status.error
  return (
    <Pressable
      onPress={() => {
        fireWarningNotification()
        void Promise.resolve(onPress())
      }}
      accessibilityRole="button"
      accessibilityLabel={label ?? 'Sign out'}
      style={({ pressed }) => [styles.signOutPressable, pressed && { opacity: 0.88 }]}
    >
      <View style={styles.signOutRow}>
        <View style={styles.signOutIconSlot}>
          <MaterialCommunityIcons name="logout-variant" size={22} color={destructive} />
        </View>
        <Text
          style={[styles.signOutLabel, { color: destructive }]}
          numberOfLines={1}
        >
          {label ?? 'Sign out'}
        </Text>
      </View>
    </Pressable>
  )
}

export function MenuSwitchRow({
  icon,
  label,
  value,
  onValueChange,
  iconColor,
  labelColor,
}: {
  icon: IconName
  label: string
  value: boolean
  onValueChange: (v: boolean) => void
  iconColor: string
  labelColor: string
}) {
  const { theme } = useTheme()
  return (
    <View style={styles.row}>
      <View style={styles.iconSlot}>
        <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
      </View>
      <Text style={[styles.rowLabel, { color: labelColor, flex: 1 }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: theme.border, true: theme.palette.primary }}
        thumbColor={theme.bg.surface}
        ios_backgroundColor={theme.border}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  signOutPressable: {
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
  signOutLabel: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  iconSlot: {
    width: 32,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
  },
})
