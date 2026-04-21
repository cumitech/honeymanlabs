import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export type RingCaptionRailItem = {
  id: string
  caption: string
  accessibilityLabel: string
  onPress: () => void
  discBackgroundColor?: string
  renderDiscContent: () => React.ReactNode
}

export type RingCaptionRailProps = {
  title: string
  items: RingCaptionRailItem[]
  itemMinWidth?: number
}

export const RingCaptionRail = ({ title, items, itemMinWidth = 72 }: RingCaptionRailProps) => {
  const { theme } = useTheme()

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map(item => (
          <Pressable
            key={item.id}
            onPress={item.onPress}
            style={[styles.item, { width: itemMinWidth }]}
            accessibilityRole="button"
            accessibilityLabel={item.accessibilityLabel}
          >
            <View style={[styles.ring, { borderColor: theme.palette.primary }]}>
              <View
                style={[
                  styles.disc,
                  { backgroundColor: item.discBackgroundColor ?? theme.bg.muted },
                ]}
              >
                {item.renderDiscContent()}
              </View>
            </View>
            <Text style={[styles.label, { color: theme.text.muted }]} numberOfLines={1}>
              {item.caption}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  scrollContent: {
    gap: 18,
    paddingRight: 8,
  },
  item: {
    alignItems: 'center',
  },
  ring: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disc: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
})
