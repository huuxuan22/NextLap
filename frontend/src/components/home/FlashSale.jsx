import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const flashSaleProducts = [
    {
        id: 1,
        name: 'MacBook Pro 13" M2 Chip - 16GB RAM 512GB SSD 2023',
        price: 29990000,
        originalPrice: 35990000,
        discount: 17,
        stock: 10,
        sold: 7,
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        category: 'Apple',
        specs: 'M2 Chip • 13-inch Retina • 16GB RAM • 512GB SSD'
    },
    {
        id: 2,
        name: 'Dell Inspiron 15 - Core i7 1360P • RTX 4050 6GB',
        price: 12990000,
        originalPrice: 16990000,
        discount: 24,
        stock: 15,
        sold: 12,
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=684&q=80',
        category: 'Gaming',
        specs: 'i7-1360P • RTX 4050 6GB • 16GB RAM • 1TB SSD'
    },
    {
        id: 3,
        name: 'Lenovo Legion 5 Pro - Core i9 13900HX • RTX 4070 8GB',
        price: 28990000,
        originalPrice: 34990000,
        discount: 17,
        stock: 8,
        sold: 5,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        category: 'Gaming',
        specs: 'i9-13900HX • RTX 4070 8GB • 32GB RAM • 1TB NVMe'
    },
    {
        id: 4,
        name: 'HP Envy x360 Convertible - OLED Touch • Core i7',
        price: 21990000,
        originalPrice: 27990000,
        discount: 21,
        stock: 12,
        sold: 9,
        image: 'https://images.unsplash.com/photo-1546054450-4c6b6d8df698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        category: 'Premium',
        specs: 'i7-1360P • OLED Touch • 16GB RAM • 512GB SSD'
    },
    {
        id: 5,
        name: 'Asus ROG Zephyrus G14 - Ryzen 9 • RTX 4060',
        price: 34990000,
        originalPrice: 39990000,
        discount: 13,
        stock: 6,
        sold: 4,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=1468&q=80',
        category: 'Gaming',
        specs: 'Ryzen 9 7940HS • RTX 4060 • 32GB RAM • 1TB SSD'
    },
    {
        id: 6,
        name: 'Microsoft Surface Laptop 5 - Core i7 • 16GB',
        price: 32990000,
        originalPrice: 37990000,
        discount: 13,
        stock: 9,
        sold: 6,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80',
        category: 'Premium',
        specs: 'i7-1255U • 16GB RAM • 512GB SSD • Touch Screen'
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
                className="w-14 h-14 flex items-center justify-center relative overflow-hidden"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(34, 197, 94, 0.3)'
                }}
            >
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent opacity-20"></div>
                <div
                    className="text-2xl font-bold tracking-wider"
                    style={{
                        color: '#22C55E',
                        textShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
                    }}
                >
                    {String(value).padStart(2, '0')}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#22C55E] to-transparent"></div>
            </div>
            <span
                className="text-xs mt-2 font-medium tracking-wider uppercase block"
                style={{ color: '#9CA3AF' }}
            >
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex items-center gap-2">
            <TimeBox value={timeLeft.hours} label="Giờ" />
            <div
                className="text-2xl font-bold mx-1 mt-4"
                style={{
                    color: '#22C55E',
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.4)'
                }}
            >
                :
            </div>
            <TimeBox value={timeLeft.minutes} label="Phút" />
            <div
                className="text-2xl font-bold mx-1 mt-4"
                style={{
                    color: '#22C55E',
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.4)'
                }}
            >
                :
            </div>
            <TimeBox value={timeLeft.seconds} label="Giây" />
        </div>
    );
};

