import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import {
  AppScreenTopBar,
  AppScreenTopBarAccountButton,
} from '../layout/AppScreenTopBar'

export function HomeTopBar() {
  const navigation = useNavigation()

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const openAccount = () => {
    const parent = navigation.getParent()
    if (parent) {
      parent.navigate('Account' as never)
    }
  }

  return (
    <AppScreenTopBar
      title="HoneyMan"
      showBee
      leading="menu"
      onLeadingPress={openDrawer}
      right={<AppScreenTopBarAccountButton onPress={openAccount} />}
    />
  )
}
