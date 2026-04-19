import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { HiveArticle } from '../../data/hive-articles'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

export type HomeHiveArticleCardProps = { article: HiveArticle; width: number }

export function HomeHiveArticleCard({ article, width }: HomeHiveArticleCardProps) {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const cardBg = theme.bg.card

  const readMore = () => {
    fireLightImpact()
    navigation.navigate('Education' as never)
  }

  return (
    <View style={[styles.hiveCard, { width, backgroundColor: cardBg, borderColor: theme.border }]}>
      <Image source={article.image} style={styles.hiveImage} resizeMode="cover" />
      <View style={styles.hiveBody}>
        <Text style={[styles.hiveTitle, { color: theme.text.primary }]} numberOfLines={2}>
          {article.title}
        </Text>
        <Pressable
          onPressIn={fireLightImpact}
          onPress={readMore}
          accessibilityRole="button"
          accessibilityLabel="Read more"
        >
          <Text style={[styles.hiveLink, { color: theme.palette.accent }]}>Read More &gt;</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hiveCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  hiveImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'transparent',
  },
  hiveBody: {
    padding: 14,
    gap: 10,
  },
  hiveTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 16,
    lineHeight: 21,
  },
  hiveLink: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
  },
})
