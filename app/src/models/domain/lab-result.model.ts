import type { ContentLanguage } from '../common/content-language.model'

export type LabResult = {
  id: string
  lang: ContentLanguage
  lab_test_id: string
  parameter: string
  value: number
  unit: string
  createdAt?: string
  updatedAt?: string
}

type LabResultWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type LabResultCreateBody = Omit<LabResult, LabResultWriteOmit>
export type LabResultUpdateBody = Partial<Omit<LabResult, LabResultWriteOmit>>
