import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type SectionProps = {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children?: React.ReactNode
}

export function Section({ title, subtitle, action, children }: SectionProps) {
  const { theme } = useTheme()
  return (
    <View className="gap-2.5" style={styles.root}>
      <View className="flex-row items-center justify-between" style={styles.header}>
        <View className="flex-1 gap-0.5" style={styles.titleCol}>
          <Text
            className="text-[19px] font-bold"
            style={[styles.title, { color: theme.text.primary }]}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: theme.text.muted }]}>{subtitle}</Text>
          ) : null}
        </View>
        {action}
      </View>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleCol: { gap: 2, flex: 1 },
  title: { fontSize: 19, fontWeight: '700' },
  subtitle: { fontSize: 13 },
})
