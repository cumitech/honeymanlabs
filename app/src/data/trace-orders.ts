import type { ImageSourcePropType } from 'react-native'

export type TraceOrderStatus = 'active' | 'delivered'

/**
 * `completedSteps` = count of fully finished stages (0–4).
 * Bee sits on stage index `completedSteps` when `< 4` (e.g. 2 ⇒ Harvesting + Lab Testing done, bee on In Transit).
 */
export type TraceOrder = {
  id: string
  productName: string
  orderCode: string
  dateLabel: string
  image: ImageSourcePropType
  status: TraceOrderStatus
  completedSteps: number
  /**
   * Delivered rows that still appear under the Active tab (matches marketing / reference layouts).
   */
  showInActiveTab?: boolean
}

export const TRACE_STEPS = ['Harvesting', 'Lab Testing', 'In Transit', 'Delivered'] as const

export const MOCK_TRACE_ORDERS: TraceOrder[] = [
  {
    id: '1',
    productName: 'Acacia Honey',
    orderCode: '#HM-9021',
    dateLabel: 'Oct 15, 2023',
    image: require('../assets/12-oz-skep-glass-honey-jars-with-lids-case-of-12-lappesbeesupply__48006-removebg-preview.png'),
    status: 'active',
    completedSteps: 2,
  },
  {
    id: '2',
    productName: 'Manuka Honey 500g',
    orderCode: '#HM-8845',
    dateLabel: 'Oct 10, 2023',
    image: require('../assets/15-oz-glass-honey-pot-jars-case-of-12-with-lids-lappesbeesupply__83280-removebg-preview.png'),
    status: 'delivered',
    completedSteps: 4,
    showInActiveTab: true,
  },
]
