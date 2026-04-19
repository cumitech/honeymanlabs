import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme'

type ModalAlertProps = {
  visible: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ModalAlert({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ModalAlertProps) {
  const { theme } = useTheme()
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center px-5" style={styles.backdrop}>
        <View
          className="rounded-2xl border p-[18px]"
          style={[styles.card, { backgroundColor: theme.bg.card, borderColor: theme.border }]}
        >
          <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
          <Text style={[styles.message, { color: theme.text.muted }]}>{message}</Text>
          <View className="mt-2.5 flex-row justify-end gap-2.5" style={styles.actions}>
            <Pressable
              className="min-h-10 justify-center rounded-[10px] px-3.5"
              style={styles.actionButton}
              onPress={onCancel}
            >
              <Text style={[styles.action, { color: theme.text.muted }]}>{cancelLabel}</Text>
            </Pressable>
            <Pressable
              className="min-h-10 min-w-[92px] justify-center rounded-[10px] px-3.5"
              style={[
                styles.actionButton,
                styles.actionPrimary,
                { backgroundColor: theme.palette.primary },
              ]}
              onPress={onConfirm}
            >
              <Text style={[styles.action, { color: theme.text.primary }]}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(27, 18, 0, 0.42)',
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    gap: 10,
    shadowColor: 'rgba(27, 18, 0, 0.35)',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  title: { fontSize: 19, fontWeight: '700' },
  message: { fontSize: 14, lineHeight: 21 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10 },
  actionButton: {
    minHeight: 40,
    borderRadius: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPrimary: { minWidth: 92 },
  action: { fontSize: 14, fontWeight: '700' },
})
