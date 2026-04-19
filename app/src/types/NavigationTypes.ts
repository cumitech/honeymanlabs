import type { NavigatorScreenParams } from '@react-navigation/native'

export type LabStackParamList = {
  LabHome: undefined
  LabBatchDetail: { batchId: string }
  LabQrScanner: undefined
}

export type MainTabParamList = {
  Home: undefined
  Shop: undefined
  Education: undefined
  LabTests: NavigatorScreenParams<LabStackParamList> | undefined
}

export type RootDrawerParamList = {
  Main: NavigatorScreenParams<MainTabParamList> | undefined
  Account: undefined
  Traceability: undefined
  Apiaries: undefined
  Settings: undefined
  Support: undefined
}
