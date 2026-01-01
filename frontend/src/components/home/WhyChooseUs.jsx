import React from 'react';

/**
 * WhyChooseUs - Section lý do chọn NextLap
 */

const features = [
    {
        id: 1,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Sản phẩm chính hãng',
        description: 'Cam kết 100% sản phẩm chính hãng, bảo hành toàn quốc'
    },
    {
        id: 2,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Giao hàng nhanh chóng',
        description: 'Giao hàng trong 24h tại nội thành, 2-3 ngày toàn quốc'
    },
    {
        id: 3,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Giá cả cạnh tranh',
        description: 'Cam kết giá tốt nhất, hoàn tiền nếu tìm được giá rẻ hơn'
    },
    {
        id: 4,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        title: 'Hỗ trợ 24/7',
        description: 'Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ mọi lúc'
    }
];

const FeatureCard = ({ feature }) => {
    return (
        <div
            className="p-6 rounded-2xl text-center transition-all hover:scale-105"
            style={{ backgroundColor: '#1F2937' }}
        >
            <div
                className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4"
                style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    color: '#22C55E'
                }}
            >
                {feature.icon}
            </div>

            <h3
                className="text-lg font-semibold mb-2"
                style={{ color: '#F9FAFB' }}
            >
                {feature.title}
            </h3>

            <p
                className="text-sm"
                style={{ color: '#9CA3AF' }}
            >
                {feature.description}
            </p>
        </div>
    );
};

const WhyChooseUs = () => {
    return (
        <section className="mb-16">
            <div className="text-center mb-10">
                <h2
                    className="text-3xl font-bold mb-3"
                    style={{ color: '#F9FAFB' }}
                >
                    Tại sao chọn NextLap?
                </h2>
                <p style={{ color: '#9CA3AF' }}>
                    Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
