import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';

/**
 * PrivateRoute - Component to protect routes that require authentication
 * Checks if user is logged in via useAuth hook
 * Redirects to /login if not authenticated
 * Renders children if authenticated
 */
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: '#111827' }}
            >
                <p style={{ color: '#F9FAFB' }}>Loading...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content if authenticated
    return children;
};

export default PrivateRoute;

