import type { ImageSourcePropType } from 'react-native'
import { normalizeOrderLookup, orderMatchesLookup } from '../../utils'
import type { Order } from '../domain/order.model'

export type TraceOrdersTab = 'active' | 'history'

export type TraceOrderStatus = 'active' | 'delivered'

export type TraceOrder = {
  id: string
  productName: string
  orderCode: string
  dateLabel: string
  image: ImageSourcePropType
  status: TraceOrderStatus
  completedSteps: number
  showInActiveTab?: boolean
}

export const emptyTraceOrder: TraceOrder = {
  id: '',
  productName: '',
  orderCode: '',
  dateLabel: '',
  image: { uri: '' },
  status: 'active',
  completedSteps: 0,
}

export const TRACE_STEPS: readonly string[] = [
  'Harvesting',
  'Lab Testing',
  'In Transit',
  'Delivered',
]

export function filterTraceOrdersForTab(
  orders: TraceOrder[],
  tab: TraceOrdersTab,
  historyQuery: string,
): TraceOrder[] {
  if (tab === 'active') {
    return orders.filter(o => o.status === 'active' || o.showInActiveTab)
  }
  const delivered = orders.filter(o => o.status === 'delivered')
  const q = historyQuery.trim()
  if (!q) return delivered
  const needle = normalizeOrderLookup(q)
  return delivered.filter(
    o =>
      orderMatchesLookup(o.orderCode, q) ||
      normalizeOrderLookup(o.productName).includes(needle) ||
      normalizeOrderLookup(o.id).includes(needle),
  )
}

export function toTraceOrder(order: Order): TraceOrder {
  const delivered = String(order.status).toLowerCase() === 'delivered'
  const created = order.createdAt ?? ''
  const dateLabel = created ? new Date(created).toLocaleDateString('en-US') : 'Unknown date'
  return {
    id: order.id,
    productName: 'Honey order',
    orderCode: `#${order.id.slice(0, 8).toUpperCase()}`,
    dateLabel,
    image: { uri: '' },
    status: delivered ? 'delivered' : 'active',
    completedSteps: delivered ? 4 : 2,
    showInActiveTab: delivered,
  }
}
