import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Placeholder } from 'semantic-ui-react'
import _ from 'lodash'
import { Header, Grid } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../utils/constants'
import { AppDispatch, RootState } from '../../redux/store'
import {
  categoriesSelectors,
  fetchCategories,
} from '../../redux/slices/categories'

import styles from './styles.module.scss'
import { Gallery } from '../../components/Gallery'
import { moviesSelectors } from '../../redux/slices/movies'

export const MoviesList = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(
      fetchCategories([
        CATEGORIES.FREE_BEST_SELECTION,
        CATEGORIES.NEW,
        CATEGORIES.FREE_ACTIONS,
        CATEGORIES.FREE_DRAMA,
        CATEGORIES.FREE_FAMILTY,
        CATEGORIES.FREE_TRILLERS,
        CATEGORIES.RAKUTEN_ORIGINALS,
      ])
    )
  }, [])

  return <MoviesListPure />
}

export const MoviesListPure = () => {
  const navigate = useNavigate()
  const categories = useSelector(categoriesSelectors.selectAll)
  const movies = useSelector(moviesSelectors.selectEntities)
  const isCategoriesLoading = useSelector<RootState, boolean>(
    (state) => state.categories.loading
  )

  const sortedCategories = useMemo(() => {
    return _.orderBy(categories, ['id'], ['ASC'])
  }, [categories])

  const isCategoriesLoaded = isCategoriesLoading === false

  return (
    <div className={styles.Content}>
      {isCategoriesLoaded ? (
        <>
          {sortedCategories.map((category, index) => (
            <div
              className={styles.Category}
              key={index}
              data-testid={`category-${category.id}`}
            >
              <div className={styles.CategoryTop}>
                <Header as="h2">{category.name}</Header>
              </div>

              <Gallery
                key={index}
                items={category.contents.data.map((id) => movies[id])}
                className={styles.Gallery}
                onSelect={(id) => navigate(`/movies/${id}`)}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(8).fill(null).map((item, index) => (
            <div
              className={styles.Category}
              key={index}
              data-testid={`category-loading-${index}`}
            >
              <div className={styles.CategoryTop}>
                <Placeholder className={styles.PlaceholderHeader}>
                  <Placeholder.Header>
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </div>
              <Grid padded>
                <Grid.Row>
                  {new Array(4).fill(null).map((item, index) => (
                    <Grid.Column width={4} key={index}>
                      <Placeholder>
                        <Placeholder.Image rectangular />
                      </Placeholder>
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
