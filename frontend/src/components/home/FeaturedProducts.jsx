import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import productApi from '../../api/productApi';

/**
 * FeaturedProducts - Hiển thị sản phẩm nổi bật
 */

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productApi.getAll(0, 8);
                if (response && response.data) {
                    setProducts(response.data);
                } else if (Array.isArray(response)) {
                    setProducts(response);
                }
            } catch (error) {
                // Silent fail - products will show empty state
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    return (
        <section className="mb-16">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2
                        className="text-3xl font-bold mb-2"
                        style={{ color: '#F9FAFB' }}
                    >
                        Sản phẩm nổi bật
                    </h2>
                    <p style={{ color: '#9CA3AF' }}>
                        Những sản phẩm được yêu thích nhất
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-lg transition-all hover:opacity-80"
                    style={{
                        backgroundColor: '#374151',
                        color: '#F9FAFB'
                    }}
                >
                    <span>Xem tất cả</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center py-10" style={{ color: '#9CA3AF' }}>
                    Đang tải sản phẩm...
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10" style={{ color: '#9CA3AF' }}>
                    Không có sản phẩm nào
                </div>
            )}

            {/* Mobile View All Button */}
            <div className="sm:hidden mt-6 text-center">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-80"
                    style={{
                        backgroundColor: '#374151',
                        color: '#F9FAFB'
                    }}
                >
                    <span>Xem tất cả sản phẩm</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProducts;
