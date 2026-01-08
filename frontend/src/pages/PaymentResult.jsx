import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
    const [status, setStatus] = useState("loading");
    const [orderInfo, setOrderInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("vnp_TxnRef");
        const responseCode = params.get("vnp_ResponseCode");


        setOrderInfo({
            orderId: orderId,
            amount: params.get("vnp_Amount"),
            bankCode: params.get("vnp_BankCode"),
            transactionDate: params.get("vnp_PayDate")
        });


        if (responseCode === "00") {
            setStatus("success");
        } else {
            setStatus("failed");
        }


    }, []);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-400 mx-auto"></div>
                        <div className="absolute inset-0 rounded-full h-20 w-20 border-t-4 border-b-4 border-emerald-500 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                    </div>
                    <p className="mt-6 text-xl font-medium text-gray-300">Đang xử lý thanh toán...</p>
                    <p className="mt-2 text-sm text-gray-500">Vui lòng đợi trong giây lát</p>
                </div>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: '#111827' }}>
                <div className="max-w-lg w-full">
                    {/* Card chính */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                        {/* Header với animation */}
                        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-12 text-center overflow-hidden">
                            <div className="absolute inset-0 bg-black opacity-10"></div>
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>

                            {/* Icon thành công với animation */}
                            <div className="relative flex justify-center mb-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                                    <div className="relative bg-white rounded-full p-5 shadow-lg">
                                        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <h1 className="relative text-4xl font-bold text-white mb-2 animate-fade-in">
                                Thanh toán thành công!
                            </h1>
                            <p className="relative text-green-50 text-lg">
                                Đơn hàng của bạn đã được xác nhận
                            </p>
                        </div>

                        {/* Body */}
                        <div className="p-8">

                            {orderInfo && (
                                <div className="bg-gray-800/50 rounded-xl p-5 mb-6 border border-gray-700 backdrop-blur-sm">
                                    <h3 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Thông tin đơn hàng
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                                            <span className="text-gray-400 text-sm">Mã đơn hàng</span>
                                            <span className="font-mono font-semibold text-white bg-gray-700/50 px-3 py-1 rounded-lg text-sm">
                                                {orderInfo.orderId || 'N/A'}
                                            </span>
                                        </div>
                                        {orderInfo.amount && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                                                <span className="text-gray-400 text-sm">Số tiền</span>
                                                <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                                    {(parseInt(orderInfo.amount) / 100).toLocaleString('vi-VN')} VNĐ
                                                </span>
                                            </div>
                                        )}
                                        {orderInfo.bankCode && (
                                            <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                                                <span className="text-gray-400 text-sm">Ngân hàng</span>
                                                <span className="font-semibold text-white uppercase">{orderInfo.bankCode}</span>
                                            </div>
                                        )}
                                        {orderInfo.transactionDate && (
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-400 text-sm">Thời gian</span>
                                                <span className="font-semibold text-white">{orderInfo.transactionDate}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư!
                                    </p>
                                </div>
                            </div>


                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full relative group py-4 rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="relative text-white font-bold text-lg flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        Xem đơn hàng
                                    </span>
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full py-4 rounded-xl font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all hover:scale-105 active:scale-95"
                                >
                                    Về trang chủ
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer note */}
                    <p className="text-center text-gray-500 text-sm mt-6">
                        Cảm ơn bạn đã mua sắm tại NextLap! 🎉
                    </p>
                </div>
            </div>
        );
    }

    // Trạng thái thất bại
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: '#111827' }}>
            <div className="max-w-lg w-full">
                {/* Card chính */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
                    {/* Header với animation */}
                    <div className="relative bg-gradient-to-r from-red-500 to-orange-500 px-8 py-12 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
                            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Icon thất bại với animation */}
                        <div className="relative flex justify-center mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                                <div className="relative bg-white rounded-full p-5 shadow-lg">
                                    <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <h1 className="relative text-4xl font-bold text-white mb-2">
                            Thanh toán thất bại
                        </h1>
                        <p className="relative text-red-50 text-lg">
                            Đã có lỗi xảy ra trong quá trình thanh toán
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {/* Thông tin giao dịch */}
                        {orderInfo && orderInfo.orderId && (
                            <div className="bg-gray-800/50 rounded-xl p-5 mb-6 border border-gray-700 backdrop-blur-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Mã giao dịch</span>
                                    <span className="font-mono font-semibold text-white bg-gray-700/50 px-3 py-1 rounded-lg text-sm">
                                        {orderInfo.orderId}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Thông báo lỗi */}
                        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300 leading-relaxed mb-2">
                                        Giao dịch không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Nếu số tiền đã bị trừ, vui lòng liên hệ ngay để được hoàn tiền.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Các nút hành động */}
                        <div className="space-y-3">
                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full relative group py-4 rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative text-white font-bold text-lg flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Thử lại thanh toán
                                </span>
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-4 rounded-xl font-semibold text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all hover:scale-105 active:scale-95"
                            >
                                Về trang chủ
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    Cần hỗ trợ? Liên hệ: support@nextlap.com
                </p>
            </div>
        </div>
    );
}
