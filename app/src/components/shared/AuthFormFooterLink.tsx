import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export type AuthFormFooterLinkProps = {
  prefixText: string
  linkText: string
  onPressLink: () => void
  /** Sign-in / forgot pin link row to bottom; sign-up uses natural flow under scroll */
  pinToBottom?: boolean
}

export function AuthFormFooterLink({
  prefixText,
  linkText,
  onPressLink,
  pinToBottom,
}: AuthFormFooterLinkProps) {
  const { theme } = useTheme()

  return (
    <View style={[styles.row, pinToBottom ? styles.rowPinned : null]}>
      <Text style={[styles.prefix, { color: theme.text.primary }]}>{prefixText}</Text>
      <Pressable onPress={onPressLink}>
        <Text style={[styles.link, { color: theme.palette.secondary }]}>{linkText}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rowPinned: {
    marginTop: 'auto',
    marginBottom: 28,
  },
  prefix: {
    fontSize: 16,
    fontFamily: fontFamily.sansMedium,
  },
  link: {
    fontSize: 16,
    fontFamily: fontFamily.sansBold,
  },
})
