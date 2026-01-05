import React from 'react';

const PaymentMethodSelector = ({ paymentMethod, onChange, onBack, onNext }) => {
    const paymentMethods = [
        {
            value: 'cod',
            label: 'Thanh toán khi nhận hàng (COD)',
            description: 'Thanh toán bằng tiền mặt khi nhận hàng'
        },
        {
            value: 'bank',
            label: 'Chuyển khoản ngân hàng',
            description: 'Thanh toán qua chuyển khoản ngân hàng'
        },
        {
            value: 'momo',
            label: 'Ví MoMo',
            description: 'Thanh toán qua ví điện tử MoMo'
        },
        {
            value: 'vnpay',
            label: 'VNPay',
            description: 'Thanh toán qua cổng VNPay'
        }
    ];

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                Phương thức thanh toán
            </h2>

            <div className="space-y-4">
                {paymentMethods.map((method) => (
                    <label
                        key={method.value}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition ${paymentMethod === method.value
                                ? 'border-green-400 bg-gray-800'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                    >
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.value}
                                checked={paymentMethod === method.value}
                                onChange={onChange}
                                className="w-4 h-4 text-green-400"
                            />
                            <div className="ml-3">
                                <div className="text-white font-medium">{method.label}</div>
                                <div className="text-sm text-gray-400">{method.description}</div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition"
                >
                    Quay lại
                </button>
                <button
                    onClick={onNext}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-400 hover:to-emerald-400 transition"
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
};

export default PaymentMethodSelector;
