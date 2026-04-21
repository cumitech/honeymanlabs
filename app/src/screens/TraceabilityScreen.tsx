import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { AppInput } from '../components/controls/AppInput'
import { EmptyState } from '../components/feedback/EmptyState'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { DrawerMenuButton } from '../components/layout/DrawerMenuButton'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { OrdersSegmentTabs, type OrdersTab } from '../components/traceability/OrdersSegmentTabs'
import { OrderTraceCard } from '../components/traceability/OrderTraceCard'
import { useOrders } from '../hooks/orders/orders.hook'
import type { RootDrawerParamList } from '../types'
import { filterTraceOrdersForTab } from '../models/views/trace-order.model'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function TraceabilityScreen() {
  const navigation = useNavigation<DrawerNav>()
  const { orders } = useOrders()
  const [tab, setTab] = React.useState<OrdersTab>('active')
  const [historyQuery, setHistoryQuery] = React.useState('')

  const setTabWithReset = React.useCallback((next: OrdersTab) => {
    setTab(next)
    if (next === 'active') {
      setHistoryQuery('')
    }
  }, [])

  const rows = React.useMemo(
    () => filterTraceOrdersForTab(orders, tab, historyQuery),
    [tab, historyQuery, orders],
  )

  const onTraceBatch = React.useCallback((orderId: string) => {
    void orderId
  }, [])

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
        title="Orders & traceability"
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
        right={<DrawerMenuButton onOpenDrawer={() => navigation.openDrawer()} />}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={Platform.OS === 'ios'}
        bounces={Platform.OS === 'ios'}
      >
        <FadeInMount>
          <OrdersSegmentTabs value={tab} onChange={setTabWithReset} />
          {tab === 'history' ? (
            <View style={styles.historySearch}>
              <AppInput
                label="Order number"
                placeholder="#HM-8845"
                value={historyQuery}
                onChangeText={setHistoryQuery}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                helperText="Search completed orders by ID or product name."
              />
            </View>
          ) : null}
          <View style={[styles.list, tab === 'history' && styles.listAfterSearch]}>
            {rows.length > 0 ? (
              rows.map(order => (
                <OrderTraceCard key={order.id} order={order} onTraceBatch={onTraceBatch} />
              ))
            ) : tab === 'history' ? (
              <EmptyState
                title="No matching orders"
                description={
                  historyQuery.trim()
                    ? 'Check the number and try again, or clear the search to see all completed orders.'
                    : 'Completed orders will appear here.'
                }
              />
            ) : null}
          </View>
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 44,
  },
  historySearch: {
    marginTop: 16,
    width: '100%',
  },
  list: {
    marginTop: 18,
  },
  listAfterSearch: {
    marginTop: 14,
  },
})
