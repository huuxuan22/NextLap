import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#111827] min-h-screen w-full flex items-center">
            {/* Background Effects - Premium Minimal */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-[#22C55E]/5 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-[#22C55E]/3 via-transparent to-transparent"></div>

                {/* Subtle Tech Grid */}
                <div className="absolute inset-0 opacity-[0.02] bg-[size:80px_80px] bg-[linear-gradient(to_right,#22C55E_1px,transparent_1px),linear-gradient(to_bottom,#22C55E_1px,transparent_1px)]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    {/* Text Content - Left Side */}
                    <div className={`flex-1 max-w-2xl transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {/* Premium Badge */}
                        <div className={`inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-[#1F2937]/80 backdrop-blur-sm border border-[#374151] rounded-full transition-all duration-1000 delay-150 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                            <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#9CA3AF]">Công Nghệ Cao Cấp</span>
                        </div>

                        {/* Headline - Premium Vietnamese Typography */}
                        <div className={`space-y-3 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                                <span className="text-[#F9FAFB]">Tương Lai Của</span>
                                <span className="block mt-3 lg:mt-4">
                                    <span className="relative">
                                        <span className="text-[#22C55E]">Hiệu Năng</span>
                                        <span className="absolute -inset-2 bg-[#22C55E]/5 blur-xl -z-10"></span>
                                    </span>
                                </span>
                            </h1>

                            <div className="mt-6 lg:mt-8">
                                <div className="inline-block">
                                    <span className="text-2xl lg:text-3xl font-light text-[#9CA3AF] tracking-wider">—</span>
                                    <span className="text-2xl lg:text-3xl font-bold text-[#22C55E] ml-3 lg:ml-4 tracking-tight">NextLap</span>
                                </div>
                            </div>
                        </div>

                        {/* Subheading - Vietnamese Premium Tone */}
                        <p className={`mt-8 lg:mt-10 text-base sm:text-lg lg:text-xl font-light text-[#9CA3AF] leading-relaxed max-w-xl transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                            Nơi đổi mới gặp gỡ tinh tế. Trải nghiệm sức mạnh vượt trội với bộ vi xử lý thế hệ mới, màn hình xuất sắc và tay nghề thủ công định nghĩa lại máy tính hiện đại.
                        </p>

                        {/* CTA Buttons */}
                        <div className={`flex flex-col sm:flex-row gap-3 lg:gap-4 mt-8 lg:mt-12 transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                            <Link
                                to="/products"
                                className="group relative inline-flex items-center justify-center px-6 lg:px-10 py-3 lg:py-4 text-base lg:text-lg font-semibold text-[#111827] bg-[#22C55E] hover:bg-[#16A34A] transition-all duration-300 hover:scale-[1.02] active:scale-95 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50"
                            >
                                <span className="tracking-wide">Khám Phá Sản Phẩm</span>
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 ml-3 lg:ml-4 transform transition-transform duration-300 group-hover:translate-x-1 lg:group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#22C55E]/0 via-[#22C55E]/20 to-[#22C55E]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md rounded-lg"></div>
                            </Link>

                            <Link
                                to="/about"
                                className="group inline-flex items-center justify-center px-6 lg:px-10 py-3 lg:py-4 text-base lg:text-lg font-semibold text-[#F9FAFB] border border-[#374151] bg-transparent hover:bg-[#1F2937] hover:border-[#4B5563] transition-all duration-300 hover:scale-[1.02] active:scale-95 rounded-lg"
                            >
                                <span>Triết Lý Thương Hiệu</span>
                                <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 lg:ml-3 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {/* Premium Stats */}
                        <div className={`mt-12 lg:mt-16 grid grid-cols-3 gap-4 lg:gap-8 transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                            <div className="text-left">
                                <div className="text-2xl lg:text-3xl font-bold text-[#22C55E] tracking-tight">A+</div>
                                <div className="text-xs lg:text-sm text-[#9CA3AF] tracking-wide mt-1">Chất Lượng</div>
                            </div>
                            <div className="text-left">
                                <div className="text-2xl lg:text-3xl font-bold text-[#22C55E] tracking-tight">99%</div>
                                <div className="text-xs lg:text-sm text-[#9CA3AF] tracking-wide mt-1">Hài Lòng</div>
                            </div>
                            <div className="text-left">
                                <div className="text-2xl lg:text-3xl font-bold text-[#22C55E] tracking-tight">24/7</div>
                                <div className="text-xs lg:text-sm text-[#9CA3AF] tracking-wide mt-1">Hỗ Trợ Chuyên Gia</div>
                            </div>
                        </div>
                    </div>

                    {/* Premium Laptop Visual - Desktop Only */}
                    <div className={`hidden lg:block flex-1 relative transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="relative w-[500px] h-[350px] animate-gentle-float mx-auto">
                            {/* Laptop Base */}
                            <div className="absolute inset-0">
                                {/* Bottom Base */}
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[360px] h-[240px] bg-[#1F2937] rounded-xl shadow-2xl">
                                    {/* Keyboard Area */}
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[320px] h-[32px] bg-[#111827] rounded-lg opacity-60">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[2px] bg-[#374151]"></div>
                                    </div>

                                    {/* Trackpad */}
                                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[100px] h-[12px] bg-[#111827] rounded opacity-40"></div>

                                    {/* Glow Reflection */}
                                    <div className="absolute -bottom-16 -left-16 w-[160px] h-[160px] bg-gradient-to-r from-[#22C55E]/5 to-transparent blur-3xl"></div>
                                </div>

                                {/* Screen */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[340px] h-[220px] bg-[#111827] border-2 border-[#374151] rounded-lg shadow-2xl">
                                    {/* Screen Bezel */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-lg">
                                        {/* Screen Content - Modern Code/Dashboard */}
                                        <div className="p-6 h-full flex flex-col">
                                            {/* Top Bar */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></div>
                                                </div>
                                                <div className="text-[10px] text-[#9CA3AF] font-mono tracking-wider">admin@nextlap ~</div>
                                            </div>

                                            {/* Code Lines */}
                                            <div className="space-y-3 font-mono">
                                                <div className="flex items-center gap-3">
                                                    <div className="text-[10px] text-[#22C55E]">$</div>
                                                    <div className="h-[1.5px] w-36 bg-[#374151]"></div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-[10px] text-[#22C55E]"></div>
                                                    <div className="h-[1.5px] w-24 bg-[#374151]"></div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-[10px] text-[#22C55E]">#</div>
                                                    <div className="h-[1.5px] w-40 bg-gradient-to-r from-[#374151] to-transparent"></div>
                                                </div>
                                            </div>

                                            {/* Bottom Stats */}
                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"></div>
                                                    <div className="text-[10px] text-[#9CA3AF]">đang chạy</div>
                                                </div>
                                                <div className="text-[10px] text-[#22C55E] font-mono">100%</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Screen Glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#22C55E]/10 to-transparent rounded-lg blur-md -z-10"></div>
                                </div>

                                {/* Hinge */}
                                <div className="absolute top-[220px] left-1/2 transform -translate-x-1/2 w-[60px] h-[10px] bg-gradient-to-b from-[#374151] to-[#1F2937] rounded-t-lg"></div>

                                {/* Reflection Glow */}
                                <div className="absolute -top-16 -right-16 w-[240px] h-[240px] bg-gradient-to-bl from-[#22C55E]/10 via-transparent to-transparent blur-3xl"></div>
                            </div>

                            {/* Floating Glow Elements */}
                            <div className="absolute -top-6 -right-6 animate-gentle-float-delayed">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#22C55E]/10 to-transparent backdrop-blur-sm border border-[#22C55E]/20 rounded-xl flex items-center justify-center shadow-2xl">
                                    <svg className="w-6 h-6 text-[#22C55E]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes gentle-float {
                    0%, 100% { transform: translateY(0px) rotateX(0deg); }
                    50% { transform: translateY(-15px) rotateX(2deg); }
                }
                
                @keyframes gentle-float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(-1.5deg); }
                }
                
                .animate-gentle-float {
                    animation: gentle-float 8s ease-in-out infinite;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                }
                
                .animate-gentle-float-delayed {
                    animation: gentle-float-delayed 6s ease-in-out infinite;
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;