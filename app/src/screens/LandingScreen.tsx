import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { HomeFeaturedCollection } from '../components/home/HomeFeaturedCollection'
import { HomeFromTheHive } from '../components/home/HomeFromTheHive'
import { HomeHeroBanner } from '../components/home/HomeHeroBanner'
import { HomeTopBar } from '../components/home/HomeTopBar'
import { useAppSelector } from '../store/hooks'
import { fontFamily, useTheme } from '../theme'
import { homeGreetingDisplayName, homeSalutation } from '../components/home/homeGreeting'

export function LandingScreen() {
  const { theme } = useTheme()
  const user = useAppSelector(s => s.session.user)
  const salutation = homeSalutation()
  const name = homeGreetingDisplayName({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
  })
  const honeyNameColor = theme.palette.primary

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
          <HomeTopBar />
          <Text style={[styles.greeting, { color: theme.text.primary }]}>
            {salutation},{' '}
            <Text style={[styles.greetingName, { color: honeyNameColor }]}>{name}</Text>.
          </Text>
          <View style={styles.heroSection}>
            <HomeHeroBanner />
          </View>
          <HomeFeaturedCollection />
          <HomeFromTheHive />
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
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 16,
  },
  greetingName: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    lineHeight: 28,
  },
  heroSection: {
    paddingHorizontal: 16,
  },
})
