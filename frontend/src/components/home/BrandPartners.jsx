import React from 'react';
import { useNavigate } from 'react-router-dom';

const brands = [
    {
        id: 1,
        name: 'Apple',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
    },
    {
        id: 2,
        name: 'Dell',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg'
    },
    {
        id: 3,
        name: 'ASUS',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg'
    },
    {
        id: 4,
        name: 'Lenovo',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg'
    },
    {
        id: 5,
        name: 'HP',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg'
    },
    {
        id: 6,
        name: 'MSI',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/MSI_Logo.svg'
    },
    {
        id: 7,
        name: 'Acer',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg'
    },
    {
        id: 8,
        name: 'Microsoft',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
    }
];

const BrandPartners = () => {
    const navigate = useNavigate();

    const handleBrandClick = (brand) => {
        navigate(`/products?brand=${encodeURIComponent(brand.name.toLowerCase())}`);
    };

    const handleKeyPress = (e, brand) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrandClick(brand);
        }
    };

    return (
        <section className="mb-16 relative">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

            <div className="relative">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2
                        className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                        style={{
                            animation: 'fadeIn 1s ease-out',
                        }}
                    >
                        Đối tác thương hiệu
                    </h2>
                    <p className="text-lg" style={{ color: '#9CA3AF' }}>
                        Hợp tác với các thương hiệu laptop hàng đầu thế giới
                    </p>
                </div>

                {/* Brand container with enhanced styling */}
                <div className="relative">
                    {/* Animated border gradient */}
                    <div
                        className="absolute -inset-1 rounded-3xl opacity-30 blur-xl"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
                            animation: 'gradientRotate 8s ease infinite',
                        }}
                    />

                    <div
                        className="relative rounded-3xl p-10 backdrop-blur-sm"
                        style={{
                            backgroundColor: 'rgba(31, 41, 55, 0.6)',
                            border: '1px solid rgba(75, 85, 99, 0.3)',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
                            {brands.map((brand, index) => (
                                <div
                                    key={brand.id}
                                    className="flex flex-col items-center gap-4 p-5 rounded-2xl transition-all duration-500 cursor-pointer group relative"
                                    onClick={() => handleBrandClick(brand)}
                                    onKeyPress={(e) => handleKeyPress(e, brand)}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Xem sản phẩm ${brand.name}`}
                                    style={{
                                        backgroundColor: 'rgba(17, 24, 39, 0.6)',
                                        border: '1px solid rgba(75, 85, 99, 0.3)',
                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-12px) scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(96, 165, 250, 0.4)';
                                        e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.6)';
                                        e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                                        e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.3)';
                                        e.currentTarget.style.backgroundColor = 'rgba(17, 24, 39, 0.6)';
                                    }}
                                >
                                    {/* Logo container with glow effect */}
                                    <div className="relative w-24 h-24 flex items-center justify-center">
                                        {/* Glow effect */}
                                        <div
                                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
                                                filter: 'blur(15px)',
                                            }}
                                        />

                                        {/* Logo wrapper */}
                                        <div className="relative w-20 h-20 flex items-center justify-center">
                                            <img
                                                src={brand.logoUrl}
                                                alt={`${brand.name} logo`}
                                                className="w-full h-full object-contain transition-all duration-500"
                                                style={{
                                                    filter: 'brightness(0) invert(1)',
                                                    opacity: 0.7,
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'block';
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.filter = 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(96, 165, 250, 0.8))';
                                                    e.target.style.opacity = '1';
                                                    e.target.style.transform = 'scale(1.1) rotate(5deg)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.filter = 'brightness(0) invert(1)';
                                                    e.target.style.opacity = '0.7';
                                                    e.target.style.transform = 'scale(1) rotate(0deg)';
                                                }}
                                            />
                                            <span
                                                className="text-3xl font-bold hidden"
                                                style={{ color: '#9CA3AF' }}
                                            >
                                                {brand.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Brand name with gradient effect */}
                                    <span
                                        className="text-sm font-semibold text-center transition-all duration-300"
                                        style={{
                                            color: '#D1D5DB',
                                            letterSpacing: '0.5px',
                                        }}
                                    >
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes gradientRotate {
                    0% {
                        filter: hue-rotate(0deg);
                    }
                    100% {
                        filter: hue-rotate(360deg);
                    }
                }

                /* Smooth scroll behavior */
                * {
                    scroll-behavior: smooth;
                }
            `}</style>
        </section>
    );
};

export default BrandPartners;