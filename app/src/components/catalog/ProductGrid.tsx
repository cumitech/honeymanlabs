import React from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import type { CatalogProduct } from '../../models/views/catalog.model'
import { PRODUCT_GRID_GAP, PRODUCT_GRID_HORIZONTAL_PADDING } from '../../constants/layout'
import { fontFamily, useTheme } from '../../theme'
import { ProductCard } from '../shared/ProductCard'
import { chunkPairs, productCardWidthForGrid } from '../../utils'

export type ProductGridProps = { products: CatalogProduct[]; sectionTitle?: string }

export function ProductGrid({ products, sectionTitle }: ProductGridProps) {
  const { theme } = useTheme()
  const { width } = useWindowDimensions()
  const cardWidth = productCardWidthForGrid(width)
  const rows = chunkPairs(products)

  return (
    <View style={[styles.gridSection, { paddingHorizontal: PRODUCT_GRID_HORIZONTAL_PADDING }]}>
      {sectionTitle ? (
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>{sectionTitle}</Text>
      ) : null}
      <View style={styles.grid}>
        {rows.map(row => (
          <View
            key={row.map(p => p.id).join('-')}
            style={[styles.gridRow, { gap: PRODUCT_GRID_GAP }]}
          >
            {row.map(product => (
              <ProductCard key={product.id} product={product} width={cardWidth} />
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
    paddingBottom: 28,
  },
  sectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
  },
  grid: {
    gap: 14,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
})
