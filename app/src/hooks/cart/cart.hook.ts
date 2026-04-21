import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addToCart,
  clearCart,
  decrementLine,
  incrementLine,
  removeLine,
  type CartLine,
} from '../../store/slices/cart-slice'
import type { CatalogProduct } from '../../models/views/catalog.model'

export function useCart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(s => s.cart.items)

  const totalCount = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items])
  const totalCfa = useMemo(() => items.reduce((n, i) => n + i.priceCfa * i.quantity, 0), [items])

  const addItem = useCallback((product: CatalogProduct) => dispatch(addToCart(product)), [dispatch])
  const increaseQty = useCallback(
    (catalogProductId: string) => dispatch(incrementLine(catalogProductId)),
    [dispatch],
  )
  const decreaseQty = useCallback(
    (catalogProductId: string) => dispatch(decrementLine(catalogProductId)),
    [dispatch],
  )
  const deleteLine = useCallback(
    (catalogProductId: string) => dispatch(removeLine(catalogProductId)),
    [dispatch],
  )
  const emptyCart = useCallback(() => dispatch(clearCart()), [dispatch])

  return {
    items,
    totalCount,
    totalCfa,
    addItem,
    increaseQty,
    decreaseQty,
    deleteLine,
    emptyCart,
  } satisfies {
    items: CartLine[]
    totalCount: number
    totalCfa: number
    addItem: (product: CatalogProduct) => void
    increaseQty: (catalogProductId: string) => void
    decreaseQty: (catalogProductId: string) => void
    deleteLine: (catalogProductId: string) => void
    emptyCart: () => void
  }
}
