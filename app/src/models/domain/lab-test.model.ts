import type { ContentLanguage } from '../common/content-language.model'

export type LabTest = {
  id: string
  lang: ContentLanguage
  sample_code: string
  batch_id: string
  requested_by: string
  test_type: string
  status: string
  submitted_at: string
  completed_at: string | null
  report_url: string | null
  createdAt?: string
  updatedAt?: string
}

type LabTestWriteOmit = 'id' | 'createdAt' | 'updatedAt'

export type LabTestCreateBody = Omit<LabTest, LabTestWriteOmit>
export type LabTestUpdateBody = Partial<Omit<LabTest, LabTestWriteOmit>>
