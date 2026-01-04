import React from 'react';
import {
    IntroHero,
    AboutSection,
    StatsSection,
    Timeline,
    Features,
    Gallery,
    Testimonials,
    CallToAction
} from '../components/introduce';

const Introduce = () => {
    return (
        <div style={{ backgroundColor: '#111827', minHeight: '100vh', color: '#F9FAFB' }}>
            {/* Hero Section */}
            <IntroHero />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto py-16 px-4">
                {/* Về NextLap */}
                <AboutSection />

                {/* Số liệu thống kê */}
                <StatsSection />

                {/* Hành trình phát triển */}
                <Timeline />

                {/* Tại sao chọn chúng tôi */}
                <Features />

                {/* Bộ sưu tập laptop */}
                <Gallery />

                {/* Phản hồi khách hàng */}
                <Testimonials />

                {/* Kêu gọi hành động */}
                <CallToAction />
            </div>
        </div>
    );
};

export default Introduce;
