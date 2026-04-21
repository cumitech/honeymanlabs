import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { CatalogProductRail, CatalogPromoHeroCard } from '../components/shared'
import { FEATURED_COLLECTION_HORIZONTAL_PADDING } from '../constants/layout'
import { useArticles } from '../hooks/articles/articles.hook'
import { useProducts } from '../hooks/products/products.hook'
import { useAuth } from '../hooks/session/auth.hook'
import { fontFamily, useTheme } from '../theme'
import { homeGreetingDisplayName, homeSalutation } from '../utils'
import { HivePostCarousel } from '../components/hive/HivePostCarousel'

export function LandingScreen() {
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { user, isSignedIn: isLoggedIn } = useAuth()
  const salutation = homeSalutation()
  const name = homeGreetingDisplayName({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
  })
  const honeyNameColor = theme.palette.primary
  const { products } = useProducts()
  const { articles } = useArticles()
  const featuredProducts = React.useMemo(() => products.slice(0, 4), [products])
  const hivePosts = React.useMemo(() => articles.slice(0, 4), [articles])

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <ScreenShell
      scroll
      padded={false}
      scrollContentInsetAdjustmentIOS="never"
      safeAreaEdges={['left', 'right', 'bottom']}
      screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
      screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
      screenHoneycombCenterStyle={ScreenHoneyCombLayoutStyle.center}
    >
      <FadeInMount>
        <View style={styles.page}>
          <AppScreenTopBar title="HoneyMan" leading="menu" onLeadingPress={openDrawer} />
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
              ctaLabel="Open store"
              onCtaPress={() => navigation.navigate('Store' as never)}
              ctaAccessibilityLabel="Open store tab"
            />
          </View>
          <CatalogProductRail title="Featured Collection" products={featuredProducts} />
          <HivePostCarousel posts={hivePosts} />
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
})
