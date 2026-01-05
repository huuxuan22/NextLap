import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <section className="text-center">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#F9FAFB' }}>
                Sẵn Sàng Sở Hữu Laptop Mơ Ước?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#9CA3AF' }}>
                Khám phá ngay bộ sưu tập laptop của chúng tôi và trải nghiệm sự khác biệt!
            </p>
            <Link
                to="/products"
                className="inline-block px-10 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg"
                style={{
                    backgroundColor: '#22C55E',
                    color: '#F9FAFB',
                    boxShadow: '0 4px 6px rgba(34, 197, 94, 0.3)'
                }}
            >
                Khám Phá Ngay
            </Link>
        </section>
    );
};

export default CallToAction;
