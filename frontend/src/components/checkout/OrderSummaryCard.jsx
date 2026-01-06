import React from 'react';

const OrderSummaryCard = ({ subtotal, shipping, total, formatPrice }) => {
    return (
        <div className="rounded-xl p-6 sticky top-8" style={{ backgroundColor: '#1F2937' }}>
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
                    <p className="text-xs text-green-400">
                        Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                    </p>
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

            <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Chính sách đổi trả</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Đổi trả miễn phí trong 7 ngày</li>
                    <li>• Bảo hành chính hãng</li>
                    <li>• Hỗ trợ 24/7</li>
                </ul>
            </div>
        </div>
    );
};

export default OrderSummaryCard;
