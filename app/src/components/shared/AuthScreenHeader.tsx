import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export type AuthScreenHeaderVariant = 'signIn' | 'signUp' | 'forgot'

export type AuthScreenHeaderProps = {
  onBack: () => void
  title: string
  variant: AuthScreenHeaderVariant
}

export function AuthScreenHeader({ onBack, title, variant }: AuthScreenHeaderProps) {
  const { theme } = useTheme()
  const s = VARIANT_STYLES[variant]

  return (
    <>
      <Pressable onPress={onBack} hitSlop={10} style={[styles.backButton, s.backButton]}>
        <Text style={[styles.backIcon, s.backIcon, { color: theme.palette.secondary }]}>{'‹'}</Text>
      </Pressable>
      <Text style={[styles.title, s.title, { color: theme.text.primary }]}>{title}</Text>
      <View style={[styles.titleUnderline, s.titleUnderline, { backgroundColor: theme.palette.primary }]} />
    </>
  )
}

const VARIANT_STYLES = {
  signIn: StyleSheet.create({
    backButton: { paddingVertical: 4, paddingRight: 8 },
    backIcon: { fontSize: 62, lineHeight: 62, fontFamily: fontFamily.sansRegular },
    title: { marginTop: -10, fontSize: 45, lineHeight: 54, fontFamily: fontFamily.sansBold },
    titleUnderline: { marginTop: 5, width: 98, height: 4, borderRadius: 999 },
  }),
  signUp: StyleSheet.create({
    backButton: { paddingTop: 0, paddingBottom: 2, paddingRight: 8 },
    backIcon: { fontSize: 44, lineHeight: 44, fontFamily: fontFamily.sansRegular },
    title: { marginTop: 0, fontSize: 30, lineHeight: 36, fontFamily: fontFamily.sansBold },
    titleUnderline: { marginTop: 6, width: 88, height: 4, borderRadius: 999 },
  }),
  forgot: StyleSheet.create({
    backButton: { paddingVertical: 4, paddingRight: 8 },
    backIcon: { fontSize: 62, lineHeight: 62, fontFamily: fontFamily.sansRegular },
    title: { marginTop: -10, fontSize: 38, lineHeight: 44, fontFamily: fontFamily.sansBold },
    titleUnderline: { marginTop: 5, width: 98, height: 4, borderRadius: 999 },
  }),
} as const

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
  },
  backIcon: {},
  title: {},
  titleUnderline: {},
})
