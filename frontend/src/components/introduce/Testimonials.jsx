import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            quote: 'Laptop từ NextLap thực sự tuyệt vời! Hiệu suất vượt trội và thiết kế đẹp mắt.',
            author: 'Nguyễn Văn A'
        },
        {
            quote: 'Giá cả hợp lý, dịch vụ khách hàng tận tâm. Tôi sẽ mua lại!',
            author: 'Trần Thị B'
        }
    ];

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#F9FAFB' }}>
                Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="p-6 rounded-lg"
                        style={{ backgroundColor: '#1F2937' }}
                    >
                        <p className="italic mb-4" style={{ color: '#F9FAFB' }}>
                            "{testimonial.quote}"
                        </p>
                        <p className="font-semibold" style={{ color: '#22C55E' }}>
                            - {testimonial.author}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
