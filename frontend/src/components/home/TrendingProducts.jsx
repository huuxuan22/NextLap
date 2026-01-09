import React from 'react';
import { Link } from 'react-router-dom';

const trendingProducts = [
    {
        id: 1,
        name: 'MacBook Air M3',
        price: 27990000,
        originalPrice: 32990000,
        discount: 15,
        soldCount: 234,
        tag: 'Best Seller',
        rating: 4.9
    },
    {
        id: 2,
        name: 'ASUS Vivobook 15',
        price: 15990000,
        originalPrice: 18990000,
        discount: 16,
        soldCount: 189,
        tag: 'Hot Deal',
        rating: 4.7
    },
    {
        id: 3,
        name: 'Lenovo IdeaPad Gaming 3',
        price: 22990000,
        originalPrice: 25990000,
        discount: 12,
        soldCount: 156,
        tag: 'Gaming',
        rating: 4.8
    },
    {
        id: 4,
        name: 'HP Pavilion 15',
        price: 18990000,
        originalPrice: 21990000,
        discount: 14,
        soldCount: 142,
        tag: 'Văn phòng',
        rating: 4.6
    },
    {
        id: 5,
        name: 'Acer Nitro 5',
        price: 24990000,
        originalPrice: 28990000,
        discount: 14,
        soldCount: 128,
        tag: 'Hot',
        rating: 4.8
    }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                    ★
                </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>
    );
};

const TrendingCard = ({ product, rank }) => {
    return (
        <Link
            to={`/products/${product.id}`}
            className="flex items-center gap-4 p-4 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:translate-y-[-2px] group"
            style={{
                backgroundColor: '#1F2937',
                borderRadius: '4px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Highlight border effect */}
            <div className="absolute inset-0 border border-transparent group-hover:border-gray-600 transition-colors duration-300 pointer-events-none"></div>

            {/* Rank */}
            <div
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center font-bold text-sm"
                style={{
                    backgroundColor: rank <= 3 ? '#22C55E' : '#374151',
                    color: '#F9FAFB',
                    borderRadius: '2px',
                    position: 'relative'
                }}
            >
                {rank}
                {rank <= 3 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2">
                        <div className="absolute inset-0 bg-green-400 animate-ping rounded-full opacity-75"></div>
                        <div className="absolute inset-0 bg-green-500 rounded-full"></div>
                    </div>
                )}
            </div>

            {/* Product Image Placeholder */}
            <div
                className="flex-shrink-0 w-14 h-14 flex items-center justify-center"
                style={{
                    backgroundColor: '#374151',
                    borderRadius: '4px',
                    border: '1px solid #4B5563'
                }}
            >
                <div className="text-sm font-medium text-gray-400">
                    {product.name.split(' ')[0].substring(0, 3)}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                        <h4
                            className="font-medium truncate group-hover:text-green-400 transition-colors"
                            style={{ color: '#F9FAFB' }}
                        >
                            {product.name}
                        </h4>
                        <span
                            className="px-2 py-0.5 text-xs font-medium whitespace-nowrap"
                            style={{
                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                color: '#22C55E',
                                borderRadius: '2px'
                            }}
                        >
                            -{product.discount}%
                        </span>
                    </div>
                </div>

                {/* Rating */}
                <div className="mb-2">
                    <RatingStars rating={product.rating} />
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-3 mb-1">
                    <span
                        className="font-bold text-lg"
                        style={{ color: '#22C55E' }}
                    >
                        {formatPrice(product.price)}
                    </span>
                    <span
                        className="text-sm"
                        style={{ color: '#6B7280' }}
                    >
                        <span className="line-through">{formatPrice(product.originalPrice)}</span>
                    </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 text-xs">
                    <span style={{ color: '#9CA3AF' }}>
                        Đã bán {product.soldCount}
                    </span>
                    <span style={{ color: '#9CA3AF' }}>•</span>
                    <span style={{ color: '#9CA3AF' }}>
                        48 lượt đánh giá
                    </span>
                </div>
            </div>

            {/* Tag */}
            <div className="flex flex-col items-end gap-2">
                <span
                    className="px-3 py-1 text-xs font-medium tracking-wide"
                    style={{
                        backgroundColor: '#374151',
                        color: '#D1D5DB',
                        borderRadius: '2px'
                    }}
                >
                    {product.tag}
                </span>
                <div
                    className="text-xs"
                    style={{ color: product.soldCount > 200 ? '#EF4444' : '#6B7280' }}
                >
                    {product.soldCount > 200 ? 'Rất hot' : 'Đang hot'}
                </div>
            </div>
        </Link>
    );
};

const TrendingProducts = () => {
    return (
        <section
            className="mb-20 px-4"
            style={{ backgroundColor: '#111827' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10 pt-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6" style={{ backgroundColor: '#22C55E' }}></div>
                            <h2
                                className="text-2xl font-light tracking-wider uppercase"
                                style={{ color: '#F9FAFB' }}
                            >
                                Sản Phẩm Xu Hướng
                            </h2>
                        </div>
                        <p
                            className="text-sm font-light tracking-wide"
                            style={{ color: '#9CA3AF' }}
                        >
                            Những sản phẩm được ưa chuộng nhất tuần qua
                        </p>
                    </div>

                    <Link
                        to="/products?sort=bestseller"
                        className="group flex items-center gap-2 px-6 py-2.5 border border-gray-700 hover:border-green-500 transition-all duration-300"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#F9FAFB',
                            borderRadius: '2px'
                        }}
                    >
                        <span className="text-sm font-medium group-hover:text-green-400 transition-colors">
                            XEM TẤT CẢ
                        </span>
                        <svg
                            className="w-4 h-4 group-hover:text-green-400 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pb-12">
                    {trendingProducts.map((product, index) => (
                        <TrendingCard key={product.id} product={product} rank={index + 1} />
                    ))}
                </div>

                {/* Decorative line */}
                <div className="pt-8">
                    <div className="h-px" style={{
                        background: 'linear-gradient(90deg, transparent, #374151, transparent)'
                    }}></div>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;