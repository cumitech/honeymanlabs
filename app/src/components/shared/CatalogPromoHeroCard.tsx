import React from 'react'
import { CONTENT_IMAGE_HONEY_JAR, CONTENT_IMAGE_IBRAHIM_APIARY } from '../../constants'
import { PromoHeroCard, type PromoHeroCardProps } from './PromoHeroCard'

export type CatalogPromoHeroCardProps = Omit<PromoHeroCardProps, 'imageSlides' | 'imageSource'>

export function CatalogPromoHeroCard(props: CatalogPromoHeroCardProps) {
  const imageSlides = React.useMemo(
    () => [CONTENT_IMAGE_HONEY_JAR, CONTENT_IMAGE_IBRAHIM_APIARY],
    [],
  )
  return <PromoHeroCard {...props} imageSlides={imageSlides} />
}
