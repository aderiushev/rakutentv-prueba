import { schema } from 'normalizr'

export const movieSchema = new schema.Entity('movies')

export const categorySchema = new schema.Entity('categories', {
  contents: {
    data: [movieSchema],
  },
})
