import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApiError, register, type AuthTokens } from '../api'
import { AuthEmailDivider, SocialLoginButtons } from '../components/auth/SocialLoginButtons'
import {
  FormFooterLink,
  HoneyDripBanner,
  InlineMessages,
  ScreenHeader,
  UnderlinedTextField,
} from '../components/auth'
import { AppButton } from '../components/shared'
import { fontFamily, useTheme } from '../theme'
import { splitDisplayName } from '../utils'
import { useAuth } from '../hooks/session/auth.hook'

type SignUpScreenProps = {
  onBackToSignIn: () => void
  onSignUpSuccess: () => void
}

export function SignUpScreen({ onBackToSignIn, onSignUpSuccess }: SignUpScreenProps) {
  const { signIn } = useAuth()
  const { theme } = useTheme()
  const [accepted, setAccepted] = React.useState(true)
  const [displayName, setDisplayName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const finalizeSession = React.useCallback(
    async (tokens: AuthTokens) => {
      await signIn(tokens, onSignUpSuccess)
    },
    [signIn, onSignUpSuccess],
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
      <HoneyDripBanner variant="authFormCompact" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader onBack={onBackToSignIn} title="Create account" variant="signUp" />

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
          <UnderlinedTextField
            label="Full name"
            value={displayName}
            onChangeText={setDisplayName}
            onClearError={() => setError(null)}
            editable={!loading}
            inputVariant="medium"
            autoCapitalize="words"
            placeholder="e.g. Amina Diallo"
          />
          <UnderlinedTextField
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
          <UnderlinedTextField
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
          <InlineMessages error={error} />
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
          <FormFooterLink
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
