import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/style.css'

import App from './App.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import ShowDetail from './components/ShowDetail'
import FavoritesPage from './components/FavoritesPage'
import { FavoritesProvider } from './context/FavoritesContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/show/:id',
    element: <ShowDetail />,
  },
  {
    path: '/favorites',
    element: <FavoritesPage/>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  </StrictMode>,
)
