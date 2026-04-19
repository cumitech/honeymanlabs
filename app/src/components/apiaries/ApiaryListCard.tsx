import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { ApiaryListItem } from '../../data/apiaries'
import { fontFamily, useTheme } from '../../theme'

type ApiaryListCardProps = {
  item: ApiaryListItem
}

export function ApiaryListCard({ item }: ApiaryListCardProps) {
  const { theme, mode } = useTheme()
  const statusColor =
    item.status === 'At risk' ? theme.status.warning : theme.palette.primary

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: mode === 'light' ? '#FFFFFF' : theme.bg.card,
          borderColor: theme.border,
          shadowColor: mode === 'dark' ? '#000000' : '#1B1200',
          shadowOpacity: mode === 'dark' ? 0.1 : 0.04,
        },
      ]}
    >
      <Image source={item.image} style={styles.thumb} resizeMode="cover" />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text.primary }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.text.muted }]} numberOfLines={1}>
          {item.subtitle}
        </Text>
        <Text style={[styles.coords, { color: theme.text.muted }]} numberOfLines={1}>
          {item.coordsLabel}
        </Text>
      </View>
      <View style={styles.statusCol}>
        <MaterialCommunityIcons name="leaf" size={22} color={statusColor} />
        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    marginBottom: 12,
    gap: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    elevation: 1,
  },
  thumb: {
    width: 88,
    height: 72,
    borderRadius: 12,
  },
  body: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 17,
    letterSpacing: 0.15,
  },
  subtitle: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
  },
  coords: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
    letterSpacing: 0.2,
  },
  statusCol: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingLeft: 4,
    minWidth: 72,
  },
  statusText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 11,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
})
