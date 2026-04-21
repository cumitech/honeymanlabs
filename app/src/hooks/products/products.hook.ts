import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert } from 'react-native'
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native'
import type { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useAuthFlow } from '../../context/AuthFlowContext'
import type { UpdateMode } from '../../models/common/update-mode.enum'
import {
  formatCatalogPriceCfa,
  formatProductTitleLine,
  type CatalogProduct,
} from '../../models/views/catalog.model'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addProductSuccess,
  editProductSuccess,
  fetchProductsAsync,
  fetchProductsError,
  fetchProductsRequest,
  fetchProductsSuccess,
  resetProducts,
  setActiveProduct,
  setProductUpdateMode,
  setProductsSearching,
} from '../../store/slices/products.slice'
import { useCart } from '../cart/cart.hook'
import { useInitialFetch } from '../shared/initial-fetch.hook'

const MAX_DETAIL_ORDER_QUANTITY = 99

function showSignInForCartAlert(openSignIn: () => void) {
  Alert.alert(
    'Sign in to continue',
    'Create a free account or sign in to add items to your cart and check out.',
    [
      { text: 'Not now', style: 'cancel' },
      { text: 'Sign in', onPress: () => openSignIn() },
    ],
  )
}

type UseProductsParams = {
  productId?: string
}

export const useProducts = ({ productId }: UseProductsParams = {}) => {
  const dispatch = useAppDispatch()
  const {
    items: products,
    errors,
    active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
  } = useAppSelector(s => s.products)
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const cartItems = useAppSelector(s => s.cart.items)
  const accessToken = useAppSelector(s => s.session.accessToken)
  const { openSignIn } = useAuthFlow()
  const { addItem } = useCart()
  const [orderQuantity, setOrderQuantity] = useState(1)

  const loadProducts = useCallback(() => {
    if (!initialFetch) return
    void dispatch(fetchProductsAsync(undefined))
  }, [dispatch, initialFetch])

  useInitialFetch(loadProducts, initialFetch)

  const requestFetch = useCallback(() => {
    dispatch(fetchProductsRequest(undefined))
  }, [dispatch])

  const applyFetchSuccess = useCallback(
    (payload: CatalogProduct[]) => {
      dispatch(fetchProductsSuccess(payload))
    },
    [dispatch],
  )

  const applyFetchError = useCallback(
    (message: string) => {
      dispatch(fetchProductsError(message))
    },
    [dispatch],
  )

  const replaceProduct = useCallback(
    (product: CatalogProduct) => {
      dispatch(editProductSuccess(product))
    },
    [dispatch],
  )

  const appendProduct = useCallback(
    (product: CatalogProduct) => {
      dispatch(addProductSuccess(product))
    },
    [dispatch],
  )

  const selectProduct = useCallback(
    (product: CatalogProduct) => {
      dispatch(setActiveProduct(product))
    },
    [dispatch],
  )

  const changeUpdateMode = useCallback(
    (mode: UpdateMode) => {
      dispatch(setProductUpdateMode(mode))
    },
    [dispatch],
  )

  const setSearching = useCallback(
    (value: boolean) => {
      dispatch(setProductsSearching(value))
    },
    [dispatch],
  )

  const clearProducts = useCallback(() => {
    dispatch(resetProducts(undefined))
  }, [dispatch])

  useEffect(() => {
    setOrderQuantity(1)
  }, [productId])

  const product = useMemo(() => {
    if (!productId) return null
    return products.find(p => p.id === productId) ?? null
  }, [productId, products])

  const titleLine = useMemo(() => (product ? formatProductTitleLine(product) : ''), [product])
  const priceLabel = useMemo(
    () => (product ? formatCatalogPriceCfa(product.priceCfa) : ''),
    [product],
  )

  const quantityInCart = useMemo(() => {
    if (!product) return 0
    return cartItems.find(i => i.catalogProductId === product.id)?.quantity ?? 0
  }, [cartItems, product])

  const openProduct = useCallback(
    (targetProductId: string) => {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Store',
          params: { screen: 'ProductDetail', params: { productId: targetProductId } },
        }),
      )
    },
    [navigation],
  )

  const openCart = useCallback(() => {
    navigation.dispatch(CommonActions.navigate({ name: 'Cart' }))
  }, [navigation])

  const openAppMenu = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer())
  }, [navigation])

  const increaseOrderQuantity = useCallback(() => {
    setOrderQuantity(q => Math.min(MAX_DETAIL_ORDER_QUANTITY, q + 1))
  }, [])

  const decreaseOrderQuantity = useCallback(() => {
    setOrderQuantity(q => Math.max(1, q - 1))
  }, [])

  const resetOrderQuantity = useCallback(() => {
    setOrderQuantity(1)
  }, [])

  const addProductToCart = useCallback(
    (targetProduct: CatalogProduct) => {
      if (!accessToken) {
        showSignInForCartAlert(openSignIn)
        return false
      }
      addItem(targetProduct)
      return true
    },
    [accessToken, addItem, openSignIn],
  )

  const addQuantityToCart = useCallback(
    (targetProduct: CatalogProduct, quantity: number) => {
      const n = Math.floor(quantity)
      if (n < 1) return false
      if (!accessToken) {
        showSignInForCartAlert(openSignIn)
        return false
      }
      Array.from({ length: n }).forEach(() => addItem(targetProduct))
      return true
    },
    [accessToken, addItem, openSignIn],
  )

  return {
    products,
    errors,
    activeProduct: active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
    error: errors || null,
    loading: initialFetch || isLoading,
    loadProducts,
    requestFetch,
    applyFetchSuccess,
    applyFetchError,
    replaceProduct,
    appendProduct,
    selectProduct,
    changeUpdateMode,
    setSearching,
    clearProducts,
    product,
    titleLine,
    priceLabel,
    quantityInCart,
    orderQuantity,
    canIncreaseOrderQuantity: orderQuantity < MAX_DETAIL_ORDER_QUANTITY,
    canDecreaseOrderQuantity: orderQuantity > 1,
    increaseOrderQuantity,
    decreaseOrderQuantity,
    resetOrderQuantity,
    openProduct,
    openCart,
    openAppMenu,
    addProductToCart,
    addQuantityToCart,
  }
}
