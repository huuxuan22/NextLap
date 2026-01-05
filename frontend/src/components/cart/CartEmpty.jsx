import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CartEmpty = () => {
    return (
        <div className="rounded-xl p-12 text-center" style={{ backgroundColor: '#1F2937' }}>
            <FiShoppingCart className="mx-auto text-gray-600 mb-4" size={64} />
            <h2 className="text-2xl font-semibold text-white mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-400 mb-6">Hãy thêm sản phẩm để tiếp tục mua sắm</p>
            <Link
                to="/products"
                className="inline-block px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition"
            >
                Xem sản phẩm
            </Link>
        </div>
    );
};

export default CartEmpty;
