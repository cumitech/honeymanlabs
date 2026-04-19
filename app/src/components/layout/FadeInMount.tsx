import React from 'react'
import { Animated, Easing, type StyleProp, type ViewStyle } from 'react-native'

type FadeInMountProps = {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

export function FadeInMount({ children, style }: FadeInMountProps) {
  const opacity = React.useRef(new Animated.Value(0)).current
  const translateY = React.useRef(new Animated.Value(10)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 9,
        tension: 78,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateY])

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  )
}
