import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import {
    ShippingForm,
    PaymentMethodSelector,
    OrderReview,
    VerificationCode,
    ProgressSteps,
    OrderSummaryCard,
} from "../components/checkout";
import { validateShippingInfo } from "../utils/validation";
import {
    getCartFromStorage,
    clearCart,
    calculateSubtotal,
    calculateShipping,
    calculateTotal,
    formatPrice,
} from "../utils/cartUtils";
import paymentApi from "../api/paymentApi";

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    // Form states
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        ward: "",
        note: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");

    // Verification code state
    const [verificationCode, setVerificationCode] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);
    const [generatedCode, setGeneratedCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const handleNext = async () => {
        if (paymentMethod === "vnpay") {
            debugger;
            const res = await paymentApi.createPayment(100000);
            // Giả sử tổng đơn hàng là 100000 VND
            window.location.href = res.payment_url; // Redirect sang VNPay
        } else {
            setCurrentStep(3); // Tiếp tục bước kế tiếp cho COD
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const items = getCartFromStorage();
        if (items.length === 0) {
            toast.warning("Giỏ hàng trống!");
            navigate("/cart");
        }
        setCartItems(items);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async () => {
        if (!validateShippingInfo(shippingInfo)) return;

        setLoading(true);
        try {
            // Generate 6-digit verification code
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedCode(code);

            // Simulate sending verification code
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success(`Mã xác nhận đã được gửi đến ${shippingInfo.email}`);
            toast.info(`Mã của bạn là: ${code} (Demo)`);

            // Move to verification step
            setCurrentStep(4);
        } catch (error) {
            console.error("Error sending verification code:", error);
            toast.error("Có lỗi xảy ra khi gửi mã xác nhận");
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationInput = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only allow numbers

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleVerificationKeyDown = (index, e) => {
        if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerifyCode = async () => {
        const enteredCode = verificationCode.join("");

        if (enteredCode.length !== 6) {
            toast.error("Vui lòng nhập đủ 6 số");
            return;
        }

        setIsVerifying(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));


            toast.success("Xác nhận thành công!");
            clearCart();

            setTimeout(() => {
                navigate("/payment-result?vnp_ResponseCode=00");
            }, 1000);
        } catch (error) {
            console.error("Error verifying code:", error);
            toast.error("Có lỗi xảy ra khi xác nhận");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedCode(code);
            setVerificationCode(["", "", "", "", "", ""]);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            toast.success("Đã gửi lại mã xác nhận!");
            toast.info(`Mã mới của bạn là: ${code} (Demo)`);
        } catch (error) {
            toast.error("Có lỗi khi gửi lại mã");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { id: 1, name: "Thông tin giao hàng" },
        { id: 2, name: "Phương thức thanh toán" },
        { id: 3, name: "Xác nhận đơn hàng" },
        { id: 4, name: "Xác thực mã" },
    ];

    const subtotal = calculateSubtotal(cartItems);
    const shipping = calculateShipping(subtotal);
    const total = calculateTotal(cartItems);

    return (
        <div className="min-h-screen py-8" style={{ backgroundColor: "#111827" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate("/cart")}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
                    >
                        <FiArrowLeft /> Quay lại giỏ hàng
                    </button>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <FiShoppingBag className="text-green-400" />
                        Thanh toán
                    </h1>
                </div>

                {/* Progress Steps */}
                <ProgressSteps currentStep={currentStep} steps={steps} />

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Shipping Information */}
                        {currentStep === 1 && (
                            <ShippingForm
                                shippingInfo={shippingInfo}
                                onChange={handleInputChange}
                                onNext={() => setCurrentStep(2)}
                                onValidate={() => validateShippingInfo(shippingInfo)}
                            />
                        )}

                        {/* Step 2: Payment Method */}
                        {currentStep === 2 && (
                            <PaymentMethodSelector
                                paymentMethod={paymentMethod}
                                onChange={handlePaymentChange}
                                onBack={() => setCurrentStep(1)}
                                onNext={handleNext}
                            />
                        )}

                        {/* Step 3: Order Confirmation */}
                        {currentStep === 3 && (
                            <OrderReview
                                shippingInfo={shippingInfo}
                                paymentMethod={paymentMethod}
                                cartItems={cartItems}
                                formatPrice={formatPrice}
                                onEditShipping={() => setCurrentStep(1)}
                                onEditPayment={() => setCurrentStep(2)}
                                onBack={() => setCurrentStep(2)}
                                onPlaceOrder={handlePlaceOrder}
                                loading={loading}
                            />
                        )}

                        {/* Step 4: Verification Code */}
                        {currentStep === 4 && (
                            <VerificationCode
                                verificationCode={verificationCode}
                                email={shippingInfo.email}
                                onInputChange={handleVerificationInput}
                                onKeyDown={handleVerificationKeyDown}
                                onVerify={handleVerifyCode}
                                onResend={handleResendCode}
                                onBack={() => {
                                    setCurrentStep(3);
                                    setVerificationCode(["", "", "", "", "", ""]);
                                }}
                                isVerifying={isVerifying}
                                loading={loading}
                            />
                        )}
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <OrderSummaryCard
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                            formatPrice={formatPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
