import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductGallery from '../components/ProductGallery';
import ProductSpecs from '../components/ProductSpecs';
import RatingStars from '../components/RatingStars';
import QuantitySelector from '../components/QuantitySelector';
import { getProductById } from '../data/productsData';
import { formatPrice } from '../utils/formatPrice';
import { addToCart } from '../utils/cartUtils';

/**
 * ProductDetail - Trang chi tiết sản phẩm laptop
 */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    // Lấy thông tin sản phẩm từ database
    const product = getProductById(id) || {
        name: 'Sản phẩm không tồn tại',
        price: 0,
        category: 'N/A',
        specs: 'N/A',
        rating: 0,
        reviews: 0,
        inStock: false,
        description: 'Sản phẩm này không tồn tại trong hệ thống.',
        features: [],
        images: []
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '/images/placeholder.jpg',
            quantity: quantity
        };

        if (addToCart(cartItem)) {
            toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
        } else {
            toast.error('Có lỗi khi thêm vào giỏ hàng');
        }
    };

    console.log(product);


    const handleBuyNow = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '/images/placeholder.jpg',
            quantity: quantity
        };

        if (addToCart(cartItem)) {
            navigate('/checkout');
        } else {
            toast.error('Có lỗi khi xử lý đơn hàng');
        }
    };

    return (
        <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
            <div className="max-w-7xl mx-auto p-6">
                {/* Back button */}
                <Link
                    to="/products"
                    className="inline-flex items-center mb-6 transition-colors hover:underline"
                    style={{ color: '#22C55E' }}
                >
                    <span className="mr-2">←</span>
                    Quay lại danh sách sản phẩm
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{/* Left Column - Images */}
                    {/* Left Column - Images */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Right Column - Product Info */}
                    <div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                            {/* Category & Stock */}
                            <div className="flex items-center justify-between mb-3">
                                <span
                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ backgroundColor: '#374151', color: '#22C55E' }}
                                >
                                    {product.category}
                                </span>
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: product.inStock ? '#22C55E' : '#EF4444' }}
                                >
                                    {product.inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
                                </span>
                            </div>

                            {/* Product Name */}
                            <h1
                                className="text-3xl font-bold mb-3"
                                style={{ color: '#F9FAFB' }}
                            >
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                <RatingStars rating={product.rating} size="md" />
                                <span className="ml-2" style={{ color: '#9CA3AF' }}>
                                    {product.rating} ({product.reviews} đánh giá)
                                </span>
                            </div>

                            {/* Specs */}
                            <p
                                className="text-lg mb-4 pb-4"
                                style={{ color: '#9CA3AF', borderBottom: '1px solid #374151' }}
                            >
                                {product.specs}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-sm mb-1" style={{ color: '#9CA3AF' }}>Giá bán:</p>
                                <p
                                    className="text-4xl font-bold"
                                    style={{ color: '#22C55E' }}
                                >
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                    style={{
                                        backgroundColor: '#374151',
                                        color: '#F9FAFB',
                                        border: '2px solid #22C55E',
                                        opacity: !product.inStock ? 0.5 : 1,
                                        cursor: !product.inStock ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    🛒 Thêm vào giỏ
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={!product.inStock}
                                    className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                    style={{
                                        backgroundColor: '#22C55E',
                                        color: '#111827',
                                        opacity: !product.inStock ? 0.5 : 1,
                                        cursor: !product.inStock ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Mua ngay
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: '1px solid #374151' }}>
                                <div className="text-center">
                                    <div style={{ color: '#22C55E', fontSize: '24px' }}>✓</div>
                                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Bảo hành 12 tháng</p>
                                </div>
                                <div className="text-center">
                                    <div style={{ color: '#22C55E', fontSize: '24px' }}>🚚</div>
                                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Miễn phí vận chuyển</p>
                                </div>
                                <div className="text-center">
                                    <div style={{ color: '#22C55E', fontSize: '24px' }}>↻</div>
                                    <p className="text-xs" style={{ color: '#9CA3AF' }}>Đổi trả 7 ngày</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <div className="mt-8">
                    <div className="rounded-lg p-6" style={{ backgroundColor: '#1F2937' }}>
                        {/* Description */}
                        <div className="mb-8">
                            <h2
                                className="text-2xl font-bold mb-4"
                                style={{ color: '#F9FAFB' }}
                            >
                                Mô tả sản phẩm
                            </h2>
                            <p
                                className="leading-relaxed"
                                style={{ color: '#9CA3AF' }}
                            >
                                {product.description}
                            </p>
                        </div>

                        {/* Features */}
                        <div>
                            <h2
                                className="text-2xl font-bold mb-4"
                                style={{ color: '#F9FAFB' }}
                            >
                                Thông số kỹ thuật
                            </h2>
                            <ProductSpecs features={product.features} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductDetail;

