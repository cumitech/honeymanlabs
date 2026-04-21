import { fontFamily, useTheme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { lightHaptic } from '../../utils'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import type { HiveStoryArticle } from '../../models/views/hive.model'

const StoryCardCompact = ({ article, width }: { article: HiveStoryArticle; width: number }) => {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const cardBg = theme.bg.card

  const readMore = () => {
    lightHaptic()
    navigation.navigate('Education' as never)
  }

  return (
    <View
      style={[
        compactStyles.hiveCard,
        { width, backgroundColor: cardBg, borderColor: theme.border },
      ]}
    >
      <Image source={article.image} style={compactStyles.hiveImage} resizeMode="cover" />
      <View style={compactStyles.hiveBody}>
        <Text style={[compactStyles.hiveTitle, { color: theme.text.primary }]} numberOfLines={2}>
          {article.title}
        </Text>
        <Pressable
          onPressIn={lightHaptic}
          onPress={readMore}
          accessibilityRole="button"
          accessibilityLabel="Read more"
        >
          <Text style={[compactStyles.hiveLink, { color: theme.palette.accent }]}>
            Read More &gt;
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default StoryCardCompact

const compactStyles = StyleSheet.create({
  hiveCard: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 12,
    overflow: 'hidden',
    shadowColor: '#1B1200',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
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
