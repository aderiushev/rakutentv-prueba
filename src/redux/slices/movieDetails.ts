import {
  createAsyncThunk,
  createSlice,
  EntityState,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { Streaming, Movie } from '../../types/types'
import * as api from '../../api/movieDetails'

interface MovieDetailsState {
  movie: {
    data: null | Movie
    loading: boolean
    error: string | null
  }
  streaming: {
    data: null | Streaming
    loading: boolean
    error: string | null
  }
}

const initialState: MovieDetailsState = {
  movie: {
    data: null,
    loading: null,
    error: null,
  },
  streaming: {
    data: null,
    loading: null,
    error: null,
  },
}

export const fetchMovieById = createAsyncThunk(
  'movie/fetchById',
  async (id: string) => {
    const response = await api.fetchMovie(id)

    return response.data.data
  }
)

export const fetchMovieStreamingById = createAsyncThunk(
  'movie/fetchStreamingById',
  async (id: string) => {
    const response = await api.fetchMovieStreaming(id)

    return response.data.data
  }
)

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.movie.loading = true
        state.movie.error = null
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.movie.loading = false
        state.movie.data = action.payload
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.movie.loading = false
        state.movie.error = action.error.message || 'Something went wrong.'
      })
      .addCase(fetchMovieStreamingById.pending, (state) => {
        state.streaming.loading = true
        state.streaming.error = null
      })
      .addCase(fetchMovieStreamingById.fulfilled, (state, action) => {
        state.streaming.loading = false
        state.streaming.data = action.payload
      })
      .addCase(fetchMovieStreamingById.rejected, (state, action) => {
        state.streaming.loading = false
        state.streaming.error = action.error.message || 'Something went wrong.'
      })
  },
})

export const movieDetailsReducer = movieDetailsSlice.reducer
