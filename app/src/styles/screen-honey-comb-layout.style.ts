import { StyleSheet } from 'react-native'
import { SCREEN_HONEYCOMB_CORNER_BLEED } from '../constants'

export const ScreenHoneyCombLayoutStyle = StyleSheet.create({
  topLeft: {
    position: 'absolute',
    top: -SCREEN_HONEYCOMB_CORNER_BLEED,
    left: -SCREEN_HONEYCOMB_CORNER_BLEED,
    width: '54%',
    maxWidth: 228,
    height: 276,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -SCREEN_HONEYCOMB_CORNER_BLEED,
    right: -SCREEN_HONEYCOMB_CORNER_BLEED,
    width: '58%',
    maxWidth: 244,
    height: 292,
  },
  center: {
    position: 'absolute',
    top: '20%',
    left: '6%',
    width: '88%',
    maxWidth: 420,
    height: 360,
  },
})
