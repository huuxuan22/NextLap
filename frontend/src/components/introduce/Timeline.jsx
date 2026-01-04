import React from 'react';

const Timeline = () => {
    const milestones = [
        {
            year: '2015',
            title: 'Khởi Nghiệp',
            description: 'NextLap được thành lập với sứ mệnh mang laptop chất lượng đến người dùng Việt Nam.',
            position: 'left'
        },
        {
            year: '2018',
            title: 'Mở Rộng Thị Trường',
            description: 'Ra mắt dòng laptop gaming và văn phòng, mở rộng thị trường Đông Nam Á.',
            position: 'right'
        },
        {
            year: '2020',
            title: 'Công Nghệ Tiên Tiến',
            description: 'Tích hợp AI và công nghệ mới nhất vào sản phẩm, giành nhiều giải thưởng.',
            position: 'left'
        },
        {
            year: '2025',
            title: 'Tương Lai Sáng Lạn',
            description: 'Tiếp tục đổi mới với laptop thông minh, hướng tới thị trường toàn cầu.',
            position: 'right'
        }
    ];

    return (
        <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#F9FAFB' }}>
                Hành Trình Phát Triển
            </h2>
            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-500"></div>
                <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center">
                            {milestone.position === 'left' ? (
                                <>
                                    <div className="flex-1 text-right pr-8">
                                        <h3 className="text-xl font-semibold" style={{ color: '#22C55E' }}>
                                            {milestone.year} - {milestone.title}
                                        </h3>
                                        <p style={{ color: '#F9FAFB' }}>{milestone.description}</p>
                                    </div>
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <div className="flex-1 pl-8"></div>
                                </>
                            ) : (
                                <>
                                    <div className="flex-1 pr-8"></div>
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <div className="flex-1 pl-8">
                                        <h3 className="text-xl font-semibold" style={{ color: '#22C55E' }}>
                                            {milestone.year} - {milestone.title}
                                        </h3>
                                        <p style={{ color: '#F9FAFB' }}>{milestone.description}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
