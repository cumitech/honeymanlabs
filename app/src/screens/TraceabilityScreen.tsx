import React from 'react'
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { AppInput } from '../components/controls/AppInput'
import { EmptyState } from '../components/feedback/EmptyState'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { OrdersSegmentTabs, type OrdersTab } from '../components/traceability/OrdersSegmentTabs'
import { OrderTraceCard } from '../components/traceability/OrderTraceCard'
import { MOCK_TRACE_ORDERS } from '../data/trace-orders'
import type { RootDrawerParamList } from '../types'
import { useTheme } from '../theme'
import { normalizeOrderLookup, orderMatchesLookup } from '../utils/order-search'
import { fireLightImpact } from '../utils/safe-haptics'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function TraceabilityScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation<DrawerNav>()
  const [tab, setTab] = React.useState<OrdersTab>('active')
  const [historyQuery, setHistoryQuery] = React.useState('')

  const setTabWithReset = React.useCallback((next: OrdersTab) => {
    setTab(next)
    if (next === 'active') {
      setHistoryQuery('')
    }
  }, [])

  const rows = React.useMemo(() => {
    if (tab === 'active') {
      return MOCK_TRACE_ORDERS.filter(o => o.status === 'active' || o.showInActiveTab)
    }
    const delivered = MOCK_TRACE_ORDERS.filter(o => o.status === 'delivered')
    const q = historyQuery.trim()
    if (!q) return delivered
    const needle = normalizeOrderLookup(q)
    return delivered.filter(
      o =>
        orderMatchesLookup(o.orderCode, q) ||
        normalizeOrderLookup(o.productName).includes(needle) ||
        normalizeOrderLookup(o.id).includes(needle),
    )
  }, [tab, historyQuery])

  const onTraceBatch = React.useCallback((orderId: string) => {
    void orderId
  }, [])

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
    >
      <AppScreenTopBar
        title="Orders & traceability"
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
        right={
          <Pressable
            onPressIn={fireLightImpact}
            onPress={() => navigation.openDrawer()}
            hitSlop={10}
            accessibilityLabel="Open menu"
            style={({ pressed }) => [{ opacity: pressed ? 0.55 : 1, padding: 4 }]}
          >
            <MaterialCommunityIcons name="menu" size={22} color={theme.text.primary} />
          </Pressable>
        }
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
