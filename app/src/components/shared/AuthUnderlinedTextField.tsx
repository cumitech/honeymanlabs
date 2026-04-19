import React from 'react'
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native'
import { fontFamily, useTheme } from '../../theme'

export type AuthUnderlinedTextFieldProps = {
  label: string
  value: string
  onChangeText: (text: string) => void
  onClearError?: () => void
  editable: boolean
  inputVariant?: 'large' | 'medium'
  placeholder?: string
} & Pick<TextInputProps, 'autoCapitalize' | 'keyboardType' | 'autoComplete' | 'secureTextEntry'>

export function AuthUnderlinedTextField({
  label,
  value,
  onChangeText,
  onClearError,
  editable,
  inputVariant = 'large',
  placeholder,
  autoCapitalize,
  keyboardType,
  autoComplete,
  secureTextEntry,
}: AuthUnderlinedTextFieldProps) {
  const { theme } = useTheme()
  const fontSize = inputVariant === 'large' ? 20 : 18

  return (
    <View>
      <Text style={[styles.label, { color: theme.text.muted }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={t => {
          onChangeText(t)
          onClearError?.()
        }}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={theme.text.muted}
        style={[
          styles.input,
          { fontSize, color: theme.text.primary, borderBottomColor: theme.palette.secondary },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    lineHeight: 20,
    opacity: 0.35,
    fontFamily: fontFamily.sansMedium,
  },
  input: {
    marginTop: 4,
    paddingBottom: 7,
    borderBottomWidth: 2,
    fontFamily: fontFamily.sansRegular,
  },
})
