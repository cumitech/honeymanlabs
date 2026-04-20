import React from 'react'
import { getFeaturedCatalogHeroSlides } from '../../data/catalog'
import { PromoHeroCard, type PromoHeroCardProps } from './PromoHeroCard'

export type CatalogPromoHeroCardProps = Omit<PromoHeroCardProps, 'imageSlides' | 'imageSource'>

export function CatalogPromoHeroCard(props: CatalogPromoHeroCardProps) {
  const imageSlides = React.useMemo(() => getFeaturedCatalogHeroSlides(), [])
  return <PromoHeroCard {...props} imageSlides={imageSlides} />
}
