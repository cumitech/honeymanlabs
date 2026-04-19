import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export function ShopHeaderRight() {
  const { theme } = useTheme()
  const count = 1
  return (
    <Pressable
      onPressIn={fireLightImpact}
      onPress={() => {}}
      style={styles.headerCartHit}
      accessibilityRole="button"
      accessibilityLabel="Shopping cart"
    >
      <MaterialCommunityIcons name="cart-outline" size={24} color={theme.text.primary} />
      {count > 0 ? (
        <View style={[styles.cartBadge, { backgroundColor: theme.palette.primary }]}>
          <Text style={[styles.cartBadgeText, { color: theme.text.onPrimary }]}>
            {count > 9 ? '9+' : String(count)}
          </Text>
        </View>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  headerCartHit: {
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontFamily: fontFamily.sansBold,
  },
})
