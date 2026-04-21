import React from 'react'
import { MapUnavailableNotice } from './apiaries-map-block.fallback'
import type { ApiariesMapBlockProps } from './apiaries-map-block.types'

export function ApiariesMapBlock(_props: ApiariesMapBlockProps) {
  return <MapUnavailableNotice message="Map view is only available in the mobile app." />
}
