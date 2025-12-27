import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Introduce - Laptop introduction page
 */
const Introduce = () => {
    return (
        <div style={{ backgroundColor: '#111827', minHeight: '100vh', color: '#F9FAFB' }}>
            {/* Hero Section with Background */}
            <section
                className="relative py-20 text-center text-white"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-6xl font-bold mb-6 animate-pulse">
                        NextLap - Thương Hiệu Laptop Nổi Tiếng
                    </h1>
                    <p className="text-xl mb-8 opacity-90">
                        Hơn 10 năm kinh nghiệm trong lĩnh vực công nghệ, NextLap tự hào là thương hiệu laptop hàng đầu,
                        mang đến những sản phẩm chất lượng cao với công nghệ tiên tiến nhất.
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
                        Khám Phá Bộ Sưu Tập
                    </Link>
                </div>
            </section>

            <div className="max-w-6xl mx-auto py-16 px-4">
                {/* About Section */}
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
                            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#22C55E' }}>Sứ Mệnh</h3>
                            <p style={{ color: '#F9FAFB' }}>
                                Đem công nghệ tiên tiến đến mọi nhà, giúp con người kết nối và sáng tạo.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                            <h3 className="text-2xl font-semibold mb-4" style={{ color: '#22C55E' }}>Tầm Nhìn</h3>
                            <p style={{ color: '#F9FAFB' }}>
                                Trở thành thương hiệu laptop hàng đầu thế giới về chất lượng và đổi mới.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="mb-16 text-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="p-4">
                            <h3 className="text-4xl font-bold" style={{ color: '#22C55E' }}>500+</h3>
                            <p style={{ color: '#9CA3AF' }}>Khách Hàng Hài Lòng</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold" style={{ color: '#22C55E' }}>1000+</h3>
                            <p style={{ color: '#9CA3AF' }}>Sản Phẩm Đã Bán</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold" style={{ color: '#22C55E' }}>50+</h3>
                            <p style={{ color: '#9CA3AF' }}>Mẫu Laptop Mới</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold" style={{ color: '#22C55E' }}>24/7</h3>
                            <p style={{ color: '#9CA3AF' }}>Hỗ Trợ Khách Hàng</p>
                        </div>
                    </div>
                </section>

                {/* Development Journey */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#F9FAFB' }}>
                        Hành Trình Phát Triển
                    </h2>
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-500"></div>
                        <div className="space-y-12">
                            <div className="flex items-center">
                                <div className="flex-1 text-right pr-8">
                                    <h3 className="text-xl font-semibold" style={{ color: '#22C55E' }}>2015 - Khởi Nghiệp</h3>
                                    <p style={{ color: '#F9FAFB' }}>NextLap được thành lập với sứ mệnh mang laptop chất lượng đến người dùng Việt Nam.</p>
                                </div>
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1 pr-8"></div>
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="flex-1 pl-8">
                                    <h3 className="text-xl font-semibold" style={{ color: '#22C55E' }}>2018 - Mở Rộng Thị Trường</h3>
                                    <p style={{ color: '#F9FAFB' }}>Ra mắt dòng laptop gaming và văn phòng, mở rộng thị trường Đông Nam Á.</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1 text-right pr-8">
                                    <h3 className="text-xl font-semibold" style={{ color: '#22C55E' }}>2020 - Công Nghệ Tiên Tiến</h3>
                                    <p style={{ color: '#F9FAFB' }}>Tích hợp AI và công nghệ mới nhất vào sản phẩm, giành nhiều giải thưởng.</p>
                                </div>
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="flex-1 pl-8"></div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1 pr-8"></div>
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div className="flex-1 pl-8">
                                    <h3 className="text-xl font-semibold" style={{ color: '#22C55E' }}>2025 - Tương Lai Sáng Lạn</h3>
                                    <p style={{ color: '#F9FAFB' }}>Tiếp tục đổi mới với laptop thông minh, hướng tới thị trường toàn cầu.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#F9FAFB' }}>
                        Tại Sao Chọn Chúng Tôi?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg transform hover:scale-105 transition-transform duration-300" style={{ backgroundColor: '#1F2937', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#22C55E' }}>Hiệu Suất Cao</h3>
                            <p style={{ color: '#F9FAFB' }}>
                                Bộ xử lý mạnh mẽ, RAM lớn và card đồ họa tiên tiến cho mọi nhu cầu từ công việc đến giải trí.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg transform hover:scale-105 transition-transform duration-300" style={{ backgroundColor: '#1F2937', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#22C55E' }}>Thiết Kế Tinh Tế</h3>
                            <p style={{ color: '#F9FAFB' }}>
                                Mỏng nhẹ, hiện đại, dễ dàng mang theo mọi nơi, phù hợp cho cuộc sống bận rộn.
                            </p>
                        </div>
                        <div className="p-6 rounded-lg transform hover:scale-105 transition-transform duration-300" style={{ backgroundColor: '#1F2937', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: '#22C55E' }}>Giá Cả Phải Chăng</h3>
                            <p style={{ color: '#F9FAFB' }}>
                                Chất lượng cao với giá cạnh tranh, kèm theo chính sách bảo hành và hỗ trợ tận tình.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Image Gallery */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#F9FAFB' }}>
                        Bộ Sưu Tập Laptop Nổi Bật
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Laptop gaming"
                                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold" style={{ color: '#F9FAFB' }}>Laptop Gaming</h3>
                            <p style={{ color: '#9CA3AF' }}>Hiệu suất cao cho game thủ chuyên nghiệp</p>
                        </div>
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Laptop business"
                                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold" style={{ color: '#F9FAFB' }}>Laptop Văn Phòng</h3>
                            <p style={{ color: '#9CA3AF' }}>Tinh tế và chuyên nghiệp cho doanh nhân</p>
                        </div>
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Laptop ultrabook"
                                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold" style={{ color: '#F9FAFB' }}>Ultrabook</h3>
                            <p style={{ color: '#9CA3AF' }}>Mỏng nhẹ, di động cao cho người dùng hiện đại</p>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#F9FAFB' }}>
                        Khách Hàng Nói Gì Về Chúng Tôi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                            <p className="italic mb-4" style={{ color: '#F9FAFB' }}>
                                "Laptop từ NextLap thực sự tuyệt vời! Hiệu suất vượt trội và thiết kế đẹp mắt."
                            </p>
                            <p className="font-semibold" style={{ color: '#22C55E' }}>- Nguyễn Văn A</p>
                        </div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                            <p className="italic mb-4" style={{ color: '#F9FAFB' }}>
                                "Giá cả hợp lý, dịch vụ khách hàng tận tâm. Tôi sẽ mua lại!"
                            </p>
                            <p className="font-semibold" style={{ color: '#22C55E' }}>- Trần Thị B</p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
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
            </div>
        </div>
    );
};

export default Introduce;
