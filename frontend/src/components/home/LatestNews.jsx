import React from 'react';
import { Link } from 'react-router-dom';

const newsItems = [
    {
        id: 1,
        title: 'MacBook Pro M4 sắp ra mắt với hiệu năng vượt trội',
        excerpt: 'Apple chuẩn bị tung ra dòng MacBook Pro mới với chip M4, hứa hẹn hiệu năng tăng 50% so với thế hệ trước.',
        image: '💻',
        category: 'Tin công nghệ',
        date: '28/12/2025',
        readTime: '3 phút đọc'
    },
    {
        id: 2,
        title: 'Top 5 laptop gaming đáng mua nhất năm 2026',
        excerpt: 'Tổng hợp những mẫu laptop gaming tốt nhất với cấu hình mạnh mẽ và giá cả hợp lý dành cho game thủ.',
        image: '🎮',
        category: 'Đánh giá',
        date: '25/12/2025',
        readTime: '5 phút đọc'
    },
    {
        id: 3,
        title: 'Hướng dẫn chọn laptop phù hợp cho sinh viên',
        excerpt: 'Những tiêu chí quan trọng cần xem xét khi mua laptop cho việc học tập và làm việc.',
        image: '📚',
        category: 'Hướng dẫn',
        date: '22/12/2025',
        readTime: '4 phút đọc'
    }
];

const NewsCard = ({ news, featured = false }) => {
    return (
        <div
            className={`rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
            style={{ backgroundColor: '#1F2937' }}
        >
            <div
                className={`flex items-center justify-center ${featured ? 'h-48 md:h-64' : 'h-32'}`}
                style={{ backgroundColor: '#374151' }}
            >
                <span className={featured ? 'text-6xl' : 'text-4xl'}>{news.image}</span>
            </div>

            <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                    <span
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}
                    >
                        {news.category}
                    </span>
                    <span className="text-xs" style={{ color: '#6B7280' }}>
                        {news.date}
                    </span>
                </div>

                <h3
                    className={`font-bold mb-2 line-clamp-2 ${featured ? 'text-xl' : 'text-base'}`}
                    style={{ color: '#F9FAFB' }}
                >
                    {news.title}
                </h3>

                {featured && (
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: '#9CA3AF' }}>
                        {news.excerpt}
                    </p>
                )}

                <span className="text-xs" style={{ color: '#6B7280' }}>
                    ⏱️ {news.readTime}
                </span>
            </div>
        </div>
    );
};

const LatestNews = () => {
    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                        Tin tức & Bài viết
                    </h2>
                    <p style={{ color: '#9CA3AF' }}>
                        Cập nhật xu hướng công nghệ mới nhất
                    </p>
                </div>

                <Link
                    to="/news"
                    className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{ backgroundColor: '#374151', color: '#F9FAFB' }}
                >
                    <span>Xem tất cả</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsItems.map((news, index) => (
                    <NewsCard key={news.id} news={news} featured={index === 0} />
                ))}
            </div>
        </section>
    );
};

export default LatestNews;
