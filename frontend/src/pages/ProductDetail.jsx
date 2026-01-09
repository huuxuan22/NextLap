import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductGallery from '../components/ProductGallery';
import ProductSpecs from '../components/ProductSpecs';
import QuantitySelector from '../components/QuantitySelector';
import productApi from '../api/productApi';
import { formatPrice } from '../utils/formatPrice';
import { addToCart } from '../utils/cartUtils';

/**
 * ProductDetail - Trang chi tiết sản phẩm laptop
 */
const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy thông tin sản phẩm từ API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await productApi.getById(id);
                if (response && response.data) {
                    setProduct(response.data);
                } else {
                    setError('Sản phẩm không tồn tại');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Không thể tải thông tin sản phẩm');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Hiển thị loading
    if (loading) {
        return (
            <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
                <div className="max-w-7xl mx-auto p-6 flex items-center justify-center" style={{ minHeight: '60vh' }}>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <p style={{ color: '#9CA3AF' }}>Đang tải thông tin sản phẩm...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Hiển thị lỗi
    if (error || !product) {
        return (
            <div style={{ backgroundColor: '#111827', minHeight: '100vh' }}>
                <div className="max-w-7xl mx-auto p-6">
                    <Link
                        to="/products"
                        className="inline-flex items-center mb-6 transition-colors hover:underline"
                        style={{ color: '#22C55E' }}
                    >
                        <span className="mr-2">←</span>
                        Quay lại danh sách sản phẩm
                    </Link>
                    <div className="text-center py-20">
                        <p className="text-2xl font-bold mb-4" style={{ color: '#EF4444' }}>
                            {error || 'Sản phẩm không tồn tại'}
                        </p>
                        <p style={{ color: '#9CA3AF' }}>Vui lòng thử lại hoặc chọn sản phẩm khác.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Xử lý dữ liệu sản phẩm từ API
    const productImages = product.spec?.images || [];
    const inStock = product.spec?.quantity_in_stock > 0;
    const brandName = product.brand?.name || 'Không xác định';

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: productImages[0] || '/images/placeholder.jpg',
            quantity: quantity
        };

        if (addToCart(cartItem)) {
            toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
        } else {
            toast.error('Có lỗi khi thêm vào giỏ hàng');
        }
    };

    const handleBuyNow = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: productImages[0] || '/images/placeholder.jpg',
            quantity: quantity
        };

        if (addToCart(cartItem)) {
            navigate('/checkout');
        } else {
            toast.error('Có lỗi khi xử lý đơn hàng');
        }
    };

    // Tạo danh sách thông số kỹ thuật từ spec
    const getSpecFeatures = () => {
        const features = [];
        if (product.spec) {
            if (product.spec.ram) features.push(`RAM: ${product.spec.ram}`);
            if (product.spec.chip) features.push(`CPU: ${product.spec.chip}`);
            if (product.spec.screen) features.push(`Màn hình: ${product.spec.screen}`);
            if (product.spec.battery) features.push(`Pin: ${product.spec.battery}`);
            if (product.spec.camera) features.push(`Camera: ${product.spec.camera}`);
            if (product.spec.quantity_in_stock !== undefined) features.push(`Số lượng: ${product.spec.quantity_in_stock} sản phẩm`);
        }
        return features;
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
                    <ProductGallery images={productImages} productName={product.name} />

                    {/* Right Column - Product Info */}
                    <div>
                        <div className="p-6 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                            {/* Category & Stock */}
                            <div className="flex items-center justify-between mb-3">
                                <span
                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ backgroundColor: '#374151', color: '#22C55E' }}
                                >
                                    {brandName}
                                </span>
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: inStock ? '#22C55E' : '#EF4444' }}
                                >
                                    {inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
                                </span>
                            </div>

                            {/* Product Name */}
                            <h1
                                className="text-3xl font-bold mb-3"
                                style={{ color: '#F9FAFB' }}
                            >
                                {product.name}
                            </h1>

                            {/* Specs Summary */}
                            <div className="flex items-center mb-4">
                                {product.spec?.ram && (
                                    <span className="px-2 py-1 mr-2 rounded text-sm" style={{ backgroundColor: '#374151', color: '#9CA3AF' }}>
                                        {product.spec.ram}
                                    </span>
                                )}
                                {product.spec?.chip && (
                                    <span className="px-2 py-1 mr-2 rounded text-sm" style={{ backgroundColor: '#374151', color: '#9CA3AF' }}>
                                        {product.spec.chip}
                                    </span>
                                )}
                            </div>

                            {/* Specs */}
                            {product.description && (
                                <p
                                    className="text-lg mb-4 pb-4"
                                    style={{ color: '#9CA3AF', borderBottom: '1px solid #374151' }}
                                >
                                    {product.description}
                                </p>
                            )}

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
                                <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={product.spec?.quantity_in_stock || 1} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mb-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!inStock}
                                    className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                    style={{
                                        backgroundColor: '#374151',
                                        color: '#F9FAFB',
                                        border: '2px solid #22C55E',
                                        opacity: !inStock ? 0.5 : 1,
                                        cursor: !inStock ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    🛒 Thêm vào giỏ
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={!inStock}
                                    className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                                    style={{
                                        backgroundColor: '#22C55E',
                                        color: '#111827',
                                        opacity: !inStock ? 0.5 : 1,
                                        cursor: !inStock ? 'not-allowed' : 'pointer'
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
                        {product.description && (
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
                        )}

                        {/* Features */}
                        <div>
                            <h2
                                className="text-2xl font-bold mb-4"
                                style={{ color: '#F9FAFB' }}
                            >
                                Thông số kỹ thuật
                            </h2>
                            <ProductSpecs features={getSpecFeatures()} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductDetail;

