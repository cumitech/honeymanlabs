import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  formatCatalogPriceCfa,
  formatProductTitleLine,
  type CatalogProduct,
} from '../../models/views/catalog.model'
import { useProducts } from '../../hooks/products/products.hook'
import { toRemoteImageSource } from '../../utils'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'

export type ProductCardProps = { product: CatalogProduct; width: number }

export const ProductCard = ({ product, width }: ProductCardProps) => {
  const { theme } = useTheme()
  const { openProduct, addProductToCart } = useProducts()
  const cardBg = theme.bg.card
  const shadow = theme.mode === 'light' ? styles.cardShadowLight : styles.cardShadowDark
  const titleLine = formatProductTitleLine(product)

  const onOpenDetail = () => {
    lightHaptic()
    openProduct(product.id)
  }

  const onAddPress = () => {
    lightHaptic()
    addProductToCart(product)
  }

  console.log(product)

  return (
    <View
      style={[
        styles.productCard,
        shadow,
        { width, backgroundColor: cardBg, borderColor: theme.border },
      ]}
    >
      <Pressable
        onPress={onOpenDetail}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${titleLine}`}
        style={styles.tapMain}
      >
        <View style={[styles.productImageWell, { backgroundColor: theme.bg.muted }]}>
          <Image
            source={toRemoteImageSource(product.imageUrl)}
            style={styles.productImage}
            resizeMode="cover"
            onError={event => {
              console.log(
                'Product image failed',
                product.id,
                product.imageUrl,
                event.nativeEvent.error,
              )
            }}
          />
        </View>
        <View style={styles.productBody}>
          <Text style={[styles.productTitle, { color: theme.text.primary }]} numberOfLines={3}>
            {titleLine}
          </Text>
        </View>
      </Pressable>
      <View style={[styles.productBody, styles.priceRowPad]}>
        <View style={styles.productPriceRow}>
          <Text style={[styles.productPrice, { color: theme.text.primary }]}>
            {formatCatalogPriceCfa(product.priceCfa)}
          </Text>
          <Pressable
            onPress={onAddPress}
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
    shadowColor: '#1B1200',
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardShadowDark: {
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tapMain: {
    flexGrow: 0,
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
  priceRowPad: {
    paddingTop: 0,
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
