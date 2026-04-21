import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CatalogScreen } from '../screens/CatalogScreen'
import { ProductDetailScreen } from '../screens/ProductDetailScreen'
import type { StoreStackParamList } from '../types'
import { useTheme } from '../theme'

const Stack = createNativeStackNavigator<StoreStackParamList>()

export function StoreNavigator() {
  const { theme } = useTheme()

  return (
    <Stack.Navigator
      id="StoreStack"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.bg.surface },
      }}
    >
      <Stack.Screen name="StoreCatalog" component={CatalogScreen} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  )
}
