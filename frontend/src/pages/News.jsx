
import React, { useState } from 'react';
import { Search, Calendar, User, Tag, TrendingUp, Clock, ChevronRight, Bookmark, Share2, Eye } from 'lucide-react';

const LaptopNewsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', name: 'Tất cả', count: 24 },
        { id: 'review', name: 'Đánh giá', count: 8 },
        { id: 'guide', name: 'Hướng dẫn', count: 6 },
        { id: 'news', name: 'Tin tức', count: 7 },
        { id: 'tech', name: 'Công nghệ', count: 3 }
    ];

    const articles = [
        {
            id: 1,
            title: 'Đánh giá chi tiết Dell XPS 15 2026: Laptop cao cấp cho dân sáng tạo',
            excerpt: 'Dell XPS 15 phiên bản 2026 mang đến hiệu năng vượt trội với chip Intel Core Ultra 9 và màn hình OLED 4K tuyệt đẹp, là lựa chọn hoàn hảo cho designer và content creator.',
            image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            categoryName: 'Đánh giá',
            author: 'Nguyễn Văn A',
            date: '08/01/2026',
            readTime: '8 phút',
            views: 1243,
            featured: true
        },
        {
            id: 2,
            title: 'Top 10 laptop gaming tốt nhất năm 2026 dưới 30 triệu',
            excerpt: 'Tổng hợp những chiếc laptop gaming có cấu hình mạnh mẽ, giá cả phải chăng, phù hợp với game thủ Việt Nam trong năm 2026.',
            image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'review',
            categoryName: 'Đánh giá',
            author: 'Trần Thị B',
            date: '07/01/2026',
            readTime: '12 phút',
            views: 2156,
            featured: true
        },
        {
            id: 3,
            title: 'Hướng dẫn chọn laptop phù hợp với nhu cầu học tập và làm việc',
            excerpt: 'Bạn đang phân vân không biết chọn laptop như thế nào? Bài viết này sẽ giúp bạn xác định nhu cầu và lựa chọn laptop phù hợp nhất.',
            image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'guide',
            categoryName: 'Hướng dẫn',
            author: 'Lê Văn C',
            date: '06/01/2026',
            readTime: '6 phút',
            views: 987,
            featured: false
        },
        {
            id: 4,
            title: 'Intel Core Ultra Series 2 ra mắt: Hiệu năng AI vượt trội',
            excerpt: 'Intel chính thức công bố dòng chip Core Ultra Series 2 với khả năng xử lý AI mạnh mẽ, tiết kiệm pin tốt hơn và hiệu năng đồ họa được cải thiện đáng kể.',
            image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'tech',
            categoryName: 'Công nghệ',
            author: 'Phạm Thị D',
            date: '05/01/2026',
            readTime: '5 phút',
            views: 1567,
            featured: true
        },
        {
            id: 5,
            title: 'MacBook Air M3 vs MacBook Pro M3: Nên chọn máy nào?',
            excerpt: 'So sánh chi tiết giữa MacBook Air M3 và MacBook Pro M3 để giúp bạn đưa ra quyết định mua hàng thông minh nhất.',
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'review',
            categoryName: 'Đánh giá',
            author: 'Hoàng Văn E',
            date: '04/01/2026',
            readTime: '10 phút',
            views: 3421,
            featured: false
        },
        {
            id: 6,
            title: 'Cách tối ưu hiệu năng laptop để chơi game mượt mà hơn',
            excerpt: 'Chia sẻ các mẹo và thủ thuật giúp tối ưu hóa laptop gaming của bạn, từ cài đặt Windows đến điều chỉnh phần cứng.',
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'guide',
            categoryName: 'Hướng dẫn',
            author: 'Đỗ Thị F',
            date: '03/01/2026',
            readTime: '7 phút',
            views: 1876,
            featured: false
        },
        {
            id: 7,
            title: 'ASUS ROG Zephyrus G16 2026: Laptop gaming siêu mỏng với RTX 5080',
            excerpt: 'ASUS giới thiệu ROG Zephyrus G16 phiên bản mới với card đồ họa RTX 5080, màn hình Mini LED 240Hz trong thân máy chỉ 1.9cm.',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'news',
            categoryName: 'Tin tức',
            author: 'Vũ Văn G',
            date: '02/01/2026',
            readTime: '6 phút',
            views: 2341,
            featured: false
        },
        {
            id: 8,
            title: 'Bảo dưỡng và vệ sinh laptop đúng cách để kéo dài tuổi thọ',
            excerpt: 'Hướng dẫn chi tiết cách vệ sinh, bảo dưỡng laptop định kỳ để máy luôn hoạt động ổn định và bền bỉ theo thời gian.',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'guide',
            categoryName: 'Hướng dẫn',
            author: 'Bùi Thị H',
            date: '01/01/2026',
            readTime: '9 phút',
            views: 1234,
            featured: false
        },
        {
            id: 9,
            title: 'Lenovo ThinkPad X1 Carbon Gen 12: Laptop doanh nhân hoàn hảo',
            excerpt: 'Đánh giá toàn diện về ThinkPad X1 Carbon thế hệ 12 với thiết kế bền bỉ, bàn phím tuyệt vời và thời lượng pin ấn tượng.',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'review',
            categoryName: 'Đánh giá',
            author: 'Ngô Văn I',
            date: '31/12/2025',
            readTime: '11 phút',
            views: 1654,
            featured: false
        }
    ];

    const trendingTopics = [
        'Laptop gaming RTX 5000',
        'MacBook M3 Pro',
        'Intel Core Ultra',
        'Laptop AI',
        'OLED laptop'
    ];

    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredArticles = articles.filter(article => article.featured);
    const latestArticles = articles.slice(0, 4);

    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            {/* Header */}
            <header className="bg-gradient-to-r text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-7xl font-bold mb-4 text-center animate-pulse">Tin Tức Laptop</h1>
                    <p className="text-xl text-center text-blue-100 mb-8">
                        Cập nhật tin tức, đánh giá và hướng dẫn mới nhất về laptop
                    </p>

                    {/* Search Bar */}
                    {/* <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        />
                    </div> */}
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Articles */}
                        {selectedCategory === 'all' && !searchTerm && (
                            <section className="mb-12">
                                <h2 className="text-3xl font-bold mb-6 flex items-center text-text-light">
                                    <TrendingUp className="w-8 h-8 mr-2 text-red-500" />
                                    Bài Viết Nổi Bật
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {featuredArticles.slice(0, 2).map((article) => (
                                        <div key={article.id} className="bg-card-dark rounded-none shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
                                            <div className="relative">
                                                <div className="relative h-56 overflow-hidden">
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                    Nổi bật
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                                                    {article.categoryName}
                                                </span>
                                                <h3 className="text-text-light text-xl font-bold mt-3 mb-2 group-hover:text-highlight-hover transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                                                <div className="flex items-center justify-between text-sm text-gray-500">
                                                    <div className="flex items-center space-x-4">
                                                        <span className="flex items-center">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {article.date}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Clock className="w-4 h-4 mr-1" />
                                                            {article.readTime}
                                                        </span>
                                                    </div>
                                                    <button className="text-highlight font-semibold hover:text-highlight-hover flex items-center">
                                                        Đọc thêm <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Categories */}
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === cat.id
                                            ? 'bg-highlight text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                                            }`}
                                    >
                                        {cat.name} ({cat.count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Articles List */}
                        <div className="space-y-6">
                            {filteredArticles.map((article) => (
                                <article key={article.id} className="bg-card-dark rounded-none shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                                    <div className="md:flex h-full">
                                        <div className="md:w-1/3">
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 p-4 ">
                                            <div className="flex items-center justify-between ">
                                                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                                                    {article.categoryName}
                                                </span>
                                                <div className="flex items-center space-x-3 text-gray-400">
                                                    <button className="hover:text-blue-600 transition">
                                                        <Bookmark className="w-5 h-5" />
                                                    </button>
                                                    <button className="hover:text-blue-600 transition">
                                                        <Share2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <h3 className="text-text-light text-2xl font-bold mb-3 group-hover:text-highlight-hover transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center space-x-4 text-gray-500">
                                                    <span className="flex items-center">
                                                        <User className="w-4 h-4 mr-1" />
                                                        {article.author}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar className="w-4 h-4 mr-1" />
                                                        {article.date}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {article.readTime}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        {article.views}
                                                    </span>
                                                </div>
                                                <button className="text-highlight font-semibold hover:text-highlight-hover flex items-center">
                                                    Đọc thêm <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center">
                            <div className="flex items-center space-x-2">
                                <button className="bg-card-dark text-text-light px-4 py-2 border rounded-lg hover:bg-gray-100 transition">Trước</button>
                                <button className="px-4 py-2 bg-highlight text-text-light rounded-lg">1</button>
                                <button className="bg-card-dark text-text-light px-4 py-2 border rounded-lg hover:bg-gray-100 transition">2</button>
                                <button className="bg-card-dark text-text-light px-4 py-2 border rounded-lg hover:bg-gray-100 transition">3</button>
                                <button className="bg-card-dark text-text-light px-4 py-2 border rounded-lg hover:bg-gray-100 transition">Sau</button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Trending Topics */}
                        <div className="bg-card-dark rounded-xl shadow-md p-6 mb-6">
                            <h3 className="text-text-light text-xl font-bold mb-4 flex items-center">
                                <Tag className="w-5 h-5 mr-2 text-orange-500" />
                                Chủ Đề Hot
                            </h3>
                            <div className="space-y-2">
                                {trendingTopics.map((topic, index) => (
                                    <button
                                        key={index}
                                        className="block w-full text-left px-4 py-2 rounded-lg text-gray-400 hover:text-highlight-hover transition hover:scale-110 "
                                    >
                                        #{topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Latest Articles */}
                        <div className="bg-card-dark rounded-xl shadow-md p-6">
                            <h3 className="text-text-light text-xl font-bold mb-4 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-green-500" />
                                Bài Viết Mới
                            </h3>
                            <div className="space-y-4">
                                {latestArticles.map((article) => (
                                    <div
                                        key={article.id}
                                        className="flex space-x-3 group cursor-pointer items-start"
                                    >
                                        {/* IMAGE */}
                                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1">
                                            <h4 className="text-text-light font-semibold text-sm line-clamp-2 group-hover:text-highlight-hover transition">
                                                {article.title}
                                            </h4>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {article.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-md p-6 mt-6 text-white">
                            <h3 className="text-xl font-bold mb-3">Đăng Ký Nhận Tin</h3>
                            <p className="text-sm text-blue-100 mb-4">
                                Nhận bài viết mới nhất về laptop qua email
                            </p>
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="w-full px-4 py-2 rounded-lg text-gray-800 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition">
                                Đăng ký ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LaptopNewsPage;