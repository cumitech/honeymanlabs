import React from 'react'
import { DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { LabBatchDetailScreen } from '../components/lab/LabBatchDetailScreen'
import { LabHomeScreen } from '../screens/LabHomeScreen'
import { LabQrScannerScreen } from '../components/lab/LabQrScannerScreen'
import { AppScreenTopBar } from '../components/layout/AppScreenTopBar'
import { LAB_STACK_HEADER_TO_BODY_GAP } from '../constants/layout'
import type { LabStackParamList } from '../types'
import { useTheme } from '../theme'

const LabStack = createNativeStackNavigator<LabStackParamList>()

function LabStackHeader({ options, navigation, back }: NativeStackHeaderProps) {
  const { theme } = useTheme()
  const title = typeof options.title === 'string' ? options.title : ''
  return (
    <AppScreenTopBar
      title={title}
      leading={back ? 'back' : 'menu'}
      backgroundColor={theme.bg.surface}
      contentGap={LAB_STACK_HEADER_TO_BODY_GAP}
      onLeadingPress={() => {
        if (back) navigation.goBack()
        else navigation.dispatch(DrawerActions.openDrawer())
      }}
    />
  )
}

export function LabTabNavigator() {
  const { theme } = useTheme()

  return (
    <LabStack.Navigator
      id="LabStack"
      screenOptions={{
        header: props => <LabStackHeader {...props} />,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.bg.surface },
      }}
    >
      <LabStack.Screen
        name="LabHome"
        component={LabHomeScreen}
        options={{
          title: 'Lab Purity & Scan',
          headerShown: false,
        }}
      />
      <LabStack.Screen
        name="LabBatchDetail"
        component={LabBatchDetailScreen}
        options={{
          title: 'Purity & Quality',
        }}
      />
      <LabStack.Screen
        name="LabQrScanner"
        component={LabQrScannerScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
          animation: 'fade',
        }}
      />
    </LabStack.Navigator>
  )
}
