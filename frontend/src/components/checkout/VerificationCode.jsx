import React from 'react';

const VerificationCode = ({
    verificationCode,
    email,
    onInputChange,
    onKeyDown,
    onVerify,
    onResend,
    onBack,
    isVerifying,
    loading
}) => {
    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                Xác thực đơn hàng
            </h2>

            <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-lg text-white font-semibold mb-2">
                    Nhập mã xác nhận
                </h3>
                <p className="text-gray-400">
                    Chúng tôi đã gửi mã xác nhận 6 số đến
                </p>
                <p className="text-green-400 font-medium mt-1">
                    {email}
                </p>
            </div>

            {/* Verification Code Input */}
            <div className="flex justify-center gap-3 mb-6">
                {verificationCode.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => onInputChange(index, e.target.value)}
                        onKeyDown={(e) => onKeyDown(index, e)}
                        className="w-14 h-14 text-center text-2xl font-bold rounded-lg bg-gray-800 border-2 border-gray-700 text-white focus:outline-none focus:border-green-400 transition"
                    />
                ))}
            </div>

            {/* Resend Code */}
            <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">
                    Không nhận được mã?
                </p>
                <button
                    onClick={onResend}
                    disabled={loading}
                    className="text-green-400 hover:text-green-300 font-medium text-sm transition disabled:opacity-50"
                >
                    Gửi lại mã
                </button>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-6 py-3 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition"
                >
                    Quay lại
                </button>
                <button
                    onClick={onVerify}
                    disabled={isVerifying || verificationCode.join('').length !== 6}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:from-green-400 hover:to-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isVerifying ? 'Đang xác thực...' : 'Xác nhận'}
                </button>
            </div>
        </div>
    );
};

export default VerificationCode;
