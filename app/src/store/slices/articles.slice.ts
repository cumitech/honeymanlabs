import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UpdateMode } from '../../models/common/update-mode.enum'
import {
  articleToHiveFeedPost,
  type ArticleWithStats,
} from '../../models/views/article-hive-feed.model'
import {
  initialResourceListState,
  type ResourceListState,
} from '../../models/store/resource-list.model'
import { emptyHiveFeedPost, type HiveFeedPost } from '../../models/views/hive.model'
import { articlesApi } from '../../api/resources/articles.api'

export type IArticlesState = ResourceListState<HiveFeedPost>

export const initialState: IArticlesState = initialResourceListState(emptyHiveFeedPost)

function rejectedMessage(payload: unknown): string {
  return typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
}

export const fetchArticlesAsync = createAsyncThunk<HiveFeedPost[], void>(
  'articles/fetchArticlesAsync',
  async (_, thunkApi) => {
    try {
      const rows = await articlesApi.list({ _start: 0, _end: 20, status: 'published', lang: 'en' })
      return (rows as ArticleWithStats[]).map(articleToHiveFeedPost)
    } catch (e: unknown) {
      return thunkApi.rejectWithValue(e instanceof Error ? e.message : 'Request failed')
    }
  },
)

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchArticlesRequest: state => {
      state.isLoading = true
    },
    fetchArticlesSuccess: (state, action: PayloadAction<HiveFeedPost[]>) => {
      state.isLoading = false
      state.initialFetch = false
      state.items = action.payload
      state.errors = ''
    },
    fetchArticlesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.errors = action.payload
    },
    editArticleSuccess: (state, action: PayloadAction<HiveFeedPost>) => {
      state.items = state.items.map(a => (a.id === action.payload.id ? action.payload : a))
      state.updateMode = UpdateMode.NONE
    },
    addArticleSuccess: (state, action: PayloadAction<HiveFeedPost>) => {
      state.items = [...state.items, action.payload]
      state.updateMode = UpdateMode.NONE
    },
    setActiveArticle: (state, action: PayloadAction<HiveFeedPost>) => {
      state.active = action.payload
    },
    setArticleUpdateMode: (state, action: PayloadAction<UpdateMode>) => {
      state.updateMode = action.payload
    },
    setArticlesSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload
    },
    resetArticles: () => initialResourceListState<HiveFeedPost>(emptyHiveFeedPost),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchArticlesAsync.pending, state => {
        state.isLoading = true
      })
      .addCase(fetchArticlesAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.items = action.payload
        state.errors = ''
      })
      .addCase(fetchArticlesAsync.rejected, (state, action) => {
        state.isLoading = false
        state.initialFetch = false
        state.errors = rejectedMessage(action.payload)
        state.items = []
      })
  },
})

export const {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesError,
  editArticleSuccess,
  addArticleSuccess,
  setActiveArticle,
  setArticleUpdateMode,
  setArticlesSearching,
  resetArticles,
} = articlesSlice.actions

export const articlesReducer = articlesSlice.reducer
