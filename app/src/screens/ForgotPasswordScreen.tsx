import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ApiError, forgotPassword } from '../api'
import {
  FormFooterLink,
  HoneyDripBanner,
  InlineMessages,
  ScreenHeader,
  UnderlinedTextField,
} from '../components/auth'
import { fontFamily, useTheme } from '../theme'
import { AppButton } from '../components'

type ForgotPasswordScreenProps = {
  onBackToSignIn: () => void
}

export function ForgotPasswordScreen({ onBackToSignIn }: ForgotPasswordScreenProps) {
  const { theme } = useTheme()
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [sentMessage, setSentMessage] = React.useState<string | null>(null)

  const submit = async () => {
    setError(null)
    setSentMessage(null)
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Enter your email address.')
      return
    }
    setLoading(true)
    try {
      const res = await forgotPassword({ email: trimmed })
      setSentMessage(res.message)
    } catch (e) {
      const msg = e instanceof ApiError ? e.message : 'Something went wrong. Try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.bg.muted }]}>
      <HoneyDripBanner variant="authHero" />

      <View style={styles.content}>
        <ScreenHeader onBack={onBackToSignIn} title="Forgot password" variant="forgot" />

        <Text style={[styles.blurb, { color: theme.text.muted }]}>
          Enter the email for your account. If it exists, we&apos;ll send reset instructions.
        </Text>

        <View style={styles.form}>
          <UnderlinedTextField
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
          <InlineMessages error={error} success={sentMessage} />
        </View>

        <View style={styles.ctaWrap}>
          <AppButton
            variant="ctaHero"
            label="Send link"
            loading={loading}
            disabled={loading}
            onPress={submit}
          />
        </View>

        <FormFooterLink
          prefixText="Remember your password? "
          linkText="Log In"
          onPressLink={onBackToSignIn}
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
  blurb: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fontFamily.sansRegular,
    opacity: 0.85,
  },
  form: {
    marginTop: 22,
    gap: 14,
  },
  ctaWrap: {
    marginTop: 48,
  },
})
