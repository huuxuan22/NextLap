/**
 * Format giá tiền theo định dạng VND
 * @param {number} price - Giá cần format
 * @returns {string} Giá đã được format
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

/**
 * Lọc sản phẩm theo mức giá
 * @param {number} price - Giá sản phẩm
 * @param {string} priceRange - Khoảng giá ('0-30', '30-40', '40-50', '50+')
 * @returns {boolean} True nếu sản phẩm nằm trong khoảng giá
 */
export const filterByPriceRange = (price, priceRange) => {
    if (priceRange === 'all') return true;

    const priceInMillions = price / 1000000;

    switch (priceRange) {
        case '0-30':
            return priceInMillions < 30;
        case '30-40':
            return priceInMillions >= 30 && priceInMillions < 40;
        case '40-50':
            return priceInMillions >= 40 && priceInMillions < 50;
        case '50+':
            return priceInMillions >= 50;
        default:
            return true;
    }
};
