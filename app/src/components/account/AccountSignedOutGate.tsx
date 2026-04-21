import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '../shared/AppButton'
import { FadeInMount } from '../layout/FadeInMount'
import { useAuthFlow } from '../../context/AuthFlowContext'
import { fontFamily, useTheme } from '../../theme'

export function AccountSignedOutGate() {
  const { theme } = useTheme()
  const { openSignIn, openSignUp } = useAuthFlow()
  const secondaryBg = theme.mode === 'light' ? '#F4EEE2' : theme.bg.muted

  return (
    <FadeInMount>
      <View style={styles.root}>
        <Text style={[styles.title, { color: theme.text.primary }]}>Sign in to HoneyMan</Text>
        <Text style={[styles.body, { color: theme.text.muted }]}>
          Save your profile, sync preferences, and continue on any device.
        </Text>
        <View style={styles.buttons}>
          <AppButton variant="ctaCompact" label="Log in" onPress={openSignIn} />
          <View style={styles.gap} />
          <AppButton
            variant="secondary"
            label="Create account"
            onPress={openSignUp}
            style={[
              styles.roundedButton,
              { backgroundColor: secondaryBg, borderColor: theme.border },
            ]}
            textStyle={{ color: theme.text.primary }}
          />
        </View>
      </View>
    </FadeInMount>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  body: {
    marginTop: 12,
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 28,
    width: '100%',
    maxWidth: 360,
  },
  gap: {
    height: 12,
  },
  roundedButton: {
    borderRadius: 999,
  },
})
