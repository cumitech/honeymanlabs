import { StyleSheet } from 'react-native'
import { PAGE_HONEYCOMB_CORNER_BLEED } from '../../constants'

export const tabScreenHoneycomb = StyleSheet.create({
  topLeft: {
    position: 'absolute',
    top: -PAGE_HONEYCOMB_CORNER_BLEED,
    left: -PAGE_HONEYCOMB_CORNER_BLEED,
    width: '54%',
    maxWidth: 228,
    height: 276,
  },
  bottomRight: {
    position: 'absolute',
    bottom: -PAGE_HONEYCOMB_CORNER_BLEED,
    right: -PAGE_HONEYCOMB_CORNER_BLEED,
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
