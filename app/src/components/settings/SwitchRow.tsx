import { View, Text, Switch, StyleSheet } from 'react-native'
import { fontFamily, useTheme } from '../../theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ROW_PAD_H, ICON_WELL, ICON_GAP } from '../../constants/divider'

interface SwitchRowProps {
  icon: string
  label: string
  iconColor: string
  labelColor: string
  iconWellBg: string
  value: boolean
  onValueChange: (v: boolean) => void
  trackColorOn?: string
}

const SwitchRow = ({
  icon,
  label,
  iconColor,
  labelColor,
  iconWellBg,
  value,
  onValueChange,
  trackColorOn,
}: SwitchRowProps) => {
  const { mode } = useTheme()
  const trackOff = mode === 'dark' ? 'rgba(255,255,255,0.22)' : '#D8D8D6'

  return (
    <View style={[rowStyles.row, rowStyles.switchRowOuter]} accessibilityRole="none">
      <View style={[rowStyles.iconWell, { backgroundColor: iconWellBg }]}>
        <MaterialCommunityIcons name={icon as never} size={22} color={iconColor} />
      </View>
      <Text style={[rowStyles.label, { color: labelColor }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: trackOff, true: trackColorOn ?? iconColor }}
        thumbColor="#FFFFFF"
        ios_backgroundColor={trackOff}
        style={rowStyles.switch}
      />
    </View>
  )
}

export default SwitchRow

const rowStyles = StyleSheet.create({
  rowPressable: {
    width: '100%',
    alignSelf: 'stretch',
  },
  switchRowOuter: {
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
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
  },
})
