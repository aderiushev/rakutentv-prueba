import React from 'react'
import { screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

import { MovieDetailsPure } from '../src/pages/Details'
import { renderWithProviders } from '../src/utils/test-utils'
import { movieDetails as movieDetailsMock } from './../__mocks__/movie'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('Movie Details', () => {
  test('should have the loading state', async () => {
    renderWithProviders(<MovieDetailsPure />)

    expect(screen.getByTestId('movie-details-loading')).toBeInTheDocument()
  })

  test('should have a movie displayed', async () => {
    renderWithProviders(<MovieDetailsPure />, {
      preloadedState: {
        movieDetails: movieDetailsMock,
      },
    })

    expect(screen.getByTestId('movie-details-love-marilyn')).toBeInTheDocument()
    expect(
      within(screen.getByTestId('movie-details-love-marilyn')).getByTestId(
        'movie-title'
      )
    ).not.toBeEmptyDOMElement()
    expect(
      within(screen.getByTestId('movie-details-love-marilyn')).getByTestId(
        'movie-year'
      )
    ).not.toBeEmptyDOMElement()
    expect(
      within(screen.getByTestId('movie-details-love-marilyn')).getByTestId(
        'movie-description'
      )
    ).not.toBeEmptyDOMElement()
    expect(
      within(screen.getByTestId('movie-details-love-marilyn')).getByTestId(
        'movie-rating'
      )
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('movie-details-love-marilyn')).getByTestId(
        'movie-trailer-button'
      )
    ).toBeInTheDocument()
  })
})
