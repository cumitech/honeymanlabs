import React from 'react'
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { DrawerNavigationProp } from '@react-navigation/drawer'
import { AppButton } from '../components/shared/AppButton'
import type { RootDrawerParamList } from '../types'
import { signOut } from '../utils/sign-out'
import { fontFamily, useTheme } from '../theme'
import { fireLightImpact } from '../utils/safe-haptics'
import { FadeInMount } from '../components/layout/FadeInMount'
import { ScreenShell } from '../components/layout/ScreenShell'
import { tabScreenHoneycomb } from '../components/layout/tabScreenHoneycombLayout'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { MenuChevronRow, MenuSignOutRow } from '../components/settings/MenuRows'
import { SettingsMenuCard, SettingsMenuDivider } from '../components/settings/SettingsMenuCard'

type DrawerNav = DrawerNavigationProp<RootDrawerParamList>

export function SupportScreen() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<DrawerNav>()
  const accent = theme.palette.primary

  const noop = () => fireLightImpact()

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
    >
      <AppScreenTopBar
        title="Help & Support"
        leading="back"
        onLeadingPress={() => navigation.navigate('Main')}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={Platform.OS === 'ios'}
      >
        <FadeInMount style={styles.fadeFill}>
          <View style={styles.scrollBody}>
            <View style={[styles.searchWrap, { paddingHorizontal: 18 }]}>
              <View
                style={[
                  styles.searchPill,
                  {
                    backgroundColor: mode === 'light' ? '#FFFFFF' : theme.bg.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={[styles.searchPlaceholder, { color: theme.text.muted }]}>
                  How can we help you?
                </Text>
                <MaterialCommunityIcons name="magnify" size={22} color={accent} />
              </View>
            </View>

            <View style={styles.listPad}>
              <SettingsMenuCard>
                <MenuChevronRow
                  icon="help-circle-outline"
                  label="FAQs"
                  iconColor={accent}
                  labelColor={theme.text.primary}
                  onPress={noop}
                />
              </SettingsMenuCard>

              <View style={styles.spacer} />

              <SettingsMenuCard>
                <MenuChevronRow
                  icon="message-text-outline"
                  label="Live chat"
                  iconColor={accent}
                  labelColor={theme.text.primary}
                  onPress={noop}
                />
                <SettingsMenuDivider />
                <MenuChevronRow
                  icon="alert-circle-outline"
                  label="Report an issue"
                  iconColor={accent}
                  labelColor={theme.text.primary}
                  onPress={noop}
                />
              </SettingsMenuCard>

              <SettingsMenuCard>
                <MenuChevronRow
                  icon="play-circle-outline"
                  label="Tutorials"
                  iconColor={accent}
                  labelColor={theme.text.primary}
                  onPress={noop}
                />
                <SettingsMenuDivider />
                <MenuChevronRow
                  icon="play-box-outline"
                  label="Video guides"
                  iconColor={accent}
                  labelColor={theme.text.primary}
                  onPress={noop}
                />
              </SettingsMenuCard>

              <AppButton
                variant="primary"
                label="Contact support"
                onPress={() => fireLightImpact()}
                accessibilityLabel="Contact support"
                style={styles.contactCta}
                textStyle={styles.contactCtaText}
              />

              {/* <View style={styles.signOutPush} /> */}

              <SettingsMenuCard style={styles.signOutCard}>
                <MenuSignOutRow onPress={() => signOut()} />
              </SettingsMenuCard>

              <Text style={[styles.footerNote, { color: theme.text.muted }]}>
                Search guides and reach HoneyMan support from one place.
              </Text>
            </View>
          </View>
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  fadeFill: {
    flexGrow: 1,
  },
  scrollBody: {
    flexGrow: 1,
  },
  searchWrap: {
    paddingTop: 0,
    paddingBottom: 6,
  },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  searchPlaceholder: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
    flex: 1,
    marginRight: 12,
  },
  listPad: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  spacer: {
    height: 10,
  },
  contactCta: {
    marginTop: 7,
    marginBottom: 7,
    alignSelf: 'stretch',
    borderRadius: 999,
    minHeight: 52,
    paddingVertical: 14,
  },
  contactCtaText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
    letterSpacing: 0.25,
  },
  signOutPush: {
    flexGrow: 1,
    minHeight: 72,
  },
  signOutCard: {
    marginTop: 8,
  },
  footerNote: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
})
