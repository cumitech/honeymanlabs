import React from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApiError, fetchSessionProfile, register } from '../api'
import { saveRefreshToken } from '../utils/refresh-token-storage'
import { useAppDispatch } from '../store/hooks'
import { applyAccessToken, setUserProfile } from '../store/slices/session-slice'
import { fontFamily, useTheme } from '../theme'

type SignUpScreenProps = {
  onBackToSignIn: () => void
  onSignUpSuccess: () => void
}

export function SignUpScreen({ onBackToSignIn, onSignUpSuccess }: SignUpScreenProps) {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const [accepted, setAccepted] = React.useState(true)
  const [firstname, setFirstname] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSignUp = React.useCallback(async () => {
    setError(null)
    if (!accepted) return
    const fn = firstname.trim()
    const ln = lastname.trim()
    const em = email.trim()
    const ph = phone.trim()
    if (!fn || !ln) {
      setError('Enter your first and last name.')
      return
    }
    if (!em) {
      setError('Enter your email.')
      return
    }
    if (!ph) {
      setError('Enter your phone number.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const { accessToken, refreshToken } = await register({
        firstname: fn,
        lastname: ln,
        email: em,
        password,
        phone: ph,
      })
      await saveRefreshToken(refreshToken)
      dispatch(applyAccessToken({ accessToken }))
      try {
        const profile = await fetchSessionProfile()
        dispatch(setUserProfile(profile))
      } catch {}
      onSignUpSuccess()
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Sign up failed. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [
    accepted,
    confirmPassword,
    dispatch,
    email,
    firstname,
    lastname,
    onSignUpSuccess,
    password,
    phone,
  ])

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.bg.muted }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <View style={styles.dripWrap}>
        <ImageBackground
          source={require('../assets/honeydew-honey-drip-1-v1.png')}
          style={styles.drip}
          imageStyle={styles.dripImage}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={onBackToSignIn} hitSlop={10} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.palette.secondary }]}>{'‹'}</Text>
        </Pressable>

        <Text style={[styles.title, { color: theme.text.primary }]}>Sign Up</Text>
        <View style={[styles.titleUnderline, { backgroundColor: theme.palette.primary }]} />

        <View style={styles.form}>
          <View>
            <Text style={[styles.label, { color: theme.text.muted }]}>First name</Text>
            <TextInput
              value={firstname}
              onChangeText={t => {
                setFirstname(t)
                setError(null)
              }}
              autoCapitalize="words"
              editable={!loading}
              placeholderTextColor={theme.text.muted}
              style={[
                styles.input,
                { color: theme.text.primary, borderBottomColor: theme.palette.secondary },
              ]}
            />
          </View>
          <View>
            <Text style={[styles.label, { color: theme.text.muted }]}>Last name</Text>
            <TextInput
              value={lastname}
              onChangeText={t => {
                setLastname(t)
                setError(null)
              }}
              autoCapitalize="words"
              editable={!loading}
              placeholderTextColor={theme.text.muted}
              style={[
                styles.input,
                { color: theme.text.primary, borderBottomColor: theme.palette.secondary },
              ]}
            />
          </View>
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
            <Text style={[styles.label, { color: theme.text.muted }]}>Phone</Text>
            <TextInput
              value={phone}
              onChangeText={t => {
                setPhone(t)
                setError(null)
              }}
              keyboardType="phone-pad"
              autoComplete="tel"
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
              autoComplete="new-password"
              editable={!loading}
              placeholderTextColor={theme.text.muted}
              style={[
                styles.input,
                { color: theme.text.primary, borderBottomColor: theme.palette.secondary },
              ]}
            />
          </View>
          <View>
            <Text style={[styles.label, { color: theme.text.muted }]}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={t => {
                setConfirmPassword(t)
                setError(null)
              }}
              secureTextEntry
              autoComplete="new-password"
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
        </View>

        <Pressable style={styles.termsWrap} onPress={() => setAccepted(v => !v)}>
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: accepted ? theme.palette.secondary : 'transparent',
                borderColor: theme.palette.secondary,
              },
            ]}
          >
            {accepted ? (
              <Text style={[styles.checkmark, { color: theme.bg.surface }]}>✓</Text>
            ) : null}
          </View>
          <Text style={[styles.termsText, { color: theme.text.primary }]}>
            By signing up you accept the{' '}
            <Text style={[styles.termsLink, { color: theme.palette.secondary }]}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text style={[styles.termsLink, { color: theme.palette.secondary }]}>
              Privacy Policy
            </Text>
          </Text>
        </Pressable>

        <View style={styles.ctaWrap}>
          <Pressable
            style={[
              styles.primaryButton,
              {
                backgroundColor: theme.palette.primary,
                opacity: accepted && !loading ? 1 : 0.55,
              },
            ]}
            onPress={handleSignUp}
            disabled={!accepted || loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.bg.surface} />
            ) : (
              <Text style={[styles.primaryButtonText, { color: theme.bg.surface }]}>Sign Up</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.bottomRow}>
          <Text style={[styles.bottomText, { color: theme.text.primary }]}>
            Already have an account?{' '}
          </Text>
          <Pressable onPress={onBackToSignIn}>
            <Text style={[styles.bottomLink, { color: theme.palette.secondary }]}>Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 34,
    paddingTop: 4,
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingBottom: 2,
    paddingRight: 8,
  },
  backIcon: {
    fontSize: 44,
    lineHeight: 44,
    fontFamily: fontFamily.sansRegular,
  },
  title: {
    marginTop: 0,
    fontSize: 34,
    lineHeight: 38,
    fontFamily: fontFamily.sansBold,
  },
  titleUnderline: {
    marginTop: 6,
    width: 88,
    height: 4,
    borderRadius: 999,
  },
  form: {
    marginTop: 22,
    gap: 20,
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
  termsWrap: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: '700',
  },
  termsText: {
    flex: 1,
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: fontFamily.sansMedium,
  },
  termsLink: {
    fontFamily: fontFamily.sansBold,
  },
  ctaWrap: {
    marginTop: 28,
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
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
