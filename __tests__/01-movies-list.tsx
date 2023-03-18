import React from 'react'
import { within, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MoviesListPure } from '../src/pages/MoviesList'
import { AppBar } from '../src/components/AppBar'
import { renderWithProviders } from '../src/utils/test-utils'
import { categories as categoriesMock } from './../__mocks__/category'
import { movies as moviesMock } from './../__mocks__/movie'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate,
}))

describe('Movies List', () => {
  test('should have an app bar with options', () => {
    render(<AppBar />)

    expect(screen.getByTestId('app-bar')).toBeInTheDocument()

    expect(
      within(screen.getByTestId('app-bar')).getByText('Inicio')
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('app-bar')).getByText('Tienda')
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('app-bar')).getByText('Gratis')
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('app-bar')).getByText('Canales TV')
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('app-bar')).getByText('Suscripciones')
    ).toBeInTheDocument()
  })

  test('should have the loading state', async () => {
    renderWithProviders(<MoviesListPure />)

    expect(screen.getByTestId('category-loading-0')).toBeInTheDocument()
    expect(screen.getByTestId('category-loading-1')).toBeInTheDocument()
    expect(screen.getByTestId('category-loading-2')).toBeInTheDocument()
  })

  test('should have the categories', async () => {
    renderWithProviders(<MoviesListPure />, {
      preloadedState: {
        categories: categoriesMock,
        movies: moviesMock,
      },
    })

    expect(
      screen.getByTestId('category-gratis-la-mejor-seleccion-de-peliculas')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('category-gratis-peliculas-de-drama')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('category-gratis-peliculas-de-suspense')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('category-gratis-peliculas-de-accion')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('category-tienda-las-peliculas-del-momento')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('category-gratis-peliculas-familiares')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('category-rakuten-originals-movies')
    ).toBeInTheDocument()
  })

  test('should to have the movies under each category', async () => {
    renderWithProviders(<MoviesListPure />, {
      preloadedState: {
        categories: categoriesMock,
        movies: moviesMock,
      },
    })

    expect(
      within(
        screen.getByTestId('category-gratis-la-mejor-seleccion-de-peliculas')
      ).getByTestId('movie-el-valle-oscuro')
    ).toBeInTheDocument()

    // @todo rest categories to cover
  })
})
