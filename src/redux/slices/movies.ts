import { createSlice, EntityState, createEntityAdapter } from '@reduxjs/toolkit'
import { Movie } from '../../types/types'
import { fetchCategories, fetchCategoryById } from './categories'

interface MovieState extends EntityState<Movie> {
  loading: boolean
  error: string | null
}
const movieAdapter = createEntityAdapter<Movie>()

const movieInitialState: MovieState = movieAdapter.getInitialState({
  loading: null,
  error: null,
})

const movieSlice = createSlice({
  name: 'movies',
  initialState: movieInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false
        movieAdapter.upsertMany(state, action.payload.movies)
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        movieAdapter.upsertMany(state, action.payload.movies)
      })
  },
})

export const movieReducer = movieSlice.reducer

export const moviesSelectors = movieAdapter.getSelectors(
  (state: { movies: MovieState }) => state.movies
)
