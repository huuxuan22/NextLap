import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartEmpty, CartItem, CartSummary } from '../components/cart';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCartFromLocalStorage();
    }, []);

    const loadCartFromLocalStorage = () => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    const saveCartToLocalStorage = (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const updated = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updated);
        saveCartToLocalStorage(updated);
    };

    const handleRemoveItem = (itemId) => {
        const updated = cartItems.filter(item => item.id !== itemId);
        setCartItems(updated);
        saveCartToLocalStorage(updated);
        toast.success('Xóa sản phẩm khỏi giỏ hàng');
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            toast.error('Giỏ hàng trống!');
            return;
        }

        setLoading(true);
        try {
            // TODO: Integrate with order API
            toast.success('Đặt hàng thành công!');
            setCartItems([]);
            saveCartToLocalStorage([]);
            navigate('/');
        } catch (error) {
            toast.error('Lỗi khi đặt hàng!');
        } finally {
            setLoading(false);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shipping = subtotal > 500000 ? 0 : 30000;
        return subtotal + shipping;
    };

    const subtotal = calculateSubtotal();
    const shipping = subtotal > 500000 ? 0 : 30000;
    const total = calculateTotal();

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
