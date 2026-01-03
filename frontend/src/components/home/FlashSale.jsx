import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const flashSaleProducts = [
    {
        id: 1,
        name: 'MacBook Pro 13" M2',
        price: 29990000,
        originalPrice: 35990000,
        discount: 17,
        stock: 10,
        sold: 7,
        image: '💻'
    },
    {
        id: 2,
        name: 'Dell Inspiron 15',
        price: 12990000,
        originalPrice: 16990000,
        discount: 24,
        stock: 15,
        sold: 12,
        image: '🖥️'
    },
    {
        id: 3,
        name: 'Lenovo Legion 5',
        price: 28990000,
        originalPrice: 34990000,
        discount: 17,
        stock: 8,
        sold: 5,
        image: '🎮'
    },
    {
        id: 4,
        name: 'HP Envy x360',
        price: 21990000,
        originalPrice: 27990000,
        discount: 21,
        stock: 12,
        sold: 9,
        image: '💼'
    }
];

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 30,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const TimeBox = ({ value, label }) => (
        <div className="text-center">
            <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: '#EF4444', color: '#F9FAFB' }}
            >
                {String(value).padStart(2, '0')}
            </div>
            <span className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{label}</span>
        </div>
    );

    return (
        <div className="flex items-center gap-2">
            <TimeBox value={timeLeft.hours} label="Giờ" />
            <span className="text-xl font-bold" style={{ color: '#EF4444' }}>:</span>
            <TimeBox value={timeLeft.minutes} label="Phút" />
            <span className="text-xl font-bold" style={{ color: '#EF4444' }}>:</span>
            <TimeBox value={timeLeft.seconds} label="Giây" />
        </div>
    );
};

const FlashSaleCard = ({ product }) => {
    const stockPercent = ((product.stock - product.sold) / product.stock) * 100;

    return (
        <Link
            to={`/products/${product.id}`}
            className="block p-4 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ backgroundColor: '#1F2937' }}
        >
            {/* Discount Badge */}
            <div className="relative mb-3">
                <div
                    className="w-full h-32 rounded-xl flex items-center justify-center text-5xl"
                    style={{ backgroundColor: '#374151' }}
                >
                    {product.image}
                </div>
                <span
                    className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold"
                    style={{ backgroundColor: '#EF4444', color: '#F9FAFB' }}
                >
                    -{product.discount}%
                </span>
            </div>

            {/* Product Info */}
            <h4 className="font-semibold mb-2 truncate" style={{ color: '#F9FAFB' }}>
                {product.name}
            </h4>

            <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold" style={{ color: '#EF4444' }}>
                    {formatPrice(product.price)}
                </span>
                <span className="text-sm line-through" style={{ color: '#6B7280' }}>
                    {formatPrice(product.originalPrice)}
                </span>
            </div>

            {/* Stock Progress */}
            <div className="relative h-4 rounded-full overflow-hidden" style={{ backgroundColor: '#374151' }}>
                <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all"
                    style={{
                        width: `${100 - stockPercent}%`,
                        background: 'linear-gradient(90deg, #EF4444, #F97316)'
                    }}
                />
                <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-medium"
                    style={{ color: '#F9FAFB' }}
                >
                    Đã bán {product.sold}/{product.stock}
                </span>
            </div>
        </Link>
    );
};

const FlashSale = () => {
    return (
        <section className="mb-16">
            <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                    background: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #B91C1C 100%)'
                }}
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-3xl">⚡</span>
                            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#F9FAFB' }}>
                                Flash Sale
                            </h2>
                        </div>
                        <span
                            className="px-3 py-1 rounded-full text-sm font-medium animate-pulse"
                            style={{ backgroundColor: '#FBBF24', color: '#1F2937' }}
                        >
                            Đang diễn ra
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm" style={{ color: '#FCA5A5' }}>Kết thúc trong:</span>
                        <CountdownTimer />
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {flashSaleProducts.map((product) => (
                        <FlashSaleCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
