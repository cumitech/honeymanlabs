import React from 'react'
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'
import type { AuthTokens } from '../../api/auth'
import { loginWithFacebookAccessToken, loginWithGoogleIdToken } from '../../api/auth'
import { ApiError } from '../../api/client'
import {
  getFacebookAppId,
  getGoogleOAuthPublicConfig,
  isFacebookOAuthConfigured,
  isGoogleOAuthConfigured,
} from '../../constants/oauth-public'

type SocialLoginButtonsProps = {
  heading?: string
  disabled?: boolean
  onAuthenticated: (tokens: AuthTokens) => Promise<void> | void
  onFlowError?: (message: string) => void
}

function GoogleSignInRow({
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
  const { theme } = useTheme()
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
    fireLightImpact()
    void promptAsync()
  }

  return (
    <Pressable
      onPress={run}
      disabled={disabled || busy}
      style={({ pressed }) => [
        styles.socialBtn,
        {
          borderColor: theme.border,
          backgroundColor: theme.bg.surface,
          opacity: pressed ? 0.92 : disabled || busy ? 0.55 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
    >
      {busy ? (
        <ActivityIndicator color={theme.text.primary} />
      ) : (
        <>
          <MaterialCommunityIcons name="google" size={22} color={theme.text.primary} />
          <Text style={[styles.socialLabel, { color: theme.text.primary }]}>Google</Text>
        </>
      )}
    </Pressable>
  )
}

function FacebookSignInRow({
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
    fireLightImpact()
    void promptAsync()
  }

  const fbBlue = '#1877F2'

  return (
    <Pressable
      onPress={run}
      disabled={disabled || busy}
      style={({ pressed }) => [
        styles.socialBtn,
        {
          borderColor: fbBlue,
          backgroundColor: fbBlue,
          opacity: pressed ? 0.92 : disabled || busy ? 0.55 : 1,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Continue with Facebook"
    >
      {busy ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <>
          <MaterialCommunityIcons name="facebook" size={22} color="#FFFFFF" />
          <Text style={[styles.socialLabel, { color: '#FFFFFF' }]}>Facebook</Text>
        </>
      )}
    </Pressable>
  )
}

function DisabledSocialRow({
  label,
  icon,
  onPress,
}: {
  label: string
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  onPress: () => void
}) {
  const { theme } = useTheme()
  return (
    <Pressable
      onPress={() => {
        fireLightImpact()
        onPress()
      }}
      style={({ pressed }) => [
        styles.socialBtn,
        {
          borderColor: theme.border,
          backgroundColor: theme.bg.muted,
          opacity: pressed ? 0.85 : 0.65,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${label} (not configured)`}
    >
      <MaterialCommunityIcons name={icon} size={22} color={theme.text.muted} />
      <Text style={[styles.socialLabel, { color: theme.text.muted }]}>{label}</Text>
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
      {googleOk ? (
        <GoogleSignInRow
          disabled={disabled}
          busy={busy}
          onAuthenticated={wrapAuth}
          onFlowError={onFlowError}
        />
      ) : (
        <DisabledSocialRow
          label="Google"
          icon="google"
          onPress={() =>
            onFlowError?.(
              'Google is not configured. Add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID plus the iOS/Android client IDs to app .env, and GOOGLE_OAUTH_CLIENT_IDS (comma-separated) on the API.',
            )
          }
        />
      )}
      {fbOk ? (
        <FacebookSignInRow
          disabled={disabled}
          busy={busy}
          onAuthenticated={wrapAuth}
          onFlowError={onFlowError}
        />
      ) : (
        <DisabledSocialRow
          label="Facebook"
          icon="facebook"
          onPress={() =>
            onFlowError?.(
              'Facebook is not configured. Add EXPO_PUBLIC_FACEBOOK_APP_ID to app .env and enable Facebook Login for your iOS bundle / Android key hash in Meta for Developers.',
            )
          }
        />
      )}
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
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 52,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
  },
  socialLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
    letterSpacing: 0.2,
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
