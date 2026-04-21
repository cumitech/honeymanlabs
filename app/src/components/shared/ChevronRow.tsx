import { Pressable, View, StyleSheet, Text } from 'react-native'
import { fontFamily, useTheme } from '../../theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ROW_PAD_H, ICON_WELL, ICON_GAP } from '../../constants/divider'
import { lightHaptic } from '../../utils'

interface ChevronRowProps {
  icon: string
  label: string
  iconColor: string
  labelColor: string
  iconWellBg: string
  onPress: () => void
}

const ChevronRow = ({
  icon,
  label,
  iconColor,
  labelColor,
  iconWellBg,
  onPress,
}: ChevronRowProps) => {
  const { theme } = useTheme()
  return (
    <Pressable
      onPressIn={lightHaptic}
      onPress={onPress}
      style={({ pressed }) => [rowStyles.rowPressable, pressed ? { opacity: 0.65 } : null]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={rowStyles.row}>
        <View style={[rowStyles.iconWell, { backgroundColor: iconWellBg }]}>
          <MaterialCommunityIcons name={icon as never} size={22} color={iconColor} />
        </View>
        <Text style={[rowStyles.label, { color: labelColor }]}>{label}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={theme.text.muted}
          style={rowStyles.chevron}
        />
      </View>
    </Pressable>
  )
}

export default ChevronRow

const rowStyles = StyleSheet.create({
  rowPressable: {
    width: '100%',
    alignSelf: 'stretch',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingHorizontal: ROW_PAD_H,
    paddingVertical: 16,
    minHeight: 56,
  },
  iconWell: {
    width: ICON_WELL,
    height: ICON_WELL,
    borderRadius: ICON_WELL / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ICON_GAP,
    flexShrink: 0,
  },
  label: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
    letterSpacing: 0.15,
  },
  chevron: {
    marginLeft: 8,
    flexShrink: 0,
  },
})
