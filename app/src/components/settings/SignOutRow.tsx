import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { ROW_PAD_H, ICON_WELL, ICON_GAP } from '../../constants/divider'
import { lightHaptic } from '../../utils'
import { fontFamily } from '../../theme'

const SignOutRow = ({ iconWellBg, onPress }: { iconWellBg: string; onPress: () => void }) => {
  return (
    <Pressable
      onPressIn={lightHaptic}
      onPress={onPress}
      style={({ pressed }) => [rowStyles.rowPressable, pressed ? { opacity: 0.65 } : null]}
      accessibilityRole="button"
      accessibilityLabel="Sign out"
    >
      <View style={rowStyles.row}>
        <View style={[rowStyles.iconWell, { backgroundColor: iconWellBg }]}>
          <MaterialCommunityIcons name="logout" size={22} color="#E53935" />
        </View>
        <Text style={[rowStyles.label, { color: '#E53935' }]}>Sign out</Text>
      </View>
    </Pressable>
  )
}
export default SignOutRow

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
})
