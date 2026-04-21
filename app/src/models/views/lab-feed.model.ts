import type { ImageSourcePropType } from 'react-native'
import type { LabTest } from '../domain/lab-test.model'
import { toRemoteImageSource } from '../../utils'

export type LabFeedHeroVariant = 'sunrise' | 'amber' | 'meadow'

export type LabRecentTest = {
  id: string
  variety: string
  batchCode: string
  dateLabel: string
  cardTitle?: string
  hashtags?: string[]
  origin?: string
  status?: string
  heroVariant?: LabFeedHeroVariant
  heroImage?: ImageSourcePropType
}

export const emptyLabRecentTest: LabRecentTest = {
  id: '',
  variety: '',
  batchCode: '',
  dateLabel: '',
}

type LabTestWithImage = LabTest & {
  image?: string | null
  image_url?: string | null
  cover_image?: string | null
}

export function toLabRecentTest(test: LabTestWithImage): LabRecentTest {
  return {
    id: test.id,
    variety: test.test_type || 'Honey',
    batchCode: test.batch_id || test.sample_code,
    dateLabel: test.submitted_at
      ? new Date(test.submitted_at).toLocaleDateString('en-US')
      : 'Unknown date',
    cardTitle: `${test.test_type} analysis`,
    hashtags: ['#HoneyManLab', `#${test.status}`],
    origin: test.requested_by,
    status: test.status,
    heroVariant: 'amber',
    heroImage: toRemoteImageSource(test.cover_image ?? test.image_url ?? test.image),
  }
}
