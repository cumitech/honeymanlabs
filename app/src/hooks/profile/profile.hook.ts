import React from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Alert, LayoutAnimation, Platform, UIManager } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ApiError, fetchSessionProfile, updateProfile } from '../../api'
import { uploadImageToCloudinary } from '../../libs'
import { initialsFromName, usernameFromEmail } from '../../utils'
import { useAuth } from '../session/auth.hook'
import { setSessionUserInStore } from '../session/auth-session.store'

export function useAccountProfile() {
  const { accessToken, user } = useAuth()
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
      setSessionUserInStore(profile)
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Could not load profile.'
      Alert.alert('Profile', msg)
    } finally {
      setRefreshing(false)
    }
  }, [accessToken])

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
      setSessionUserInStore(updated)
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
  }, [uploadingAvatar])

  return {
    accessToken,
    displayName,
    email,
    phone,
    locationDisplay,
    initials,
    handle,
    avatarSource,
    uploadingAvatar,
    refreshing,
    pickAndUploadAvatar,
  } satisfies {
    accessToken: string | null
    displayName: string
    email: string
    phone: string
    locationDisplay: string
    initials: string
    handle: string
    avatarSource: string | null
    uploadingAvatar: boolean
    refreshing: boolean
    pickAndUploadAvatar: () => Promise<void>
  }
}
