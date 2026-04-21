import React from 'react'
import { Alert, Platform, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { ApiError } from '../api'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { CartSummary } from '../components/cart/CartSummary'
import { useAuthFlow } from '../context/AuthFlowContext'
import { useCart } from '../hooks/cart/cart.hook'
import { useOrder } from '../hooks/checkout/checkout.hook'
import { PAGE_HORIZONTAL_GUTTER } from '../constants/layout'
import { useAuth } from '../hooks/session/auth.hook'
import type { RootDrawerParamList } from '../types'
import { formatCatalogPriceCfa } from '../models/views/catalog.model'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function CartScreen() {
  const navigation = useNavigation<DrawerNav>()
  const { accessToken } = useAuth()
  const { openSignIn } = useAuthFlow()
  const { items, totalCount, totalCfa, increaseQty, decreaseQty, deleteLine } = useCart()
  const { placeOrder, submitting, error, setError } = useOrder()

  const onPlaceOrder = async () => {
    setError(null)
    try {
      const order = await placeOrder()
      const total =
        typeof order.total_price === 'number' ? order.total_price : Number(order.total_price)
      Alert.alert(
        'Order placed',
        `Thank you. Order ${order.id.slice(0, 8)}… — ${formatCatalogPriceCfa(total)} (${order.status}).`,
        [{ text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'Store' }) }],
      )
    } catch (e) {
      const msg =
        e instanceof ApiError ? e.message : e instanceof Error ? e.message : 'Order failed'
      Alert.alert('Order', msg)
    }
  }

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
        title="Cart"
        leading="back"
        onLeadingPress={() => navigation.navigate('Main', { screen: 'Store' })}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={Platform.OS === 'ios'}
      >
        <FadeInMount>
          <CartSummary
            items={items}
            totalCount={totalCount}
            totalCfa={totalCfa}
            error={error}
            accessToken={Boolean(accessToken)}
            submitting={submitting}
            onPlaceOrder={onPlaceOrder}
            onOpenSignIn={openSignIn}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            deleteLine={deleteLine}
          />
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: PAGE_HORIZONTAL_GUTTER,
    paddingBottom: 40,
    paddingTop: 8,
  },
})
