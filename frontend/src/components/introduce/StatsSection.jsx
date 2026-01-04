import React from 'react';

const StatsSection = () => {
    const stats = [
        { value: '500+', label: 'Khách Hàng Hài Lòng' },
        { value: '1000+', label: 'Sản Phẩm Đã Bán' },
        { value: '50+', label: 'Mẫu Laptop Mới' },
        { value: '24/7', label: 'Hỗ Trợ Khách Hàng' }
    ];

    return (
        <section className="mb-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="p-4">
                        <h3 className="text-4xl font-bold" style={{ color: '#22C55E' }}>
                            {stat.value}
                        </h3>
                        <p style={{ color: '#9CA3AF' }}>{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
