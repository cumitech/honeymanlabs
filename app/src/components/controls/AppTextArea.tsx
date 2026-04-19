import React from 'react'
import { AppInput } from './AppInput'
import type { TextInputProps } from 'react-native'

type AppTextAreaProps = TextInputProps & { label?: string; helperText?: string; errorText?: string }

export function AppTextArea(props: AppTextAreaProps) {
  return (
    <AppInput
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      className="min-h-[110px]"
      {...props}
    />
  )
}
