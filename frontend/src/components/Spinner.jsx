
import React from 'react';

/**
 * Component Spinner - Nút xoay tròn loading
 * @param {string} size - Kích thước: 'small', 'medium', 'large', 'xl'
 * @param {string} color - Màu sắc: 'white', 'blue', 'red', 'gray', 'green', 'purple'
 * @param {string} className - Class CSS tùy chỉnh thêm
 */
export default function Spinner({ size = 'medium', color = 'white', className = '' }) {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        medium: 'w-8 h-8 border-3',
        large: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4'
    };

    const colorClasses = {
        white: 'border-white border-t-transparent',
        blue: 'border-blue-600 border-t-transparent',
        red: 'border-red-600 border-t-transparent',
        gray: 'border-gray-600 border-t-transparent',
        green: 'border-green-600 border-t-transparent',
        purple: 'border-purple-600 border-t-transparent'
    };

    return (
        <div
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Đang tải...</span>
        </div>
    );
};