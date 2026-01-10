import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';

const newsItems = [
    {
        id: 1,
        title: 'MacBook Pro M4 sắp ra mắt với hiệu năng vượt trội',
        excerpt: 'Apple chuẩn bị tung ra dòng MacBook Pro mới với chip M4, hứa hẹn hiệu năng tăng 50% so với thế hệ trước.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Tin công nghệ',
        date: '28/12/2025',
        readTime: '3 phút đọc',
        views: 1520
    },
    {
        id: 2,
        title: 'Top 5 laptop gaming đáng mua nhất năm 2026',
        excerpt: 'Tổng hợp những mẫu laptop gaming tốt nhất với cấu hình mạnh mẽ và giá cả hợp lý dành cho game thủ.',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Đánh giá',
        date: '25/12/2025',
        readTime: '5 phút đọc',
        views: 2340
    },
    {
        id: 3,
        title: 'Hướng dẫn chọn laptop phù hợp cho sinh viên',
        excerpt: 'Những tiêu chí quan trọng cần xem xét khi mua laptop cho việc học tập và làm việc.',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: 'Hướng dẫn',
        date: '22/12/2025',
        readTime: '4 phút đọc',
        views: 1890
    }
];

const NewsCard = ({ news, featured = false }) => {
    return (
        <div
            className={`rounded-2xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-highlight-hover/20 cursor-pointer group ${featured ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            style={{ backgroundColor: '#1F2937' }}>
            <div
                className={`flex items-center justify-center ${featured ? 'h-48 md:h-64' : 'h-56'
                    } bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 group-hover:scale-105 transition-transform duration-300`}>
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: '#22C55E', color: '#F9FAFB' }}
                    >
                        {news.category}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                        <Calendar className="w-3 h-3" />
                        {news.date}
                    </span>
                </div>

                <h3
                    className={`font-bold mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all ${featured ? 'text-xl' : 'text-base'
                        }`}
                    style={{ color: '#F9FAFB' }}
                >
                    {news.title}
                </h3>

                {featured && (
                    <p className="text-sm mb-4 line-clamp-2" style={{ color: '#9CA3AF' }}>
                        {news.excerpt}
                    </p>
                )}

                <div className="flex items-center justify-between text-xs" style={{ color: '#6B7280' }}>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {news.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {news.views}
                        </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-hig group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </div>
    );
};

const LatestNews = () => {
    return (
        <section className="mb-16 bg-gray-900 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#F9FAFB' }}>
                            Tin tức & Bài viết
                        </h2>
                        <p className="text-lg" style={{ color: '#9CA3AF' }}>
                            Cập nhật xu hướng công nghệ mới nhất
                        </p>
                    </div>

                    <Link
                        to="/news"
                        className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold border-2"
                        style={{
                            backgroundColor: '#374151',
                            color: '#F9FAFB',
                            borderColor: '#6B7280'
                        }}
                    >
                        <span>Xem tất cả</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.map((news, index) => (
                        <NewsCard key={news.id} news={news} featured={false} />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="sm:hidden mt-8 text-center">
                    <button
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 font-bold border-2"
                        style={{
                            backgroundColor: '#374151',
                            color: '#F9FAFB',
                            borderColor: '#6B7280'
                        }}
                    >
                        <span>Xem tất cả tin tức</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;