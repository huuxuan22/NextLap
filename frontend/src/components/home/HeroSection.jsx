import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden rounded-2xl mb-12">
            {/* Background gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #1F2937 0%, #111827 50%, #0F172A 100%)'
                }}
            />

            {/* Decorative circles */}
            <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
                style={{ backgroundColor: '#22C55E' }}
            />
            <div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
                style={{ backgroundColor: '#3B82F6' }}
            />

            {/* Content */}
            <div className="relative z-10 px-8 py-20 md:py-28 text-center md:text-left md:flex md:items-center md:justify-between">
                <div className="md:w-1/2">
                    <span
                        className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.2)',
                            color: '#22C55E'
                        }}
                    >
                        🔥 Khuyến mãi đặc biệt
                    </span>

                    <h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        style={{ color: '#F9FAFB' }}
                    >
                        Chào mừng đến với{' '}
                        <span style={{ color: '#22C55E' }}>NextLap</span>
                    </h1>

                    <p
                        className="text-lg md:text-xl mb-8 max-w-lg"
                        style={{ color: '#9CA3AF' }}
                    >
                        Khám phá bộ sưu tập laptop công nghệ mới nhất với giá tốt nhất thị trường
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-lg"
                            style={{
                                backgroundColor: '#22C55E',
                                color: '#F9FAFB'
                            }}
                        >
                            <span>Mua sắm ngay</span>
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>

                        <Link
                            to="/about"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-80"
                            style={{
                                backgroundColor: 'transparent',
                                color: '#F9FAFB',
                                border: '2px solid #374151'
                            }}
                        >
                            Tìm hiểu thêm
                        </Link>
                    </div>
                </div>

                {/* Hero Image/Illustration */}
                <div className="hidden md:block md:w-1/2">
                    <div
                        className="relative w-full h-80 flex items-center justify-center"
                    >
                        <div
                            className="w-72 h-48 rounded-xl transform rotate-6 shadow-2xl"
                            style={{ backgroundColor: '#374151' }}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-20 h-20" style={{ color: '#22C55E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
