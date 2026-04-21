import React from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'
import { useAuth } from '../../hooks/session/auth.hook'
import { MenuSignOutRow } from '../settings/MenuRows'
import { SettingsMenuCard } from '../settings/SettingsMenuCard'
import { AppCard } from '../controls/AppCard'
import { FadeInMount } from '../layout/FadeInMount'
import {
  ACCOUNT_PROFILE_AVATAR_SIZE,
  ACCOUNT_PROFILE_CAMERA_BADGE_SIZE,
} from '../../constants/account-profile'

export type AccountProfileViewProps = {
  displayName: string
  email: string
  phone: string
  locationDisplay: string
  initials: string
  handle: string
  avatarSource: string | null
  uploadingAvatar: boolean
  refreshing: boolean
  onPickAvatar: () => void
}

export function AccountProfileView({
  displayName,
  email,
  phone,
  locationDisplay,
  initials,
  handle,
  avatarSource,
  uploadingAvatar,
  refreshing,
  onPickAvatar,
}: AccountProfileViewProps) {
  const { theme } = useTheme()
  const { signOut: signOutUser } = useAuth()
  const gold = theme.palette.primary
  const isLight = theme.mode === 'light'
  const profileCardBg = isLight ? '#FFFFFF' : theme.bg.card
  const profileFieldBg = isLight ? '#F3F3F2' : theme.bg.muted
  const profileAvatarInnerBg = isLight ? '#F3F3F2' : theme.bg.muted
  const cardShadow = theme.mode === 'dark' ? 0.11 : 0.045

  return (
    <FadeInMount>
      <View style={styles.screenHeader}>
        <Text style={[styles.screenTitle, { color: theme.text.primary }]}>Profile</Text>
        <Text style={[styles.screenSubtitle, { color: theme.text.muted }]}>
          Manage how you appear across HoneyMan.
        </Text>
      </View>

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
          <Pressable
            onPressIn={lightHaptic}
            onPress={() => void onPickAvatar()}
            disabled={uploadingAvatar}
            accessibilityLabel="Change profile photo"
            accessibilityRole="button"
            style={styles.avatarWrap}
          >
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
                <Text style={[styles.avatarInitials, { color: theme.text.muted }]}>{initials}</Text>
              )}

              {uploadingAvatar && (
                <View style={[styles.avatarOverlay, { backgroundColor: 'rgba(0,0,0,0.38)' }]}>
                  <ActivityIndicator color="#fff" />
                </View>
              )}
            </View>

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
          <MenuSignOutRow onPress={() => void signOutUser()} />
        </SettingsMenuCard>
      </View>
    </FadeInMount>
  )
}

const styles = StyleSheet.create({
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
  avatarWrap: {
    width: ACCOUNT_PROFILE_AVATAR_SIZE,
    height: ACCOUNT_PROFILE_AVATAR_SIZE,
    paddingBottom: ACCOUNT_PROFILE_CAMERA_BADGE_SIZE / 2,
    paddingRight: ACCOUNT_PROFILE_CAMERA_BADGE_SIZE / 2,
    marginBottom: -(ACCOUNT_PROFILE_CAMERA_BADGE_SIZE / 2),
    marginRight: -(ACCOUNT_PROFILE_CAMERA_BADGE_SIZE / 2),
  },
  avatar: {
    width: ACCOUNT_PROFILE_AVATAR_SIZE,
    height: ACCOUNT_PROFILE_AVATAR_SIZE,
    borderRadius: ACCOUNT_PROFILE_AVATAR_SIZE / 2,
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
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: ACCOUNT_PROFILE_CAMERA_BADGE_SIZE,
    height: ACCOUNT_PROFILE_CAMERA_BADGE_SIZE,
    borderRadius: ACCOUNT_PROFILE_CAMERA_BADGE_SIZE / 2,
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
