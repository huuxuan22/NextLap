import React from 'react';

const AboutSection = () => {
    return (
        <section className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-8" style={{ color: '#F9FAFB' }}>
                Về NextLap
            </h2>
            <p className="text-lg mb-8" style={{ color: '#9CA3AF' }}>
                NextLap là thương hiệu laptop nổi tiếng với sứ mệnh mang công nghệ hiện đại đến mọi người.
                Chúng tôi cam kết cung cấp sản phẩm chất lượng, dịch vụ tận tâm và trải nghiệm mua sắm tuyệt vời.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: '#22C55E' }}>
                        Sứ Mệnh
                    </h3>
                    <p style={{ color: '#F9FAFB' }}>
                        Đem công nghệ tiên tiến đến mọi nhà, giúp con người kết nối và sáng tạo.
                    </p>
                </div>
                <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: '#22C55E' }}>
                        Tầm Nhìn
                    </h3>
                    <p style={{ color: '#F9FAFB' }}>
                        Trở thành thương hiệu laptop hàng đầu thế giới về chất lượng và đổi mới.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
