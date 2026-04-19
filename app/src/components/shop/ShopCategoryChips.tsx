import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppButton } from '../shared/AppButton'
import { useTheme } from '../../theme'
import { SHOP_CATEGORIES, SHOP_GRID_HORIZONTAL_PADDING } from '../../constants'

export function ShopCategoryChips() {
  const { theme, mode } = useTheme()
  const [activeCategory, setActiveCategory] = React.useState<string>(SHOP_CATEGORIES[0] ?? '')

  const idleBorderColor = mode === 'dark' ? 'rgba(253, 246, 234, 0.14)' : 'rgba(26, 16, 0, 0.10)'

  return (
    <View style={styles.chipsSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
        decelerationRate="fast"
      >
        {SHOP_CATEGORIES.map(label => (
          <AppButton
            key={label}
            variant="category"
            label={label}
            selected={label === activeCategory}
            onPress={() => setActiveCategory(label)}
          />
        ))}

        <View style={[styles.separator, { backgroundColor: idleBorderColor }]} />

        <AppButton
          variant="categoryIcon"
          onPress={() => {}}
          accessibilityLabel="More categories"
        >
          <MaterialCommunityIcons name="chevron-right" size={20} color={theme.palette.accent} />
        </AppButton>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  chipsSection: {
    marginBottom: 8,
    paddingHorizontal: 15,
  },
  chipsScroll: {
    paddingHorizontal: SHOP_GRID_HORIZONTAL_PADDING,
    gap: 8,
    alignItems: 'center',
    paddingRight: 12,
  },
  separator: {
    width: 1,
    height: 20,
    borderRadius: 1,
    marginHorizontal: 2,
  },
})
