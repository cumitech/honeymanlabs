import React from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { setThemePreference } from '../store/slices/ui-slice'
import { useAppDispatch } from '../store/hooks'
import type { RootDrawerParamList } from '../types'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import {
  AppScreenTopBar,
  AppScreenTopBarProfileAvatar,
} from '../components/layout/AppScreenTopBar'
import { signOut } from '../utils/sign-out'
import { MenuChevronRow, MenuSignOutRow, MenuSwitchRow } from '../components/settings/MenuRows'
import { SettingsMenuCard, SettingsMenuDivider } from '../components/settings/SettingsMenuCard'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

const AVATAR = require('../assets/avatars/avatar.png')

export function SettingsScreen() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<DrawerNav>()
  const dispatch = useAppDispatch()
  const [notificationsOn, setNotificationsOn] = React.useState(true)

  const accent = theme.palette.primary
  const darkOn = mode === 'dark'

  const setDark = (on: boolean) => {
    fireLightImpact()
    dispatch(setThemePreference(on ? 'dark' : 'light'))
  }

  const noop = () => fireLightImpact()

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
    >
      <AppScreenTopBar
        title="Settings"
        showBee={false}
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
        right={
          <AppScreenTopBarProfileAvatar
            source={AVATAR}
            onPress={() => navigation.navigate('Account')}
          />
        }
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={Platform.OS === 'ios'}
      >
        <FadeInMount>
          <View
            style={[
              styles.profileBlock,
              {
                backgroundColor: theme.bg.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={[styles.avatarRing, { borderColor: accent }]}>
              <Image source={AVATAR} style={styles.profileAvatar} resizeMode="cover" />
            </View>
            <Text style={[styles.profileName, { color: theme.text.primary }]}>John Doe</Text>
            <Pressable
              onPress={() => {
                fireLightImpact()
                navigation.navigate('Account')
              }}
            >
              <Text style={[styles.viewProfile, { color: accent }]}>View Profile</Text>
            </Pressable>
          </View>

          <View style={styles.listPad}>
            <SettingsMenuCard>
              <MenuChevronRow
                icon="account-outline"
                label="Account"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={() => navigation.navigate('Account')}
              />
              <SettingsMenuDivider />
              <MenuSwitchRow
                icon="weather-night"
                label="Dark mode"
                value={darkOn}
                onValueChange={setDark}
                iconColor={accent}
                labelColor={theme.text.primary}
              />
            </SettingsMenuCard>

            <SettingsMenuCard>
              <MenuChevronRow
                icon="palette-outline"
                label="Preferences"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
              <SettingsMenuDivider />
              <MenuChevronRow
                icon="cog-outline"
                label="General"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
            </SettingsMenuCard>

            <SettingsMenuCard>
              <MenuChevronRow
                icon="shield-outline"
                label="Security"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
              <SettingsMenuDivider />
              <MenuChevronRow
                icon="lock-outline"
                label="Privacy"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
            </SettingsMenuCard>

            <SettingsMenuCard>
              <MenuSwitchRow
                icon="bell-outline"
                label="Notifications"
                value={notificationsOn}
                onValueChange={v => {
                  fireLightImpact()
                  setNotificationsOn(v)
                }}
                iconColor={accent}
                labelColor={theme.text.primary}
              />
            </SettingsMenuCard>

            <SettingsMenuCard>
              <MenuChevronRow
                icon="gavel"
                label="Legal"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
            </SettingsMenuCard>

            <SettingsMenuCard>
              <MenuSignOutRow onPress={() => signOut()} />
            </SettingsMenuCard>

            <Text style={[styles.footerNote, { color: theme.text.muted }]}>
              Units, locales, and integrations will appear here as we expand HoneyMan.
            </Text>
          </View>
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  profileBlock: {
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 6,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    paddingTop: 20,
    paddingBottom: 22,
    paddingHorizontal: 20,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 999,
    borderWidth: 3,
    marginBottom: 12,
  },
  profileAvatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileName: {
    fontFamily: fontFamily.sansBold,
    fontSize: 20,
    marginBottom: 8,
  },
  viewProfile: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    textDecorationLine: 'underline',
    letterSpacing: 0.15,
  },
  listPad: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  footerNote: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 24,
  },
})
