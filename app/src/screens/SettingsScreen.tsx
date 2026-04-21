import React from 'react'
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { useAuthFlow } from '../context/AuthFlowContext'
import type { RootDrawerParamList } from '../types'
import { fontFamily, useTheme } from '../theme'
import { lightHaptic } from '../utils'
import { useAuth } from '../hooks/session/auth.hook'
import { useThemePreferenceActions } from '../hooks/theme/theme-preference.hook'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import ChevronRow from '../components/shared/ChevronRow'
import Divider from '../components/shared/Divider'
import SettingsCard from '../components/settings/SettingCard'
import SignOutRow from '../components/settings/SignOutRow'
import SwitchRow from '../components/settings/SwitchRow'
import { ASSET_SETTINGS_PLACEHOLDER_AVATAR } from '../constants/assets'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function SettingsScreen() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<DrawerNav>()
  const { accessToken, signOut: signOutUser } = useAuth()
  const { setDarkMode } = useThemePreferenceActions()
  const { openSignIn } = useAuthFlow()
  const [notificationsOn, setNotificationsOn] = React.useState(true)

  const accent = theme.palette.primary
  const secondary = theme.palette.secondary
  const darkOn = mode === 'dark'
  const iconWellBg = mode === 'light' ? 'rgba(255, 165, 0, 0.14)' : 'rgba(255, 184, 0, 0.12)'

  const setDark = (on: boolean) => {
    lightHaptic()
    setDarkMode(on)
  }

  const noop = () => lightHaptic()

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
      screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
      screenHoneycombCenterStyle={ScreenHoneyCombLayoutStyle.center}
    >
      <AppScreenTopBar
        title="Settings"
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={Platform.OS === 'ios'}
      >
        <FadeInMount>
          <SettingsCard>
            <View style={styles.profileInner}>
              <View style={[styles.avatarRing, { borderColor: accent }]}>
                <Image
                  source={ASSET_SETTINGS_PLACEHOLDER_AVATAR}
                  style={styles.profileAvatar}
                  resizeMode="cover"
                />
              </View>
              <Text style={[styles.profileName, { color: theme.text.primary }]}>John Doe</Text>
              <Pressable
                onPress={() => {
                  lightHaptic()
                  navigation.navigate('Account')
                }}
                accessibilityRole="link"
                accessibilityLabel="View profile"
              >
                <Text style={[styles.viewProfile, { color: accent }]}>View Profile</Text>
              </Pressable>
            </View>
          </SettingsCard>

          <SettingsCard>
            <ChevronRow
              icon="account-outline"
              label="Account"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              onPress={() => navigation.navigate('Account')}
            />
            <Divider />
            <SwitchRow
              icon="weather-night"
              label="Dark Mode"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              value={darkOn}
              onValueChange={setDark}
              trackColorOn={secondary}
            />
          </SettingsCard>

          <SettingsCard>
            <ChevronRow
              icon="palette-outline"
              label="Preferences"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              onPress={noop}
            />
            <Divider />
            <ChevronRow
              icon="cog-outline"
              label="Settings"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              onPress={noop}
            />
          </SettingsCard>

          <SettingsCard>
            <ChevronRow
              icon="shield-outline"
              label="Security"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              onPress={noop}
            />
            <Divider />
            <ChevronRow
              icon="lock-outline"
              label="Prosecure"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              onPress={noop}
            />
          </SettingsCard>

          <SettingsCard>
            <SwitchRow
              icon="bell-outline"
              label="Notifications"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              value={notificationsOn}
              onValueChange={v => {
                lightHaptic()
                setNotificationsOn(v)
              }}
              trackColorOn={secondary}
            />
          </SettingsCard>

          <SettingsCard>
            <ChevronRow
              icon="gavel"
              label="Legal"
              iconColor={accent}
              labelColor={theme.text.primary}
              iconWellBg={iconWellBg}
              onPress={noop}
            />
          </SettingsCard>

          <SettingsCard>
            {accessToken ? (
              <SignOutRow iconWellBg={iconWellBg} onPress={() => void signOutUser()} />
            ) : (
              <ChevronRow
                icon="login"
                label="Sign in"
                iconColor={accent}
                labelColor={theme.text.primary}
                iconWellBg={iconWellBg}
                onPress={() => {
                  lightHaptic()
                  openSignIn()
                }}
              />
            )}
          </SettingsCard>

          <Text style={[styles.footerNote, { color: theme.text.muted }]}>
            Units, locales, and integrations will appear here as we expand HoneyMan.
          </Text>
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileInner: {
    alignItems: 'center',
    paddingTop: 22,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 999,
    borderWidth: 3,
    marginBottom: 14,
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
    letterSpacing: 0.2,
  },
  footerNote: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 24,
    marginHorizontal: 22,
    textAlign: 'center',
  },
})
