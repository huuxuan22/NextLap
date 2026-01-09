import axiosClient from './axiosClient';

const cartApi = {
    /**
     * Lấy giỏ hàng của user hiện tại
     */
    getCart: () => axiosClient.get('/carts'),

    /**
     * Thêm sản phẩm vào giỏ hàng
     * @param {number} productId - ID sản phẩm
     * @param {number} quantity - Số lượng
     * @param {number} price - Giá sản phẩm
     */
    addToCart: (productId, quantity = 1, price = null) =>
        axiosClient.post('/carts/items', {
            product_id: productId,
            quantity: quantity,
            price: price
        }),

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng
     * @param {number} itemId - ID của cart item
     * @param {number} quantity - Số lượng mới
     */
    updateCartItem: (itemId, quantity) =>
        axiosClient.put(`/carts/items/${itemId}`, {
            product_id: 0, // Required by backend but not used for update
            quantity: quantity
        }),

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     * @param {number} itemId - ID của cart item
     */
    removeFromCart: (itemId) => axiosClient.delete(`/carts/items/${itemId}`),

    /**
     * Xóa toàn bộ giỏ hàng
     */
    clearCart: () => axiosClient.delete('/carts'),
};

export default cartApi;
