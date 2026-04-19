import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { LAB_QUICK_VERIFY_QR_BOX } from '../../constants'
import type { LabStackParamList } from '../../types'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'
import { LabGlassCard } from './LabGlassCard'

export function LabQuickVerifyCard() {
  const { theme, mode } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()

  const openScanner = () => {
    fireLightImpact()
    navigation.navigate('LabQrScanner')
  }

  const glowColors =
    mode === 'dark'
      ? (['rgba(255, 184, 0, 0.2)', 'rgba(255, 107, 0, 0.12)'] as const)
      : (['rgba(255, 210, 140, 0.55)', 'rgba(255, 190, 200, 0.45)'] as const)

  return (
    <Pressable
      onPress={openScanner}
      accessibilityRole="button"
      accessibilityLabel="Scan QR code from honey jar"
    >
      <LinearGradient
        colors={[...glowColors]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.glowWrap}
      >
        <LabGlassCard emphasis style={styles.inner}>
          <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>Quick Verify</Text>
          <View style={styles.scanArea}>
            <View style={[styles.cornerTL, { borderColor: theme.palette.primary }]} />
            <View style={[styles.cornerTR, { borderColor: theme.palette.primary }]} />
            <View style={[styles.cornerBL, { borderColor: theme.palette.primary }]} />
            <View style={[styles.cornerBR, { borderColor: theme.palette.primary }]} />
            <View
              style={[
                styles.qrPlaceholder,
                {
                  backgroundColor: mode === 'dark' ? 'rgba(253, 246, 234, 0.92)' : theme.bg.surface,
                },
              ]}
            >
              <MaterialCommunityIcons name="qrcode" size={72} color={theme.text.muted} />
            </View>
          </View>
          <Text style={[styles.caption, { color: theme.text.muted }]}>
            Scan QR Code from Honey Jar
          </Text>
        </LabGlassCard>
      </LinearGradient>
    </Pressable>
  )
}

const QR_BOX = LAB_QUICK_VERIFY_QR_BOX

const styles = StyleSheet.create({
  glowWrap: {
    borderRadius: 26,
    padding: 3,
  },
  inner: {
    padding: 18,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: 17,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  scanArea: {
    width: QR_BOX + 28,
    height: QR_BOX + 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  qrPlaceholder: {
    width: QR_BOX,
    height: QR_BOX,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 6,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 6,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 6,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 6,
  },
  caption: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
    textAlign: 'center',
  },
})
