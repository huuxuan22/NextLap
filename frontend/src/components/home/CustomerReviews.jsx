import React from 'react';

const reviews = [
    {
        id: 1,
        name: 'Nguyễn Minh Tuấn',
        avatar: '👨‍💼',
        rating: 5,
        comment: 'Sản phẩm chất lượng, giao hàng nhanh chóng. Đội ngũ tư vấn nhiệt tình, hỗ trợ rất tốt!',
        product: 'MacBook Pro 14"',
        date: '2 ngày trước'
    },
    {
        id: 2,
        name: 'Trần Thị Hương',
        avatar: '👩‍💻',
        rating: 5,
        comment: 'Lần đầu mua laptop online mà rất hài lòng. Giá tốt hơn nhiều so với mua ở cửa hàng.',
        product: 'Dell XPS 15',
        date: '5 ngày trước'
    },
    {
        id: 3,
        name: 'Lê Văn Hoàng',
        avatar: '👨‍🎓',
        rating: 4,
        comment: 'Laptop gaming chạy mượt mà, thiết kế đẹp. Bảo hành nhanh gọn lẹ.',
        product: 'ASUS ROG Strix',
        date: '1 tuần trước'
    }
];

const StarRating = ({ rating }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className="w-4 h-4"
                    fill={star <= rating ? '#FBBF24' : '#374151'}
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <div
            className="p-6 rounded-2xl transition-all hover:scale-[1.02]"
            style={{ backgroundColor: '#1F2937' }}
        >
            <div className="flex items-start gap-4 mb-4">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ backgroundColor: '#374151' }}
                >
                    {review.avatar}
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold" style={{ color: '#F9FAFB' }}>
                        {review.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={review.rating} />
                        <span className="text-xs" style={{ color: '#6B7280' }}>
                            {review.date}
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-sm mb-3" style={{ color: '#D1D5DB' }}>
                "{review.comment}"
            </p>

            <div
                className="inline-block px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22C55E' }}
            >
                Đã mua: {review.product}
            </div>
        </div>
    );
};

const CustomerReviews = () => {
    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                        Khách hàng nói gì?
                    </h2>
                    <p style={{ color: '#9CA3AF' }}>
                        Đánh giá thực tế từ khách hàng đã mua sắm
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold" style={{ color: '#22C55E' }}>4.9</span>
                        <svg className="w-5 h-5" fill="#FBBF24" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <span className="text-sm" style={{ color: '#9CA3AF' }}>
                        (2,500+ đánh giá)
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
};

export default CustomerReviews;
