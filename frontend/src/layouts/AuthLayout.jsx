import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * AuthLayout - Minimal layout with only centered content
 * Used for authentication pages (login, register, etc.)
 * No header or footer - clean and focused
 */
const AuthLayout = () => {
    const token = localStorage.getItem("access_token");
    const user_principal = localStorage.getItem("user_principal");

    if (token && user_principal) {
        return <Navigate to="/" replace />;
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ backgroundColor: '#111827' }}
        >
            <Outlet />
        </div>
    );
};

export default AuthLayout;

