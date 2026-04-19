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
import { getFeaturedCatalogProducts } from '../../data/catalog'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'
import { ShopProductCard } from '../shop/ShopProductCard'
import { shopProductCardWidth } from '../shop/shopUtils'

export function HomeFeaturedCollection() {
  const { theme } = useTheme()
  const scrollRef = useRef<ScrollView>(null)
  const scrollX = useRef(0)
  const featured = getFeaturedCatalogProducts()
  const w = Dimensions.get('window').width
  const cardW = shopProductCardWidth(w)
  const cardGap = FEATURED_COLLECTION_CARD_GAP
  const step = cardW + cardGap
  const maxX = Math.max(0, (featured.length - 1) * step)

  const onFeaturedScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.current = e.nativeEvent.contentOffset.x
  }

  const nudge = (dir: -1 | 1) => {
    fireLightImpact()
    const next = Math.max(0, Math.min(maxX, scrollX.current + dir * step))
    scrollX.current = next
    scrollRef.current?.scrollTo({ x: next, animated: true })
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>
          Featured Collection
        </Text>
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
        contentContainerStyle={styles.featureScrollContent}
      >
        {featured.map((p, index) => (
          <View
            key={p.id}
            style={[
              styles.cardSlide,
              { width: cardW, marginRight: index === featured.length - 1 ? 0 : cardGap },
            ]}
          >
            <ShopProductCard product={p} width={cardW} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 26,
    paddingBottom: 4,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: FEATURED_COLLECTION_HORIZONTAL_PADDING,
    marginBottom: 14,
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
    paddingLeft: FEATURED_COLLECTION_HORIZONTAL_PADDING,
    paddingRight: FEATURED_COLLECTION_HORIZONTAL_PADDING,
    paddingBottom: 4,
  },
  cardSlide: {
    flexShrink: 0,
  },
})
