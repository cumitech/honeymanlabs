import React from 'react'
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'
import { SHOP_CATEGORIES } from '../../constants'

function AnimatedChip({
  label,
  selected,
  onPress,
  chipFill,
  chipFillPressed,
  chipFillActive,
  chipFillActivePressed,
  idleBorderColor,
  idleLabelColor,
  activeLabelColor,
  primaryColor,
}: {
  label: string
  selected: boolean
  onPress: () => void
  chipFill: string
  chipFillPressed: string
  chipFillActive: string
  chipFillActivePressed: string
  idleBorderColor: string
  idleLabelColor: string
  activeLabelColor: string
  primaryColor: string
}) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    fireLightImpact()
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start()
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={({ pressed }) => [
          styles.chip,
          styles.chipLift,
          {
            borderColor: selected ? primaryColor : idleBorderColor,
            backgroundColor: selected
              ? pressed
                ? chipFillActivePressed
                : chipFillActive
              : pressed
                ? chipFillPressed
                : chipFill,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected }}
      >
        {selected && <View style={[styles.selectedDot, { backgroundColor: primaryColor }]} />}
        <Text
          style={[
            styles.chipLabel,
            {
              color: selected ? activeLabelColor : idleLabelColor,
              fontFamily: selected ? fontFamily.sansBold : fontFamily.sansMedium,
              marginLeft: selected ? 6 : 0,
            },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  )
}

export function ShopCategoryChips() {
  const { theme, mode } = useTheme()
  const [activeCategory, setActiveCategory] = React.useState<string>(SHOP_CATEGORIES[0] ?? '')

  const idleBorderColor = mode === 'dark' ? 'rgba(253, 246, 234, 0.14)' : 'rgba(26, 16, 0, 0.10)'
  const idleLabelColor = mode === 'dark' ? theme.text.primary : theme.palette.accent
  const activeLabelColor = mode === 'dark' ? theme.text.primary : theme.text.onPrimary
  const chipFill = mode === 'dark' ? 'rgba(253, 246, 234, 0.06)' : 'rgba(129, 81, 0, 0.04)'
  const chipFillPressed = mode === 'dark' ? 'rgba(253, 246, 234, 0.12)' : 'rgba(129, 81, 0, 0.10)'
  const chipFillActive = mode === 'dark' ? 'rgba(255, 184, 0, 0.26)' : theme.palette.primary
  const chipFillActivePressed =
    mode === 'dark' ? 'rgba(255, 184, 0, 0.34)' : 'rgba(255, 165, 0, 0.82)'

  const chevronScaleAnim = React.useRef(new Animated.Value(1)).current

  return (
    <View style={styles.chipsSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsScroll}
        decelerationRate="fast"
      >
        {SHOP_CATEGORIES.map(label => (
          <AnimatedChip
            key={label}
            label={label}
            selected={label === activeCategory}
            onPress={() => setActiveCategory(label)}
            chipFill={chipFill}
            chipFillPressed={chipFillPressed}
            chipFillActive={chipFillActive}
            chipFillActivePressed={chipFillActivePressed}
            idleBorderColor={idleBorderColor}
            idleLabelColor={idleLabelColor}
            activeLabelColor={activeLabelColor}
            primaryColor={theme.palette.primary}
          />
        ))}

        {/* Separator */}
        <View style={[styles.separator, { backgroundColor: idleBorderColor }]} />

        {/* Chevron chip */}
        <Animated.View style={{ transform: [{ scale: chevronScaleAnim }] }}>
          <Pressable
            onPressIn={() => {
              fireLightImpact()
              Animated.spring(chevronScaleAnim, {
                toValue: 0.95,
                useNativeDriver: true,
                speed: 50,
                bounciness: 0,
              }).start()
            }}
            onPressOut={() => {
              Animated.spring(chevronScaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                speed: 30,
                bounciness: 6,
              }).start()
            }}
            onPress={() => {}}
            style={({ pressed }) => [
              styles.chipChevron,
              styles.chipLift,
              {
                borderColor: idleBorderColor,
                backgroundColor: pressed ? chipFillPressed : chipFill,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel="More categories"
          >
            <MaterialCommunityIcons name="chevron-right" size={20} color={theme.palette.accent} />
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  chipsSection: {
    marginBottom: 8,
  },
  chipsScroll: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
    paddingRight: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
    minHeight: 40,
    justifyContent: 'center',
  },
  chipLift: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  selectedDot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    opacity: 0.85,
  },
  chipLabel: {
    fontSize: 13.5,
    letterSpacing: 0.15,
  },
  separator: {
    width: 1,
    height: 20,
    borderRadius: 1,
    marginHorizontal: 2,
  },
  chipChevron: {
    borderWidth: 1,
    borderRadius: 999,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
