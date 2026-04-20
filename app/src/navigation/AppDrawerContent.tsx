import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { RootDrawerParamList } from '../types'
import { drawerHoneyGradientFor } from './DrawerSurface'
import HoneyManLogoMark from '../assets/logo.svg'
import { fontFamily, useTheme } from '../theme'
import { MenuFooterActionRow, MenuSignOutRow } from '../components/settings/MenuRows'
import { useAuthLauncher } from '../context/AuthLauncherContext'
import { useAppSelector } from '../store/hooks'
import { fireLightImpact, fireSelection } from '../utils/safe-haptics'

type AppDrawerContentProps = DrawerContentComponentProps & {
  onSignOut: () => void | Promise<void>
}

type DrawerLink = {
  label: string
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  route?: keyof RootDrawerParamList
}

const LINKS: DrawerLink[] = [
  { label: 'Home', icon: 'home-variant-outline' },
  { label: 'Orders & traceability', icon: 'package-variant-closed', route: 'Traceability' },
  { label: 'Apiaries', icon: 'hexagon-multiple-outline', route: 'Apiaries' },
  { label: 'Account', icon: 'account-circle-outline', route: 'Account' },
  { label: 'Settings', icon: 'cog-outline', route: 'Settings' },
  { label: 'Help & support', icon: 'lifebuoy', route: 'Support' },
]

export function AppDrawerContent({ navigation, onSignOut }: AppDrawerContentProps) {
  const { theme, mode } = useTheme()
  const insets = useSafeAreaInsets()
  const accessToken = useAppSelector(s => s.session.accessToken)
  const isSignedIn = Boolean(accessToken)
  const { openSignIn, openSignUp } = useAuthLauncher()
  const honey = drawerHoneyGradientFor(mode)
  const iconTint = theme.palette.primary
  const rowIdleBg = mode === 'dark' ? 'rgba(255, 184, 0, 0.06)' : 'rgba(255, 140, 0, 0.07)'
  const rowPressedBg = mode === 'dark' ? 'rgba(255, 184, 0, 0.14)' : 'rgba(255, 165, 0, 0.16)'
  const iconWellBg = mode === 'dark' ? 'rgba(255, 184, 0, 0.12)' : 'rgba(255, 165, 0, 0.16)'

  const goHome = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Main',
        params: { screen: 'Home' },
      }),
    )
  }

  const closeDrawer = () => {
    fireLightImpact()
    navigation.closeDrawer()
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        pointerEvents="none"
        colors={[...honey.colors]}
        locations={[...honey.locations]}
        start={honey.start}
        end={honey.end}
        style={StyleSheet.absoluteFill}
      />

      <View pointerEvents="none" style={styles.cornerLayer}>
        <Image
          source={require('../assets/honycomb-layout-right-top.png')}
          style={[
            styles.cornerTopRight,
            { top: insets.top + 50, opacity: mode === 'dark' ? 0.55 : 0.92 },
          ]}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/honycomb-layout-left-bottom.png')}
          style={[styles.cornerBottomLeft, { opacity: mode === 'dark' ? 0.52 : 0.88 }]}
          resizeMode="contain"
        />
      </View>

      <DrawerContentScrollView
        contentContainerStyle={[
          styles.scroll,
          {
            paddingTop: Math.max(insets.top, 12) + 4,
            backgroundColor: 'transparent',
          },
        ]}
        style={{ backgroundColor: 'transparent' }}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerTextBlock}>
            <View style={styles.drawerBrandRow}>
              <HoneyManLogoMark width={32} height={26} accessibilityLabel="HoneyMan" />
              <Text
                style={[
                  styles.brand,
                  {
                    color: theme.text.primary,
                    textShadowColor: mode === 'dark' ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.5)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: mode === 'dark' ? 4 : 2,
                  },
                ]}
              >
                HoneyMan
              </Text>
            </View>
            <Text style={[styles.tagline, { color: theme.text.muted }]}>Hive to jar, clearly.</Text>
          </View>
          <Pressable
            onPress={closeDrawer}
            hitSlop={14}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
            style={({ pressed }) => [
              styles.closeFab,
              {
                backgroundColor: pressed ? rowPressedBg : iconWellBg,
                borderColor: mode === 'dark' ? 'rgba(255,184,0,0.2)' : 'rgba(129, 81, 0, 0.12)',
              },
            ]}
          >
            <MaterialCommunityIcons name="close" size={22} color={theme.text.primary} />
          </Pressable>
        </View>

        <View style={[styles.sectionLabelWrap, { borderBottomColor: theme.border }]}>
          <Text style={[styles.sectionLabel, { color: theme.text.muted }]}>MENU</Text>
        </View>

        <View style={styles.links}>
          {LINKS.map(item => (
            <Pressable
              key={item.label}
              android_ripple={{ color: theme.palette.primary, borderless: false }}
              onPress={() => {
                fireSelection()
                if (item.route) {
                  navigation.navigate(item.route)
                } else {
                  goHome()
                }
              }}
              style={({ pressed }) => [
                styles.rowOuter,
                {
                  backgroundColor: pressed ? rowPressedBg : rowIdleBg,
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(27, 18, 0, 0.06)',
                },
              ]}
            >
              <View style={styles.rowInner}>
                <View style={[styles.rowIconWell, { backgroundColor: iconWellBg }]}>
                  <MaterialCommunityIcons name={item.icon} size={22} color={iconTint} />
                </View>
                <Text
                  style={[styles.rowLabel, { color: theme.text.primary }]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.spacer} />

        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          {isSignedIn ? (
            <MenuSignOutRow
              iconWellBackgroundColor={iconWellBg}
              onPress={() => {
                navigation.closeDrawer()
                void Promise.resolve(onSignOut())
              }}
            />
          ) : (
            <View style={styles.guestAuth}>
              <MenuFooterActionRow
                icon="login"
                label="Sign in"
                iconColor={iconTint}
                labelColor={theme.text.primary}
                iconWellBackgroundColor={iconWellBg}
                onPress={() => {
                  navigation.closeDrawer()
                  openSignIn()
                }}
              />
              <MenuFooterActionRow
                icon="account-plus-outline"
                label="Create account"
                iconColor={iconTint}
                labelColor={theme.text.primary}
                iconWellBackgroundColor={iconWellBg}
                onPress={() => {
                  navigation.closeDrawer()
                  openSignUp()
                }}
              />
            </View>
          )}
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  cornerLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'visible',
  },
  cornerTopRight: {
    position: 'absolute',
    right: 4,
    width: '58%',
    maxWidth: 200,
    height: 268,
  },
  cornerBottomLeft: {
    position: 'absolute',
    left: 4,
    bottom: 8,
    width: '54%',
    maxWidth: 188,
    height: 248,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 28,
    paddingHorizontal: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 18,
  },
  headerTextBlock: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },
  drawerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  closeFab: {
    width: 44,
    height: 44,
    marginTop: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  brand: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 26,
    letterSpacing: 0.2,
  },
  tagline: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  sectionLabelWrap: {
    marginHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 11,
    letterSpacing: 1.1,
  },
  links: {
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  rowOuter: {
    marginBottom: 8,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  rowIconWell: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    lineHeight: 20,
  },
  rowChevron: {
    marginLeft: 8,
    flexShrink: 0,
  },
  spacer: {
    flexGrow: 1,
    minHeight: 24,
  },
  footer: {
    paddingTop: 12,
    marginHorizontal: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  guestAuth: {
    paddingBottom: 4,
    gap: 2,
  },
})
