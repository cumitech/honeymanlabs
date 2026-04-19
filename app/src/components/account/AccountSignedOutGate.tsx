import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppButton } from '../shared/AppButton'
import { FadeInMount } from '../layout/FadeInMount'
import { useAuthLauncher } from '../../context/AuthLauncherContext'
import { fontFamily, useTheme } from '../../theme'

export function AccountSignedOutGate() {
  const { theme } = useTheme()
  const { openSignIn, openSignUp } = useAuthLauncher()

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
          <AppButton variant="secondary" label="Create account" onPress={openSignUp} />
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
  },
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  body: {
    marginTop: 12,
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
  },
  buttons: {
    marginTop: 28,
  },
  gap: {
    height: 12,
  },
})
