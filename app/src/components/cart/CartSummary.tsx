import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppButton } from '../shared/AppButton'
import { fontFamily, useTheme } from '../../theme'
import { formatCatalogPriceCfa } from '../../models/views/catalog.model'
import { lightHaptic } from '../../utils'
import type { CartLine } from '../../store/slices/cart-slice'

export type CartSummaryProps = {
  items: CartLine[]
  totalCount: number
  totalCfa: number
  error: string | null
  accessToken: boolean
  submitting: boolean
  onPlaceOrder: () => void
  onOpenSignIn: () => void
  increaseQty: (catalogProductId: string) => void
  decreaseQty: (catalogProductId: string) => void
  deleteLine: (catalogProductId: string) => void
}

export function CartSummary({
  items,
  totalCount,
  totalCfa,
  error,
  accessToken,
  submitting,
  onPlaceOrder,
  onOpenSignIn,
  increaseQty,
  decreaseQty,
  deleteLine,
}: CartSummaryProps) {
  const { theme } = useTheme()

  return (
    <>
      {error ? (
        <Text style={[styles.errorText, { color: theme.status.error }]}>{error}</Text>
      ) : null}

      {items.length === 0 ? (
        <Text style={[styles.empty, { color: theme.text.muted }]}>Your cart is empty.</Text>
      ) : (
        items.map(line => (
          <View
            key={line.catalogProductId}
            style={[styles.row, { borderColor: theme.border, backgroundColor: theme.bg.card }]}
          >
            <View style={styles.rowMain}>
              <Text style={[styles.title, { color: theme.text.primary }]} numberOfLines={2}>
                {line.title}
              </Text>
              <Text style={[styles.unitPrice, { color: theme.text.muted }]}>
                {formatCatalogPriceCfa(line.priceCfa)} each
              </Text>
            </View>
            <View style={styles.controls}>
              <Pressable
                onPressIn={lightHaptic}
                onPress={() => decreaseQty(line.catalogProductId)}
                style={[styles.qtyBtn, { borderColor: theme.border }]}
                accessibilityLabel="Decrease quantity"
              >
                <MaterialCommunityIcons name="minus" size={20} color={theme.text.primary} />
              </Pressable>
              <Text style={[styles.qty, { color: theme.text.primary }]}>{line.quantity}</Text>
              <Pressable
                onPressIn={lightHaptic}
                onPress={() => increaseQty(line.catalogProductId)}
                style={[styles.qtyBtn, { borderColor: theme.border }]}
                accessibilityLabel="Increase quantity"
              >
                <MaterialCommunityIcons name="plus" size={20} color={theme.text.primary} />
              </Pressable>
              <View style={styles.spacer} />
              <Pressable
                onPressIn={lightHaptic}
                onPress={() => deleteLine(line.catalogProductId)}
                style={styles.trash}
                accessibilityLabel="Remove from cart"
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={22}
                  color={theme.status.error}
                />
              </Pressable>
            </View>
          </View>
        ))
      )}

      {items.length > 0 ? (
        <View style={styles.footer}>
          <Text style={[styles.totalLabel, { color: theme.text.primary }]}>
            Subtotal ({totalCount} {totalCount === 1 ? 'item' : 'items'})
          </Text>
          <Text style={[styles.totalValue, { color: theme.text.primary }]}>
            {formatCatalogPriceCfa(totalCfa)}
          </Text>
          {accessToken ? (
            <AppButton
              variant="primary"
              label="Place order"
              onPress={() => {
                void onPlaceOrder()
              }}
              disabled={submitting}
              loading={submitting}
              style={styles.cta}
              accessibilityLabel="Place order"
            />
          ) : (
            <AppButton
              variant="primary"
              label="Sign in to place order"
              onPress={() => onOpenSignIn()}
              style={styles.cta}
              accessibilityLabel="Sign in to place order"
            />
          )}
        </View>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  errorText: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
    marginBottom: 12,
  },
  empty: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  row: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    marginBottom: 12,
  },
  rowMain: { marginBottom: 12 },
  title: {
    fontFamily: fontFamily.sansBold,
    fontSize: 15,
    lineHeight: 20,
  },
  unitPrice: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
    marginTop: 4,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    minWidth: 28,
    textAlign: 'center',
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
  },
  spacer: { flex: 1 },
  trash: {
    padding: 8,
  },
  footer: {
    marginTop: 20,
    gap: 12,
  },
  totalLabel: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
  },
  totalValue: {
    fontFamily: fontFamily.displayBold,
    fontSize: 22,
  },
  cta: {
    marginTop: 8,
    alignSelf: 'stretch',
    borderRadius: 999,
    minHeight: 52,
  },
})
