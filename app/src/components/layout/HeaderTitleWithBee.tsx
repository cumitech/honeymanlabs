import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ASSET_BEE_LOGO } from '../../constants'
import { fontFamily, useTheme } from '../../theme'

export type HeaderTitleWithBeeProps = {
  title: string
  variant?: 'brand' | 'nav'
}

export function HeaderTitleWithBee({ title, variant = 'nav' }: HeaderTitleWithBeeProps) {
  const { theme } = useTheme()
  const brand = variant === 'brand'

  return (
    <View style={styles.row} accessibilityRole="header">
      <Image
        source={ASSET_BEE_LOGO}
        style={brand ? styles.beeBrand : styles.beeNav}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
      <Text
        numberOfLines={1}
        style={[brand ? styles.titleBrand : styles.titleNav, { color: theme.text.primary }]}
      >
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    maxWidth: '100%',
    flexShrink: 1,
  },
  beeNav: {
    width: 26,
    height: 26,
  },
  beeBrand: {
    width: 28,
    height: 28,
  },
  titleNav: {
    fontFamily: fontFamily.sansBold,
    fontSize: 18,
    flexShrink: 1,
  },
  titleBrand: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 19,
    letterSpacing: 0.2,
    flexShrink: 1,
  },
})
