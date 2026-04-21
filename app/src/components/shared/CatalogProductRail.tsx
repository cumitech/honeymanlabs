import React, { useRef } from 'react'
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  FEATURED_COLLECTION_CARD_GAP,
  FEATURED_COLLECTION_HORIZONTAL_PADDING,
} from '../../constants'
import type { CatalogProduct } from '../../models/views/catalog.model'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'
import { ProductCard } from './ProductCard'
import { productCardWidthForGrid } from '../../utils'

export type CatalogProductRailProps = {
  title: string
  products: CatalogProduct[]
  /** Override default horizontal padding (e.g. matches page gutter). */
  horizontalPadding?: number
  cardGap?: number
}

export function CatalogProductRail({
  title,
  products,
  horizontalPadding = FEATURED_COLLECTION_HORIZONTAL_PADDING,
  cardGap = FEATURED_COLLECTION_CARD_GAP,
}: CatalogProductRailProps) {
  const { theme } = useTheme()
  const scrollRef = useRef<ScrollView>(null)
  const scrollX = useRef(0)
  const w = Dimensions.get('window').width
  const cardW = productCardWidthForGrid(w)
  const step = cardW + cardGap
  const maxX = Math.max(0, (products.length - 1) * step)

  const onFeaturedScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = e.nativeEvent.contentOffset.x
  }

  const nudge = (dir: -1 | 1) => {
    lightHaptic()
    const next = Math.max(0, Math.min(maxX, scrollX.current + dir * step))
    scrollX.current = next
    scrollRef.current?.scrollTo({ x: next, animated: true })
  }

  return (
    <View style={styles.section}>
      <View style={[styles.sectionHeaderRow, { paddingHorizontal: horizontalPadding }]}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>{title}</Text>
        <View style={styles.sectionArrows}>
          <Pressable
            onPress={() => nudge(-1)}
            style={styles.arrowHit}
            accessibilityLabel="Scroll featured left"
          >
            <MaterialCommunityIcons name="chevron-left" size={22} color={theme.palette.accent} />
          </Pressable>
          <Pressable
            onPress={() => nudge(1)}
            style={styles.arrowHit}
            accessibilityLabel="Scroll featured right"
          >
            <MaterialCommunityIcons name="chevron-right" size={22} color={theme.palette.accent} />
          </Pressable>
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={step}
        snapToAlignment="start"
        onScroll={onFeaturedScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.featureScrollContent,
          { paddingLeft: horizontalPadding, paddingRight: horizontalPadding },
        ]}
      >
        {products.map((p, index) => (
          <View
            key={p.id}
            style={[
              styles.cardSlide,
              { width: cardW, marginRight: index === products.length - 1 ? 0 : cardGap },
            ]}
          >
            <ProductCard product={p} width={cardW} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 18,
    paddingBottom: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
  },
  sectionArrows: {
    flexDirection: 'row',
    gap: 4,
  },
  arrowHit: {
    padding: 6,
  },
  featureScrollContent: {
    paddingBottom: 4,
  },
  cardSlide: {
    flexShrink: 0,
  },
})
