import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export function MapUnavailableNotice({ message }: { message: string }) {
  const { theme } = useTheme()
  return (
    <View
      style={[styles.fallback, { backgroundColor: theme.bg.muted }]}
      accessibilityLabel="Map unavailable"
    >
      <Text style={[styles.fallbackText, { color: theme.text.muted }]}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fallback: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fallbackText: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
})
