import cartApi from '../api/cartApi';
import { getToken } from './storage';

// ================== LOCAL STORAGE FUNCTIONS ==================

export const getCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart:', error);
        return [];
    }
};

export const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    } catch (error) {
        console.error('Error saving cart:', error);
        return false;
    }
};

export const clearCartStorage = () => {
    try {
        localStorage.removeItem('cart');
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
};

// ================== HYBRID CART FUNCTIONS ==================
// Sử dụng API nếu đã đăng nhập, localStorage nếu chưa đăng nhập

/**
 * Kiểm tra user đã đăng nhập chưa
 */
const isLoggedIn = () => {
    return !!getToken();
};

/**
 * Thêm sản phẩm vào giỏ hàng
 * - Nếu đã đăng nhập: gọi API
 * - Nếu chưa đăng nhập: lưu localStorage
 */
export const addToCart = async (item) => {
    try {
        if (isLoggedIn()) {
            // User đã đăng nhập - gọi API
            await cartApi.addToCart(item.id, item.quantity, item.price);
            return true;
        } else {
            // Guest - lưu localStorage
            const cart = getCartFromStorage();
            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += item.quantity;
            } else {
                cart.push(item);
            }

            return saveCartToStorage(cart);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        // Fallback to localStorage if API fails
        try {
            const cart = getCartFromStorage();
            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += item.quantity;
            } else {
                cart.push(item);
            }

            return saveCartToStorage(cart);
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            return false;
        }
    }
};

/**
 * Lấy giỏ hàng
 * - Nếu đã đăng nhập: gọi API
 * - Nếu chưa đăng nhập: lấy từ localStorage
 */
export const getCart = async () => {
    try {
        if (isLoggedIn()) {
            const response = await cartApi.getCart();
            return response.data || { cart_items: [] };
        } else {
            return { cart_items: getCartFromStorage() };
        }
    } catch (error) {
        console.error('Error getting cart:', error);
        return { cart_items: [] };
    }
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 */
export const updateCartItemQuantity = async (itemId, newQuantity) => {
    try {
        if (isLoggedIn()) {
            await cartApi.updateCartItem(itemId, newQuantity);
            return true;
        } else {
            const cart = getCartFromStorage();
            const updatedCart = cart.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
            return saveCartToStorage(updatedCart);
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return false;
    }
};

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
export const removeFromCart = async (itemId) => {
    try {
        if (isLoggedIn()) {
            await cartApi.removeFromCart(itemId);
            return true;
        } else {
            const cart = getCartFromStorage();
            const updatedCart = cart.filter(item => item.id !== itemId);
            return saveCartToStorage(updatedCart);
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        return false;
    }
};

/**
 * Xóa toàn bộ giỏ hàng
 */
export const clearCart = async () => {
    try {
        if (isLoggedIn()) {
            await cartApi.clearCart();
        }
        clearCartStorage();
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
};

/**
 * Đồng bộ giỏ hàng localStorage lên server khi đăng nhập
 */
export const syncCartOnLogin = async () => {
    try {
        const localCart = getCartFromStorage();
        if (localCart.length > 0) {
            // Thêm từng item từ localStorage lên server
            for (const item of localCart) {
                await cartApi.addToCart(item.id, item.quantity, item.price);
            }
            // Xóa localStorage sau khi đồng bộ
            clearCartStorage();
        }
        return true;
    } catch (error) {
        console.error('Error syncing cart:', error);
        return false;
    }
};

export const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculateShipping = (subtotal, freeShippingThreshold = 500000) => {
    return subtotal >= freeShippingThreshold ? 0 : 30000;
};

export const calculateTotal = (cartItems) => {
    const subtotal = calculateSubtotal(cartItems);
    const shipping = calculateShipping(subtotal);
    return subtotal + shipping;
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};
