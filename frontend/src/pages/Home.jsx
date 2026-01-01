import React from 'react';
import {
    HeroSection,
    CategorySection,
    FeaturedProducts,
    PromoBanner,
    WhyChooseUs,
    Newsletter
} from '../components/home';

/**
 * Home - Landing page component
 * Trang chủ NextLap với đầy đủ các section
 */
const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Banner */}
            <HeroSection />

            {/* Danh mục sản phẩm */}
            <CategorySection />

            {/* Banner khuyến mãi */}
            <PromoBanner />

            {/* Sản phẩm nổi bật */}
            <FeaturedProducts />

            {/* Tại sao chọn chúng tôi */}
            <WhyChooseUs />

            {/* Đăng ký nhận tin */}
            <Newsletter />
        </div>
    );
};

export default Home;

