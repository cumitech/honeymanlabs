import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native'
import { getLabBatchDetail, parseBatchIdFromQr } from '../../data/lab-batches'
import type { LabStackParamList } from '../../types'
import { fontFamily, useTheme } from '../../theme'
import { fireLightImpact } from '../../utils/safe-haptics'
import { FadeInMount } from '../layout/FadeInMount'
import { ScreenShell } from '../layout/ScreenShell'
import { tabScreenHoneycomb } from '../layout/tabScreenHoneycombLayout'
import { LabFlavorRadar } from './LabFlavorRadar'
import { LabMetricRow } from './LabMetricRow'

export function LabBatchDetailScreen() {
  const { theme } = useTheme()
  const navigation = useNavigation<NativeStackNavigationProp<LabStackParamList>>()
  const route = useRoute<RouteProp<LabStackParamList, 'LabBatchDetail'>>()
  const { batchId } = route.params
  const [searchText, setSearchText] = React.useState('')

  const detail = React.useMemo(() => getLabBatchDetail(batchId), [batchId])

  const runSearch = (raw: string) => {
    const id = parseBatchIdFromQr(raw)
    if (id) {
      fireLightImpact()
      navigation.navigate('LabBatchDetail', { batchId: id })
      setSearchText('')
    }
  }

  const openScanner = () => {
    fireLightImpact()
    navigation.navigate('LabQrScanner')
  }

  const enzymeFill = detail.enzymeLabel.toLowerCase().includes('high')
    ? 0.9
    : detail.enzymeLabel.toLowerCase().includes('mod')
      ? 0.55
      : 0.4

  return (
    <ScreenShell
      scroll={false}
      padded={false}
      safeAreaEdges={['left', 'right', 'bottom']}
      pageHoneycombTopLeftStyle={tabScreenHoneycomb.topLeft}
      pageHoneycombBottomRightStyle={tabScreenHoneycomb.bottomRight}
      pageHoneycombCenterStyle={tabScreenHoneycomb.center}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <FadeInMount>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: theme.bg.muted, borderColor: theme.border },
            ]}
          >
            <MaterialCommunityIcons name="magnify" size={22} color={theme.text.muted} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Enter Batch Number (e.g., #7721) or Scan QR Code"
              placeholderTextColor={theme.text.muted}
              style={[styles.searchInput, { color: theme.text.primary }]}
              returnKeyType="search"
              onSubmitEditing={() => runSearch(searchText)}
            />
            <Pressable onPress={openScanner} hitSlop={10} accessibilityLabel="Open QR scanner">
              <MaterialCommunityIcons name="qrcode-scan" size={24} color={theme.palette.primary} />
            </Pressable>
          </View>

          <View
            style={[styles.card, { backgroundColor: theme.bg.card, borderColor: theme.border }]}
          >
            <Text style={[styles.cardTitle, { color: theme.text.primary }]}>
              {detail.displayBatch}
            </Text>

            <LabFlavorRadar profile={detail.flavor} />

            <LabMetricRow
              label="Pollen Count"
              valueLabel={`${detail.pollenPct}%`}
              fill={detail.pollenPct / 100}
            />
            <LabMetricRow
              label="Moisture Content"
              valueLabel={`${detail.moisturePct}%`}
              fill={detail.moisturePct / 25}
            />
            <LabMetricRow
              label="Enzyme Activity"
              valueLabel={detail.enzymeLabel}
              fill={enzymeFill}
            />

            <View style={styles.badges}>
              <View style={[styles.badge, { borderColor: theme.palette.primary }]}>
                <MaterialCommunityIcons name="leaf" size={18} color={theme.palette.accent} />
                <Text style={[styles.badgeText, { color: theme.text.primary }]}>
                  CERTIFIED ORGANIC
                </Text>
              </View>
              <View style={[styles.badge, { borderColor: theme.palette.primary }]}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={18}
                  color={theme.palette.accent}
                />
                <Text style={[styles.badgeText, { color: theme.text.primary }]}>
                  NON-GMO VERIFIED
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPressIn={fireLightImpact}
            onPress={() => {}}
            style={styles.downloadWrap}
            accessibilityRole="button"
            accessibilityLabel="Download full PDF report"
          >
            <View style={[styles.downloadBtn, { backgroundColor: theme.palette.primary }]}>
              <MaterialCommunityIcons name="download" size={22} color={theme.text.onPrimary} />
              <Text style={[styles.downloadText, { color: theme.text.onPrimary }]}>
                Download Full PDF Report
              </Text>
            </View>
          </Pressable>
        </FadeInMount>
      </ScrollView>
    </ScreenShell>
  )
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 36,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.sansRegular,
    fontSize: 14,
    paddingVertical: 4,
  },
  card: {
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    shadowColor: '#1B1200',
    shadowOpacity: 0.045,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardTitle: {
    fontFamily: fontFamily.sansBold,
    fontSize: 18,
    marginBottom: 4,
  },
  badges: {
    marginTop: 8,
    gap: 10,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  badgeText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 11,
    letterSpacing: 0.6,
  },
  downloadWrap: {
    marginTop: 22,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 999,
    paddingVertical: 16,
  },
  downloadText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 16,
  },
})
