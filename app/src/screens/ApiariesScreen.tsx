import React from 'react'
import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { useApiaries } from '../hooks/apiaries/apiaries.hook'
import type { RootDrawerParamList } from '../types'
import { TabPrimaryFab } from '../components/shared'
import { ApiariesPanel } from '../components/apiaries/ApiariesPanel'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { DrawerMenuButton } from '../components/layout/DrawerMenuButton'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import { lightHaptic } from '../utils'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function ApiariesScreen() {
  const navigation = useNavigation<DrawerNav>()
  const { apiaries: items } = useApiaries()

  return (
    <View style={styles.root}>
      <ScreenShell
        scroll={false}
        padded={false}
        safeAreaEdges={['left', 'right', 'bottom']}
        screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
        screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
        screenHoneycombCenterStyle={ScreenHoneyCombLayoutStyle.center}
      >
        <AppScreenTopBar
          title="Apiaries"
          leading="back"
          onLeadingPress={() => navigation.navigate('Main')}
          right={<DrawerMenuButton onOpenDrawer={() => navigation.openDrawer()} />}
        />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={Platform.OS === 'ios'}
        >
          <FadeInMount>
            <ApiariesPanel items={items} />
          </FadeInMount>
        </ScrollView>
      </ScreenShell>
      <TabPrimaryFab
        icon="plus"
        iconSize={30}
        borderRadius={16}
        accessibilityLabel="Add apiary"
        onPress={() => lightHaptic()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
})
