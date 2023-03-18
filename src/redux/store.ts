import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { categoryReducer } from './slices/categories'
import { movieReducer } from './slices/movies'
import { movieDetailsReducer } from './slices/movieDetails'
import type { PreloadedState } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  categories: categoryReducer,
  movies: movieReducer,
  movieDetails: movieDetailsReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
