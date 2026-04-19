import type { ContentLanguage } from './content-language'

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
