import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { parseBatchIdFromQr } from '../../data/lab-batches'
import type { LabStackParamList } from '../../types'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'

type CameraComponent = React.ComponentType

function tryLoadCameraScanner(): CameraComponent | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require('./LabQrScannerCamera') as { LabQrScannerCamera: CameraComponent }
    return mod.LabQrScannerCamera ?? null
  } catch {
    return null
  }
}

function LabQrScannerFallback() {
  const { theme } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()
  const insets = useSafeAreaInsets()
  const [raw, setRaw] = React.useState('')

  const close = () => {
    fireLightImpact()
    navigation.goBack()
  }

  const submit = () => {
    const id = parseBatchIdFromQr(raw) ?? '882'
    fireLightImpact()
    navigation.replace('LabBatchDetail', { batchId: id })
  }

  return (
    <View
      style={[
        styles.fallbackRoot,
        { backgroundColor: theme.bg.surface, paddingTop: insets.top + 12 },
      ]}
    >
      <View style={styles.fallbackHeader}>
        <Pressable onPress={close} style={styles.iconHit} accessibilityLabel="Close">
          <MaterialCommunityIcons name="close" size={26} color={theme.text.primary} />
        </Pressable>
      </View>
      <View style={styles.fallbackBody}>
        <Text style={[styles.fallbackTitle, { color: theme.text.primary }]}>
          Camera module not available
        </Text>
        <Text style={[styles.fallbackBodyText, { color: theme.text.muted }]}>
          Rebuild the native app so expo-camera is linked (from the app folder: npx expo
          run:android). Until then, you can enter a batch code manually.
        </Text>
        <TextInput
          value={raw}
          onChangeText={setRaw}
          placeholder="e.g. 882 or batch=882"
          placeholderTextColor={theme.text.muted}
          style={[
            styles.input,
            {
              borderColor: theme.border,
              color: theme.text.primary,
              backgroundColor: theme.bg.surface,
            },
          ]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          onPress={submit}
          style={[styles.primaryBtn, { backgroundColor: theme.palette.primary }]}
        >
          <Text style={[styles.primaryBtnText, { color: theme.text.onPrimary }]}>View batch</Text>
        </Pressable>
      </View>
    </View>
  )
}

export function LabQrScannerScreen() {
  const [CameraImpl] = React.useState(tryLoadCameraScanner)
  if (CameraImpl) {
    return <CameraImpl />
  }
  return <LabQrScannerFallback />
}

const styles = StyleSheet.create({
  fallbackRoot: {
    flex: 1,
  },
  fallbackHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
  },
  iconHit: {
    padding: 8,
  },
  fallbackBody: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  fallbackTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    marginBottom: 12,
  },
  fallbackBodyText: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fontFamily.sansRegular,
    fontSize: 16,
    marginBottom: 16,
  },
  primaryBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 999,
  },
  primaryBtnText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
  },
})
