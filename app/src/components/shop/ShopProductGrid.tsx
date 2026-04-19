import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SHOP_GRID_GAP, SHOP_GRID_HORIZONTAL_PADDING } from '../../constants'
import { CATALOG_PRODUCTS } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { chunkPairs, shopProductCardWidth } from './shopUtils'
import { ShopProductCard } from './ShopProductCard'

export function ShopProductGrid() {
  const { theme } = useTheme()
  const screenW = Dimensions.get('window').width
  const cardWidth = shopProductCardWidth(screenW)
  const rows = chunkPairs(CATALOG_PRODUCTS)

  return (
    <View style={[styles.gridSection, { paddingHorizontal: SHOP_GRID_HORIZONTAL_PADDING }]}>
      <Text style={[styles.gridHeading, { color: theme.text.primary }]}>Featured</Text>
      <View style={styles.grid}>
        {rows.map(row => (
          <View key={row.map(p => p.id).join('-')} style={[styles.gridRow, { gap: SHOP_GRID_GAP }]}>
            {row.map(p => (
              <ShopProductCard key={p.id} product={p} width={cardWidth} />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  gridSection: {
    paddingTop: 8,
    gap: 14,
  },
  gridHeading: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
  },
  grid: {
    gap: 14,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
