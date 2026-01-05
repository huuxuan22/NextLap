import React from 'react';

const CartSummary = ({ subtotal, shipping, total, onCheckout, loading }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                Tóm tắt đơn hàng
            </h3>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between text-gray-300">
                    <span>Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                    <span>Phí vận chuyển</span>
                    <span className={shipping === 0 ? 'text-green-400' : ''}>
                        {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
                    </span>
                </div>

                {shipping === 0 && (
                    <p className="text-xs text-green-400">Miễn phí vận chuyển cho đơn hàng trên 500.000đ</p>
                )}
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-lg text-white font-semibold">Tổng cộng</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {formatPrice(total)}
                    </span>
                </div>
            </div>

            <button
                onClick={onCheckout}
                disabled={loading}
                className="w-full relative group py-3 rounded-lg overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                <span className="relative text-white font-medium">
                    {loading ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
                </span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Nhấn "Tiến hành thanh toán" để hoàn tất đơn hàng
            </p>
        </div>
    );
};

export default CartSummary;
