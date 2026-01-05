import React from 'react';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    return (
        <div
            className="rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition"
            style={{ backgroundColor: '#1F2937' }}
        >
            <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FiShoppingCart className="text-gray-600" size={32} />
                    )}
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                    <p className="text-green-400 font-bold mb-3">
                        {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 rounded border border-gray-600 text-gray-400 hover:text-green-400 hover:border-green-400 transition"
                        >
                            <FiMinus size={16} />
                        </button>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center bg-gray-800 border border-gray-600 rounded text-white"
                            min="1"
                        />
                        <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 rounded border border-gray-600 text-gray-400 hover:text-green-400 hover:border-green-400 transition"
                        >
                            <FiPlus size={16} />
                        </button>
                    </div>
                </div>

                {/* Item Total & Remove */}
                <div className="flex flex-col items-end justify-between">
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                    >
                        <FiTrash2 size={20} />
                    </button>
                    <div className="text-right">
                        <p className="text-sm text-gray-400">Tổng cộng</p>
                        <p className="text-xl font-bold text-green-400">
                            {formatPrice(item.price * item.quantity)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
