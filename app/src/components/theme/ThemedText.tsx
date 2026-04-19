import React from 'react'
import { Text, type TextProps } from 'react-native'
import { useTheme } from '../../context/ThemeProvider'
import { fontFamily } from '../../theme/fonts'

type ThemedTextProps = TextProps & {
  muted?: boolean
}

export function ThemedText({ style, muted, ...props }: ThemedTextProps) {
  const { theme } = useTheme()
  return (
    <Text
      style={[
        {
          color: muted ? theme.text.muted : theme.text.primary,
          fontFamily: fontFamily.sansRegular,
        },
        style,
      ]}
      {...props}
    />
  )
}
