import React from 'react';

const ProductFilter = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedCpu,
    setSelectedCpu,
    selectedRam,
    setSelectedRam,
    selectedGpu,
    setSelectedGpu,
    resultsCount
}) => {
    const categories = [
        { value: 'all', label: 'Tất cả' },
        { value: 'Dell', label: 'Dell' },
        { value: 'HP', label: 'HP' },
        { value: 'Lenovo', label: 'Lenovo' },
        { value: 'Asus', label: 'Asus' },
        { value: 'Apple', label: 'Apple' },
        { value: 'MSI', label: 'MSI' },
    ];

    const priceRanges = [
        { value: 'all', label: 'Tất cả giá' },
        { value: '0-30', label: '<30tr' },
        { value: '30-40', label: '30-40tr' },
        { value: '40-50', label: '40-50tr' },
        { value: '50+', label: '>50tr' },
    ];

    const cpuOptions = [
        { value: 'all', label: 'Tất cả' },
        { value: 'Intel Core i5', label: 'i5' },
        { value: 'Intel Core i7', label: 'i7' },
        { value: 'AMD Ryzen 7', label: 'Ryzen 7' },
        { value: 'Apple M3 Pro', label: 'M3 Pro' },
    ];

    const ramOptions = [
        { value: 'all', label: 'Tất cả' },
        { value: '8GB', label: '8GB' },
        { value: '16GB', label: '16GB' },
        { value: '18GB', label: '18GB' },
        { value: '32GB+', label: '32GB+' },
    ];

    const gpuOptions = [
        { value: 'all', label: 'Tất cả' },
        { value: 'Integrated', label: 'Tích hợp' },
        { value: 'NVIDIA GTX 1650', label: 'GTX 1650' },
        { value: 'NVIDIA RTX 3060', label: 'RTX 3060' },
        { value: 'Apple M3 Pro GPU', label: 'M3 Pro' },
    ];

    return (
        <div
            className="p-4 rounded-lg mb-6 sticky top-16 z-40"
            style={{ backgroundColor: '#1F2937' }}
        >
            {/* Horizontal filter bar */}
            <div className="flex flex-wrap items-center gap-3">
                {/* Search with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>Tìm kiếm</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent outline-none w-48"
                            style={{ color: '#F9FAFB' }}
                        />
                    </div>
                </div>

                {/* Category with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>Thương hiệu</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            {categories.map(cat => (
                                <option key={cat.value} value={cat.value} style={{ backgroundColor: '#111827' }}>{cat.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Price with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>Mức giá</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            {priceRanges.map(range => (
                                <option key={range.value} value={range.value} style={{ backgroundColor: '#111827' }}>{range.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* CPU with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>CPU</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        <select
                            value={selectedCpu}
                            onChange={(e) => setSelectedCpu(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            {cpuOptions.map(option => (
                                <option key={option.value} value={option.value} style={{ backgroundColor: '#111827' }}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* RAM with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>RAM</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <select
                            value={selectedRam}
                            onChange={(e) => setSelectedRam(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            {ramOptions.map(option => (
                                <option key={option.value} value={option.value} style={{ backgroundColor: '#111827' }}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* GPU with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>GPU</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        <select
                            value={selectedGpu}
                            onChange={(e) => setSelectedGpu(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            {gpuOptions.map(option => (
                                <option key={option.value} value={option.value} style={{ backgroundColor: '#111827' }}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="ml-auto text-sm" style={{ color: '#9CA3AF' }}>
                    {resultsCount} sản phẩm
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
