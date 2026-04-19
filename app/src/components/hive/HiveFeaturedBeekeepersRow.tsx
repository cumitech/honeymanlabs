import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import type { HiveFeaturedBeekeeper } from '../../data/hive-feed'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

type Props = {
  beekeepers: HiveFeaturedBeekeeper[]
}

export function HiveFeaturedBeekeepersRow({ beekeepers }: Props) {
  const { theme } = useTheme()

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Featured beekeepers</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {beekeepers.map(b => (
          <Pressable
            key={b.id}
            onPress={() => fireLightImpact()}
            style={styles.item}
            accessibilityRole="button"
            accessibilityLabel={`${b.name} profile`}
          >
            <View style={[styles.ring, { borderColor: theme.palette.primary }]}>
              <View style={[styles.disc, { backgroundColor: theme.bg.muted }]}>
                <Image source={b.avatar} style={styles.avatarImg} resizeMode="cover" />
              </View>
            </View>
            <Text style={[styles.label, { color: theme.text.muted }]} numberOfLines={1}>
              {b.name}
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
    width: 78,
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
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
})
