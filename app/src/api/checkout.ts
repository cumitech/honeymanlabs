import { apiRequest } from './core/client'

export type CheckoutLineItem = { catalogProductId: string; quantity: number }

export type CheckoutRequest = { items: CheckoutLineItem[] }

export type CheckoutResponse = {
  order: {
    id: string
    total_price: number
    status: string
    payment_status: string
  }
}

export function postCheckout(body: CheckoutRequest) {
  return apiRequest<CheckoutResponse>('/checkout', {
    method: 'POST',
    json: body,
  })
}
