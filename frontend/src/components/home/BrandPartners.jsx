import React from 'react';

const brands = [
    {
        id: 1,
        name: 'Apple',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
    },
    {
        id: 2,
        name: 'Dell',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg'
    },
    {
        id: 3,
        name: 'ASUS',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg'
    },
    {
        id: 4,
        name: 'Lenovo',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg'
    },
    {
        id: 5,
        name: 'HP',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg'
    },
    {
        id: 6,
        name: 'MSI',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/MSI_Logo.svg'
    },
    {
        id: 7,
        name: 'Acer',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg'
    },
    {
        id: 8,
        name: 'Microsoft',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
    }
];

const BrandPartners = () => {
    return (
        <section className="mb-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-3" style={{ color: '#F9FAFB' }}>
                    Đối tác thương hiệu
                </h2>
                <p style={{ color: '#9CA3AF' }}>
                    Hợp tác với các thương hiệu laptop hàng đầu thế giới
                </p>
            </div>

            <div
                className="rounded-2xl p-8 overflow-hidden"
                style={{ backgroundColor: '#1F2937' }}
            >
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all hover:scale-110 hover:bg-gray-700 cursor-pointer"
                        >
                            <div className="w-20 h-20 flex items-center justify-center">
                                <img
                                    src={brand.logoUrl}
                                    alt={`${brand.name} logo`}
                                    className="w-full h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span
                                    className="text-3xl font-bold hidden"
                                    style={{ color: '#9CA3AF' }}
                                >
                                    {brand.name}
                                </span>
                            </div>
                            <span className="text-sm font-medium" style={{ color: '#9CA3AF' }}>
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandPartners;
