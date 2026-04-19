import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useAppFonts, useTheme } from './src/theme'
import { ThemeReduxBridge } from './src/context/ThemeReduxBridge'
import { tokens } from './src/theme/tokens'
import { store } from './src/store'
import { setUserProfile } from './src/store/slices/session-slice'
import { useAppDispatch, useAppSelector } from './src/store/hooks'
import { fetchSessionProfile, tryRefreshSession } from './src/api'
import { signOut } from './src/utils/sign-out'
import { SPLASH_DURATION_MS } from './src/constants/timing'
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
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector(s => s.session.accessToken)
  const isAuthenticated = Boolean(accessToken)
  const fontsLoaded = useAppFonts()
  const [showSplash, setShowSplash] = React.useState(true)
  const [showOnboarding, setShowOnboarding] = React.useState(true)
  const [sessionReady, setSessionReady] = React.useState(false)
  const [authView, setAuthView] = React.useState<'signin' | 'signup' | 'forgot'>('signin')
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), SPLASH_DURATION_MS)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      await tryRefreshSession()
      if (cancelled) return
      if (store.getState().session.accessToken) {
        try {
          const profile = await fetchSessionProfile()
          if (!cancelled) dispatch(setUserProfile(profile))
        } catch {}
      }
      if (!cancelled) setSessionReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [dispatch])

  const handleCompleteOnboarding = React.useCallback(() => {
    setShowOnboarding(false)
  }, [])

  const handleSignOut = React.useCallback(async () => {
    await signOut()
  }, [])

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: tokens.colors.light.surface }} />
  }

  if (!sessionReady && !showSplash && !showOnboarding) {
    return <View style={{ flex: 1, backgroundColor: tokens.colors.light.surface }} />
  }

  return (
    <>
      <AppStatusBar />
      {showSplash ? (
        <SplashScreen />
      ) : showOnboarding ? (
        <OnboardingScreen onGetStarted={handleCompleteOnboarding} />
      ) : !isAuthenticated ? (
        authView === 'signin' ? (
          <SignInScreen
            onBack={() => setShowOnboarding(true)}
            onOpenSignUp={() => setAuthView('signup')}
            onOpenForgotPassword={() => setAuthView('forgot')}
            onSignInSuccess={() => undefined}
          />
        ) : authView === 'signup' ? (
          <SignUpScreen
            onBackToSignIn={() => setAuthView('signin')}
            onSignUpSuccess={() => undefined}
          />
        ) : (
          <ForgotPasswordScreen onBackToSignIn={() => setAuthView('signin')} />
        )
      ) : (
        <MainNavigator onSignOut={handleSignOut} />
      )}
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
