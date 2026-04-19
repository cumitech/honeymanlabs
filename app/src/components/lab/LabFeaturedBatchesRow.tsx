import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import type { LabRecentTest } from '../../data/lab-batches'
import type { LabStackParamList } from '../../types'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

type Props = {
  tests: LabRecentTest[]
}

export function LabFeaturedBatchesRow({ tests }: Props) {
  const { theme } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()

  const openBatch = (batchCode: string) => {
    fireLightImpact()
    navigation.navigate('LabBatchDetail', { batchId: batchCode })
  }

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Recent batches</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tests.map(t => {
          const initial = t.variety.charAt(0).toUpperCase()
          return (
            <Pressable
              key={t.id}
              onPress={() => openBatch(t.batchCode)}
              style={styles.item}
              accessibilityRole="button"
              accessibilityLabel={`Open batch ${t.batchCode}`}
            >
              <View style={[styles.ring, { borderColor: theme.palette.primary }]}>
                <View style={[styles.disc, { backgroundColor: theme.bg.card }]}>
                  <Text style={[styles.initial, { color: theme.text.primary }]}>{initial}</Text>
                </View>
              </View>
              <Text style={[styles.label, { color: theme.text.muted }]} numberOfLines={1}>
                #{t.batchCode}
              </Text>
            </Pressable>
          )
        })}
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
    width: 72,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
  },
  label: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
})
