import React from 'react'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as WebBrowser from 'expo-web-browser'
import { Modal, Platform, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAppFonts, useTheme } from './src/theme'
import { ThemeReduxBridge } from './src/context/ThemeReduxBridge'
import { AuthFlowProvider } from './src/context/AuthFlowContext'
import { tokens } from './src/theme/tokens'
import { store } from './src/store'
import { fetchSessionProfile, tryRefreshSession } from './src/api'
import { useAuth } from './src/hooks/session/auth.hook'
import { setSessionUserInStore } from './src/hooks/session/auth-session.store'
import { SPLASH_DURATION_MS } from './src/constants/timing'
import { ONBOARDING_COMPLETE_STORAGE_KEY } from './src/constants/storage'
import { MainNavigator } from './src/navigation/MainNavigator'
import { SplashScreen } from './src/screens/SplashScreen'
import { OnboardingScreen } from './src/screens/OnboardingScreen'
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen'
import { SignInScreen } from './src/screens/SignInScreen'
import { SignUpScreen } from './src/screens/SignUpScreen'

function AppStatusBar() {
  const { mode } = useTheme()
  return <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
}

function AppContent() {
  const { signOut: signOutUser } = useAuth()
  const fontsLoaded = useAppFonts()

  React.useEffect(() => {
    if (Platform.OS !== 'web') return
    void WebBrowser.maybeCompleteAuthSession()
  }, [])

  const [showSplash, setShowSplash] = React.useState(true)
  const [onboardingHydrated, setOnboardingHydrated] = React.useState(false)
  const [showOnboarding, setShowOnboarding] = React.useState(true)
  const [sessionReady, setSessionReady] = React.useState(false)
  const [authOverlay, setAuthOverlay] = React.useState<'signin' | 'signup' | 'forgot' | null>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    void AsyncStorage.getItem(ONBOARDING_COMPLETE_STORAGE_KEY).then(raw => {
      setShowOnboarding(raw !== '1')
      setOnboardingHydrated(true)
    })
  }, [])

  React.useEffect(() => {
    let cancelled = false
    void (async () => {
      await tryRefreshSession()
      if (cancelled) return
      if (store.getState().session.accessToken) {
        try {
          const profile = await fetchSessionProfile()
          if (!cancelled) setSessionUserInStore(profile)
        } catch {
          // Ignore: user may be a guest or token may be expired.
        }
      }
      if (!cancelled) setSessionReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleCompleteOnboarding = React.useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_COMPLETE_STORAGE_KEY, '1')
    setShowOnboarding(false)
  }, [])

  const handleSignOut = React.useCallback(async () => {
    await signOutUser()
  }, [signOutUser])

  const closeAuthOverlay = React.useCallback(() => setAuthOverlay(null), [])

  const authFlow = React.useMemo(
    () => ({
      openSignIn: () => setAuthOverlay('signin'),
      openSignUp: () => setAuthOverlay('signup'),
      openForgotPassword: () => setAuthOverlay('forgot'),
    }),
    [],
  )

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: tokens.colors.light.surface }} />
  }

  if (showSplash) {
    return (
      <>
        <AppStatusBar />
        <SplashScreen />
      </>
    )
  }

  if (!sessionReady || !onboardingHydrated) {
    return (
      <>
        <AppStatusBar />
        <View style={{ flex: 1, backgroundColor: tokens.colors.light.surface }} />
      </>
    )
  }

  if (showOnboarding) {
    return (
      <>
        <AppStatusBar />
        <OnboardingScreen onGetStarted={handleCompleteOnboarding} />
      </>
    )
  }

  return (
    <>
      <AppStatusBar />
      <AuthFlowProvider value={authFlow}>
        <View style={{ flex: 1 }}>
          <MainNavigator onSignOut={handleSignOut} />
          <Modal
            visible={authOverlay !== null}
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={closeAuthOverlay}
          >
            <View style={{ flex: 1 }}>
              {authOverlay === 'signin' ? (
                <SignInScreen
                  onBack={closeAuthOverlay}
                  onOpenSignUp={() => setAuthOverlay('signup')}
                  onOpenForgotPassword={() => setAuthOverlay('forgot')}
                  onSignInSuccess={closeAuthOverlay}
                />
              ) : null}
              {authOverlay === 'signup' ? (
                <SignUpScreen
                  onBackToSignIn={() => setAuthOverlay('signin')}
                  onSignUpSuccess={closeAuthOverlay}
                />
              ) : null}
              {authOverlay === 'forgot' ? (
                <ForgotPasswordScreen onBackToSignIn={() => setAuthOverlay('signin')} />
              ) : null}
            </View>
          </Modal>
        </View>
      </AuthFlowProvider>
    </>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeReduxBridge>
            <AppContent />
          </ThemeReduxBridge>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
