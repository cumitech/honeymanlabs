import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native'
import Logo from '../assets/logo.svg'
import { SPLASH_LOGO_PULSE_STEP_MS } from '../constants'
import { fontFamily, useTheme } from '../theme'

const SPLASH_GRADIENT_LIGHT = ['#FFF6E8', '#FFECD0', '#F2D2A8', '#E4BC88'] as const
const SPLASH_GRADIENT_DARK = ['#060504', '#151008', 'rgba(255, 184, 0, 0.16)', '#0A0806'] as const
const SPLASH_GRADIENT_LOCATIONS_LIGHT = [0, 0.28, 0.56, 1] as const
const SPLASH_GRADIENT_LOCATIONS_DARK = [0, 0.36, 0.52, 1] as const

export function SplashScreen() {
  const { theme, mode } = useTheme()
  const logoAnim = React.useRef(new Animated.Value(0)).current

  const gradientColors = React.useMemo(
    () =>
      (mode === 'dark' ? [...SPLASH_GRADIENT_DARK] : [...SPLASH_GRADIENT_LIGHT]) as [
        string,
        string,
        string,
        string,
      ],
    [mode],
  )

  const gradientLocations = React.useMemo(
    () => (mode === 'dark' ? [...SPLASH_GRADIENT_LOCATIONS_DARK] : [...SPLASH_GRADIENT_LOCATIONS_LIGHT]) as [
      number,
      number,
      number,
      number,
    ],
    [mode],
  )

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: SPLASH_LOGO_PULSE_STEP_MS,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoAnim, {
          toValue: 0,
          duration: SPLASH_LOGO_PULSE_STEP_MS,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    )
    pulse.start()
    return () => pulse.stop()
  }, [logoAnim])

  const logoScale = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1.14],
  })

  const logoTranslateY = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [14, -14],
  })

  const logoOpacity = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.62, 1],
  })

  const logoRotate = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2.2deg', '2.2deg'],
  })

  const haloScale = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.65, 1.45],
  })

  const haloOpacity = logoAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.55],
  })

  return (
    <View className="flex-1" style={[styles.root, { backgroundColor: theme.bg.surface }]}>
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.42, y: 1 }}
        style={styles.gradient}
      >
        <Image
          source={require('../assets/honycomb-layout-right-top.png')}
          style={[
            styles.topRightHoneycomb,
            { opacity: mode === 'dark' ? 0.78 : 0.98 },
          ]}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/honycomb-layout-left-bottom.png')}
          style={[
            styles.bottomLeftHoneycomb,
            { opacity: mode === 'dark' ? 0.76 : 0.98 },
          ]}
          resizeMode="contain"
        />

        <View className="flex-1 items-center justify-center" style={styles.logoWrap}>
          <Animated.View
            style={[
              styles.logoHalo,
              {
                opacity: haloOpacity,
                transform: [{ scale: haloScale }],
                backgroundColor:
                  theme.mode === 'dark'
                    ? 'rgba(255, 200, 80, 0.28)'
                    : 'rgba(255, 185, 70, 0.42)',
              },
            ]}
          />

          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY },
                { rotate: logoRotate },
              ],
            }}
          >
            <Logo width={184} height={66} />
          </Animated.View>
          <Text style={[styles.appName, { color: theme.text.primary }]}>HoneyMan</Text>
          <Text style={[styles.caption, { color: theme.text.muted }]}>
            Pure craft. Trusted origin.
          </Text>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  topRightHoneycomb: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 248,
    height: 356,
  },
  bottomLeftHoneycomb: {
    position: 'absolute',
    left: -8,
    bottom: -8,
    width: 256,
    height: 336,
  },
  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
  },
  logoHalo: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 999,
  },
  appName: {
    marginTop: 20,
    fontSize: 38,
    letterSpacing: 0.45,
    fontFamily: fontFamily.displayBold,
    textShadowColor: 'rgba(200, 110, 0, 0.28)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  caption: {
    marginTop: 8,
    fontSize: 13,
    letterSpacing: 0.75,
    fontFamily: fontFamily.sansMedium,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(180, 95, 0, 0.22)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
})
