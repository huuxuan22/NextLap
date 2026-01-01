import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CategorySection - Hiển thị danh mục sản phẩm
 */

const categories = [
    {
        id: 1,
        name: 'Laptop Gaming',
        icon: '🎮',
        description: 'Hiệu năng cao cho game thủ',
        color: '#EF4444',
        link: '/products?category=gaming'
    },
    {
        id: 2,
        name: 'Laptop Văn phòng',
        icon: '💼',
        description: 'Mỏng nhẹ, pin trâu',
        color: '#3B82F6',
        link: '/products?category=office'
    },
    {
        id: 3,
        name: 'Laptop Đồ họa',
        icon: '🎨',
        description: 'Màn hình sắc nét',
        color: '#8B5CF6',
        link: '/products?category=graphics'
    },
    {
        id: 4,
        name: 'Laptop Học sinh',
        icon: '📚',
        description: 'Giá tốt, chất lượng',
        color: '#22C55E',
        link: '/products?category=student'
    }
];

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={category.link}
            className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: '#1F2937' }}
        >
            {/* Accent border */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                    border: `2px solid ${category.color}`,
                    boxShadow: `0 0 20px ${category.color}30`
                }}
            />

            {/* Icon */}
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: `${category.color}20` }}
            >
                {category.icon}
            </div>

            {/* Text */}
            <h3
                className="text-lg font-semibold mb-2"
                style={{ color: '#F9FAFB' }}
            >
                {category.name}
            </h3>
            <p
                className="text-sm"
                style={{ color: '#9CA3AF' }}
            >
                {category.description}
            </p>

            {/* Arrow */}
            <div
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0"
                style={{ color: category.color }}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </Link>
    );
};

const CategorySection = () => {
    return (
        <section className="mb-16">
            <div className="text-center mb-10">
                <h2
                    className="text-3xl font-bold mb-3"
                    style={{ color: '#F9FAFB' }}
                >
                    Danh mục sản phẩm
                </h2>
                <p style={{ color: '#9CA3AF' }}>
                    Chọn loại laptop phù hợp với nhu cầu của bạn
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
