import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/**
 * MainLayout - Standard layout with header, content area, and footer
 * Used for public pages like Home and Products
 */
const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#111827' }}>
            {/* Header */}
            <header
                className="sticky top-0 z-50 border-b"
                style={{
                    backgroundColor: '#1F2937',
                    borderColor: '#374151'
                }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-2xl font-bold" style={{ color: '#22C55E' }}>
                            NextLap
                        </Link>
                        <nav className="flex items-center gap-6">
                            <Link
                                to="/"
                                className="transition-colors hover:underline"
                                style={{ color: '#F9FAFB' }}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="transition-colors hover:underline"
                                style={{ color: '#F9FAFB' }}
                            >
                                Products
                            </Link>
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg transition-colors"
                                style={{
                                    backgroundColor: '#22C55E',
                                    color: '#F9FAFB'
                                }}
                            >
                                Login
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer
                className="border-t mt-auto"
                style={{
                    backgroundColor: '#1F2937',
                    borderColor: '#374151'
                }}
            >
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center" style={{ color: '#9CA3AF' }}>
                        © 2024 NextLap. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

