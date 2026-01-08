import React from 'react';

const ProductFilter = ({
    searchTerm,
    setSearchTerm,
    brands = [],
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    selectedChip,
    setSelectedChip,
    selectedRam,
    setSelectedRam,
    resultsCount,
    onReset
}) => {
    const priceRanges = [
        { value: 'all', label: 'Tất cả giá' },
        { value: '0-10', label: 'Dưới 10 triệu' },
        { value: '10-20', label: '10 - 20 triệu' },
        { value: '20-30', label: '20 - 30 triệu' },
        { value: '30+', label: 'Trên 30 triệu' },
    ];

    const chipOptions = [
        { value: 'all', label: 'Tất cả' },
        { value: 'Apple', label: 'Apple' },
        { value: 'Snapdragon', label: 'Snapdragon' },
        { value: 'Exynos', label: 'Exynos' },
        { value: 'MediaTek', label: 'MediaTek' },
        { value: 'Intel', label: 'Intel' },
        { value: 'AMD', label: 'AMD' },
    ];

    const ramOptions = [
        { value: 'all', label: 'Tất cả' },
        { value: '4GB', label: '4GB' },
        { value: '6GB', label: '6GB' },
        { value: '8GB', label: '8GB' },
        { value: '12GB', label: '12GB' },
        { value: '16GB', label: '16GB' },
        { value: '32GB+', label: '32GB+' },
    ];

    const hasActiveFilters = searchTerm || selectedBrand !== 'all' || priceRange !== 'all' || selectedChip !== 'all' || selectedRam !== 'all';

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
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Brand filter - Dynamic from API */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>Thương hiệu</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <select
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            <option value="all" style={{ backgroundColor: '#111827' }}>Tất cả</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id} style={{ backgroundColor: '#111827' }}>
                                    {brand.name}
                                </option>
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

                {/* Chip/CPU with icon */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium px-1" style={{ color: '#9CA3AF' }}>Chip</label>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: '#111827', border: '1px solid #374151' }}>
                        <svg className="w-4 h-4" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                        <select
                            value={selectedChip}
                            onChange={(e) => setSelectedChip(e.target.value)}
                            className="bg-transparent outline-none cursor-pointer"
                            style={{ color: '#F9FAFB' }}
                        >
                            {chipOptions.map(option => (
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

                {/* Reset button */}
                {hasActiveFilters && (
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium px-1" style={{ color: 'transparent' }}>Reset</label>
                        <button
                            onClick={onReset}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-red-600"
                            style={{ backgroundColor: '#EF4444', color: '#FFFFFF' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Xóa bộ lọc</span>
                        </button>
                    </div>
                )}

                {/* Results count */}
                <div className="ml-auto text-sm" style={{ color: '#9CA3AF' }}>
                    <span className="font-semibold" style={{ color: '#22C55E' }}>{resultsCount}</span> sản phẩm
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