const FlashSaleCard = ({ product }) => {
    const stockPercent = ((product.stock - product.sold) / product.stock) * 100;
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Link
            to={`/products/${product.id}`}
            className="block group relative overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] flex-shrink-0"
            style={{
                backgroundColor: '#1F2937',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                width: '320px',
                height: '480px'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Discount Badge */}
            <div className="absolute top-4 left-4 z-30">
                <div
                    className="px-3 py-1.5 text-sm font-bold tracking-wider shadow-lg"
                    style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.95)',
                        color: '#F9FAFB'
                    }}
                >
                    -{product.discount}%
                </div>
            </div>

            {/* Product Image Container */}
            <div className="relative h-56 overflow-hidden bg-gray-900">
                {/* Hình ảnh sản phẩm */}
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${isHovering ? 'scale-110' : 'scale-100'}`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80';
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937] via-transparent to-transparent opacity-70"></div>

                {/* Image Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#22C55E] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isHovering ? 'opacity-10' : 'opacity-0'}`}></div>
            </div>

            <div className="p-5 flex flex-col h-[calc(480px-224px)]">
                {/* Category */}
                <div className="mb-2">
                    <span
                        className="inline-block px-2 py-1 text-xs font-medium"
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            color: '#22C55E',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}
                    >
                        {product.category}
                    </span>
                </div>

                {/* Product Name */}
                <h4
                    className="text-lg font-bold mb-2 line-clamp-2 h-14 leading-tight group-hover:text-[#22C55E] transition-colors duration-300"
                    style={{ color: '#F9FAFB' }}
                >
                    {product.name}
                </h4>

                {/* Product Specs */}
                <p className="text-sm mb-3 line-clamp-2 h-10" style={{ color: '#9CA3AF' }}>
                    {product.specs}
                </p>

                {/* Stock Info */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs" style={{ color: '#9CA3AF' }}>
                            Đã bán: {product.sold}/{product.stock}
                        </span>
                        <span className="text-xs font-bold" style={{ color: '#22C55E' }}>
                            Còn {product.stock - product.sold} sản phẩm
                        </span>
                    </div>
                    <div className="relative h-2 overflow-hidden"
                        style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}>
                        <div
                            className="absolute inset-y-0 left-0 h-full transition-all duration-700"
                            style={{
                                width: `${100 - stockPercent}%`,
                                background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.9) 0%, rgba(34, 197, 94, 0.9) 100%)'
                            }}
                        />
                    </div>
                </div>

                {/* Price Section */}
                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span
                            className="text-xl font-bold tracking-tight"
                            style={{ color: '#22C55E' }}
                        >
                            {formatPrice(product.price)}
                        </span>
                        <span
                            className="text-sm line-through opacity-60"
                            style={{ color: '#9CA3AF' }}
                        >
                            {formatPrice(product.originalPrice)}
                        </span>
                    </div>
                    <div className="text-xs" style={{ color: '#9CA3AF' }}>
                        Tiết kiệm {formatPrice(product.originalPrice - product.price)}
                    </div>
                </div>
            </div>
        </Link>
    );
};

const FlashSale = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const scrollContainerRef = useRef(null);
    const productsPerView = 4;

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prev => {
            const maxIndex = Math.ceil(flashSaleProducts.length / productsPerView) - 1;
            return prev >= maxIndex ? 0 : prev + 1;
        });
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(prev => {
            const maxIndex = Math.ceil(flashSaleProducts.length / productsPerView) - 1;
            return prev <= 0 ? maxIndex : prev - 1;
        });
        setTimeout(() => setIsAnimating(false), 500);
    };

    const scrollToIndex = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollWidth = container.scrollWidth;
            const itemWidth = scrollWidth / flashSaleProducts.length;
            const scrollPosition = currentIndex * itemWidth * productsPerView;

            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    return (
        <section className="mb-20">
            <div
                className="p-8"
                style={{
                    backgroundColor: '#111827'
                }}
            >
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8 pb-6"
                    style={{ borderBottom: '1px solid rgba(55, 65, 81, 0.5)' }}>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 flex items-center justify-center"
                                style={{
                                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                    border: '2px solid rgba(34, 197, 94, 0.3)'
                                }}>
                                <span className="text-xl">⚡</span>
                            </div>
                        </div>
                        <div>
                            <h2
                                className="text-2xl font-bold tracking-tight mb-1"
                                style={{ color: '#F9FAFB' }}
                            >
                                FLASH SALE
                            </h2>
                            <p className="text-sm" style={{ color: '#9CA3AF' }}>
                                Ưu đãi đặc biệt chỉ trong thời gian giới hạn
                            </p>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex flex-col gap-2">
                        <span
                            className="text-sm font-medium tracking-wider uppercase text-center lg:text-right"
                            style={{ color: '#9CA3AF' }}
                        >
                            KẾT THÚC TRONG
                        </span>
                        <CountdownTimer />
                    </div>
                </div>

                {/* Products Slider Container */}
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#22C55E]"
                        style={{
                            backgroundColor: '#1F2937',
                            border: '2px solid rgba(34, 197, 94, 0.3)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                        disabled={isAnimating}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: '#22C55E' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#22C55E]"
                        style={{
                            backgroundColor: '#1F2937',
                            border: '2px solid rgba(34, 197, 94, 0.3)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                        disabled={isAnimating}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: '#22C55E' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Products Slider */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-5 overflow-x-hidden py-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}
                    >
                        {flashSaleProducts.map((product) => (
                            <FlashSaleCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center items-center gap-2 mt-6">
                        {Array.from({ length: Math.ceil(flashSaleProducts.length / productsPerView) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`w-2 h-2 transition-all duration-300 ${index === currentIndex ? 'w-8 bg-[#22C55E]' : 'bg-gray-600 hover:bg-gray-500'}`}
                                disabled={isAnimating}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Button */}
                <div className="mt-8 text-center">
                    <Link
                        to="/flash-sale"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 hover:gap-3 group"
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#22C55E',
                            border: '1px solid rgba(34, 197, 94, 0.3)'
                        }}
                    >
                        <span>XEM TẤT CẢ ƯU ĐÃI</span>
                        <svg
                            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: '#22C55E' }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FlashSale;