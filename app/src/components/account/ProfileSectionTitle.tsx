import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

type ProfileSectionTitleProps = { children: string }

export function ProfileSectionTitle({ children }: ProfileSectionTitleProps) {
  const { theme } = useTheme()
  return (
    <Text style={[styles.sectionTitle, { color: theme.text.muted }]} numberOfLines={1}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    flex: 1,
    marginRight: 12,
  },
})
