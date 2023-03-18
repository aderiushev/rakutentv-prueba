import {
  createAsyncThunk,
  createSlice,
  EntityState,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { normalize } from 'normalizr'
import * as api from '../../api/categories'
import { categorySchema } from '../../utils/schemas'
import { Category, Movie } from '../../types/types'

interface CategoryState extends EntityState<Category> {
  loading: boolean | null
  error: string | null
}

const categoryAdapter = createEntityAdapter<Category>()

const categoryInitialState: CategoryState = categoryAdapter.getInitialState({
  loading: null,
  error: null,
})

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id: string) => {
    const response = await api.fetchCategory(id)
    const normalizedData = normalize(response.data.data, categorySchema)

    return normalizedData.entities
  }
)

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (categoryIds: string[] = []) => {
    const responses = await Promise.all(categoryIds.map(api.fetchCategory))
    const responseDataList = responses.map((item) => item.data.data)
    const normalizedData = normalize(responseDataList, [categorySchema])

    return normalizedData.entities
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: categoryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false
        categoryAdapter.upsertMany(state, action.payload.categories)
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong.'
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        categoryAdapter.upsertMany(state, action.payload.categories)
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Something went wrong.'
      })
  },
})

export const categoryReducer = categorySlice.reducer

export const categoriesSelectors = categoryAdapter.getSelectors(
  (state: { categories: CategoryState }) => state.categories
)
