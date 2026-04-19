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
import {
  AppScreenTopBar,
  AppScreenTopBarProfileAvatar,
} from '../components/layout/AppScreenTopBar'
import { signOut } from '../utils/sign-out'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

const AVATAR = require('../assets/avatars/avatar.png')

interface ChevronRowProps {
  icon: string
  label: string
  iconColor: string
  labelColor: string
  onPress: () => void
}

function ChevronRow({ icon, label, iconColor, labelColor, onPress }: ChevronRowProps) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPressIn={fireLightImpact}
      onPress={onPress}
      style={({ pressed }) => [rowStyles.row, { opacity: pressed ? 0.6 : 1 }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={rowStyles.iconWrap}>
        <MaterialCommunityIcons name={icon as never} size={20} color={iconColor} />
      </View>
      <Text style={[rowStyles.label, { color: labelColor }]}>{label}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={theme.text.muted}
        style={rowStyles.chevron}
      />
    </Pressable>
  )
}

interface SwitchRowProps {
  icon: string
  label: string
  iconColor: string
  labelColor: string
  value: boolean
  onValueChange: (v: boolean) => void
  trackColorOn?: string
}

function SwitchRow({
  icon,
  label,
  iconColor,
  labelColor,
  value,
  onValueChange,
  trackColorOn,
}: SwitchRowProps) {
  return (
    <View style={rowStyles.row} accessibilityRole="none">
      <View style={rowStyles.iconWrap}>
        <MaterialCommunityIcons name={icon as never} size={20} color={iconColor} />
      </View>
      <Text style={[rowStyles.label, { color: labelColor }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#D1D1D6', true: trackColorOn ?? iconColor }}
        thumbColor="#fff"
        style={rowStyles.switch}
      />
    </View>
  )
}

function SignOutRow({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPressIn={fireLightImpact}
      onPress={onPress}
      style={({ pressed }) => [rowStyles.row, { opacity: pressed ? 0.6 : 1 }]}
      accessibilityRole="button"
      accessibilityLabel="Sign out"
    >
      <View style={rowStyles.iconWrap}>
        <MaterialCommunityIcons name="logout" size={20} color="#E53935" />
      </View>
      <Text style={[rowStyles.label, { color: '#E53935' }]}>Sign out</Text>
    </Pressable>
  )
}

function MenuCard({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  return (
    <View
      style={[
        cardStyles.card,
        {
          backgroundColor: theme.bg.surface,
          borderColor: theme.border,
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
        { backgroundColor: theme.border },
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
      safeAreaEdges={['left', 'right', 'bottom']}
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
          {/* Profile block — untouched as requested */}
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

            <MenuCard>
              <ChevronRow
                icon="account-outline"
                label="Account"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={() => navigation.navigate('Account')}
              />
              <Divider />
              <SwitchRow
                icon="weather-night"
                label="Dark mode"
                iconColor={accent}
                labelColor={theme.text.primary}
                value={darkOn}
                onValueChange={setDark}
                trackColorOn={accent}
              />
            </MenuCard>

            <MenuCard>
              <ChevronRow
                icon="palette-outline"
                label="Preferences"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
              <Divider />
              <ChevronRow
                icon="cog-outline"
                label="General"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
            </MenuCard>

            <MenuCard>
              <ChevronRow
                icon="shield-outline"
                label="Security"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
              <Divider />
              <ChevronRow
                icon="lock-outline"
                label="Privacy"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
            </MenuCard>

            <MenuCard>
              <SwitchRow
                icon="bell-outline"
                label="Notifications"
                iconColor={accent}
                labelColor={theme.text.primary}
                value={notificationsOn}
                onValueChange={v => {
                  fireLightImpact()
                  setNotificationsOn(v)
                }}
                trackColorOn={accent}
              />
            </MenuCard>

            <MenuCard>
              <ChevronRow
                icon="gavel"
                label="Legal"
                iconColor={accent}
                labelColor={theme.text.primary}
                onPress={noop}
              />
            </MenuCard>

            <MenuCard>
              {accessToken ? (
                <SignOutRow onPress={() => signOut()} />
              ) : (
                <ChevronRow
                  icon="login"
                  label="Sign in"
                  iconColor={accent}
                  labelColor={theme.text.primary}
                  onPress={() => {
                    fireLightImpact()
                    openSignIn()
                  }}
                />
              )}
            </MenuCard>

            <Text style={[styles.footerNote, { color: theme.text.muted }]}>
              Units, locales, and integrations will appear here as we expand HoneyMan.
            </Text>
          </View>
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 52,
  },
  iconWrap: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    letterSpacing: 0.1,
  },
  chevron: {
    marginLeft: 8,
  },
  switch: {
    marginLeft: 8,
  },
})

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#1B1200',
    shadowOpacity: 0.035,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 60, // aligns with the label, not the icon
  },
})

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  profileBlock: {
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 0,
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