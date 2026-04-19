import React from 'react'
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native'
import { useTheme } from '../../theme'

type AppInputProps = TextInputProps & { label?: string; helperText?: string; errorText?: string }

export function AppInput({ label, helperText, errorText, style, ...props }: AppInputProps) {
  const { theme } = useTheme()
  return (
    <View className="gap-1.5" style={styles.root}>
      {label ? <Text style={[styles.label, { color: theme.text.primary }]}>{label}</Text> : null}
      <TextInput
        {...props}
        className="min-h-11 rounded-[10px] border px-3 py-2.5"
        placeholderTextColor={theme.text.muted}
        style={[
          styles.input,
          { color: theme.text.primary, borderColor: errorText ? theme.status.error : theme.border },
          style,
        ]}
      />
      {errorText ? (
        <Text style={[styles.note, { color: theme.status.error }]}>{errorText}</Text>
      ) : null}
      {!errorText && helperText ? (
        <Text style={[styles.note, { color: theme.text.muted }]}>{helperText}</Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  note: { fontSize: 12 },
})
