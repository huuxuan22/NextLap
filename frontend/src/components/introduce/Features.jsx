import React from 'react';

const Features = () => {
    const features = [
        {
            icon: '🚀',
            title: 'Hiệu Suất Cao',
            description: 'Bộ xử lý mạnh mẽ, RAM lớn và card đồ họa tiên tiến cho mọi nhu cầu từ công việc đến giải trí.'
        },
        {
            icon: '💎',
            title: 'Thiết Kế Tinh Tế',
            description: 'Mỏng nhẹ, hiện đại, dễ dàng mang theo mọi nơi, phù hợp cho cuộc sống bận rộn.'
        },
        {
            icon: '💰',
            title: 'Giá Cả Phải Chăng',
            description: 'Chất lượng cao với giá cạnh tranh, kèm theo chính sách bảo hành và hỗ trợ tận tình.'
        }
    ];

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#F9FAFB' }}>
                Tại Sao Chọn Chúng Tôi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-lg transform hover:scale-105 transition-transform duration-300"
                        style={{
                            backgroundColor: '#1F2937',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-4" style={{ color: '#22C55E' }}>
                            {feature.title}
                        </h3>
                        <p style={{ color: '#F9FAFB' }}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
