import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'

import './styles/style.css';

import App from './App.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ShowDetail from './components/ShowDetail';
import FavoritesPage from './components/FavoritesPage';
import Layout from './components/Layout.jsx';
import Footer from './components/Footer.jsx';

import { ThemeProvider } from './context/ThemeContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/show/:id',
    element: <Layout><ShowDetail /></Layout>,
  },
  {
    path: '/favorites',
    element: <Layout><FavoritesPage/></Layout>,
  },
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
