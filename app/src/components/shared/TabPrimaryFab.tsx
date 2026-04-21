import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FAB_SAFE_BOTTOM_MIN, TAB_BAR_CLEARANCE } from '../../constants'
import { useTheme } from '../../theme'

export type TabPrimaryFabProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  iconSize?: number
  onPress: () => void
  accessibilityLabel: string
  borderRadius?: number
}

export const TabPrimaryFab = ({
  icon,
  iconSize = 28,
  onPress,
  accessibilityLabel,
  borderRadius = 29,
}: TabPrimaryFabProps) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const bottom = Math.max(insets.bottom, FAB_SAFE_BOTTOM_MIN) + TAB_BAR_CLEARANCE

  return (
    <View style={[styles.host, { bottom }]} pointerEvents="box-none">
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
      >
        <View style={[styles.fab, { backgroundColor: theme.palette.primary, borderRadius }]}>
          <MaterialCommunityIcons name={icon} size={iconSize} color={theme.text.onPrimary} />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    right: 18,
    zIndex: 20,
  },
  fab: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
