import { useFonts } from 'expo-font'
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue'
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans'
import {
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display'

export const fontFamily = {
  sansRegular: 'DMSans_400Regular',
  sansMedium: 'DMSans_500Medium',
  sansBold: 'DMSans_700Bold',
  displayMedium: 'PlayfairDisplay_500Medium',
  displaySemiBold: 'PlayfairDisplay_600SemiBold',
  displayBold: 'PlayfairDisplay_700Bold',
  accent: 'BebasNeue_400Regular',
}

export function useAppFonts() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    BebasNeue_400Regular,
  })

  return fontsLoaded
}
