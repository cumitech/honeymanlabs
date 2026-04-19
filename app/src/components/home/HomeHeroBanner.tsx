import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { CATALOG_HERO_JAR_IMAGE } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export function HomeHeroBanner() {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const { palette, mode } = theme

  const heroColors =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.38)', 'rgba(255, 107, 0, 0.28)', 'rgba(129, 81, 0, 0.55)'] as const)
      : ([palette.surfaceContainer, 'rgba(255, 165, 0, 0.42)', palette.muted] as const)

  const goShop = () => {
    fireLightImpact()
    navigation.navigate('Shop' as never)
  }

  return (
    <View style={styles.heroCardWrap}>
      <LinearGradient
        colors={[...heroColors]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.heroCard, { borderColor: theme.border }]}
      >
        <View style={styles.heroCardRow}>
          <View style={styles.heroCardCopy}>
            <Text style={[styles.heroEyebrow, { color: theme.text.muted }]}>New Arrivals -</Text>
            <Text style={[styles.heroCollectionTitle, { color: theme.text.primary }]}>
              The Golden Harvest Collection
            </Text>
            <Pressable
              onPressIn={fireLightImpact}
              onPress={goShop}
              style={[
                styles.heroFrostCta,
                {
                  borderColor: theme.border,
                  backgroundColor: theme.bg.muted,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Shop now"
            >
              <Text style={[styles.heroFrostCtaLabel, { color: theme.text.primary }]}>
                Shop Now
              </Text>
            </Pressable>
          </View>
          <View style={styles.heroCardImageCol}>
            <Image
              source={CATALOG_HERO_JAR_IMAGE}
              style={styles.heroCardJar}
              resizeMode="contain"
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.heroDots}>
        {[0, 1, 2, 3].map(i => (
          <View
            key={i}
            style={[
              styles.heroDot,
              {
                backgroundColor: i === 0 ? theme.palette.primary : theme.border,
                width: i === 0 ? 8 : 6,
                opacity: i === 0 ? 1 : 0.55,
              },
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heroCardWrap: {
    marginBottom: 8,
  },
  heroCard: {
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  heroCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 152,
  },
  heroCardCopy: {
    flex: 1,
    paddingRight: 8,
    gap: 10,
  },
  heroEyebrow: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  heroCollectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    lineHeight: 30,
  },
  heroFrostCta: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  heroFrostCtaLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 14,
  },
  heroCardImageCol: {
    width: '36%',
    maxWidth: 130,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCardJar: {
    width: '100%',
    height: 150,
  },
  heroDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  heroDot: {
    height: 6,
    borderRadius: 3,
  },
})
