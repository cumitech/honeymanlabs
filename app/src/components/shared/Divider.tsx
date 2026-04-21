import { View, StyleSheet } from 'react-native'
import { useTheme } from '../../theme'
import { DIVIDER_INSET, ROW_PAD_H } from '../../constants/divider'
const Divider = () => {
  const { theme } = useTheme()
  return (
    <View
      style={[
        cardStyles.divider,
        {
          backgroundColor: theme.border,
          marginLeft: DIVIDER_INSET,
          marginRight: ROW_PAD_H,
        },
      ]}
    />
  )
}

export default Divider
const cardStyles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.85,
  },
})
