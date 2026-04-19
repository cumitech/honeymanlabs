import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApiError, fetchSessionProfile, login } from '../api'
import { saveRefreshToken } from '../utils/refresh-token-storage'
import { useAppDispatch } from '../store/hooks'
import { applyAccessToken, setUserProfile } from '../store/slices/session-slice'
import { fontFamily, useTheme } from '../theme'

type SignInScreenProps = {
  onBack: () => void
  onOpenSignUp: () => void
  onOpenForgotPassword: () => void
  onSignInSuccess: () => void
}

export function SignInScreen({
  onBack,
  onOpenSignUp,
  onOpenForgotPassword,
  onSignInSuccess,
}: SignInScreenProps) {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const [rememberMe, setRememberMe] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSignIn = React.useCallback(async () => {
    setError(null)
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setError('Enter your email and password.')
      return
    }
    setLoading(true)
    try {
      const { accessToken, refreshToken } = await login({ email: trimmedEmail, password })
      await saveRefreshToken(refreshToken)
      dispatch(applyAccessToken({ accessToken }))
      try {
        const profile = await fetchSessionProfile()
        dispatch(setUserProfile(profile))
      } catch {}
      onSignInSuccess()
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Sign in failed. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [dispatch, email, onSignInSuccess, password])

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg.muted }]}>
      <View style={styles.dripWrap}>
        <ImageBackground
          source={require('../assets/honeydew-honey-drip-1-v1.png')}
          style={styles.drip}
          imageStyle={styles.dripImage}
        />
      </View>

      <View style={styles.content}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.palette.secondary }]}>{'‹'}</Text>
        </Pressable>

        <Text style={[styles.title, { color: theme.text.primary }]}>Log In</Text>
        <View style={[styles.titleUnderline, { backgroundColor: theme.palette.primary }]} />

        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { color: theme.text.muted }]}>E-Mail</Text>
            <TextInput
              value={email}
              onChangeText={t => {
                setEmail(t)
                setError(null)
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!loading}
              placeholderTextColor={theme.text.muted}
              style={[
                styles.input,
                { color: theme.text.primary, borderBottomColor: theme.palette.secondary },
              ]}
            />
          </View>

          <View>
            <Text style={[styles.label, { color: theme.text.muted }]}>Password</Text>
            <TextInput
              value={password}
              onChangeText={t => {
                setPassword(t)
                setError(null)
              }}
              secureTextEntry
              autoComplete="password"
              editable={!loading}
              placeholderTextColor={theme.text.muted}
              style={[
                styles.input,
                { color: theme.text.primary, borderBottomColor: theme.palette.secondary },
              ]}
            />
          </View>

          {error ? (
            <Text style={[styles.errorText, { color: theme.status.error }]}>{error}</Text>
          ) : null}

          <View style={styles.row}>
            <Pressable style={styles.rememberWrap} onPress={() => setRememberMe(v => !v)}>
              <View
                style={[
                  styles.checkbox,
                  {
                    backgroundColor: rememberMe ? theme.palette.secondary : 'transparent',
                    borderColor: theme.palette.secondary,
                  },
                ]}
              >
                {rememberMe ? (
                  <Text style={[styles.checkmark, { color: theme.bg.surface }]}>✓</Text>
                ) : null}
              </View>
              <Text style={[styles.rememberText, { color: theme.text.primary }]}>Remember Me</Text>
            </Pressable>
            <Pressable onPress={onOpenForgotPassword} hitSlop={8}>
              <Text style={[styles.forgotText, { color: theme.palette.secondary }]}>Forgot Password?</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.ctaWrap}>
          <Pressable
            style={[
              styles.primaryButton,
              { backgroundColor: theme.palette.primary, opacity: loading ? 0.85 : 1 },
            ]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.bg.surface} />
            ) : (
              <Text style={[styles.primaryButtonText, { color: theme.bg.surface }]}>Log In</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.bottomRow}>
          <Text style={[styles.bottomText, { color: theme.text.primary }]}>
            Don&apos;t have an account?{' '}
          </Text>
          <Pressable onPress={onOpenSignUp}>
            <Text style={[styles.bottomLink, { color: theme.palette.secondary }]}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dripWrap: {
    width: '100%',
    minHeight: 156,
    marginBottom: 20,
    alignItems: 'center',
  },
  drip: {
    width: '100%',
    height: 156,
  },
  dripImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingRight: 8,
  },
  backIcon: {
    fontSize: 62,
    lineHeight: 62,
    fontFamily: fontFamily.sansRegular,
  },
  title: {
    marginTop: -10,
    fontSize: 45,
    lineHeight: 54,
    fontFamily: fontFamily.sansBold,
  },
  titleUnderline: {
    marginTop: 5,
    width: 98,
    height: 4,
    borderRadius: 999,
  },
  form: {
    marginTop: 26,
    gap: 26,
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    opacity: 0.35,
    fontFamily: fontFamily.sansMedium,
  },
  input: {
    marginTop: 4,
    paddingBottom: 7,
    fontSize: 20,
    borderBottomWidth: 2,
    fontFamily: fontFamily.sansRegular,
  },
  errorText: {
    fontSize: 14,
    fontFamily: fontFamily.sansMedium,
  },
  row: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '700',
  },
  rememberText: {
    fontSize: 16,
    fontFamily: fontFamily.sansMedium,
  },
  forgotText: {
    fontSize: 16,
    fontFamily: fontFamily.sansMedium,
  },
  ctaWrap: {
    marginTop: 92,
  },
  primaryButton: {
    minHeight: 64,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 38,
    lineHeight: 42,
    fontFamily: fontFamily.accent,
    letterSpacing: 0.3,
  },
  bottomRow: {
    marginTop: 'auto',
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    fontFamily: fontFamily.sansMedium,
  },
  bottomLink: {
    fontSize: 16,
    fontFamily: fontFamily.sansBold,
  },
})
