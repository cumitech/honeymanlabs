import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { CatalogProduct } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type HomeFeaturedProductCardProps = { product: CatalogProduct; width: number }

export function HomeFeaturedProductCard({ product, width }: HomeFeaturedProductCardProps) {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const cardBg = theme.bg.card

  const onDetails = () => {
    fireLightImpact()
    navigation.navigate('Shop' as never)
  }

  return (
    <View
      style={[styles.featureCard, { width, backgroundColor: cardBg, borderColor: theme.border }]}
    >
      <View style={[styles.featureImageWell, { backgroundColor: theme.bg.muted }]}>
        <Image source={product.image} style={styles.featureImage} resizeMode="contain" />
      </View>
      <View style={styles.featureBody}>
        <Text style={[styles.featureTitle, { color: theme.text.primary }]} numberOfLines={2}>
          {product.cardTitle}
        </Text>
        <Text style={[styles.featureDesc, { color: theme.text.muted }]} numberOfLines={2}>
          {product.cardDescription}
        </Text>
        <Pressable
          onPressIn={fireLightImpact}
          onPress={onDetails}
          style={[styles.featureCta, { backgroundColor: theme.bg.muted }]}
          accessibilityRole="button"
          accessibilityLabel={`View details for ${product.cardTitle}`}
        >
          <Text style={[styles.featureCtaLabel, { color: theme.text.primary }]}>View Details</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  featureCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  featureImageWell: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  featureImage: {
    width: '88%',
    height: 120,
  },
  featureBody: {
    padding: 14,
    gap: 8,
  },
  featureTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 17,
    lineHeight: 22,
  },
  featureDesc: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
    lineHeight: 19,
  },
  featureCta: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  featureCtaLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 13,
  },
})
