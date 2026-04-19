import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { HIVE_ARTICLES } from '../../data/hive-articles'
import { fontFamily, useTheme } from '../../theme'
import { HomeHiveArticleCard } from './HomeHiveArticleCard'

export function HomeFromTheHive() {
  const { theme } = useTheme()
  const w = Dimensions.get('window').width
  const cardW = Math.min(260, Math.round(w * 0.7))

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text.primary, marginBottom: 14 }]}>
        From The Hive
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hiveScrollContent}
      >
        {HIVE_ARTICLES.map(a => (
          <HomeHiveArticleCard key={a.id} article={a} width={cardW} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 26,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  hiveScrollContent: {
    paddingLeft: 20,
    paddingRight: 8,
  },
})
