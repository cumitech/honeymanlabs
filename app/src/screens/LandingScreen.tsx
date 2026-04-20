import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { CatalogProductRail, CatalogPromoHeroCard, HiveStoryCard } from '../components/shared'
import { FEATURED_COLLECTION_HORIZONTAL_PADDING } from '../constants/layout'
import { getFeaturedCatalogProducts } from '../data/catalog'
import { HIVE_FEED_POSTS } from '../data/hive-feed'
import { useAppSelector } from '../store/hooks'
import { fontFamily, useTheme } from '../theme'
import { homeGreetingDisplayName, homeSalutation } from '../utils/home-greeting'

export function LandingScreen() {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const accessToken = useAppSelector(s => s.session.accessToken)
  const user = useAppSelector(s => s.session.user)
  const isLoggedIn = Boolean(accessToken)
  const salutation = homeSalutation()
  const name = homeGreetingDisplayName({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
  })
  const honeyNameColor = theme.palette.primary

  const w = Dimensions.get('window').width
  const hiveCardW = Math.min(300, Math.round(w * 0.82))

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <ScreenShell
      scroll
      padded={false}
      scrollContentInsetAdjustmentIOS="never"
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
    >
      <FadeInMount>
        <View style={styles.page}>
          <AppScreenTopBar
            title="HoneyMan"
            leading="menu"
            onLeadingPress={openDrawer}
          />
          {isLoggedIn ? (
            <Text style={[styles.greeting, { color: theme.text.primary }]}>
              {salutation},{' '}
              <Text style={[styles.greetingName, { color: honeyNameColor }]}>{name}</Text>.
            </Text>
          ) : null}
          <View style={styles.heroSection}>
            <CatalogPromoHeroCard
              eyebrow="New Arrivals -"
              title="The Golden Harvest Collection"
              ctaLabel="Shop Now"
              onCtaPress={() => navigation.navigate('Shop' as never)}
              ctaAccessibilityLabel="Shop now"
            />
          </View>
          <CatalogProductRail title="Featured Collection" products={getFeaturedCatalogProducts()} />
          <View style={styles.hiveSection}>
            <Text style={[styles.hiveSectionTitle, { color: theme.text.primary }]}>From The Hive</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hiveScrollContent}
            >
              {HIVE_FEED_POSTS.map((post, index) => (
                <View key={post.id} style={[styles.hiveCardWrap, { width: hiveCardW }]}>
                  <HiveStoryCard
                    variant="feed"
                    post={post}
                    wrapStyle={{
                      marginBottom: 0,
                      marginRight: index === HIVE_FEED_POSTS.length - 1 ? 0 : 12,
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ height: 24 }} />
        </View>
      </FadeInMount>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 8,
  },
  greeting: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    lineHeight: 28,
    paddingHorizontal: FEATURED_COLLECTION_HORIZONTAL_PADDING,
    marginTop: 0,
    marginBottom: 16,
  },
  greetingName: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    lineHeight: 28,
  },
  heroSection: {
    paddingHorizontal: FEATURED_COLLECTION_HORIZONTAL_PADDING,
  },
  hiveSection: {
    marginTop: 26,
    paddingBottom: 4,
  },
  hiveSectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
    marginBottom: 14,
    paddingHorizontal: FEATURED_COLLECTION_HORIZONTAL_PADDING,
  },
  hiveScrollContent: {
    paddingLeft: FEATURED_COLLECTION_HORIZONTAL_PADDING,
    paddingRight: FEATURED_COLLECTION_HORIZONTAL_PADDING - 4,
  },
  hiveCardWrap: {
    alignSelf: 'flex-start',
  },
})
