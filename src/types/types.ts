export type CategoryType = 'lists'

export type CategoryContentType = 'Movie'

export type CategoryKind = 'regular'

export type Category = {
  type: CategoryType
  id: string
  numerical_id: number
  category: string
  short_name: string
  content_type: CategoryContentType
  is_b2b: boolean
  wktv_code: null
  only_coupon: boolean
  is_recommendation: boolean
  name: string
  additional_images: {}
  kind: CategoryKind
  contents: {
    data: string[]
  }
}

export type MovieType = 'movies'

export type MovieClassificationType = 'classifications'

export type MovieClassification = {
  type: MovieClassificationType
  id: string
  numerical_id: number
  name: string
  age: number
  adult: boolean
  description: string
  default: boolean
}

export type MovieImages = {
  artwork: string
  standard_artwork: string
  ribbons: []
  snapshot: string
  has_sponsored_snapshot: boolean
}

export type MovieRating = {
  average: number
  scale: number
}

export type Movie = {
  type: MovieType
  id: string
  numerical_id: number
  title: string
  short_plot: string
  year: number
  duration: number
  label: string
  classification: MovieClassification
  images: MovieImages
  rating: MovieRating
  plot: string
}

export type Streaming = {}
