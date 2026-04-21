import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TRACE_STEPS, type TraceOrder } from '../../models/views/trace-order.model'
import { ASSET_BEE_LOGO } from '../../constants'
import { fontFamily, useTheme } from '../../theme'
import { lightHaptic } from '../../utils'

type OrderTraceCardProps = {
  order: TraceOrder
  onTraceBatch: (orderId: string) => void
}

type SegmentKind = 'solid' | 'gradient' | 'muted'

function segmentBeforeNode(i: number, order: TraceOrder, delivered: boolean): SegmentKind {
  if (i <= 0) return 'muted'
  if (delivered) return 'solid'
  if (order.completedSteps > i) return 'solid'
  if (order.completedSteps === i) return 'gradient'
  return 'muted'
}

function TraceSegment({
  kind,
  gradStart,
  gradEnd,
  mutedColor,
  solidColor,
}: {
  kind: SegmentKind
  gradStart: string
  gradEnd: string
  mutedColor: string
  solidColor: string
}) {
  if (kind === 'gradient') {
    return (
      <LinearGradient
        colors={[gradStart, gradEnd]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.segmentBar}
      />
    )
  }
  return (
    <View
      style={[
        styles.segmentBar,
        {
          backgroundColor: kind === 'solid' ? solidColor : mutedColor,
          opacity: kind === 'muted' ? 0.7 : 1,
        },
      ]}
    />
  )
}

const NODE_ROW_H = 32

export function OrderTraceCard({ order, onTraceBatch }: OrderTraceCardProps) {
  const { theme, mode } = useTheme()
  const delivered = order.status === 'delivered'
  const stepCount = TRACE_STEPS.length
  const completed = delivered ? stepCount : Math.min(order.completedSteps, stepCount)

  const mutedLine = mode === 'light' ? 'rgba(107, 75, 32, 0.28)' : theme.border
  const cardFill = mode === 'light' ? '#FFFFFF' : theme.bg.card
  const cardBorder = mode === 'light' ? 'rgba(26, 16, 0, 0.06)' : theme.border

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardFill,
          borderColor: cardBorder,
          shadowColor: mode === 'dark' ? '#000000' : '#1B1200',
          shadowOpacity: mode === 'dark' ? 0.1 : 0.045,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Image
          source={order.image}
          style={[styles.thumb, { backgroundColor: theme.bg.muted }]}
          resizeMode="contain"
        />
        <View style={styles.metaBlock}>
          <View style={styles.metaHeaderRow}>
            <View style={styles.meta}>
              <Text style={[styles.productName, { color: theme.text.primary }]} numberOfLines={2}>
                {order.productName}
              </Text>
              <Text style={[styles.metaLine, { color: theme.text.muted }]} numberOfLines={1}>
                <Text style={styles.metaEmphasis}>Order ID: </Text>
                {order.orderCode}
              </Text>
              <Text style={[styles.metaLine, { color: theme.text.muted }]} numberOfLines={1}>
                <Text style={styles.metaEmphasis}>Date: </Text>
                {order.dateLabel}
              </Text>
            </View>
            {delivered ? (
              <Text style={[styles.deliveredPlain, { color: theme.text.muted }]}>Delivered</Text>
            ) : null}
          </View>
        </View>
      </View>

      {!delivered ? (
        <View style={styles.progressBlock}>
          <View style={styles.progressRow}>
            {TRACE_STEPS.map((label, i) => (
              <React.Fragment key={`trace-col-${i}`}>
                {i > 0 ? (
                  <View style={[styles.segmentSlot, { height: NODE_ROW_H }]}>
                    <TraceSegment
                      kind={segmentBeforeNode(i, order, delivered)}
                      gradStart={theme.palette.primary}
                      gradEnd={theme.palette.secondary}
                      mutedColor={mutedLine}
                      solidColor={theme.palette.primary}
                    />
                  </View>
                ) : null}
                <View style={styles.stepColumn}>
                  <View style={[styles.nodeRow, { height: NODE_ROW_H }]}>
                    {completed > i ? (
                      <View style={[styles.doneRing, { backgroundColor: theme.palette.primary }]}>
                        <MaterialCommunityIcons
                          name="check"
                          size={14}
                          color={theme.text.onPrimary}
                        />
                      </View>
                    ) : !delivered && order.completedSteps === i ? (
                      <View
                        style={[
                          styles.beeStage,
                          {
                            borderColor: theme.palette.primary,
                            backgroundColor: mode === 'light' ? '#FFFFFF' : theme.bg.surface,
                          },
                        ]}
                      >
                        <Image
                          source={ASSET_BEE_LOGO}
                          style={styles.beeIcon}
                          resizeMode="contain"
                        />
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.pendingDot,
                          {
                            borderColor: mutedLine,
                            backgroundColor: theme.bg.muted,
                          },
                        ]}
                      />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      {
                        color:
                          !delivered && order.completedSteps === i
                            ? theme.text.primary
                            : theme.text.muted,
                        fontFamily:
                          !delivered && order.completedSteps === i
                            ? fontFamily.sansBold
                            : fontFamily.sansMedium,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {label}
                  </Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.ctaOuter}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Trace batch"
          onPress={() => {
            lightHaptic()
            onTraceBatch(order.id)
          }}
          style={({ pressed }) => [styles.ctaPressable, pressed && { opacity: 0.9 }]}
        >
          <LinearGradient
            colors={[theme.palette.primary, theme.palette.secondary]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.ctaGrad}
          >
            <Text style={[styles.ctaText, { color: theme.text.onPrimary }]}>Trace batch</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 16,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 18,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  thumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  metaBlock: {
    flex: 1,
    minWidth: 0,
  },
  metaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  meta: {
    flex: 1,
    minWidth: 0,
    paddingTop: 2,
  },
  productName: {
    fontFamily: fontFamily.displayBold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.15,
  },
  metaLine: {
    fontFamily: fontFamily.sansRegular,
    fontSize: 13,
    marginTop: 5,
    lineHeight: 18,
  },
  metaEmphasis: {
    fontFamily: fontFamily.sansMedium,
  },
  deliveredPlain: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 13,
    paddingTop: 3,
    flexShrink: 0,
  },
  progressBlock: {
    marginTop: 22,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  segmentSlot: {
    flex: 1,
    minWidth: 4,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  segmentBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
  },
  stepColumn: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
  },
  nodeRow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  doneRing: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  beeStage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
    marginTop: -3,
  },
  beeIcon: {
    width: 22,
    height: 22,
  },
  pendingDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    zIndex: 1,
  },
  stepLabel: {
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'center',
    marginTop: 8,
    width: '100%',
    paddingHorizontal: 2,
  },
  ctaOuter: {
    marginTop: 32,
    alignSelf: 'stretch',
    borderRadius: 12,
    overflow: 'hidden',
  },
  ctaPressable: {
    alignSelf: 'stretch',
  },
  ctaGrad: {
    minHeight: 48,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  ctaText: {
    fontFamily: fontFamily.sansBold,
    fontSize: 15,
    letterSpacing: 0.2,
  },
})
