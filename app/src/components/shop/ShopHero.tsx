import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { CATALOG_HERO_JAR_IMAGE } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export function ShopHero() {
  const { theme } = useTheme()
  const { palette, mode } = theme

  const heroColors =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.38)', 'rgba(255, 107, 0, 0.28)', 'rgba(129, 81, 0, 0.55)'] as const)
      : ([palette.surfaceContainer, 'rgba(255, 165, 0, 0.42)', palette.muted] as const)

  const headlineColor = theme.text.primary
  const subColor = theme.text.muted

  return (
    <LinearGradient
      colors={[...heroColors]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.heroGradient}
    >
      <View style={styles.heroRow}>
        <View style={styles.heroCopy}>
          <Text style={[styles.heroTitle, { color: headlineColor }]}>
            Limited Edition: Rose Gold Honey.
          </Text>
          <Text style={[styles.heroSubtitle, { color: subColor }]}>
            Exclusive harvest from rare blooms.
          </Text>
          <Pressable
            onPressIn={fireLightImpact}
            onPress={() => {}}
            style={[styles.heroCta, { backgroundColor: theme.bg.surface }]}
            accessibilityRole="button"
            accessibilityLabel="Shop now"
          >
            <Text style={[styles.heroCtaLabel, { color: theme.text.primary }]}>Shop Now</Text>
          </Pressable>
        </View>
        <View style={styles.heroImageWrap}>
          <Image source={CATALOG_HERO_JAR_IMAGE} style={styles.heroImage} resizeMode="contain" />
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  heroGradient: {
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 8,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 148,
    paddingTop: 12,
  },
  heroCopy: {
    flex: 1,
    paddingRight: 6,
    gap: 10,
    justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    lineHeight: 20,
  },
  heroCta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 999,
  },
  heroCtaLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 14,
  },
  heroImageWrap: {
    width: '38%',
    maxWidth: 150,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 150,
  },
})
