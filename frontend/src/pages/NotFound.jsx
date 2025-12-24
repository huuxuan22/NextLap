import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound - 404 error page for unknown routes
 */
const NotFound = () => {
    return (
        <div className="text-center py-16">
            <h1
                className="text-6xl font-bold mb-4"
                style={{ color: '#F9FAFB' }}
            >
                404
            </h1>
            <p
                className="text-xl mb-8"
                style={{ color: '#9CA3AF' }}
            >
                Page not found
            </p>
            <Link
                to="/"
                className="inline-block px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                style={{
                    backgroundColor: '#22C55E',
                    color: '#F9FAFB'
                }}
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;

