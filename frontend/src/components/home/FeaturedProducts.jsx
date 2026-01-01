import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

/**
 * FeaturedProducts - Hiển thị sản phẩm nổi bật
 */

// Mock data - thay thế bằng API call thực tế
const featuredProducts = [
    {
        id: 1,
        name: 'MacBook Pro 14" M3 Pro',
        specs: 'M3 Pro, 18GB RAM, 512GB SSD',
        price: 49990000,
        rating: 4.9,
        image: null
    },
    {
        id: 2,
        name: 'ASUS ROG Strix G16',
        specs: 'Intel i9, RTX 4070, 32GB RAM',
        price: 45990000,
        rating: 4.8,
        image: null
    },
    {
        id: 3,
        name: 'Dell XPS 15',
        specs: 'Intel i7, 16GB RAM, 512GB SSD',
        price: 38990000,
        rating: 4.7,
        image: null
    },
    {
        id: 4,
        name: 'Lenovo ThinkPad X1 Carbon',
        specs: 'Intel i7, 16GB RAM, 512GB SSD',
        price: 35990000,
        rating: 4.6,
        image: null
    }
];

const FeaturedProducts = () => {
    return (
        <section className="mb-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2
                        className="text-3xl font-bold mb-2"
                        style={{ color: '#F9FAFB' }}
                    >
                        Sản phẩm nổi bật
                    </h2>
                    <p style={{ color: '#9CA3AF' }}>
                        Những sản phẩm được yêu thích nhất
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{
                        backgroundColor: '#374151',
                        color: '#F9FAFB'
                    }}
                >
                    <span>Xem tất cả</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Mobile View All Button */}
            <div className="sm:hidden mt-6 text-center">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-80"
                    style={{
                        backgroundColor: '#374151',
                        color: '#F9FAFB'
                    }}
                >
                    <span>Xem tất cả sản phẩm</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProducts;
