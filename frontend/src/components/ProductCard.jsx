import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

/**
 * ProductCard - Component card hiển thị sản phẩm
 */
const ProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHoveringHeart, setIsHoveringHeart] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false); // State cho hover ảnh

    // Format giá tiền VND
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Lấy mảng ảnh từ product.spec.images
    const getProductImages = () => {
        // Kiểm tra xem có tồn tại spec và spec.images không
        if (product.spec && product.spec.images && Array.isArray(product.spec.images)) {
            return product.spec.images;
        }

        // Fallback nếu không có spec.images
        if (product.images && Array.isArray(product.images)) {
            return product.images;
        }

        // Trả về mảng rỗng nếu không có ảnh nào
        return [];
    };

    // Lấy hình ảnh phù hợp dựa trên hover
    const getDisplayImage = () => {
        const images = getProductImages();

        if (images.length === 0) {
            return null;
        }

        // Nếu đang hover và có ảnh thứ 2, hiển thị ảnh thứ 2
        // Ngược lại hiển thị ảnh đầu tiên
        if (isHoveringImage && images.length > 1) {
            return images[1];
        }
        return images[0];
    };

    const images = getProductImages();
    const displayImage = getDisplayImage();
    const hasMultipleImages = images.length > 1;

    // Xử lý click wishlist
    const handleWishlistClick = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
        // Thêm logic xử lý wishlist ở đây
        console.log(`${isWishlisted ? 'Xóa' : 'Thêm'} sản phẩm vào wishlist:`, product.id);
    };

    return (
        <Link
            to={`/products/${product.id}`}
            className="block overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group h-full flex flex-col"
            style={{
                backgroundColor: '#111827',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
        >
            {/* Product Image */}
            <div
                className="relative w-full h-64 bg-gray-800 overflow-hidden"
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
            >
                {displayImage ? (
                    <>
                        {/* Ảnh chính */}
                        <img
                            src={displayImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-500"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                            }}
                        />

                        {/* Badge hiển thị số lượng ảnh */}
                        {hasMultipleImages && (
                            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black bg-opacity-60 backdrop-blur-sm flex items-center gap-1 z-20">
                                <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span className="text-xs text-white">{images.length}</span>
                            </div>
                        )}
                    </>
                ) : (
                    /* Fallback khi không có ảnh */
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: '#1F2937' }}
                    >
                        <div className="text-center px-4">
                            <svg
                                className="w-12 h-12 mx-auto mb-3"
                                fill="none"
                                stroke="#4B5563"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-500 text-sm font-medium">
                                {product.name}
                            </span>
                        </div>
                    </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                {/* Wishlist button với hover effect */}
                <button
                    className="absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 hover:scale-110 z-10"
                    style={{
                        backgroundColor: 'rgba(31, 41, 55, 0.8)',
                        backdropFilter: 'blur(4px)'
                    }}
                    onClick={handleWishlistClick}
                    onMouseEnter={() => setIsHoveringHeart(true)}
                    onMouseLeave={() => setIsHoveringHeart(false)}
                    title={isWishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
                >
                    <svg
                        className="w-5 h-5 transition-all duration-300"
                        fill={isWishlisted || isHoveringHeart ? "#EF4444" : "none"}
                        stroke={isWishlisted || isHoveringHeart ? "#EF4444" : "#F9FAFB"}
                        strokeWidth={isWishlisted || isHoveringHeart ? 2 : 1.5}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

                {/* Discount badge (nếu có) */}
                {product.discount && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold">
                        -{product.discount}%
                    </div>
                )}

                {/* Hiệu ứng chuyển ảnh khi có nhiều ảnh */}
                {hasMultipleImages && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className={`w-8 h-8 rounded-full bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isHoveringImage ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}>
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Info - Sử dụng flex-grow để chiếm không gian còn lại */}
            <div className="p-6 flex-grow flex flex-col">
                {/* Category tag */}
                {product.category && (
                    <div className="inline-block px-3 py-1 mb-3 text-xs font-medium"
                        style={{ backgroundColor: '#374151', color: '#9CA3AF' }}>
                        {product.category}
                    </div>
                )}

                <h2
                    className="text-lg font-bold mb-2 flex-grow-0"
                    style={{ color: '#F9FAFB' }}
                >
                    {product.name}
                </h2>

                <p
                    className="text-sm mb-4 flex-grow"
                    style={{ color: '#9CA3AF' }}
                >
                    {product.specs || (product.spec && product.spec.description) || ''}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4 flex-grow-0">
                    <RatingStars rating={product.rating} size="sm" />
                    <span className="ml-2 text-sm" style={{ color: '#9CA3AF' }}>
                        ({product.reviewCount || 0} đánh giá)
                    </span>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-4 border-t flex-grow-0"
                    style={{ borderColor: '#374151' }}>
                    <div>
                        <p
                            className="text-xl font-bold"
                            style={{ color: '#22C55E' }}
                        >
                            {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-sm line-through" style={{ color: '#9CA3AF' }}>
                                {formatPrice(product.originalPrice)}
                            </p>
                        )}
                    </div>

                    {/* Add to cart button */}
                    <button
                        className="p-3 transition-all duration-300 hover:scale-110 group/cart flex-shrink-0"
                        style={{
                            backgroundColor: '#22C55E',
                            color: '#111827'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic here
                        }}
                        title="Thêm vào giỏ hàng"
                    >
                        <svg
                            className="w-5 h-5 transform group-hover/cart:rotate-12 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>

                {/* Additional info */}
                {product.inStock !== undefined && (
                    <div className="mt-4 text-xs flex items-center flex-grow-0" style={{ color: '#9CA3AF' }}>
                        <div className={`w-2 h-2 mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;