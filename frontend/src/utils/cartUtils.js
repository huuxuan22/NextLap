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

export const clearCart = () => {
    try {
        localStorage.removeItem('cart');
        return true;
    } catch (error) {
        console.error('Error clearing cart:', error);
        return false;
    }
};

export const addToCart = (item) => {
    try {
        const cart = getCartFromStorage();
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += item.quantity;
        } else {
            cart.push(item);
        }

        return saveCartToStorage(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        return false;
    }
};

export const updateCartItemQuantity = (itemId, newQuantity) => {
    try {
        const cart = getCartFromStorage();
        const updatedCart = cart.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        return saveCartToStorage(updatedCart) ? updatedCart : cart;
    } catch (error) {
        console.error('Error updating cart:', error);
        return getCartFromStorage();
    }
};

export const removeFromCart = (itemId) => {
    try {
        const cart = getCartFromStorage();
        const updatedCart = cart.filter(item => item.id !== itemId);
        return saveCartToStorage(updatedCart) ? updatedCart : cart;
    } catch (error) {
        console.error('Error removing from cart:', error);
        return getCartFromStorage();
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
