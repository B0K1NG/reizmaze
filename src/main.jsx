import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/style.css';

import App from './App.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import ShowDetail from './components/shows/ShowDetail.jsx';
import FavoritesPage from './components/pages/FavoritesPage.jsx';
import Layout from './components/layout/Layout.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>,
  },
  {
    path: '/show/:id',
    element: <Layout><ShowDetail /></Layout>,
  },
  {
    path: '/favorites',
    element: <Layout><FavoritesPage /></Layout>,
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>,
)
