import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApiError, register, type AuthTokens } from '../api'
import { AuthEmailDivider, SocialLoginButtons } from '../components/auth/SocialLoginButtons'
import {
  AppButton,
  AuthFormFooterLink,
  AuthHoneyDripBanner,
  AuthInlineMessages,
  AuthScreenHeader,
  AuthUnderlinedTextField,
} from '../components/shared'
import { useAppDispatch } from '../store/hooks'
import { fontFamily, useTheme } from '../theme'
import { finalizeAuthSession } from '../utils/finalize-auth-session'

type SignUpScreenProps = {
  onBackToSignIn: () => void
  onSignUpSuccess: () => void
}

function splitDisplayName(raw: string): { firstname: string; lastname: string } {
  const t = raw.trim().replace(/\s+/g, ' ')
  if (!t) return { firstname: '', lastname: '' }
  const i = t.indexOf(' ')
  if (i === -1) return { firstname: t, lastname: 'Member' }
  const rest = t.slice(i + 1).trim()
  return { firstname: t.slice(0, i), lastname: rest || 'Member' }
}

export function SignUpScreen({ onBackToSignIn, onSignUpSuccess }: SignUpScreenProps) {
  const dispatch = useAppDispatch()
  const { theme } = useTheme()
  const [accepted, setAccepted] = React.useState(true)
  const [displayName, setDisplayName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const finalizeSession = React.useCallback(
    async (tokens: AuthTokens) => {
      await finalizeAuthSession(dispatch, tokens, onSignUpSuccess)
    },
    [dispatch, onSignUpSuccess],
  )

  const handleSignUp = React.useCallback(async () => {
    setError(null)
    if (!accepted) return
    const { firstname, lastname } = splitDisplayName(displayName)
    const em = email.trim()
    if (!firstname) {
      setError('Enter your name.')
      return
    }
    if (!em) {
      setError('Enter your email.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      const tokens = await register({
        firstname,
        lastname,
        email: em,
        password,
      })
      await finalizeSession(tokens)
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Sign up failed. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [accepted, displayName, email, finalizeSession, password])

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.bg.muted }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <AuthHoneyDripBanner variant="authFormCompact" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AuthScreenHeader onBack={onBackToSignIn} title="Create account" variant="signUp" />

        <View style={styles.socialBlock}>
          <SocialLoginButtons
            heading="Sign up faster with"
            disabled={loading}
            onAuthenticated={finalizeSession}
            onFlowError={setError}
          />
          <AuthEmailDivider />
        </View>

        <View style={styles.form}>
          <AuthUnderlinedTextField
            label="Full name"
            value={displayName}
            onChangeText={setDisplayName}
            onClearError={() => setError(null)}
            editable={!loading}
            inputVariant="medium"
            autoCapitalize="words"
            placeholder="e.g. Amina Diallo"
          />
          <AuthUnderlinedTextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            onClearError={() => setError(null)}
            editable={!loading}
            inputVariant="medium"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <AuthUnderlinedTextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            onClearError={() => setError(null)}
            editable={!loading}
            inputVariant="medium"
            secureTextEntry
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
          <AuthInlineMessages error={error} />
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
            I agree to the{' '}
            <Text style={[styles.termsLink, { color: theme.palette.secondary }]}>Terms</Text>
            {' & '}
            <Text style={[styles.termsLink, { color: theme.palette.secondary }]}>Privacy</Text>
          </Text>
        </Pressable>

        <View style={styles.ctaWrap}>
          <AppButton
            variant="ctaCompact"
            label="Create account"
            loading={loading}
            disabled={!accepted || loading}
            onPress={handleSignUp}
            loadingOpacity={0.55}
          />
        </View>

        <View style={styles.footerWrap}>
          <AuthFormFooterLink
            prefixText="Already have an account? "
            linkText="Log in"
            onPressLink={onBackToSignIn}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 34,
    paddingTop: 4,
    paddingBottom: 28,
  },
  socialBlock: {
    marginTop: 16,
    gap: 12,
  },
  form: {
    marginTop: 16,
    gap: 16,
  },
  termsWrap: {
    marginTop: 12,
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
    marginTop: 22,
  },
  footerWrap: {
    marginTop: 20,
  },
})
