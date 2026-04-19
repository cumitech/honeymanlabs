import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

const VARIANTS = {
  authHero: { minHeight: 156, marginBottom: 20, dripHeight: 156 },
  authFormCompact: { minHeight: 120, marginBottom: 12, dripHeight: 120 },
} as const

export type AuthHoneyDripBannerProps = {
  variant?: keyof typeof VARIANTS
}

export function AuthHoneyDripBanner({ variant = 'authHero' }: AuthHoneyDripBannerProps) {
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
