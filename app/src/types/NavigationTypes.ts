import type { NavigatorScreenParams } from '@react-navigation/native'

export type LabStackParamList = {
  LabHome: undefined
  LabBatchDetail: { batchId: string }
  LabQrScanner: undefined
}

export type StoreStackParamList = {
  StoreCatalog: undefined
  ProductDetail: { productId: string }
}

export type MainTabParamList = {
  Home: undefined
  Store: NavigatorScreenParams<StoreStackParamList> | undefined
  Education: undefined
  LabTests: NavigatorScreenParams<LabStackParamList> | undefined
}

export type RootDrawerParamList = {
  Main: NavigatorScreenParams<MainTabParamList> | undefined
  Account: undefined
  Cart: undefined
  Traceability: undefined
  Apiaries: undefined
  Settings: undefined
  Support: undefined
}
