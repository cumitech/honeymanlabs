import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type ToastVariant = 'success' | 'info' | 'warning' | 'error'
type ToastItem = { id: string; message: string; variant: ToastVariant }

type ToastApi = {
  show: (message: string, variant?: ToastVariant) => void
  success: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
  error: (message: string) => void
}

const ToastContext = createContext<ToastApi | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const show = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts(prev => [...prev, { id, message, variant }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500)
  }, [])

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: m => show(m, 'success'),
      info: m => show(m, 'info'),
      warning: m => show(m, 'warning'),
      error: m => show(m, 'error'),
    }),
    [show],
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <View pointerEvents="none" style={styles.stack}>
        {toasts.map(toast => (
          <View
            key={toast.id}
            className="rounded-xl border border-l-4 px-3 py-2.5"
            style={[
              styles.toast,
              {
                backgroundColor: theme.bg.card,
                borderColor: theme.border,
                borderLeftColor: theme.status[toast.variant],
              },
            ]}
          >
            <Text style={[styles.text, { color: theme.status[toast.variant] }]}>
              {toast.message}
            </Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}

const styles = StyleSheet.create({
  stack: { position: 'absolute', top: 54, left: 16, right: 16, gap: 10 },
  toast: {
    borderWidth: 1,
    borderLeftWidth: 4,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#1B1200',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  text: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
})
