import React from 'react'
import { screen, within, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { movieStreaming as movieStreamingMock } from './../__mocks__/movie'
import { TrailerModal } from '../src/components/TralierModal'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

jest.mock('react-player/lazy', () => {
  return jest.requireActual('react-player')
})

describe('Movie Trailer', () => {
  test('should have trailer', async () => {
    render(
      <TrailerModal
        open
        onOpen={() => {}}
        onClose={() => {}}
        url={movieStreamingMock.data.stream_infos[0].url}
      />
    )

    expect(
      within(screen.getByTestId('trailer-modal')).getByTestId(
        'trailer-modal-player'
      )
    ).toBeInTheDocument()
    expect(
      within(screen.getByTestId('trailer-modal')).getByTestId(
        'trailer-modal-close-button'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('trailer-modal-player').querySelector('video').src
    ).toBe(movieStreamingMock.data.stream_infos[0].url)
  })
})
