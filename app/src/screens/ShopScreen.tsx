import React from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { FadeInMount } from '../components/layout/FadeInMount'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { ShopCategoryChips } from '../components/shop/ShopCategoryChips'
import { ShopHeaderRight } from '../components/shop/ShopHeaderRight'
import { ShopHero } from '../components/shop/ShopHero'
import { ShopProductGrid } from '../components/shop/ShopProductGrid'

export { ShopHeaderRight } from '../components/shop/ShopHeaderRight'

export function ShopScreen() {
  const navigation = useNavigation()

  return (
    <ScreenShell
      scroll
      padded={false}
      scrollContentInsetAdjustmentIOS="never"
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
    >
      <FadeInMount>
        <View style={styles.page}>
          <AppScreenTopBar
            title="HoneyMan"
            showBee
            leading="menu"
            onLeadingPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            right={
              <View style={styles.shopHeaderRight}>
                <ShopHeaderRight />
              </View>
            }
          />
          <ShopHero />
          <View style={styles.belowHero}>
            <ShopCategoryChips />
            <ShopProductGrid />
          </View>
        </View>
      </FadeInMount>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  page: { paddingBottom: 28, paddingTop: 0, marginTop: 0 },
  shopHeaderRight: { justifyContent: 'center', paddingRight: 2 },
  belowHero: { paddingTop: 20, gap: 8 },
})
