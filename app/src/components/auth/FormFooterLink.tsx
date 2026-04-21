import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export type FormFooterLinkProps = {
  prefixText: string
  linkText: string
  onPressLink: () => void
  pinToBottom?: boolean
}

export function FormFooterLink({
  prefixText,
  linkText,
  onPressLink,
  pinToBottom,
}: FormFooterLinkProps) {
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
