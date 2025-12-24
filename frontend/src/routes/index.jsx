import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts - Loaded immediately (no lazy loading needed for layouts)
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';

// Protected Route Component
import PrivateRoute from './PrivateRoute';

// Pages - Lazy loaded for better performance
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * Loading Component - Shown while lazy-loaded components are loading
 */
const LoadingFallback = () => (
    <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#111827' }}
    >
        <p style={{ color: '#F9FAFB' }}>Loading...</p>
    </div>
);

/**
 * Router Configuration
 * Defines all routes, layouts, and route protection
 */
export const router = createBrowserRouter([
    {
        // Main Layout Routes - Public pages with header and footer
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: 'products',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Products />
                    </Suspense>
                ),
            },
            {
                path: 'products/:id',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <ProductDetail />
                    </Suspense>
                ),
            },
        ],
    },
    {
        // Auth Layout Routes - Authentication pages without header/footer
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Login />
                    </Suspense>
                ),
            },
        ],
    },
    {
        // Admin Layout Routes - Protected admin routes with sidebar
        path: '/admin',
        element: (
            <PrivateRoute>
                <AdminLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
        ],
    },
    {
        // 404 Route - Catch all unknown routes
        path: '*',
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <NotFound />
            </Suspense>
        ),
    },
]);

/**
 * Route Structure:
 * 
 * / → Home (MainLayout)
 * /login → Login (AuthLayout)
 * /products → Products (MainLayout)
 * /products/:id → ProductDetail (MainLayout)
 * /admin → Dashboard (AdminLayout, Protected)
 * * → NotFound (no layout)
 */

