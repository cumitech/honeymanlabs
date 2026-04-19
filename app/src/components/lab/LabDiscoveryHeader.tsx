import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'
import { AppScreenTopBar } from '../layout/AppScreenTopBar'

export function LabDiscoveryHeader() {
  const { theme } = useTheme()
  const navigation = useNavigation()

  const openDrawer = () => {
    fireLightImpact()
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const searchPill = (
    <View
      style={[styles.searchPill, { backgroundColor: theme.bg.muted, borderColor: theme.border }]}
    >
      <Text style={[styles.searchPlaceholder, { color: theme.text.muted }]}>
        Search batches, codes…
      </Text>
      <MaterialCommunityIcons name="magnify" size={22} color={theme.text.muted} />
    </View>
  )

  return (
    <AppScreenTopBar
      title="HoneyMan"
      showBee
      leading="menu"
      onLeadingPress={openDrawer}
      footer={searchPill}
    />
  )
}

const styles = StyleSheet.create({
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  searchPlaceholder: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
  },
})
