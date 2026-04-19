import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApiError, login, type AuthTokens } from '../api'
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

  const finalizeSession = React.useCallback(
    async (tokens: AuthTokens) => {
      await finalizeAuthSession(dispatch, tokens, onSignInSuccess)
    },
    [dispatch, onSignInSuccess],
  )

  const handleSignIn = React.useCallback(async () => {
    setError(null)
    const trimmedEmail = email.trim()
    if (!trimmedEmail || !password) {
      setError('Enter your email and password.')
      return
    }
    setLoading(true)
    try {
      const tokens = await login({ email: trimmedEmail, password })
      await finalizeSession(tokens)
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Sign in failed. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [email, finalizeSession, password])

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg.muted }]}>
      <AuthHoneyDripBanner variant="authHero" />

      <View style={styles.content}>
        <AuthScreenHeader onBack={onBack} title="Log In" variant="signIn" />

        <View style={styles.socialBlock}>
          <SocialLoginButtons
            disabled={loading}
            onAuthenticated={finalizeSession}
            onFlowError={setError}
          />
          <AuthEmailDivider />
        </View>

        <View style={styles.form}>
          <AuthUnderlinedTextField
            label="E-Mail"
            value={email}
            onChangeText={setEmail}
            onClearError={() => setError(null)}
            editable={!loading}
            inputVariant="large"
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
            inputVariant="large"
            secureTextEntry
            autoComplete="password"
          />

          <AuthInlineMessages error={error} />

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
          <AppButton
            variant="ctaHero"
            label="Log In"
            loading={loading}
            disabled={loading}
            onPress={handleSignIn}
          />
        </View>

        <AuthFormFooterLink
          prefixText={"Don't have an account? "}
          linkText="Sign Up"
          onPressLink={onOpenSignUp}
          pinToBottom
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 34,
    paddingTop: 10,
  },
  socialBlock: {
    marginTop: 18,
    gap: 14,
  },
  form: {
    marginTop: 18,
    gap: 22,
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
    marginTop: 36,
  },
})
