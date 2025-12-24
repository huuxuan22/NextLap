import React from 'react';

/**
 * Dashboard - Admin dashboard page (protected route)
 */
const Dashboard = () => {
    return (
        <div>
            <h1
                className="text-3xl font-bold mb-6"
                style={{ color: '#F9FAFB' }}
            >
                Dashboard
            </h1>
            <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: '#1F2937' }}
            >
                <p style={{ color: '#9CA3AF' }}>
                    Welcome to the admin dashboard. This is a protected route.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;

