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

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const ITEMS_PER_PAGE = 12;

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

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedBrand, priceRange, selectedChip, selectedRam]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const brandId = selectedBrand !== 'all' ? selectedBrand : null;
                const skip = (currentPage - 1) * ITEMS_PER_PAGE;
                const response = await productApi.getAll(skip, ITEMS_PER_PAGE, brandId, debouncedSearch || null);

                if (response && response.data) {
                    setProducts(response.data);
                    // Set pagination info from API response
                    if (response.pagination) {
                        setTotalPages(response.pagination.total_pages || 1);
                        setTotalProducts(response.pagination.total || 0);
                    }
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
    }, [debouncedSearch, selectedBrand, currentPage]);

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
        setCurrentPage(1);
    };

    // Pagination handlers
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            if (!pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }

        return pages;
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-10 flex flex-col items-center gap-4">
                                {/* Pagination info */}
                                <p style={{ color: '#9CA3AF' }}>
                                    Trang <span style={{ color: '#22C55E', fontWeight: '600' }}>{currentPage}</span> / {totalPages} (Tổng: <span style={{ color: '#22C55E', fontWeight: '600' }}>{totalProducts}</span> sản phẩm)
                                </p>

                                {/* Pagination controls */}
                                <div className="flex items-center gap-2">
                                    {/* Previous button */}
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                                        style={{
                                            backgroundColor: currentPage === 1 ? '#374151' : '#111827',
                                            color: currentPage === 1 ? '#6B7280' : '#F9FAFB',
                                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                            border: '1px solid #374151',
                                        }}
                                    >
                                        ← Trước
                                    </button>

                                    {/* Page numbers */}
                                    <div className="flex items-center gap-1">
                                        {getPageNumbers().map((page, index) => (
                                            page === '...' ? (
                                                <span
                                                    key={`ellipsis-${index}`}
                                                    className="px-3 py-2"
                                                    style={{ color: '#9CA3AF' }}
                                                >
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                                                    style={{
                                                        backgroundColor: currentPage === page ? '#22C55E' : '#111827',
                                                        color: currentPage === page ? '#FFFFFF' : '#D1D5DB',
                                                        border: currentPage === page ? 'none' : '1px solid #374151',
                                                    }}
                                                >
                                                    {page}
                                                </button>
                                            )
                                        ))}
                                    </div>

                                    {/* Next button */}
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                                        style={{
                                            backgroundColor: currentPage === totalPages ? '#374151' : '#111827',
                                            color: currentPage === totalPages ? '#6B7280' : '#F9FAFB',
                                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                            border: '1px solid #374151',
                                        }}
                                    >
                                        Sau →
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
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

