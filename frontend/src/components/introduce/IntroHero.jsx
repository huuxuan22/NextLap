import React from 'react';
import { Link } from 'react-router-dom';

const IntroHero = () => {
    return (
        <section
            className="relative py-20 text-center text-white"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-6xl font-bold mb-6 animate-pulse">
                    NextLap - Thương Hiệu Laptop Nổi Tiếng
                </h1>
                <p className="text-xl mb-8 opacity-90">
                    Hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ, NextLap tự hào là thương hiệu laptop hàng đầu,
                    mang đến những sản phẩm chất lượng cao với công nghệ tiên tiến nhất.
                </p>
                <Link
                    to="/products"
                    className="inline-block px-10 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg"
                    style={{
                        backgroundColor: '#22C55E',
                        color: '#F9FAFB',
                        boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)'
                    }}
                >
                    Khám Phá Bộ Sưu Tập
                </Link>
            </div>
        </section>
    );
};

export default IntroHero;
