import React from 'react';

/**
 * RatingStars - Component hiển thị đánh giá sao
 * @param {number} rating - Số sao (0-5)
 * @param {string} size - Kích thước ('sm', 'md', 'lg')
 * @param {boolean} showValue - Hiển thị giá trị số
 */
const RatingStars = ({ rating, size = 'md', showValue = false }) => {
    const sizeMap = {
        sm: '16px',
        md: '20px',
        lg: '24px'
    };

    const fontSize = sizeMap[size] || sizeMap.md;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(
                <span key={i} style={{ color: '#22C55E', fontSize }}>★</span>
            );
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(
                <span key={i} style={{ color: '#22C55E', fontSize }}>★</span>
            );
        } else {
            stars.push(
                <span key={i} style={{ color: '#4B5563', fontSize }}>★</span>
            );
        }
    }

    return (
        <div className="flex items-center">
            <div className="flex">{stars}</div>
            {showValue && (
                <span className="ml-2" style={{ color: '#9CA3AF', fontSize: '14px' }}>
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default RatingStars;
