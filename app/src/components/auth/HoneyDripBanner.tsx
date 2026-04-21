import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

type HoneyDripVariantKey = 'authHero' | 'authFormCompact'

type HoneyDripVariant = {
  minHeight: number
  marginBottom: number
  dripHeight: number
}

const VARIANTS: Record<HoneyDripVariantKey, HoneyDripVariant> = {
  authHero: { minHeight: 156, marginBottom: 20, dripHeight: 156 },
  authFormCompact: { minHeight: 120, marginBottom: 12, dripHeight: 120 },
}

export type HoneyDripBannerProps = {
  variant?: HoneyDripVariantKey
}

export function HoneyDripBanner({ variant = 'authHero' }: HoneyDripBannerProps) {
  const v = VARIANTS[variant]
  return (
    <View style={[styles.dripWrap, { minHeight: v.minHeight, marginBottom: v.marginBottom }]}>
      <ImageBackground
        source={require('../../assets/honeydew-honey-drip-1-v1.png')}
        style={[styles.drip, { height: v.dripHeight }]}
        imageStyle={styles.dripImage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dripWrap: {
    width: '100%',
    alignItems: 'center',
  },
  drip: {
    width: '100%',
  },
  dripImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
})
