import { View, StyleSheet } from 'react-native'
import { useTheme } from '../../theme'

const SettingsCard = ({ children }: { children: React.ReactNode }) => {
  const { theme, mode } = useTheme()
  const fill = mode === 'light' ? '#FFFFFF' : theme.bg.card
  const shadowOpacity = mode === 'dark' ? 0.22 : 0.09
  return (
    <View
      style={[
        cardStyles.card,
        {
          backgroundColor: fill,
          borderColor: theme.border,
          shadowOpacity,
        },
      ]}
    >
      {children}
    </View>
  )
}
export default SettingsCard

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    marginHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#1B1200',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 18,
    elevation: 4,
  },
})
