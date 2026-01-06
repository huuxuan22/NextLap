import React from 'react';

const OrderReview = ({
    shippingInfo,
    paymentMethod,
    cartItems,
    formatPrice,
    onEditShipping,
    onEditPayment,
    onBack,
    onPlaceOrder,
    loading
}) => {
    const getPaymentMethodLabel = (method) => {
        const methods = {
            cod: 'Thanh toán khi nhận hàng (COD)',
            bank: 'Chuyển khoản ngân hàng',
            momo: 'Ví MoMo',
            vnpay: 'VNPay'
        };
        return methods[method] || method;
    };

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                Xác nhận đơn hàng
            </h2>

            {/* Shipping Info Review */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Thông tin giao hàng</h3>
                <div className="bg-gray-800 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                        <span className="text-gray-400">Họ tên:</span>
                        <span className="text-white font-medium">{shippingInfo.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Email:</span>
                        <span className="text-white">{shippingInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Số điện thoại:</span>
                        <span className="text-white">{shippingInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-400">Địa chỉ:</span>
                        <span className="text-white text-right max-w-md">
                            {shippingInfo.address}
                            {shippingInfo.ward && `, ${shippingInfo.ward}`}
                            {shippingInfo.district && `, ${shippingInfo.district}`}
                            {shippingInfo.city && `, ${shippingInfo.city}`}
                        </span>
                    </div>
                    {shippingInfo.note && (
                        <div className="flex justify-between">
                            <span className="text-gray-400">Ghi chú:</span>
                            <span className="text-white text-right max-w-md">{shippingInfo.note}</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={onEditShipping}
                    className="mt-2 text-green-400 text-sm hover:text-green-300 transition"
                >
                    Chỉnh sửa
                </button>
            </div>

            {/* Payment Method Review */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Phương thức thanh toán</h3>
                <div className="bg-gray-800 rounded-lg p-4">
                    <span className="text-white">{getPaymentMethodLabel(paymentMethod)}</span>
                </div>
                <button
                    onClick={onEditPayment}
                    className="mt-2 text-green-400 text-sm hover:text-green-300 transition"
                >
                    Chỉnh sửa
                </button>
            </div>

            {/* Products Review */}
            <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                    Sản phẩm ({cartItems.length})
                </h3>
                <div className="space-y-3">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 bg-gray-800 rounded-lg p-4"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{item.name}</h4>
                                <p className="text-gray-400 text-sm">Số lượng: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-green-400 font-semibold">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition"
                >
                    Quay lại
                </button>
                <button
                    onClick={onPlaceOrder}
                    disabled={loading}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-400 hover:to-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Đang xử lý...' : 'Đặt hàng'}
                </button>
            </div>
        </div>
    );
};

export default OrderReview;
