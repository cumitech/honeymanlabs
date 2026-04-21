import React, { useMemo } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RouteProp } from '@react-navigation/native'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { HeaderRight } from '../components/layout/HeaderRight'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { ProductDetailLayout } from '../components/catalog/ProductDetailLayout'
import { PAGE_HORIZONTAL_GUTTER, PRODUCT_DETAIL_HERO_IMAGE_MAX } from '../constants/layout'
import { formatCatalogPriceCfa } from '../models/views/catalog.model'
import { useProducts } from '../hooks/products/products.hook'
import { useCart } from '../hooks/cart/cart.hook'
import type { StoreStackParamList } from '../types'
import { fontFamily, useTheme } from '../theme'

type Nav = NativeStackNavigationProp<StoreStackParamList, 'ProductDetail'>
type Route = RouteProp<StoreStackParamList, 'ProductDetail'>

export function ProductDetailScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation<Nav>()
  const route = useRoute<Route>()
  const { productId } = route.params
  const {
    product,
    titleLine,
    priceLabel,
    quantityInCart,
    orderQuantity,
    canIncreaseOrderQuantity,
    canDecreaseOrderQuantity,
    increaseOrderQuantity,
    decreaseOrderQuantity,
    resetOrderQuantity,
    addQuantityToCart,
    openCart,
    openAppMenu,
  } = useProducts({ productId })
  const { totalCount } = useCart()
  const { width: windowWidth } = useWindowDimensions()

  const lineSubtotalLabel = useMemo(() => {
    if (!product) return ''
    return formatCatalogPriceCfa(product.priceCfa * orderQuantity)
  }, [orderQuantity, product])

  const heroW = Math.min(windowWidth - PAGE_HORIZONTAL_GUTTER * 2, PRODUCT_DETAIL_HERO_IMAGE_MAX)

  if (!product) {
    return (
      <ScreenShell
        scroll={false}
        padded={false}
        safeAreaEdges={['left', 'right', 'bottom']}
        screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
        screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
        screenHoneycombCenterStyle={ScreenHoneyCombLayoutStyle.center}
      >
        <AppScreenTopBar
          title="Product"
          leading="back"
          onLeadingPress={() => navigation.goBack()}
        />
        <View style={{ paddingHorizontal: PAGE_HORIZONTAL_GUTTER, paddingTop: 24 }}>
          <Text style={[styles.body, { color: theme.text.muted }]}>
            This product is not in the catalog.
          </Text>
        </View>
      </ScreenShell>
    )
  }

  return (
    <ScreenShell
      scroll
      padded={false}
      scrollContentInsetAdjustmentIOS="never"
      safeAreaEdges={['left', 'right', 'bottom']}
      screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
      screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
      screenHoneycombCenterStyle={ScreenHoneyCombLayoutStyle.center}
    >
      <AppScreenTopBar
        title=""
        leading="back"
        onLeadingPress={() => navigation.goBack()}
        right={
          <View style={styles.headerRightSlot}>
            <HeaderRight onPress={openCart} accessibilityLabel="Cart" badgeCount={totalCount} />
          </View>
        }
      />

      <ProductDetailLayout
        product={product}
        titleLine={titleLine}
        priceLabel={priceLabel}
        lineSubtotalLabel={lineSubtotalLabel}
        heroWidth={heroW}
        quantityInCart={quantityInCart}
        orderQuantity={orderQuantity}
        canIncreaseOrderQuantity={canIncreaseOrderQuantity}
        canDecreaseOrderQuantity={canDecreaseOrderQuantity}
        increaseOrderQuantity={increaseOrderQuantity}
        decreaseOrderQuantity={decreaseOrderQuantity}
        resetOrderQuantity={resetOrderQuantity}
        addQuantityToCart={addQuantityToCart}
        openAppMenu={openAppMenu}
      />
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  headerRightSlot: { justifyContent: 'center', paddingRight: 2 },
  body: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
})
