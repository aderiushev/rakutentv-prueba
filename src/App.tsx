import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'

import 'semantic-ui-css/semantic.min.css'

import { Index } from './layouts/Index'
import { MovieDetails } from './pages/Details'
import { MoviesList } from './pages/MoviesList'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    children: [
      {
        path: '/',
        element: <MoviesList />,
      },
      {
        path: '/movies/:id',
        element: <MovieDetails />,
      },
    ],
  },
])

export const App = () => {
  const store = setupStore()

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
