import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import productApi from '../api/productApi';
import brandApi from '../api/brandApi';

/**
 * Products - Trang danh sách sản phẩm
 */
const Products = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [selectedChip, setSelectedChip] = useState('all');
    const [selectedRam, setSelectedRam] = useState('all');

    // Get brand from URL parameter on mount
    useEffect(() => {
        const brandParam = searchParams.get('brand');
        if (brandParam && brands.length > 0) {
            const brand = brands.find(b =>
                b.name.toLowerCase() === brandParam.toLowerCase()
            );
            if (brand) {
                setSelectedBrand(brand.id);
            } else {
                // Brand not found, reset to 'all'
                setSelectedBrand('all');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get('brand'), brands.length]);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch brands on mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await brandApi.getAll(0, 50);
                if (response && response.data) {
                    setBrands(response.data);
                }
            } catch (err) {
                // Silent fail
            }
        };
        fetchBrands();
    }, []);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const brandId = selectedBrand !== 'all' ? selectedBrand : null;
                const response = await productApi.getAll(0, 100, brandId, debouncedSearch || null);

                if (response && response.data) {
                    setProducts(response.data);
                } else if (Array.isArray(response)) {
                    setProducts(response);
                }
                setError(null);
            } catch (err) {
                setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch, selectedBrand]);

    // Filter products locally (for price, ram, chip)
    const filteredProducts = products.filter(product => {
        // Price filter
        let matchesPrice = true;
        if (priceRange !== 'all') {
            const price = product.price / 1000000; // Convert to millions
            switch (priceRange) {
                case '0-10':
                    matchesPrice = price < 10;
                    break;
                case '10-20':
                    matchesPrice = price >= 10 && price < 20;
                    break;
                case '20-30':
                    matchesPrice = price >= 20 && price < 30;
                    break;
                case '30+':
                    matchesPrice = price >= 30;
                    break;
                default:
                    matchesPrice = true;
            }
        }

        // RAM filter
        const spec = product.spec;
        let matchesRam = true;
        if (selectedRam !== 'all' && spec && spec.ram) {
            const ramValue = parseInt(spec.ram);
            if (selectedRam === '32GB+') {
                matchesRam = ramValue >= 32;
            } else {
                matchesRam = spec.ram.includes(selectedRam);
            }
        } else if (selectedRam !== 'all' && (!spec || !spec.ram)) {
            matchesRam = false;
        }

        // Chip filter
        let matchesChip = true;
        if (selectedChip !== 'all' && spec && spec.chip) {
            matchesChip = spec.chip.toLowerCase().includes(selectedChip.toLowerCase());
        } else if (selectedChip !== 'all' && (!spec || !spec.chip)) {
            matchesChip = false;
        }

        return matchesPrice && matchesRam && matchesChip;
    });

    // Reset all filters
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedBrand('all');
        setPriceRange('all');
        setSelectedChip('all');
        setSelectedRam('all');
    };

    return (
        <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: '#F9FAFB' }}>
                        Sản Phẩm
                    </h1>
                    <p style={{ color: '#9CA3AF' }}>
                        Khám phá bộ sưu tập sản phẩm với công nghệ tiên tiến nhất
                    </p>
                </div>

                {/* Filter Bar */}
                <ProductFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    brands={brands}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedChip={selectedChip}
                    setSelectedChip={setSelectedChip}
                    selectedRam={selectedRam}
                    setSelectedRam={setSelectedRam}
                    resultsCount={filteredProducts.length}
                    onReset={handleResetFilters}
                />

                {/* Products Grid */}
                {loading ? (
                    <div className="text-center py-20 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                        <p className="text-xl" style={{ color: '#9CA3AF' }}>
                            Đang tải sản phẩm...
                        </p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                        <p className="text-xl" style={{ color: '#EF4444' }}>
                            {error}
                        </p>
                    </div>
                ) : filteredProducts.length > 0 ? (
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

