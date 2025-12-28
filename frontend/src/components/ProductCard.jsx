import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

/**
 * ProductCard - Component card hiển thị sản phẩm
 */
const ProductCard = ({ product }) => {
    // Format giá tiền VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    return (
        <Link
            to={`/products/${product.id}`}
            className="block rounded-lg overflow-hidden transition-all hover:scale-105"
            style={{
                backgroundColor: '#1F2937',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            {/* Product Image */}
            <div
                className="w-full h-48 bg-gray-700 flex items-center justify-center"
                style={{ backgroundColor: '#374151' }}
            >
                <div style={{ color: '#9CA3AF', fontSize: '14px' }}>
                    {product.name}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: '#F9FAFB' }}
                >
                    {product.name}
                </h2>

                <p
                    className="text-sm mb-3"
                    style={{ color: '#9CA3AF' }}
                >
                    {product.specs}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3">
                    <RatingStars rating={product.rating} size="sm" />
                    <span className="ml-2 text-sm" style={{ color: '#9CA3AF' }}>
                        ({product.rating})
                    </span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                    <p
                        className="text-2xl font-bold"
                        style={{ color: '#22C55E' }}
                    >
                        {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center gap-2">
                        {/* Heart Icon - Wishlist */}
                        <button
                            className="p-2 rounded-lg transition-all hover:opacity-80"
                            style={{
                                backgroundColor: '#374151',
                                color: '#F9FAFB'
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Add to wishlist logic here
                            }}
                            title="Yêu thích"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        {/* Cart Icon - Add to cart */}
                        <button
                            className="p-2 rounded-lg transition-all hover:opacity-80"
                            style={{
                                backgroundColor: '#22C55E',
                                color: '#111827'
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic here
                            }}
                            title="Thêm vào giỏ hàng"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
