import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 403 Forbidden Page Component
 * Reusable error page for unauthorized access
 */
const Forbidden403 = ({ imageUrl }) => {
    const navigate = useNavigate();

    // Default illustration if no imageUrl provided
    const defaultImageUrl = '/403_bg.png';
    const illustrationUrl = imageUrl || defaultImageUrl;

    const handleBackToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh', width: '100%' }}>
            {/* Background Image - Full Screen */}
            <img
                src={illustrationUrl}
                alt="403 Forbidden Background"
                className="fixed top-0 left-0 z-0"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    minWidth: '100%',
                    minHeight: '100%',
                }}
            />

            {/* Dark Overlay */}
            <div
                className="fixed inset-0 z-[1]"
                style={{
                    backgroundColor: 'rgba(17, 24, 39, 0.85)',
                    width: '100vw',
                    height: '100vh',
                }}
            />

            {/* Content Card */}
            <div className="relative z-[2] w-full max-w-[450px] mx-4">
                <div
                    className="rounded-xl backdrop-blur-md border p-8 md:p-10 shadow-2xl"
                    style={{
                        backgroundColor: 'rgba(31, 41, 55, 0.3)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                >
                    {/* Title */}
                    <h1
                        className="text-6xl md:text-7xl font-bold mb-2 text-center"
                        style={{ color: '#F9FAFB' }}
                    >
                        403
                    </h1>

                    {/* Subtitle */}
                    <h2
                        className="text-3xl md:text-4xl font-semibold mb-4 text-center"
                        style={{ color: '#F9FAFB' }}
                    >
                        Forbidden
                    </h2>

                    {/* Description */}
                    <p
                        className="text-base md:text-lg mb-8 text-center max-w-md mx-auto"
                        style={{ color: '#F9FAFB' }}
                    >
                        You don't have permission to access this resource.
                        Please contact your administrator if you believe this is an error.
                    </p>

                    {/* Back to Login Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleBackToLogin}
                            className="px-6 py-3 font-semibold rounded-lg shadow-md transform transition-all duration-200 ease-in-out hover:scale-105"
                            style={{
                                backgroundColor: '#22C55E',
                                color: '#111827',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.filter = 'brightness(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.filter = 'brightness(1)';
                            }}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forbidden403;
