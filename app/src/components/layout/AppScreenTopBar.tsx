import React from 'react'
import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ASSET_BEE_LOGO } from '../../constants'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type AppScreenTopBarProps = {
  title: string
  /** Landing-style bee + title when true (default: title is HoneyMan). */
  showBee?: boolean
  leading: 'menu' | 'back'
  onLeadingPress: () => void
  right?: React.ReactNode
  /** Rendered below the title row with the same horizontal inset as the bar. */
  footer?: React.ReactNode
  /** When set (e.g. stack headers), fills behind the bar; omit for transparent overlays. */
  backgroundColor?: string
}

export function AppScreenTopBar({
  title,
  showBee = title === 'HoneyMan',
  leading,
  onLeadingPress,
  right,
  footer,
  backgroundColor,
}: AppScreenTopBarProps) {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const barBg = backgroundColor ?? 'transparent'

  const onPressLeading = () => {
    fireLightImpact()
    onLeadingPress()
  }

  return (
    <View style={[styles.column, { paddingTop: Math.max(insets.top, 10), backgroundColor: barBg }]}>
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

type AppScreenTopBarAccountButtonProps = {
  onPress: () => void
}

/** Default profile control used on Home (icon in ring). */
export function AppScreenTopBarAccountButton({ onPress }: AppScreenTopBarAccountButtonProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={() => {
        fireLightImpact()
        onPress()
      }}
      style={styles.avatarHit}
      accessibilityRole="button"
      accessibilityLabel="Account"
    >
      <View style={[styles.avatarRing, { borderColor: theme.palette.primary }]}>
        <View style={[styles.avatarInner, { backgroundColor: theme.bg.muted }]}>
          <MaterialCommunityIcons name="account" size={22} color={theme.text.muted} />
        </View>
      </View>
    </Pressable>
  )
}

type AppScreenTopBarProfileAvatarProps = {
  source: ImageSourcePropType
  onPress?: () => void
}

/** Profile photo in the same ring size as the home account control. */
export function AppScreenTopBarProfileAvatar({ source, onPress }: AppScreenTopBarProfileAvatarProps) {
  const { theme } = useTheme()
  const ring = `${theme.palette.primary}CC`
  return (
    <Pressable
      onPress={() => {
        fireLightImpact()
        onPress?.()
      }}
      disabled={!onPress}
      style={styles.avatarHit}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel="Profile"
    >
      <View style={[styles.avatarRing, { borderColor: ring }]}>
        <Image source={source} style={styles.avatarPhoto} resizeMode="cover" />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  column: {
    paddingHorizontal: 12,
    paddingBottom: 6,
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
  avatarHit: {
    padding: 4,
  },
  avatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
})
