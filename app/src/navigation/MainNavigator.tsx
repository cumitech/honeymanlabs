import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform, StyleSheet } from 'react-native'
import { AppDrawerContent } from './AppDrawerContent'
import { drawerPanelChromeColor } from './DrawerSurface'
import type { MainTabParamList, RootDrawerParamList } from '../types'
import { LandingScreen } from '../screens/LandingScreen'
import { StoreNavigator } from './StoreNavigator'
import { EducationScreen } from '../screens/EducationScreen'
import { LabTestsScreen } from '../screens/LabTestsScreen'
import { AccountProfileScreen } from '../screens/AccountProfileScreen'
import {
  ApiariesScreen,
  CartScreen,
  SettingsScreen,
  SupportScreen,
  TraceabilityScreen,
} from '../screens/DrawerMenuScreens'
import { fontFamily, useTheme } from '../theme'
import { selectionHaptic } from '../utils'

const Drawer = createDrawerNavigator<RootDrawerParamList>()
const Tab = createBottomTabNavigator<MainTabParamList>()

function MainTabs() {
  const { theme } = useTheme()

  return (
    <Tab.Navigator
      id="MainTabs"
      screenListeners={{
        tabPress: () => {
          selectionHaptic()
        },
      }}
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        tabBarActiveTintColor: theme.palette.primary,
        tabBarInactiveTintColor: theme.text.muted,
        tabBarStyle: {
          backgroundColor: theme.bg.surface,
          borderTopColor: theme.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          elevation: 0,
          ...(Platform.OS === 'ios'
            ? {
                shadowColor: '#1B1200',
                shadowOffset: { width: 0, height: -1 },
                shadowOpacity: 0.04,
                shadowRadius: 8,
              }
            : {}),
        },
        tabBarLabelStyle: { fontFamily: fontFamily.sansMedium, fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={LandingScreen}
        options={{
          title: 'HoneyMan',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreNavigator}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="storefront-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{
          title: 'The Hive',
          tabBarLabel: 'The Hive',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="beehive-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="LabTests"
        component={LabTestsScreen}
        options={{
          tabBarLabel: 'Lab',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flask-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export type MainNavigatorProps = {
  onSignOut: () => void | Promise<void>
}

export function MainNavigator({ onSignOut }: MainNavigatorProps) {
  const { theme, mode } = useTheme()
  const base = mode === 'dark' ? DarkTheme : DefaultTheme

  const navigationTheme = React.useMemo<NavigationTheme>(
    () => ({
      ...base,
      colors: {
        ...base.colors,
        primary: theme.palette.primary,
        background: theme.bg.surface,
        card: theme.bg.surface,
        text: theme.text.primary,
        border: theme.border,
        notification: theme.palette.secondary,
      },
    }),
    [base, theme],
  )

  const overlayColor =
    Platform.OS === 'ios'
      ? mode === 'dark'
        ? 'rgba(0,0,0,0.52)'
        : 'rgba(0,0,0,0.22)'
      : 'rgba(0,0,0,0.4)'

  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        id="RootDrawer"
        initialRouteName="Main"
        drawerContent={props => <AppDrawerContent {...props} onSignOut={onSignOut} />}
        screenOptions={{
          headerShown: false,
          drawerType: Platform.OS === 'ios' ? 'slide' : 'front',
          drawerStyle: {
            width: '82%',
            maxWidth: 320,
            backgroundColor: drawerPanelChromeColor(mode),
          },
          overlayColor,
          sceneStyle: { backgroundColor: theme.bg.surface },
          swipeEnabled: true,
          swipeEdgeWidth: 72,
          keyboardDismissMode: 'on-drag',
          freezeOnBlur: true,
        }}
      >
        <Drawer.Screen name="Main" component={MainTabs} />
        <Drawer.Screen name="Account" component={AccountProfileScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        <Drawer.Screen name="Traceability" component={TraceabilityScreen} />
        <Drawer.Screen name="Apiaries" component={ApiariesScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
