import type { ContentLanguage } from './content-language'

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
