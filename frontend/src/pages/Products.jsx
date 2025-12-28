import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { productsData } from '../data/productsData';
import { filterByPriceRange } from '../utils/formatPrice';

/**
 * Products - Trang danh sách sản phẩm laptop
 */
const Products = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [selectedCpu, setSelectedCpu] = useState('all');
    const [selectedRam, setSelectedRam] = useState('all');
    const [selectedGpu, setSelectedGpu] = useState('all');

    // Lọc sản phẩm
    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.specs.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = filterByPriceRange(product.price, priceRange);
        const matchesCpu = selectedCpu === 'all' || product.cpu === selectedCpu;
        const matchesRam = selectedRam === 'all' || product.ram === selectedRam ||
            (selectedRam === '32GB+' && parseInt(product.ram) >= 32);
        const matchesGpu = selectedGpu === 'all' || product.gpu === selectedGpu;

        return matchesSearch && matchesCategory && matchesPrice && matchesCpu && matchesRam && matchesGpu;
    });

    return (
        <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                        Sản Phẩm Laptop
                    </h1>
                    <p style={{ color: '#9CA3AF' }}>
                        Khám phá bộ sưu tập laptop hiện đại với công nghệ tiên tiến nhất
                    </p>
                </div>

                {/* Filter Bar */}
                <ProductFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedCpu={selectedCpu}
                    setSelectedCpu={setSelectedCpu}
                    selectedRam={selectedRam}
                    setSelectedRam={setSelectedRam}
                    selectedGpu={selectedGpu}
                    setSelectedGpu={setSelectedGpu}
                    resultsCount={filteredProducts.length}
                />

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div
                        className="text-center py-20 rounded-lg"
                        style={{ backgroundColor: '#1F2937' }}
                    >
                        <p className="text-xl" style={{ color: '#9CA3AF' }}>
                            Không tìm thấy sản phẩm phù hợp
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

