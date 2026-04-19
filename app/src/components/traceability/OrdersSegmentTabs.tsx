import React from 'react'
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type OrdersTab = 'active' | 'history'

type OrdersSegmentTabsProps = {
  value: OrdersTab
  onChange: (tab: OrdersTab) => void
}

const TAB_INNER_H = 36
const TAB_PAD_X = 14
const TRACK_PAD_V = 4
const TRACK_PAD_H = 3

const androidTextProps = Platform.OS === 'android' ? ({ includeFontPadding: false } as const) : {}

export function OrdersSegmentTabs({ value, onChange }: OrdersSegmentTabsProps) {
  const { theme, mode } = useTheme()

  const pick = (tab: OrdersTab) => {
    if (tab === value) return
    fireLightImpact()
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    onChange(tab)
  }

  const trackBorder = theme.border
  const trackBg =
    mode === 'light' ? 'rgba(212, 160, 23, 0.18)' : theme.bg.muted
  const inactiveLabel =
    mode === 'light' ? 'rgba(27, 18, 0, 0.58)' : theme.text.muted
  const gradStart = theme.palette.primary
  const gradEnd = theme.palette.secondary

  return (
    <View style={styles.outer}>
      <View style={[styles.track, { backgroundColor: trackBg, borderColor: trackBorder }]}>
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: value === 'active' }}
          onPress={() => pick('active')}
          style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
        >
          <View style={styles.cellInner}>
            {value === 'active' ? (
              <LinearGradient
                colors={[gradStart, gradEnd]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradFill}
              >
                <Text style={[styles.labelActive, { color: theme.text.onPrimary }]} {...androidTextProps}>
                  Active
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.idleInner}>
                <Text style={[styles.labelIdle, { color: inactiveLabel }]} {...androidTextProps}>
                  Active
                </Text>
              </View>
            )}
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: value === 'history' }}
          onPress={() => pick('history')}
          style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
        >
          <View style={styles.cellInner}>
            {value === 'history' ? (
              <LinearGradient
                colors={[gradStart, gradEnd]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradFill}
              >
                <Text style={[styles.labelActive, { color: theme.text.onPrimary }]} {...androidTextProps}>
                  History
                </Text>
              </LinearGradient>
            ) : (
              <View style={styles.idleInner}>
                <Text style={[styles.labelIdle, { color: inactiveLabel }]} {...androidTextProps}>
                  History
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
  },
  track: {
    alignSelf: 'center',
    width: 164,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: TRACK_PAD_V,
    paddingHorizontal: TRACK_PAD_H,
    overflow: 'hidden',
  },
  cell: {
    flex: 1,
    minWidth: 0,
    borderRadius: 999,
    overflow: 'hidden',
  },
  /** Explicit box so LinearGradient always gets real dimensions (Pressable + absoluteFill can collapse on Android). */
  cellInner: {
    height: TAB_INNER_H,
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  gradFill: {
    flex: 1,
    width: '100%',
    height: TAB_INNER_H,
    paddingHorizontal: TAB_PAD_X,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
  },
  idleInner: {
    flex: 1,
    width: '100%',
    height: TAB_INNER_H,
    paddingHorizontal: TAB_PAD_X,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelActive: {
    fontFamily: fontFamily.sansBold,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.15,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
  },
  labelIdle: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.1,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
  },
})
