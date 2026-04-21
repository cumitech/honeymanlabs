import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { PRODUCT_CATEGORIES } from '../../constants/product-categories'
import { PRODUCT_GRID_HORIZONTAL_PADDING } from '../../constants/layout'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'

export function CategoryChips() {
  const { theme } = useTheme()
  const [activeCategory, setActiveCategory] = React.useState<string>(PRODUCT_CATEGORIES[0] ?? '')

  return (
    <View style={[styles.wrap, { borderBottomColor: theme.border }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: PRODUCT_GRID_HORIZONTAL_PADDING },
        ]}
      >
        {PRODUCT_CATEGORIES.map(label => {
          const selected = label === activeCategory
          return (
            <Pressable
              key={label}
              onPressIn={lightHaptic}
              onPress={() => setActiveCategory(label)}
              style={[
                styles.chip,
                {
                  borderColor: selected ? theme.palette.primary : theme.border,
                  backgroundColor: selected ? theme.palette.primary : theme.bg.muted,
                },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              accessibilityLabel={`Filter by ${label}`}
            >
              <Text
                style={[
                  styles.chipLabel,
                  { color: selected ? theme.text.onPrimary : theme.text.primary },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipLabel: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
    letterSpacing: 0.15,
  },
})
