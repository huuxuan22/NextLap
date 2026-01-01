import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PromoBanner - Banner khuyến mãi
 */
const PromoBanner = () => {
    return (
        <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Banner 1 - Sale */}
                <Link
                    to="/products?sale=true"
                    className="group relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all hover:scale-[1.02]"
                    style={{
                        background: 'linear-gradient(135deg, #991B1B 0%, #7F1D1D 100%)',
                        minHeight: '200px'
                    }}
                >
                    <div className="relative z-10">
                        <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                            style={{
                                backgroundColor: '#FEF2F2',
                                color: '#991B1B'
                            }}
                        >
                            HOT DEAL
                        </span>
                        <h3
                            className="text-2xl md:text-3xl font-bold mb-2"
                            style={{ color: '#F9FAFB' }}
                        >
                            Giảm đến 30%
                        </h3>
                        <p
                            className="mb-4"
                            style={{ color: '#FCA5A5' }}
                        >
                            Cho tất cả laptop Gaming
                        </p>
                        <span
                            className="inline-flex items-center text-sm font-medium group-hover:underline"
                            style={{ color: '#F9FAFB' }}
                        >
                            Xem ngay
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>

                    {/* Decorative */}
                    <div
                        className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-20"
                        style={{ backgroundColor: '#FFFFFF' }}
                    />
                </Link>

                {/* Banner 2 - New Arrivals */}
                <Link
                    to="/products?new=true"
                    className="group relative overflow-hidden rounded-2xl p-6 md:p-8 transition-all hover:scale-[1.02]"
                    style={{
                        background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                        minHeight: '200px'
                    }}
                >
                    <div className="relative z-10">
                        <span
                            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                            style={{
                                backgroundColor: '#DBEAFE',
                                color: '#1E40AF'
                            }}
                        >
                            MỚI
                        </span>
                        <h3
                            className="text-2xl md:text-3xl font-bold mb-2"
                            style={{ color: '#F9FAFB' }}
                        >
                            Sản phẩm mới
                        </h3>
                        <p
                            className="mb-4"
                            style={{ color: '#93C5FD' }}
                        >
                            MacBook Pro M3 đã có hàng
                        </p>
                        <span
                            className="inline-flex items-center text-sm font-medium group-hover:underline"
                            style={{ color: '#F9FAFB' }}
                        >
                            Khám phá
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>

                    {/* Decorative */}
                    <div
                        className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full opacity-20"
                        style={{ backgroundColor: '#FFFFFF' }}
                    />
                </Link>
            </div>
        </section>
    );
};

export default PromoBanner;
