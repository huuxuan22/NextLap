import React from 'react';

const Gallery = () => {
    const laptops = [
        {
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Laptop Gaming',
            description: 'Hiệu suất cao cho game thủ chuyên nghiệp'
        },
        {
            image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Laptop Văn Phòng',
            description: 'Tinh tế và chuyên nghiệp cho doanh nhân'
        },
        {
            image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            title: 'Ultrabook',
            description: 'Mỏng nhẹ, di động cao cho người dùng hiện đại'
        }
    ];

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#F9FAFB' }}>
                Bộ Sưu Tập Laptop Nổi Bật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {laptops.map((laptop, index) => (
                    <div
                        key={index}
                        className="text-center transform hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={laptop.image}
                            alt={laptop.title}
                            className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold" style={{ color: '#F9FAFB' }}>
                            {laptop.title}
                        </h3>
                        <p style={{ color: '#9CA3AF' }}>{laptop.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Gallery;
