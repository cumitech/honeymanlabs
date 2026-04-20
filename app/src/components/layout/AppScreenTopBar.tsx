import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ASSET_BEE_LOGO } from '../../constants'
import { APP_HEADER_TO_BODY_GAP } from '../../constants/layout'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type AppScreenTopBarProps = {
  title: string
  showBee?: boolean
  leading: 'menu' | 'back'
  onLeadingPress: () => void
  right?: React.ReactNode
  footer?: React.ReactNode
  backgroundColor?: string
  contentGap?: number
}

export function AppScreenTopBar({
  title,
  showBee = true,
  leading,
  onLeadingPress,
  right,
  footer,
  backgroundColor,
  contentGap,
}: AppScreenTopBarProps) {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const barBg = backgroundColor ?? 'transparent'

  const onPressLeading = () => {
    fireLightImpact()
    onLeadingPress()
  }

  const bodyGap = contentGap ?? APP_HEADER_TO_BODY_GAP

  return (
    <View
      style={[
        styles.column,
        {
          paddingTop: Math.max(insets.top, 10),
          paddingBottom: bodyGap,
          backgroundColor: barBg,
        },
      ]}
    >
      <View style={styles.topBar}>
        <Pressable
          onPress={onPressLeading}
          style={styles.menuFab}
          accessibilityRole="button"
          accessibilityLabel={leading === 'menu' ? 'Open menu' : 'Go back'}
        >
          <MaterialCommunityIcons
            name={leading === 'menu' ? 'menu' : 'chevron-left'}
            size={22}
            color={theme.text.primary}
          />
        </Pressable>
        <View style={styles.brandRow}>
          {showBee ? (
            <Image source={ASSET_BEE_LOGO} style={styles.beeIcon} resizeMode="contain" />
          ) : null}
          <Text style={[styles.brandWordmark, { color: theme.text.primary }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.topBarSpacer} />
        {right != null ? right : <View style={styles.rightPlaceholder} />}
      </View>
      {footer ? <View style={styles.footerSlot}>{footer}</View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  column: {
    paddingHorizontal: 12,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuFab: {
    padding: 8,
    marginRight: -4,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
    minWidth: 0,
  },
  beeIcon: {
    width: 28,
    height: 28,
  },
  brandWordmark: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    letterSpacing: 0.2,
    flexShrink: 1,
  },
  topBarSpacer: {
    flex: 1,
  },
  rightPlaceholder: {
    width: 48,
    height: 48,
  },
  footerSlot: {
    marginTop: 12,
  },
})
