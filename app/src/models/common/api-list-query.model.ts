import type { ContentLanguage } from './content-language.model'

/** Query string params for paginated / filtered collection endpoints. */
export type ApiListQuery = {
  _start?: number
  _end?: number
  lang?: ContentLanguage
  status?: string
  [key: string]: string | number | undefined
}
