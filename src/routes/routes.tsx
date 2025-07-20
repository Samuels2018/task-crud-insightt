import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage.tsx';
import Layout from '../components/layout/Layout.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginPage } from '../pages/LoginPage.tsx';
import { useNavigate } from 'react-router-dom';
import type React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return <>{children}</>
}

export const router = [
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    
    path: '/', 
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <DashboardPage />
      }
    ]
  }
]