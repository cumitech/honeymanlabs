import type { Article } from '../domain/article.model'
import type { HiveFeedPost } from './hive.model'
import { toRemoteImageSource } from '../../utils'

export type ArticleWithStats = Article & { likes_count?: number; comments_count?: number }

function resolveArticleImageUrl(article: ArticleWithStats): string | null {
  return article.cover_image ?? article.coverImage ?? article.image_url ?? article.image ?? null
}

export function articleToHiveFeedPost(article: ArticleWithStats): HiveFeedPost {
  return {
    id: article.id,
    cardTitle: article.title,
    hashtags: ['#TheHive', '#Education'],
    authorHandle: '@HoneyMan',
    authorInitial: 'H',
    likesLabel: `${article.likes_count ?? 0} Likes`,
    commentsLabel: `${article.comments_count ?? 0} Comments`,
    image: toRemoteImageSource(resolveArticleImageUrl(article)),
  }
}
