import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FAB_SAFE_BOTTOM_MIN, TAB_BAR_CLEARANCE } from '../../constants'
import { useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export function HiveComposeFab() {
  const { theme, mode } = useTheme()
  const insets = useSafeAreaInsets()

  const onPress = () => {
    fireLightImpact()
  }

  const bottom = Math.max(insets.bottom, FAB_SAFE_BOTTOM_MIN) + TAB_BAR_CLEARANCE

  const fabColors =
    mode === 'dark'
      ? ([theme.palette.secondary, theme.palette.primary, theme.palette.surfaceContainer] as const)
      : ([theme.palette.secondary, theme.palette.primary, theme.bg.muted] as const)

  return (
    <View style={[styles.host, { bottom }]} pointerEvents="box-none">
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Create post">
        <LinearGradient
          colors={[...fabColors]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <MaterialCommunityIcons name="plus" size={30} color={theme.text.onPrimary} />
        </LinearGradient>
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
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
})
