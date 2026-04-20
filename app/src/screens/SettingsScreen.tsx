import React from 'react'
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { useAuthLauncher } from '../context/AuthLauncherContext'
import { setThemePreference } from '../store/slices/ui-slice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { RootDrawerParamList } from '../types'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { signOut } from '../utils/sign-out'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

const AVATAR = require('../assets/avatars/avatar.png')

const ROW_PAD_H = 20
const ICON_WELL = 40
const ICON_GAP = 14
const DIVIDER_INSET = ROW_PAD_H + ICON_WELL + ICON_GAP

interface ChevronRowProps {
  icon: string
  label: string
  iconColor: string
  labelColor: string
  iconWellBg: string
  onPress: () => void
}

function ChevronRow({ icon, label, iconColor, labelColor, iconWellBg, onPress }: ChevronRowProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPressIn={fireLightImpact}
      onPress={onPress}
      style={({ pressed }) => [rowStyles.rowPressable, pressed ? { opacity: 0.65 } : null]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={rowStyles.row}>
        <View style={[rowStyles.iconWell, { backgroundColor: iconWellBg }]}>
          <MaterialCommunityIcons name={icon as never} size={22} color={iconColor} />
        </View>
        <Text style={[rowStyles.label, { color: labelColor }]}>{label}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={theme.text.muted}
          style={rowStyles.chevron}
        />
      </View>
    </Pressable>
  )
}

interface SwitchRowProps {
  icon: string
  label: string
  iconColor: string
  labelColor: string
  iconWellBg: string
  value: boolean
  onValueChange: (v: boolean) => void
  trackColorOn?: string
}

function SwitchRow({
  icon,
  label,
  iconColor,
  labelColor,
  iconWellBg,
  value,
  onValueChange,
  trackColorOn,
}: SwitchRowProps) {
  const { mode } = useTheme()
  const trackOff = mode === 'dark' ? 'rgba(255,255,255,0.22)' : '#D8D8D6'
  return (
    <View style={[rowStyles.row, rowStyles.switchRowOuter]} accessibilityRole="none">
      <View style={[rowStyles.iconWell, { backgroundColor: iconWellBg }]}>
        <MaterialCommunityIcons name={icon as never} size={22} color={iconColor} />
      </View>
      <Text style={[rowStyles.label, { color: labelColor }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: trackOff, true: trackColorOn ?? iconColor }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={trackOff}
        style={rowStyles.switch}
      />
    </View>
  )
}

function SignOutRow({ iconWellBg, onPress }: { iconWellBg: string; onPress: () => void }) {
  return (
    <Pressable
      onPressIn={fireLightImpact}
      onPress={onPress}
      style={({ pressed }) => [rowStyles.rowPressable, pressed ? { opacity: 0.65 } : null]}
      accessibilityRole="button"
      accessibilityLabel="Sign out"
    >
      <View style={rowStyles.row}>
        <View style={[rowStyles.iconWell, { backgroundColor: iconWellBg }]}>
          <MaterialCommunityIcons name="logout" size={22} color="#E53935" />
        </View>
        <Text style={[rowStyles.label, { color: '#E53935' }]}>Sign out</Text>
      </View>
    </Pressable>
  )
}

function SettingsCard({ children }: { children: React.ReactNode }) {
  const { theme, mode } = useTheme()
  const fill = mode === 'light' ? '#FFFFFF' : theme.bg.card
  const shadowOpacity = mode === 'dark' ? 0.22 : 0.09
  return (
    <View
      style={[
        cardStyles.card,
        {
          backgroundColor: fill,
          borderColor: theme.border,
          shadowOpacity,
        },
      ]}
    >
      {children}
    </View>
  )
}

function Divider() {
  const { theme } = useTheme()
  return (
    <View
      style={[
        cardStyles.divider,
        {
          backgroundColor: theme.border,
          marginLeft: DIVIDER_INSET,
          marginRight: ROW_PAD_H,
        },
      ]}
    />
  )
}

export function SettingsScreen() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<DrawerNav>()
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(s => s.session.accessToken)
  const { openSignIn } = useAuthLauncher()
  const [notificationsOn, setNotificationsOn] = React.useState(true)

  const accent = theme.palette.primary
  const secondary = theme.palette.secondary
  const darkOn = mode === 'dark'
  const iconWellBg =
    mode === 'light' ? 'rgba(255, 165, 0, 0.14)' : 'rgba(255, 184, 0, 0.12)'

  const setDark = (on: boolean) => {
    fireLightImpact()
    dispatch(setThemePreference(on ? 'dark' : 'light'))
  }

  const noop = () => fireLightImpact()

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
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
                <Image source={AVATAR} style={styles.profileAvatar} resizeMode="cover" />
              </View>
              <Text style={[styles.profileName, { color: theme.text.primary }]}>John Doe</Text>
              <Pressable
                onPress={() => { fireLightImpact(); navigation.navigate('Account') }}
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
              onValueChange={v => { fireLightImpact(); setNotificationsOn(v) }}
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
              <SignOutRow iconWellBg={iconWellBg} onPress={() => signOut()} />
            ) : (
              <ChevronRow
                icon="login"
                label="Sign in"
                iconColor={accent}
                labelColor={theme.text.primary}
                iconWellBg={iconWellBg}
                onPress={() => { fireLightImpact(); openSignIn() }}
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

const rowStyles = StyleSheet.create({
  rowPressable: {
    width: '100%',
    alignSelf: 'stretch',
  },
  switchRowOuter: {
    alignSelf: 'stretch',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingHorizontal: ROW_PAD_H,
    paddingVertical: 16,
    minHeight: 56,
  },
  iconWell: {
    width: ICON_WELL,
    height: ICON_WELL,
    borderRadius: ICON_WELL / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ICON_GAP,
    flexShrink: 0,
  },
  label: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
    letterSpacing: 0.15,
  },
  chevron: {
    marginLeft: 8,
    flexShrink: 0,
  },
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
  },
})

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    marginHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#1B1200',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 18,
    elevation: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.85,
  },
})

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