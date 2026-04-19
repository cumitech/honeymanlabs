import * as Haptics from 'expo-haptics'

function swallow<T>(p: Promise<T>) {
  void p.catch(() => {})
}

export function fireSelection() {
  swallow(Haptics.selectionAsync())
}

export function fireLightImpact() {
  swallow(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light))
}

export function fireWarningNotification() {
  swallow(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning))
}
