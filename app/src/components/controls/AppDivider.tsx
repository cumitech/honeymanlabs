import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme'

export function AppDivider() {
  const { theme } = useTheme()
  return <View className="w-full" style={[styles.line, { backgroundColor: theme.border }]} />
}

const styles = StyleSheet.create({ line: { height: 1, width: '100%' } })
