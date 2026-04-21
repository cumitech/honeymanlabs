import { useCallback, useState } from 'react'
import { ApiError } from '../../api'
import { postCheckout } from '../../api/checkout'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearCart } from '../../store/slices/cart-slice'

export type PlacedOrderSummary = {
  id: string
  total_price: number
  status: string
}

export function useOrder() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(s => s.cart.items)
  const accessToken = useAppSelector(s => s.session.accessToken)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeOrder = useCallback(async (): Promise<PlacedOrderSummary> => {
    setError(null)
    if (!accessToken) throw new Error('Sign in to place an order.')
    if (items.length === 0) throw new Error('Your cart is empty.')

    setSubmitting(true)
    try {
      const payload = {
        items: items.map(i => ({ catalogProductId: i.catalogProductId, quantity: i.quantity })),
      }
      const res = await postCheckout(payload)
      dispatch(clearCart())
      return res.order
    } catch (e) {
      const msg =
        e instanceof ApiError ? e.message : e instanceof Error ? e.message : 'Order failed'
      setError(msg)
      throw e
    } finally {
      setSubmitting(false)
    }
  }, [accessToken, dispatch, items])

  return { placeOrder, submitting, error, setError }
}
