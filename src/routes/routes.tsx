import { Children } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage.tsx';
import Layout from '../components/layout/Layout.tsx';

export const router = [
  {
    path: '/', 
    element: <Layout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      }
    ]
  }
]