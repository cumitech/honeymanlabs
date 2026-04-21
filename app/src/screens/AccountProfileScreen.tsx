import React from 'react'
import { Platform, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { AccountSignedOutGate } from '../components/account/AccountSignedOutGate'
import { AccountProfileView } from '../components/account/AccountProfileView'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { DrawerMenuButton } from '../components/layout/DrawerMenuButton'
import { ScreenShell } from '../components/layout/ScreenShell'
import { useAccountProfile } from '../hooks/profile/profile.hook'
import { ScreenHoneyCombLayoutStyle } from '../styles/screen-honey-comb-layout.style'
import type { RootDrawerParamList } from '../types'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function AccountProfileScreen() {
  const navigation = useNavigation<DrawerNav>()
  const {
    accessToken,
    displayName,
    email,
    phone,
    locationDisplay,
    initials,
    handle,
    avatarSource,
    uploadingAvatar,
    refreshing,
    pickAndUploadAvatar,
  } = useAccountProfile()

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      screenHoneycombTopLeftStyle={ScreenHoneyCombLayoutStyle.topLeft}
      screenHoneycombBottomRightStyle={ScreenHoneyCombLayoutStyle.bottomRight}
      screenHoneycombOmitCenter
    >
      <AppScreenTopBar
        title="Account"
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
        right={<DrawerMenuButton onOpenDrawer={() => navigation.openDrawer()} />}
      />
      {!accessToken ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, styles.signedOutScrollContent]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={Platform.OS === 'ios'}
          bounces={Platform.OS === 'ios'}
        >
          <AccountSignedOutGate />
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={Platform.OS === 'ios'}
          bounces={Platform.OS === 'ios'}
        >
          <AccountProfileView
            displayName={displayName}
            email={email}
            phone={phone}
            locationDisplay={locationDisplay}
            initials={initials}
            handle={handle}
            avatarSource={avatarSource}
            uploadingAvatar={uploadingAvatar}
            refreshing={refreshing}
            onPickAvatar={pickAndUploadAvatar}
          />
        </ScrollView>
      )}
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 40,
  },
  signedOutScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 48,
  },
})
