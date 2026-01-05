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
        image: '💻',
        tag: 'Best Seller'
    },
    {
        id: 2,
        name: 'ASUS Vivobook 15',
        price: 15990000,
        originalPrice: 18990000,
        discount: 16,
        soldCount: 189,
        image: '🖥️',
        tag: 'Hot Deal'
    },
    {
        id: 3,
        name: 'Lenovo IdeaPad Gaming 3',
        price: 22990000,
        originalPrice: 25990000,
        discount: 12,
        soldCount: 156,
        image: '🎮',
        tag: 'Gaming'
    },
    {
        id: 4,
        name: 'HP Pavilion 15',
        price: 18990000,
        originalPrice: 21990000,
        discount: 14,
        soldCount: 142,
        image: '💼',
        tag: 'Văn phòng'
    },
    {
        id: 5,
        name: 'Acer Nitro 5',
        price: 24990000,
        originalPrice: 28990000,
        discount: 14,
        soldCount: 128,
        image: '🔥',
        tag: 'Hot'
    }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

const TrendingCard = ({ product, rank }) => {
    return (
        <Link
            to={`/products/${product.id}`}
            className="flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02]"
            style={{ backgroundColor: '#1F2937' }}
        >
            {/* Rank */}
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                    backgroundColor: rank <= 3 ? '#22C55E' : '#374151',
                    color: '#F9FAFB'
                }}
            >
                {rank}
            </div>

            {/* Image */}
            <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl"
                style={{ backgroundColor: '#374151' }}
            >
                {product.image}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate" style={{ color: '#F9FAFB' }}>
                        {product.name}
                    </h4>
                    <span
                        className="px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap"
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}
                    >
                        -{product.discount}%
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-bold" style={{ color: '#22C55E' }}>
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-sm line-through" style={{ color: '#6B7280' }}>
                        {formatPrice(product.originalPrice)}
                    </span>
                </div>

                <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>
                        🔥 Đã bán {product.soldCount}
                    </span>
                </div>
            </div>

            {/* Tag */}
            <span
                className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: '#374151', color: '#D1D5DB' }}
            >
                {product.tag}
            </span>
        </Link>
    );
};

const TrendingProducts = () => {
    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                        🔥 Xu hướng mua sắm
                    </h2>
                    <p style={{ color: '#9CA3AF' }}>
                        Sản phẩm bán chạy nhất tuần này
                    </p>
                </div>

                <Link
                    to="/products?sort=bestseller"
                    className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{ backgroundColor: '#374151', color: '#F9FAFB' }}
                >
                    <span>Xem thêm</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {trendingProducts.map((product, index) => (
                    <TrendingCard key={product.id} product={product} rank={index + 1} />
                ))}
            </div>
        </section>
    );
};

export default TrendingProducts;
