import React from 'react';
import {
    HeroSection,
    CategorySection,
    FeaturedProducts,
    PromoBanner,
    WhyChooseUs,
    Newsletter,
    BrandPartners,
    CustomerReviews,
    LatestNews,
    TrendingProducts,
    FlashSale
} from '../components/home';

const Home = () => {
    return (
        <div>
            <HeroSection />

            <div className="max-w-9xl mx-auto px-4 py-8">
                {/* Hero Banner */}

                {/* Flash Sale */}
                <FlashSale />

                {/* Danh mục sản phẩm */}
                <CategorySection />

                {/* Banner khuyến mãi */}
                <PromoBanner />

                {/* Xu hướng mua sắm */}
                <TrendingProducts />

                {/* Sản phẩm nổi bật */}
                <FeaturedProducts />

                {/* Đối tác thương hiệu */}
                <BrandPartners />

                {/* Tại sao chọn chúng tôi */}
                <WhyChooseUs />

                {/* Đánh giá khách hàng */}
                <CustomerReviews />

                {/* Tin tức & Bài viết */}
                <LatestNews />

                {/* Đăng ký nhận tin */}
                <Newsletter />
            </div>
        </div>
    );
};

export default Home;

