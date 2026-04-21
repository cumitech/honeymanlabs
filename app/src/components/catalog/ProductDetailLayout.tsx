import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { QuantityStepper } from './QuantityStepper'
import { AppButton } from '../shared/AppButton'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic, toRemoteImageSource } from '../../utils'
import type { CatalogProduct } from '../../models/views/catalog.model'
import { PAGE_HORIZONTAL_GUTTER } from '../../constants/layout'

export type ProductDetailLayoutProps = {
  product: CatalogProduct
  titleLine: string
  priceLabel: string
  lineSubtotalLabel: string
  heroWidth: number
  quantityInCart: number
  orderQuantity: number
  canIncreaseOrderQuantity: boolean
  canDecreaseOrderQuantity: boolean
  increaseOrderQuantity: () => void
  decreaseOrderQuantity: () => void
  resetOrderQuantity: () => void
  addQuantityToCart: (product: CatalogProduct, qty: number) => boolean
  openAppMenu: () => void
}

export function ProductDetailLayout({
  product,
  titleLine,
  priceLabel,
  lineSubtotalLabel,
  heroWidth,
  quantityInCart,
  orderQuantity,
  canIncreaseOrderQuantity,
  canDecreaseOrderQuantity,
  increaseOrderQuantity,
  decreaseOrderQuantity,
  resetOrderQuantity,
  addQuantityToCart,
  openAppMenu,
}: ProductDetailLayoutProps) {
  const { theme } = useTheme()

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollContent, { paddingHorizontal: PAGE_HORIZONTAL_GUTTER }]}
    >
      <View
        style={[styles.heroWell, { backgroundColor: theme.bg.muted, borderColor: theme.border }]}
      >
        <Image
          source={toRemoteImageSource(product.imageUrl)}
          style={[styles.heroImage, { width: heroWidth, height: heroWidth * 0.92 }]}
          resizeMode="cover"
          accessibilityLabel={titleLine}
          onError={event => {
            console.log(
              'Product detail image failed',
              product.id,
              product.imageUrl,
              event.nativeEvent.error,
            )
          }}
        />
      </View>

      <View style={[styles.badge, { backgroundColor: theme.bg.card, borderColor: theme.border }]}>
        <Text style={[styles.badgeText, { color: theme.palette.accent }]}>{product.cardTitle}</Text>
      </View>

      <Text style={[styles.title, { color: theme.text.primary }]}>{titleLine}</Text>

      <View style={styles.priceBlock}>
        <Text style={[styles.price, { color: theme.text.primary }]}>{priceLabel}</Text>
        {quantityInCart > 0 ? (
          <View style={[styles.inCartPill, { backgroundColor: theme.bg.muted }]}>
            <MaterialCommunityIcons name="cart-check" size={16} color={theme.palette.primary} />
            <Text style={[styles.inCartText, { color: theme.text.primary }]}>
              {quantityInCart} in cart
            </Text>
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.quantityWrap,
          theme.mode === 'light' ? styles.quantityWrapShadowLight : styles.quantityWrapShadowDark,
        ]}
      >
        <QuantityStepper
          quantity={orderQuantity}
          canDecrement={canDecreaseOrderQuantity}
          canIncrement={canIncreaseOrderQuantity}
          onDecrement={decreaseOrderQuantity}
          onIncrement={increaseOrderQuantity}
        />
      </View>

      <View style={styles.subtotalRow}>
        <Text style={[styles.subtotalLabel, { color: theme.text.muted }]}>Line subtotal</Text>
        <Text style={[styles.subtotalValue, { color: theme.text.primary }]}>
          {lineSubtotalLabel}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <Text style={[styles.sectionLabel, { color: theme.text.muted }]}>About this jar</Text>
      <Text style={[styles.body, { color: theme.text.primary }]}>{product.cardDescription}</Text>

      <Pressable
        onPressIn={lightHaptic}
        onPress={openAppMenu}
        style={({ pressed }) => [
          styles.traceRow,
          { borderColor: theme.border, opacity: pressed ? 0.88 : 1 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Open menu for traceability and lab"
      >
        <MaterialCommunityIcons name="bee" size={22} color={theme.palette.primary} />
        <View style={styles.traceCopy}>
          <Text style={[styles.traceTitle, { color: theme.text.primary }]}>Hive to jar</Text>
          <Text style={[styles.traceSub, { color: theme.text.muted }]}>
            Trace batches and lab notes from the app menu.
          </Text>
        </View>
      </Pressable>

      <AppButton
        variant="primary"
        label={orderQuantity > 1 ? `Add ${orderQuantity} to cart` : 'Add to cart'}
        onPress={() => {
          if (addQuantityToCart(product, orderQuantity)) {
            resetOrderQuantity()
          }
        }}
        style={styles.cta}
        accessibilityLabel={`Add ${orderQuantity} of ${titleLine} to cart`}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 8,
  },
  heroWell: {
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  heroImage: {
    alignSelf: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
  },
  badgeText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 26,
    lineHeight: 32,
    marginBottom: 12,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  quantityWrap: {
    marginBottom: 12,
  },
  quantityWrapShadowLight: {
    shadowColor: '#1B1200',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  quantityWrapShadowDark: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  subtotalLabel: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  subtotalValue: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 18,
    letterSpacing: 0.2,
  },
  price: {
    fontFamily: fontFamily.displayBold,
    fontSize: 28,
  },
  inCartPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  inCartText: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 18,
  },
  sectionLabel: {
    fontFamily: fontFamily.sansBold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  body: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  traceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 24,
  },
  traceCopy: {
    flex: 1,
    gap: 4,
    marginBottom: 15,
  },
  traceTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: 15,
  },
  traceSub: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
    lineHeight: 18,
  },
  cta: {
    borderRadius: 999,
    minHeight: 52,
  },
})
