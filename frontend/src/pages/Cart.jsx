import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartEmpty, CartItem, CartSummary } from '../components/cart';
import {
    getCartFromStorage,
    saveCartToStorage,
    updateCartItemQuantity,
    removeFromCart,
    calculateSubtotal,
    calculateShipping,
    calculateTotal
} from '../utils/cartUtils';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        setCartItems(getCartFromStorage());
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        const updated = updateCartItemQuantity(itemId, newQuantity);
        setCartItems(updated);
    };

    const handleRemoveItem = (itemId) => {
        const updated = removeFromCart(itemId);
        setCartItems(updated);
        toast.success('Xóa sản phẩm khỏi giỏ hàng');
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error('Giỏ hàng trống!');
            return;
        }

        navigate('/checkout');
    };

    const subtotal = calculateSubtotal(cartItems);
    const shipping = calculateShipping(subtotal);
    const total = calculateTotal(cartItems);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#111827' }}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition mb-6"
                >
                    <FiArrowLeft />
                    <span>Tiếp tục mua sắm</span>
                </button>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 flex items-center gap-2">
                        <FiShoppingCart />
                        Giỏ hàng
                    </h1>
                    <p className="text-gray-400">
                        {cartItems.length} sản phẩm
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    <CartEmpty />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <CartSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                            onCheckout={handleCheckout}
                            loading={loading}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
