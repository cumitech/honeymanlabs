import React from 'react'
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { GoogleBrandIcon } from './GoogleBrandIcon'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'
import type { AuthTokens } from '../../api/auth'
import { loginWithFacebookAccessToken, loginWithGoogleIdToken } from '../../api/auth'
import { ApiError } from '../../api/core/client'
import {
  getFacebookAppId,
  getGoogleOAuthPublicConfig,
  isFacebookOAuthConfigured,
  isGoogleOAuthConfigured,
} from '../../constants/oauth-public'

const GOOGLE_BTN_BG = '#FFFFFF'
const GOOGLE_BTN_BORDER = '#dadce0'
const GOOGLE_BLUE = '#4285F4'
const FACEBOOK_BLUE = '#1877F2'
const ICON_SIZE = 26
const HIT_SIZE = 56

type SocialLoginButtonsProps = {
  heading?: string
  disabled?: boolean
  onAuthenticated: (tokens: AuthTokens) => Promise<void> | void
  onFlowError?: (message: string) => void
}

function GoogleSignInButton({
  disabled,
  busy,
  onAuthenticated,
  onFlowError,
}: {
  disabled: boolean
  busy: boolean
  onAuthenticated: (tokens: AuthTokens) => Promise<void> | void
  onFlowError?: (message: string) => void
}) {
  const cfg = getGoogleOAuthPublicConfig()
  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: cfg.iosClientId,
    androidClientId: cfg.androidClientId,
    webClientId: cfg.webClientId,
  })

  const ranRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!response) return
    if (response.type === 'cancel' || response.type === 'dismiss') return
    if (response.type === 'error') {
      onFlowError?.('Google sign-in was cancelled or failed.')
      return
    }
    if (response.type !== 'success') return
    const idToken = response.params?.id_token
    if (!idToken) {
      onFlowError?.('Google did not return a valid session.')
      return
    }
    if (ranRef.current === idToken) return
    ranRef.current = idToken
    void (async () => {
      try {
        const tokens = await loginWithGoogleIdToken(idToken)
        await onAuthenticated(tokens)
      } catch (e) {
        ranRef.current = null
        const msg = e instanceof ApiError ? e.message : 'Google sign-in failed. Try again.'
        onFlowError?.(msg)
      }
    })()
  }, [response, onAuthenticated, onFlowError])

  const run = () => {
    lightHaptic()
    void promptAsync()
  }

  return (
    <Pressable
      onPress={run}
      disabled={disabled || busy}
      style={({ pressed }) => [
        styles.socialIconBtn,
        {
          borderColor: GOOGLE_BTN_BORDER,
          backgroundColor: GOOGLE_BTN_BG,
          opacity: pressed ? 0.92 : disabled || busy ? 0.55 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
    >
      {busy ? <ActivityIndicator color={GOOGLE_BLUE} /> : <GoogleBrandIcon size={ICON_SIZE} />}
    </Pressable>
  )
}

function FacebookSignInButton({
  disabled,
  busy,
  onAuthenticated,
  onFlowError,
}: {
  disabled: boolean
  busy: boolean
  onAuthenticated: (tokens: AuthTokens) => Promise<void> | void
  onFlowError?: (message: string) => void
}) {
  const appId = getFacebookAppId()
  const [, response, promptAsync] = Facebook.useAuthRequest({
    clientId: appId,
    iosClientId: appId,
    androidClientId: appId,
    webClientId: appId,
  })

  const ranRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!response) return
    if (response.type === 'cancel' || response.type === 'dismiss') return
    if (response.type === 'error') {
      onFlowError?.('Facebook sign-in was cancelled or failed.')
      return
    }
    if (response.type !== 'success') return
    const accessToken = response.params?.access_token
    if (!accessToken) {
      onFlowError?.('Facebook did not return a valid session.')
      return
    }
    if (ranRef.current === accessToken) return
    ranRef.current = accessToken
    void (async () => {
      try {
        const tokens = await loginWithFacebookAccessToken(accessToken)
        await onAuthenticated(tokens)
      } catch (e) {
        ranRef.current = null
        const msg = e instanceof ApiError ? e.message : 'Facebook sign-in failed. Try again.'
        onFlowError?.(msg)
      }
    })()
  }, [response, onAuthenticated, onFlowError])

  const run = () => {
    lightHaptic()
    void promptAsync()
  }

  return (
    <Pressable
      onPress={run}
      disabled={disabled || busy}
      style={({ pressed }) => [
        styles.socialIconBtn,
        {
          borderColor: FACEBOOK_BLUE,
          backgroundColor: FACEBOOK_BLUE,
          opacity: pressed ? 0.92 : disabled || busy ? 0.55 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Continue with Facebook"
    >
      {busy ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <MaterialCommunityIcons name="facebook" size={ICON_SIZE} color="#FFFFFF" />
      )}
    </Pressable>
  )
}

function DisabledSocialIconButton({
  provider,
  onPress,
}: {
  provider: 'google' | 'facebook'
  onPress: () => void
}) {
  const { theme } = useTheme()
  const a11y = provider === 'google' ? 'Google (not configured)' : 'Facebook (not configured)'

  return (
    <Pressable
      onPress={() => {
        lightHaptic()
        onPress()
      }}
      style={({ pressed }) => [
        styles.socialIconBtn,
        {
          borderColor: theme.border,
          backgroundColor: theme.bg.muted,
          opacity: pressed ? 0.85 : 0.65,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={a11y}
    >
      {provider === 'google' ? (
        <GoogleBrandIcon size={ICON_SIZE} opacity={0.9} />
      ) : (
        <MaterialCommunityIcons name="facebook" size={ICON_SIZE} color={FACEBOOK_BLUE} />
      )}
    </Pressable>
  )
}

export function SocialLoginButtons({
  heading = 'Continue with',
  disabled = false,
  onAuthenticated,
  onFlowError,
}: SocialLoginButtonsProps) {
  const { theme } = useTheme()
  const [busy, setBusy] = React.useState(false)

  const wrapAuth = React.useCallback(
    async (tokens: AuthTokens) => {
      setBusy(true)
      try {
        await onAuthenticated(tokens)
      } finally {
        setBusy(false)
      }
    },
    [onAuthenticated],
  )

  const googleOk = isGoogleOAuthConfigured()
  const fbOk = isFacebookOAuthConfigured()

  return (
    <View style={styles.block}>
      <Text style={[styles.heading, { color: theme.text.muted }]}>{heading}</Text>
      <View style={styles.socialIconsRow}>
        {googleOk ? (
          <GoogleSignInButton
            disabled={disabled}
            busy={busy}
            onAuthenticated={wrapAuth}
            onFlowError={onFlowError}
          />
        ) : (
          <DisabledSocialIconButton
            provider="google"
            onPress={() =>
              onFlowError?.(
                'Google is not configured. Add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID plus the iOS/Android client IDs to app .env, and GOOGLE_OAUTH_CLIENT_IDS (comma-separated) on the API.',
              )
            }
          />
        )}
        <View style={styles.socialIconSpacer} />
        {fbOk ? (
          <FacebookSignInButton
            disabled={disabled}
            busy={busy}
            onAuthenticated={wrapAuth}
            onFlowError={onFlowError}
          />
        ) : (
          <DisabledSocialIconButton
            provider="facebook"
            onPress={() =>
              onFlowError?.(
                'Facebook is not configured. Add EXPO_PUBLIC_FACEBOOK_APP_ID to app .env and enable Facebook Login for your iOS bundle / Android key hash in Meta for Developers.',
              )
            }
          />
        )}
      </View>
      {Platform.OS === 'web' ? (
        <Text style={[styles.webHint, { color: theme.text.muted }]}>
          Social login is intended for the iOS and Android builds.
        </Text>
      ) : null}
    </View>
  )
}

export function AuthEmailDivider() {
  const { theme } = useTheme()
  return (
    <View style={styles.dividerRow}>
      <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
      <Text style={[styles.dividerText, { color: theme.text.muted }]}>or email</Text>
      <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    gap: 10,
  },
  heading: {
    fontFamily: fontFamily.sansBold,
    fontSize: 13,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 2,
  },
  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconSpacer: {
    width: 20,
  },
  socialIconBtn: {
    width: HIT_SIZE,
    height: HIT_SIZE,
    borderRadius: HIT_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerText: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
    letterSpacing: 0.2,
  },
  webHint: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
})
