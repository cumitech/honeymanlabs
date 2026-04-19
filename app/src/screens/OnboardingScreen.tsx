import React from 'react'
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { AppButton } from '../components/shared'
import { fontFamily, useTheme } from '../theme'

export type OnboardingScreenProps = {
  onGetStarted: () => void
}

type OnboardingPanel = {
  readonly overline: string
  readonly title: string
  readonly subtitle: string
  readonly bullets?: readonly string[]
}

const PANELS: readonly OnboardingPanel[] = [
  {
    overline: 'Welcome to',
    title: 'HoneyMan',
    subtitle: 'Trace every batch with confidence from hive harvest to final jar.',
  },
  {
    overline: 'Quality first',
    title: 'Assured products',
    subtitle: 'Run quality checks, verify origin, and confidently sell trusted honey products.',
    bullets: ['Lab and field quality assurance', 'Traceable origin and batch history'],
  },
  {
    overline: 'Built to scale',
    title: 'Grow smarter',
    subtitle:
      'Manage apiaries, teams, and sales with clear insights that keep operations consistent.',
  },
]

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const { theme } = useTheme()
  const [index, setIndex] = React.useState(0)
  const transition = React.useRef(new Animated.Value(1)).current
  const panel = PANELS[index]
  const isFinal = index === PANELS.length - 1

  const moveToPanel = React.useCallback(
    (nextIndex: number) => {
      if (nextIndex === index) return
      Animated.sequence([
        Animated.timing(transition, {
          toValue: 0,
          duration: 120,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(transition, {
          toValue: 1,
          duration: 230,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()
      setIndex(nextIndex)
    },
    [index, transition],
  )

  const contentTranslateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  })

  return (
    <View style={[styles.root, { backgroundColor: theme.bg.surface }]}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require('../assets/honeydew-honey-drip-1.png')}
          style={[styles.background, { backgroundColor: theme.bg.surface }]}
          imageStyle={styles.backgroundImage}
        >
          {!isFinal ? (
            <Pressable style={styles.skipButton} onPress={() => moveToPanel(PANELS.length - 1)}>
              <Text style={[styles.skipText, { color: theme.text.muted }]}>Skip</Text>
            </Pressable>
          ) : (
            <View style={styles.skipSpacer} />
          )}

          <Animated.View
            style={[
              styles.content,
              {
                opacity: transition,
                transform: [{ translateY: contentTranslateY }],
              },
            ]}
          >
            <Text style={[styles.overline, { color: theme.palette.accent }]}>{panel.overline}</Text>
            <Text style={[styles.title, { color: theme.text.primary }]}>
              {panel.title}
            </Text>
            {index === 1 ? (
              <Image
                source={require('../assets/bee.png')}
                style={styles.bee}
                resizeMode="contain"
              />
            ) : null}
          </Animated.View>
        </ImageBackground>
      </View>

      <Animated.View
        style={[
          styles.bottomSection,
          { backgroundColor: theme.bg.surface },
          {
            opacity: transition,
            transform: [{ translateY: contentTranslateY }],
          },
        ]}
      >
        <Text style={[styles.subtitle, { color: theme.text.muted }]}>{panel.subtitle}</Text>

        {panel.bullets ? (
          <View style={styles.bullets}>
            {panel.bullets.map(bullet => (
              <View key={bullet} style={styles.bulletRow}>
                <View style={[styles.bulletDot, { backgroundColor: theme.palette.primary }]} />
                <Text style={[styles.bulletText, { color: theme.text.muted }]}>{bullet}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.dots}>
          {PANELS.map((item, dotIndex) => (
            <View
              key={item.title}
              style={[
                styles.dot,
                dotIndex === index
                  ? [styles.dotActive, { backgroundColor: theme.palette.primary }]
                  : { backgroundColor: theme.border },
              ]}
            />
          ))}
        </View>

        {!isFinal ? (
          <AppButton
            variant="onboarding"
            label="Next"
            onPress={() => moveToPanel(Math.min(index + 1, PANELS.length - 1))}
          />
        ) : (
          <AppButton variant="onboarding" label="Get started" onPress={onGetStarted} />
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topSection: {
    height: '56%',
  },
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  skipButton: {
    marginTop: 54,
    marginRight: 20,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  skipText: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  skipSpacer: {
    height: 42,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 35,
  },
  overline: {
    fontFamily: fontFamily.sansBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  title: {
    marginTop: 2,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 50,
    lineHeight: 54,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  bee: {
    width: 132,
    height: 132,
    marginTop: 16,
    opacity: 0.96,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 14,
    paddingBottom: 24,
    gap: 12,
  },
  bullets: {
    gap: 6,
    marginTop: 2,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginTop: 7,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: fontFamily.sansMedium,
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  dotActive: {
    width: 20,
  },
})
