import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { parseBatchIdFromQr } from '../../data/lab-batches'
import type { LabStackParamList } from '../../types'
import { fontFamily, useTheme } from '../../theme'
import { tokens } from '../../theme/tokens'
import { fireLightImpact } from '../../utils/safe-haptics'

export function LabQrScannerCamera() {
  const { theme } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()
  const insets = useSafeAreaInsets()
  const [permission, requestPermission] = useCameraPermissions()
  const scannedRef = React.useRef(false)

  React.useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission()
    }
  }, [permission, requestPermission])

  const onBarcodeScanned = React.useCallback(
    (result: BarcodeScanningResult) => {
      if (scannedRef.current) return
      scannedRef.current = true
      fireLightImpact()
      const id = parseBatchIdFromQr(result.data) ?? '882'
      navigation.replace('LabBatchDetail', { batchId: id })
    },
    [navigation],
  )

  const close = () => {
    fireLightImpact()
    navigation.goBack()
  }

  if (!permission) {
    return (
      <View style={[styles.centered, { backgroundColor: tokens.colors.dark.surface }]}>
        <Text style={{ color: theme.media.foreground }}>Loading camera…</Text>
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.bg.surface, padding: 24 }]}>
        <Text style={[styles.deniedTitle, { color: theme.text.primary }]}>
          Camera access needed
        </Text>
        <Text style={[styles.deniedBody, { color: theme.text.muted }]}>
          Allow camera to scan batch QR codes on honey jars.
        </Text>
        <Pressable
          onPress={requestPermission}
          style={[styles.primaryBtn, { backgroundColor: theme.palette.primary }]}
        >
          <Text style={[styles.primaryBtnText, { color: theme.text.onPrimary }]}>
            Grant permission
          </Text>
        </Pressable>
        <Pressable onPress={close} style={styles.secondaryBtn}>
          <Text style={{ color: theme.palette.primary, fontFamily: fontFamily.sansBold }}>
            Go back
          </Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <CameraView
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={onBarcodeScanned}
      />
      <View style={[styles.overlayTop, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        <Pressable
          onPress={close}
          style={[styles.closeBtn, { backgroundColor: 'rgba(27, 18, 0, 0.48)' }]}
          accessibilityLabel="Close scanner"
        >
          <MaterialCommunityIcons name="close" size={28} color={theme.media.foreground} />
        </Pressable>
      </View>
      <View style={styles.hintWrap} pointerEvents="none">
        <Text style={[styles.hint, { color: theme.media.foregroundMuted }]}>
          Align the QR code within the frame
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: tokens.colors.dark.surface,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  closeBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintWrap: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hint: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 24,
    textShadowColor: 'rgba(27, 18, 0, 0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  deniedTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  deniedBody: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  primaryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 999,
    marginBottom: 12,
  },
  primaryBtnText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
  },
  secondaryBtn: {
    padding: 12,
  },
})
