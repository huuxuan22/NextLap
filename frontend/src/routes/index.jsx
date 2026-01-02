import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import PrivateRoute from './PrivateRoute';
import Forbidden403 from '../pages/Forbidden403';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Contact = lazy(() => import('../pages/Contact'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Introduce = lazy(() => import('../pages/Introduce'));

const LoadingFallback = () => (
    <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#111827' }}
    >
        <p style={{ color: '#F9FAFB' }}>Loading...</p>
    </div>
);

export const router = createBrowserRouter([
    {
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
            {
                path: 'about',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Introduce />
                    </Suspense>
                ),
            }
            , {
                path: 'contact',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Contact />
                    </Suspense>
                ),
            },
        ],
    },
    {
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
            {
                path: 'register',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: '403',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <Forbidden403 />
                    </Suspense>
                ),
            },
        ],
    },
    {
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
        path: '*',
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <NotFound />
            </Suspense>
        ),
    },
]);

