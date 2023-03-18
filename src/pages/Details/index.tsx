import { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Grid, Image, Rating, Placeholder } from 'semantic-ui-react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '../../redux/store'

import styles from './styles.module.scss'
import {
  fetchMovieById,
  fetchMovieStreamingById,
} from '../../redux/slices/movieDetails'
import { Movie } from '../../types/types'
import { TrailerModal } from '../../components/TralierModal'

type TrailerModal = {
  isOpen?: boolean
  props?: any
  setIsOpen?: () => void
  setIsClose?: () => void
}

export const MovieDetails = () => {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const f = () => {
      dispatch(fetchMovieById(params.id))
    }

    f()
  }, [])

  return <MovieDetailsPure />
}

export const MovieDetailsPure = () => {
  const [trailerModal, setTrailerModal] = useState<TrailerModal>({
    isOpen: false,
    props: {},
  })

  const params = useParams()
  const navigate = useNavigate()
  const movieDetails = useSelector<RootState, Movie>(
    (state) => state.movieDetails.movie.data
  )
  const isMovieLoading = useSelector<RootState, boolean>(
    (state) => state.movieDetails.movie.loading
  )
  const isMovieStreamingLoading = useSelector<RootState, boolean>(
    (state) => state.movieDetails.streaming.loading
  )
  const dispatch = useDispatch<AppDispatch>()

  const onOpenTrailerPopup = useCallback(async () => {
    const streaming = await dispatch(fetchMovieStreamingById(params.id))
    // @todo better typing
    setTrailerModal({
      isOpen: true,
      props: { url: streaming.payload.stream_infos[0].url },
    })
  }, [params.id])

  const isLoaded = isMovieLoading === false

  return (
    <div
      className={styles.Content}
      data-testid={`movie-details-${isLoaded ? movieDetails.id : 'loading'}`}
    >
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            {isLoaded ? (
              <Image
                src={movieDetails.images.artwork}
                className={styles.CardImage}
              />
            ) : (
              <Placeholder>
                <Placeholder.Image rectangular />
              </Placeholder>
            )}
          </Grid.Column>
          <Grid.Column width={13}>
            <div className={styles.CardTop}>
              {isLoaded ? (
                <>
                  <div className={styles.Title} data-testid="movie-title">
                    {movieDetails.title}{' '}
                    <span data-testid="movie-year">({movieDetails.year})</span>
                  </div>
                  <Rating
                    data-testid="movie-rating"
                    icon="star"
                    defaultRating={movieDetails.rating.average}
                    maxRating={movieDetails.rating.scale}
                  />
                </>
              ) : (
                <Placeholder>
                  <Placeholder.Header>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              )}
            </div>

            <div className={styles.CardBottom}>
              {isLoaded ? (
                <span data-testid="movie-description">{movieDetails.plot}</span>
              ) : (
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              )}
            </div>
            <div className={styles.CardActions}>
              <Button onClick={() => navigate('/')} color="black">
                Back
              </Button>

              <Button
                data-testid="movie-trailer-button"
                loading={isMovieStreamingLoading}
                onClick={onOpenTrailerPopup}
                color="red"
              >
                View the trailer
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <TrailerModal
        open={trailerModal.isOpen}
        onOpen={() => setTrailerModal({ isOpen: true })}
        onClose={() => setTrailerModal({ isOpen: false })}
        {...trailerModal.props}
      />
    </div>
  )
}
