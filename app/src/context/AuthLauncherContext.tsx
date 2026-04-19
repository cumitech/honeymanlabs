import React from 'react'

export type AuthLauncherContextValue = {
  openSignIn: () => void
  openSignUp: () => void
  openForgotPassword: () => void
}

const AuthLauncherContext = React.createContext<AuthLauncherContextValue | null>(null)

export function AuthLauncherProvider({
  value,
  children,
}: {
  value: AuthLauncherContextValue
  children: React.ReactNode
}) {
  return <AuthLauncherContext.Provider value={value}>{children}</AuthLauncherContext.Provider>
}

export function useAuthLauncher(): AuthLauncherContextValue {
  const ctx = React.useContext(AuthLauncherContext)
  if (!ctx) {
    throw new Error('useAuthLauncher must be used within AuthLauncherProvider')
  }
  return ctx
}
