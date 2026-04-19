import React from 'react'
import {
  ActivityIndicator,
  Alert,
  Image,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import type { RootDrawerParamList } from '../types'
import { signOut } from '../utils/sign-out'
import { ApiError, fetchSessionProfile, updateProfile, uploadImageToCloudinary } from '../api'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUserProfile } from '../store/slices/session-slice'
import { AccountSignedOutGate } from '../components/account/AccountSignedOutGate'
import { MenuSignOutRow } from '../components/settings/MenuRows'
import { SettingsMenuCard } from '../components/settings/SettingsMenuCard'
import { AppCard } from '../components/controls/AppCard'
import { FadeInMount } from '../components/layout/FadeInMount'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

function initialsFromName(first?: string, last?: string): string {
  const a = first?.trim()?.[0]
  const b = last?.trim()?.[0]
  if (a && b) return `${a}${b}`.toUpperCase()
  if (a) return a.toUpperCase()
  return '?'
}

function usernameFromEmail(email?: string): string {
  if (!email?.includes('@')) return '—'
  return email.split('@')[0] ?? '—'
}

export function AccountProfileScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation<DrawerNav>()
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(s => s.session.accessToken)
  const user = useAppSelector(s => s.session.user)
  const [refreshing, setRefreshing] = React.useState(false)
  const [uploadingAvatar, setUploadingAvatar] = React.useState(false)
  const [localAvatarUri, setLocalAvatarUri] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }, [])

  const loadProfile = React.useCallback(async () => {
    if (!accessToken) {
      return
    }
    setRefreshing(true)
    try {
      const profile = await fetchSessionProfile()
      dispatch(setUserProfile(profile))
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Could not load profile.'
      Alert.alert('Profile', msg)
    } finally {
      setRefreshing(false)
    }
  }, [accessToken, dispatch])

  useFocusEffect(
    React.useCallback(() => {
      void loadProfile()
    }, [loadProfile]),
  )

  const persistedAvatarUrl = user?.avatar_url?.trim() ?? null
  React.useEffect(() => {
    if (persistedAvatarUrl && localAvatarUri) {
      setLocalAvatarUri(null)
    }
  }, [persistedAvatarUrl, localAvatarUri])

  const gold = theme.palette.primary
  const isLight = theme.mode === 'light'
  const profileCardBg = isLight ? '#FFFFFF' : theme.bg.card
  const profileFieldBg = isLight ? '#F3F3F2' : theme.bg.muted
  const profileAvatarInnerBg = isLight ? '#F3F3F2' : theme.bg.muted
  const cardShadow = theme.mode === 'dark' ? 0.11 : 0.045

  const displayName =
    user?.firstname || user?.lastname
      ? [user?.firstname, user?.lastname].filter(Boolean).join(' ').trim()
      : '—'
  const email = user?.email ?? '—'
  const phone = user?.phone ?? '—'
  const locationDisplay = user?.location?.trim() ? user.location : '—'
  const initials = initialsFromName(user?.firstname, user?.lastname)
  const handle = usernameFromEmail(user?.email)

  const avatarSource = localAvatarUri ?? persistedAvatarUrl

  const pickAndUploadAvatar = React.useCallback(async () => {
    if (uploadingAvatar) return
    try {
      const ImagePicker = require('expo-image-picker') as typeof import('expo-image-picker')
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (!perm.granted) {
        Alert.alert('Photos', 'Allow photo library access to set your profile picture.')
        return
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.88,
      })
      if (result.canceled || !result.assets[0]) return

      const asset = result.assets[0]
      const mime = asset.mimeType ?? 'image/jpeg'

      setLocalAvatarUri(asset.uri)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

      setUploadingAvatar(true)
      const url = await uploadImageToCloudinary(asset.uri, mime)
      const updated = await updateProfile({ avatar_url: url })
      dispatch(setUserProfile(updated))
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    } catch (e) {
      setLocalAvatarUri(null)
      const msg =
        e instanceof ApiError
          ? e.message
          : e instanceof Error
            ? e.message
            : 'Could not update photo.'
      Alert.alert('Profile photo', msg)
    } finally {
      setUploadingAvatar(false)
    }
  }, [dispatch, uploadingAvatar])

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombOmitCenter
    >
      <AppScreenTopBar
        title="Account"
        showBee={false}
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
        right={
          <Pressable
            onPressIn={fireLightImpact}
            onPress={() => navigation.openDrawer()}
            hitSlop={10}
            accessibilityLabel="Open menu"
            style={({ pressed }) => [{ opacity: pressed ? 0.55 : 1, padding: 4 }]}
          >
            <MaterialCommunityIcons name="menu" size={22} color={theme.text.primary} />
          </Pressable>
        }
      />
      {!accessToken ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, styles.signedOutScrollContent]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={Platform.OS === 'ios'}
          bounces={Platform.OS === 'ios'}
        >
          <AccountSignedOutGate />
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={Platform.OS === 'ios'}
          bounces={Platform.OS === 'ios'}
        >
          <FadeInMount>
            <View style={styles.screenHeader}>
            <Text style={[styles.screenTitle, { color: theme.text.primary }]}>Profile</Text>
            <Text style={[styles.screenSubtitle, { color: theme.text.muted }]}>
              Manage how you appear across HoneyMan.
            </Text>
            </View>

            {/* ── Hero card: avatar + name ── */}
            <AppCard
            style={[
              styles.card,
              styles.heroCard,
              {
                borderColor: theme.border,
                backgroundColor: profileCardBg,
                shadowOpacity: cardShadow,
              },
            ]}
          >
            <View style={styles.profileRow}>
              {/* Avatar with camera button anchored to bottom-right */}
              <Pressable
                onPressIn={fireLightImpact}
                onPress={() => void pickAndUploadAvatar()}
                disabled={uploadingAvatar}
                accessibilityLabel="Change profile photo"
                accessibilityRole="button"
                style={styles.avatarWrap}
              >
                {/* Circle */}
                <View
                  style={[
                    styles.avatar,
                    {
                      borderColor: gold,
                      backgroundColor: profileAvatarInnerBg,
                    },
                  ]}
                >
                  {avatarSource ? (
                    <Image
                      source={{ uri: avatarSource }}
                      style={styles.avatarImage}
                      resizeMode="cover"
                      accessibilityLabel="Profile photo"
                    />
                  ) : (
                    <Text style={[styles.avatarInitials, { color: theme.text.muted }]}>
                      {initials}
                    </Text>
                  )}

                  {/* Upload spinner overlay */}
                  {uploadingAvatar && (
                    <View style={[styles.avatarOverlay, { backgroundColor: 'rgba(0,0,0,0.38)' }]}>
                      <ActivityIndicator color="#fff" />
                    </View>
                  )}
                </View>

                {/* Camera badge — sits on top of the avatar circle */}
                <View
                  style={[
                    styles.cameraBadge,
                    {
                      backgroundColor: gold,
                      borderColor: profileCardBg,
                      opacity: uploadingAvatar ? 0.6 : 1,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={uploadingAvatar ? 'clock-outline' : 'camera-outline'}
                    size={16}
                    color={theme.text.onPrimary}
                  />
                </View>
              </Pressable>

              {/* Name + handle */}
              <View style={styles.profileTextCol}>
                <Text style={[styles.displayName, { color: theme.text.primary }]} numberOfLines={2}>
                  {displayName}
                </Text>
                <View style={styles.usernameRow}>
                  <View
                    style={[
                      styles.usernamePill,
                      { backgroundColor: profileFieldBg, borderColor: theme.border },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="at"
                      size={14}
                      color={theme.text.muted}
                      style={styles.usernameIcon}
                    />
                    <Text style={[styles.username, { color: theme.text.muted }]} numberOfLines={1}>
                      {handle}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            </AppCard>

            {/* ── Contact card ── */}
            <AppCard
            style={[
              styles.card,
              styles.cardSpacing,
              {
                borderColor: theme.border,
                backgroundColor: profileCardBg,
                shadowOpacity: cardShadow,
              },
            ]}
          >
            <Text style={[styles.sectionHeading, { color: theme.text.muted }]}>Contact</Text>
            <View style={styles.fieldsStack}>
              {[
                { label: 'Email', value: email },
                { label: 'Phone', value: phone },
                { label: 'Location', value: locationDisplay },
              ].map(({ label, value }) => (
                <View key={label}>
                  <Text style={[styles.fieldLabel, { color: theme.text.muted }]}>{label}</Text>
                  <View
                    style={[
                      styles.valueField,
                      { backgroundColor: profileFieldBg, borderColor: theme.border, marginTop: 6 },
                    ]}
                  >
                    <Text style={[styles.valueText, { color: theme.text.primary }]}>{value}</Text>
                  </View>
                </View>
              ))}
            </View>
            </AppCard>

            {refreshing && (
              <View style={styles.refreshHint}>
                <ActivityIndicator size="small" color={gold} />
              </View>
            )}

            <View style={styles.signOutBlock}>
              <SettingsMenuCard>
                <MenuSignOutRow onPress={() => signOut()} />
              </SettingsMenuCard>
            </View>
          </FadeInMount>
        </ScrollView>
      )}
    </ScreenShell>
  )
}

const AVATAR_SIZE = 96
const BADGE_SIZE = 34

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 40,
  },
  signedOutScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 48,
  },
  signOutBlock: {
    marginTop: 18,
    marginBottom: 8,
  },
  screenHeader: {
    marginBottom: 14,
  },
  screenTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: 26,
    letterSpacing: -0.3,
  },
  screenSubtitle: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  sectionHeading: {
    fontFamily: fontFamily.sansBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  fieldLabel: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
  },
  card: {
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  heroCard: {
    paddingVertical: 20,
  },
  cardSpacing: {
    marginTop: 12,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },

  // Avatar
  avatarWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    paddingBottom: BADGE_SIZE / 2,
    paddingRight: BADGE_SIZE / 2,
    marginBottom: -(BADGE_SIZE / 2),
    marginRight: -(BADGE_SIZE / 2),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#1B1200',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  avatarImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  avatarOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fontFamily.sansBold,
    fontSize: 24,
    letterSpacing: -0.5,
  },

  // Camera badge
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#1B1200',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  profileTextCol: {
    flex: 1,
    minWidth: 0,
    paddingTop: 4,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  usernameRow: {
    marginTop: 10,
  },
  usernamePill: {
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  usernameIcon: {
    marginRight: 4,
  },
  displayName: {
    fontFamily: fontFamily.sansBold,
    fontSize: 20,
    letterSpacing: -0.2,
  },
  username: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
    flexShrink: 1,
  },
  fieldsStack: {
    marginTop: 12,
    gap: 12,
  },
  valueText: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
    lineHeight: 22,
  },
  valueField: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  refreshHint: {
    alignItems: 'center',
    paddingVertical: 8,
  },
})
