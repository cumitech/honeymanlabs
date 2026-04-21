import { StyleSheet, View } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { PRODUCT_GRID_HORIZONTAL_PADDING } from '../constants/layout'
import { FadeInMount } from '../components/layout/FadeInMount'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { HeaderRight } from '../components/layout/HeaderRight'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { CatalogPromoHeroCard } from '../components/shared'
import { CategoryChips } from '../components/catalog/CategoryChips'
import { ProductGrid } from '../components/catalog/ProductGrid'
import { useCart } from '../hooks/cart/cart.hook'
import { useProducts } from '../hooks/products/products.hook'
import type { StoreStackParamList } from '../types'

type StoreNav = NativeStackNavigationProp<StoreStackParamList>

export function CatalogScreen() {
  const navigation = useNavigation<StoreNav>()
  const { totalCount } = useCart()
  const { products, openCart } = useProducts()

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
      <FadeInMount>
        <View style={styles.page}>
          <AppScreenTopBar
            title="HoneyMan"
            leading="menu"
            onLeadingPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            right={
              <View style={styles.headerRightSlot}>
                <HeaderRight onPress={openCart} accessibilityLabel="Cart" badgeCount={totalCount} />
              </View>
            }
          />
          <View style={styles.heroPad}>
            <CatalogPromoHeroCard
              title="Limited Edition: Rose Gold Honey."
              subtitle="Exclusive harvest from rare blooms."
              ctaLabel="Browse catalog"
              onCtaPress={() => {}}
              ctaAccessibilityLabel="Browse the catalog below"
            />
          </View>
          <View style={styles.belowHero}>
            <CategoryChips />
            <ProductGrid products={products} sectionTitle="Featured" />
          </View>
        </View>
      </FadeInMount>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  page: { paddingBottom: 28, paddingTop: 0, marginTop: 0 },
  headerRightSlot: { justifyContent: 'center', paddingRight: 2 },
  heroPad: { paddingHorizontal: PRODUCT_GRID_HORIZONTAL_PADDING },
  belowHero: { paddingTop: 18, gap: 8 },
})
