import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export type AuthInlineMessagesProps = {
  error?: string | null
  success?: string | null
}

export function AuthInlineMessages({ error, success }: AuthInlineMessagesProps) {
  const { theme } = useTheme()

  if (!error && !success) return null

  return (
    <View>
      {error ? (
        <Text style={[styles.message, { color: theme.status.error }]}>{error}</Text>
      ) : null}
      {success ? (
        <Text style={[styles.success, { color: theme.status.success }]}>{success}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    fontFamily: fontFamily.sansMedium,
  },
  success: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamily.sansMedium,
  },
})
