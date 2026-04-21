import { useCallback } from 'react'
import type { UpdateMode } from '../../models/common/update-mode.enum'
import type { HiveFeedPost } from '../../models/views/hive.model'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  addArticleSuccess,
  editArticleSuccess,
  fetchArticlesAsync,
  fetchArticlesError,
  fetchArticlesRequest,
  fetchArticlesSuccess,
  resetArticles,
  setActiveArticle,
  setArticleUpdateMode,
  setArticlesSearching,
} from '../../store/slices/articles.slice'
import { useInitialFetch } from '../shared/initial-fetch.hook'

export const useArticles = () => {
  const dispatch = useAppDispatch()
  const {
    items: articles,
    errors,
    active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
  } = useAppSelector(s => s.articles)

  const loadArticles = useCallback(() => {
    if (!initialFetch) return
    void dispatch(fetchArticlesAsync(undefined))
  }, [dispatch, initialFetch])

  useInitialFetch(loadArticles, initialFetch)

  const requestFetch = useCallback(() => dispatch(fetchArticlesRequest(undefined)), [dispatch])
  const applyFetchSuccess = useCallback(
    (payload: HiveFeedPost[]) => dispatch(fetchArticlesSuccess(payload)),
    [dispatch],
  )
  const applyFetchError = useCallback(
    (message: string) => dispatch(fetchArticlesError(message)),
    [dispatch],
  )
  const replaceArticle = useCallback(
    (row: HiveFeedPost) => dispatch(editArticleSuccess(row)),
    [dispatch],
  )
  const appendArticle = useCallback(
    (row: HiveFeedPost) => dispatch(addArticleSuccess(row)),
    [dispatch],
  )
  const selectArticle = useCallback(
    (row: HiveFeedPost) => dispatch(setActiveArticle(row)),
    [dispatch],
  )
  const changeUpdateMode = useCallback(
    (mode: UpdateMode) => dispatch(setArticleUpdateMode(mode)),
    [dispatch],
  )
  const setSearching = useCallback(
    (value: boolean) => dispatch(setArticlesSearching(value)),
    [dispatch],
  )
  const clearArticles = useCallback(() => dispatch(resetArticles(undefined)), [dispatch])

  return {
    articles,
    errors,
    activeArticle: active,
    isLoading,
    isSearching,
    initialFetch,
    updateMode,
    error: errors || null,
    loading: initialFetch || isLoading,
    loadArticles,
    requestFetch,
    applyFetchSuccess,
    applyFetchError,
    replaceArticle,
    appendArticle,
    selectArticle,
    changeUpdateMode,
    setSearching,
    clearArticles,
  }
}
