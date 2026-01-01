import React, { useState } from 'react';

/**
 * Newsletter - Form đăng ký nhận tin khuyến mãi
 */
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // TODO: Gọi API đăng ký newsletter
            console.log('Subscribed:', email);
            setIsSubmitted(true);
            setEmail('');

            // Reset sau 3 giây
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    return (
        <section
            className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)'
            }}
        >
            {/* Decorative elements */}
            <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5"
                style={{
                    backgroundColor: '#22C55E',
                    transform: 'translate(50%, -50%)'
                }}
            />
            <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-5"
                style={{
                    backgroundColor: '#3B82F6',
                    transform: 'translate(-50%, 50%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-2xl mx-auto">
                <div
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
                    style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.1)'
                    }}
                >
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: '#22C55E' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h2
                    className="text-2xl md:text-3xl font-bold mb-3"
                    style={{ color: '#F9FAFB' }}
                >
                    Đăng ký nhận ưu đãi
                </h2>

                <p
                    className="mb-8"
                    style={{ color: '#9CA3AF' }}
                >
                    Nhận thông tin khuyến mãi và sản phẩm mới nhất từ NextLap
                </p>

                {isSubmitted ? (
                    <div
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl"
                        style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            color: '#22C55E'
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Đăng ký thành công!</span>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            className="flex-1 px-5 py-3 rounded-xl outline-none transition-all focus:ring-2"
                            style={{
                                backgroundColor: '#374151',
                                color: '#F9FAFB',
                                border: '1px solid #4B5563'
                            }}
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                            style={{
                                backgroundColor: '#22C55E',
                                color: '#F9FAFB'
                            }}
                        >
                            Đăng ký
                        </button>
                    </form>
                )}

                <p
                    className="mt-4 text-xs"
                    style={{ color: '#6B7280' }}
                >
                    Chúng tôi cam kết không spam và bảo mật thông tin của bạn
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
