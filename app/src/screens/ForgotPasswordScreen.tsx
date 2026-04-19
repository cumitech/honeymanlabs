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
import { ApiError, forgotPassword } from '../api'
import { fontFamily, useTheme } from '../theme'

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
      <View style={styles.dripWrap}>
        <ImageBackground
          source={require('../assets/honeydew-honey-drip-1-v1.png')}
          style={styles.drip}
          imageStyle={styles.dripImage}
        />
      </View>

      <View style={styles.content}>
        <Pressable onPress={onBackToSignIn} hitSlop={10} style={styles.backButton}>
          <Text style={[styles.backIcon, { color: theme.palette.secondary }]}>{'‹'}</Text>
        </Pressable>

        <Text style={[styles.title, { color: theme.text.primary }]}>Forgot password</Text>
        <View style={[styles.titleUnderline, { backgroundColor: theme.palette.primary }]} />

        <Text style={[styles.blurb, { color: theme.text.muted }]}>
          Enter the email for your account. If it exists, we&apos;ll send reset instructions.
        </Text>

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
          {error ? (
            <Text style={[styles.errorText, { color: theme.status.error }]}>{error}</Text>
          ) : null}
          {sentMessage ? (
            <Text style={[styles.successText, { color: theme.status.success }]}>{sentMessage}</Text>
          ) : null}
        </View>

        <View style={styles.ctaWrap}>
          <Pressable
            style={[
              styles.primaryButton,
              { backgroundColor: theme.palette.primary, opacity: loading ? 0.85 : 1 },
            ]}
            onPress={submit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={theme.bg.surface} />
            ) : (
              <Text style={[styles.primaryButtonText, { color: theme.bg.surface }]}>Send link</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.bottomRow}>
          <Text style={[styles.bottomText, { color: theme.text.primary }]}>Remember your password? </Text>
          <Pressable onPress={onBackToSignIn}>
            <Text style={[styles.bottomLink, { color: theme.palette.secondary }]}>Log In</Text>
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
    fontSize: 38,
    lineHeight: 44,
    fontFamily: fontFamily.sansBold,
  },
  titleUnderline: {
    marginTop: 5,
    width: 98,
    height: 4,
    borderRadius: 999,
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
  successText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamily.sansMedium,
  },
  ctaWrap: {
    marginTop: 48,
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
