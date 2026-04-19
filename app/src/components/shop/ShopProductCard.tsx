import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { CatalogProduct } from '../../data/catalog'
import { formatCatalogPriceCfa, formatShopProductTitleLine } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type ShopProductCardProps = { product: CatalogProduct; width: number }

export function ShopProductCard({ product, width }: ShopProductCardProps) {
  const { theme } = useTheme()
  const cardBg = theme.bg.card
  const shadow = theme.mode === 'light' ? styles.cardShadowLight : styles.cardShadowDark
  const titleLine = formatShopProductTitleLine(product)

  return (
    <View
      style={[
        styles.productCard,
        shadow,
        { width, backgroundColor: cardBg, borderColor: theme.border },
      ]}
    >
      <View style={[styles.productImageWell, { backgroundColor: theme.bg.muted }]}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
      </View>
      <View style={styles.productBody}>
        <Text style={[styles.productTitle, { color: theme.text.primary }]} numberOfLines={3}>
          {titleLine}
        </Text>
        <View style={styles.productPriceRow}>
          <Text style={[styles.productPrice, { color: theme.text.primary }]}>
            {formatCatalogPriceCfa(product.priceCfa)}
          </Text>
          <Pressable
            onPressIn={fireLightImpact}
            onPress={() => {}}
            style={[styles.addFab, { backgroundColor: theme.palette.primary }]}
            accessibilityRole="button"
            accessibilityLabel={`Add ${product.title} to cart`}
          >
            <MaterialCommunityIcons name="plus" size={20} color={theme.text.onPrimary} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    paddingBottom: 12,
  },
  cardShadowLight: {
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  cardShadowDark: {
    shadowColor: 'rgba(0, 0, 0, 0.45)',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  productImageWell: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 118,
  },
  productImage: {
    width: '100%',
    height: 104,
  },
  productBody: {
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 8,
  },
  productTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 14,
    lineHeight: 19,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  productPrice: {
    fontFamily: fontFamily.displayBold,
    fontSize: 17,
    flexShrink: 1,
  },
  addFab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
