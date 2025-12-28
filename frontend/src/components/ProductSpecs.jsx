import React from 'react';

/**
 * ProductSpecs - Component hiển thị thông số kỹ thuật
 */
const ProductSpecs = ({ features }) => {
    if (!features || features.length === 0) {
        return (
            <div style={{ color: '#9CA3AF' }}>
                Không có thông tin thông số kỹ thuật
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="flex items-start p-3 rounded-lg"
                    style={{ backgroundColor: '#111827' }}
                >
                    <span style={{ color: '#22C55E', marginRight: '8px', flexShrink: 0 }}>✓</span>
                    <span style={{ color: '#F9FAFB' }}>{feature}</span>
                </div>
            ))}
        </div>
    );
};

export default ProductSpecs;
