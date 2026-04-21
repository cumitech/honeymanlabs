import React from 'react'

export type AuthFlowValue = {
  openSignIn: () => void
  openSignUp: () => void
  openForgotPassword: () => void
}

const AuthFlowContext = React.createContext<AuthFlowValue | null>(null)

export function AuthFlowProvider({
  value,
  children,
}: {
  value: AuthFlowValue
  children: React.ReactNode
}) {
  return <AuthFlowContext.Provider value={value}>{children}</AuthFlowContext.Provider>
}

export function useAuthFlow(): AuthFlowValue {
  const ctx = React.useContext(AuthFlowContext)
  if (!ctx) {
    throw new Error('useAuthFlow must be used within AuthFlowProvider')
  }
  return ctx
}
