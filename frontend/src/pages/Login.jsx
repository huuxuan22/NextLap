import React, { useState, useEffect, useRef } from "react";
import {
    Link,
    useNavigate,
    useLocation,
    useSearchParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authApi from "../api/authApi";
import { useToast } from "../components/Toast";
import { setToken } from "../utils/storage";
import Spinner from "../components/Spinner.jsx";

const loginSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();
    const hasShowToast = useRef(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isClosePopup, setIsClosePopup] = useState(false);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type !== "OAUTH_RESPONSE") return;

            if (
                event.origin !== window.location.origin &&
                !event.origin.includes("localhost") &&
                !event.origin.includes("127.0.0.1")
            ) {
                console.warn(
                    "[Login] Origin mismatch, ignoring message:",
                    event.origin
                );
                return;
            }

            const { status, oauth, accessToken, userData } = event.data;

            if (status === "success" && accessToken) {
                setToken(accessToken);
                localStorage.setItem("access_token", accessToken);
                if (userData) {
                    localStorage.setItem("user_principal", JSON.stringify(userData));
                }

                showToast({
                    type: "success",
                    message: `Đăng nhập ${oauth} thành công!`,
                    duration: 3000,
                });

                // Redirect sau 1s để user thấy toast
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                console.error("Login failed");
                showToast({
                    type: "error",
                    message: "Đăng nhập thất bại",
                    duration: 4000,
                });
            }

            setIsClosePopup(false);
            setIsLoading(false)
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [navigate, showToast]);

    useEffect(() => {
        if (location.state?.message && !hasShowToast.current) {
            hasShowToast.current = true;
            showToast({
                type: "success",
                message: location.state.message,
                duration: 5000,
            });
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, showToast, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await authApi.login(data);
            debugger;
            if (response.code === "200") {
                setToken(response.data.access_token);
                const { access_token, user_principal } = response.data;

                localStorage.setItem("access_token", access_token);
                localStorage.setItem("user_principal", JSON.stringify(user_principal));

                showToast({
                    type: "success",
                    message: "Đăng nhập thành công!",
                    duration: 3000,
                });

                navigate("/"); // Redirect to home
            } else {
                showToast({
                    type: "error",
                    message: response.data.message || "Login failed",
                    duration: 4000,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage =
                error.response?.data?.detail || "Đăng nhập thất bại vui lòng đăng nhập lại";
            showToast({
                type: "error",
                message: errorMessage,
                duration: 4000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginGoogle = () => {
        setIsClosePopup(true);
        const popup = authApi.loginWithGoogle(); // Bỏ await

        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup cho trang này.");
            setIsClosePopup(false);
            return;
        }

        // check user đóng popup thủ công
        const popupCheckInterval = setInterval(() => {
            if (popup.closed) {
                clearInterval(popupCheckInterval);
                setIsClosePopup(false);
            }
        }, 500);
    };

    const handleLoginFacebook = () => {
        setIsClosePopup(true);
        const popup = authApi.loginWithFacebook(); // Bỏ await

        if (!popup) {
            alert("Popup bị chặn! Vui lòng cho phép popup cho trang này.");
            setIsClosePopup(false);
            return;
        }

        // check user đóng popup thủ công
        const popupCheckInterval = setInterval(() => {
            if (popup.closed) {
                clearInterval(popupCheckInterval);
                setIsClosePopup(false);
            }
        }, 500);
    };
    return (
        <div
            className="min-h-screen w-full bg-cover bg-center relative"
            style={{ backgroundImage: "url('/login_bg.png')" }}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative min-h-screen flex items-center sm:justify-center md:justify-end sm:pr-0 md:pr-[200px] p-4">
                <div className="w-full max-w-[420px] md:max-w-[450px]">
                    <div
                        className="backdrop-blur-md border border-white/10 shadow-2xl p-6 md:p-8"
                        style={{ backgroundColor: "#1F2937", borderRadius: "0" }}
                    >
                        <div className="text-center mb-6 md:mb-8">
                            <h1
                                className="text-2xl md:text-3xl font-bold mb-2"
                                style={{ color: "#9CA3AF" }}
                            >
                                LOGIN
                            </h1>
                            <p className="text-sm" style={{ color: "#9CA3AF" }}>
                                Sign in to your account to continue
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5 md:space-y-6"
                        >
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    {...register("email")}
                                    disabled={isLoading || isClosePopup}
                                    className="w-full px-4 py-3 border transition-all duration-200 focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: "#111827",
                                        borderColor: errors.email ? "#EF4444" : "#374151",
                                        color: "#F9FAFB",
                                        borderRadius: "0",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = "#22C55E";
                                        e.target.style.boxShadow =
                                            "0 0 0 3px rgba(34, 197, 94, 0.1)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.email
                                            ? "#EF4444"
                                            : "#374151";
                                        e.target.style.boxShadow = "none";
                                    }}
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        disabled={isLoading || isClosePopup}
                                        id="password"
                                        {...register("password")}
                                        className="w-full px-4 py-3 border transition-all duration-200 focus:outline-none focus:ring-2 pr-12"
                                        style={{
                                            backgroundColor: "#111827",
                                            borderColor: errors.password ? "#EF4444" : "#374151",
                                            color: "#F9FAFB",
                                            borderRadius: "0",
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = "#22C55E";
                                            e.target.style.boxShadow =
                                                "0 0 0 3px rgba(34, 197, 94, 0.1)";
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.password
                                                ? "#EF4444"
                                                : "#374151";
                                            e.target.style.boxShadow = "none";
                                        }}
                                        placeholder="Enter your password"
                                    />
                                    {/* Show/Hide Password Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                        style={{ color: "#9CA3AF" }}
                                        aria-label={
                                            showPassword ? "Hide password" : "Show password"
                                        }
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-xs" style={{ color: "#EF4444" }}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded"
                                        style={{
                                            accentColor: "#22C55E",
                                        }}
                                    />
                                    <span className="ml-2 text-sm" style={{ color: "#9CA3AF" }}>
                                        Remember me
                                    </span>
                                </label>
                                <a
                                    href="#"
                                    className="text-sm transition-colors duration-200 hover:underline"
                                    style={{ color: "#22C55E" }}
                                    onMouseEnter={(e) => (e.target.style.color = "#16A34A")}
                                    onMouseLeave={(e) => (e.target.style.color = "#22C55E")}
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || isClosePopup}
                                className="w-full py-3 font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: "#22C55E",
                                    borderRadius: "0",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isLoading) {
                                        e.target.style.backgroundColor = "#16A34A";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isLoading) {
                                        e.target.style.backgroundColor = "#22C55E";
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner size="small" color="white" />
                                        <span>Đang đăng nhập...</span>
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 md:mt-8 mb-4 md:mb-6 flex items-center">
                            <div
                                className="flex-1 border-t"
                                style={{ borderColor: "#374151" }}
                            ></div>
                            <span className="px-4 text-sm" style={{ color: "#9CA3AF" }}>
                                OR
                            </span>
                            <div
                                className="flex-1 border-t"
                                style={{ borderColor: "#374151" }}
                            ></div>
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => handleLoginGoogle()}
                                disabled={isLoading || isClosePopup}
                                className="w-full py-3 font-medium transition-all duration-200 flex items-center justify-center gap-3 border shadow-sm hover:shadow-md"
                                style={{
                                    backgroundColor: "#111827",
                                    borderColor: "#374151",
                                    color: "#F9FAFB",
                                    borderRadius: "0",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#1F2937";
                                    e.target.style.borderColor = "#4B5563";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#111827";
                                    e.target.style.borderColor = "#374151";
                                }}
                            >
                                {isClosePopup ? (
                                    <>
                                        <Spinner size="small" color="white" />
                                        <span>Đang đăng nhập với Google...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        Continue with Google
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleLoginFacebook()}
                                disabled={isClosePopup}
                                className="w-full py-3 font-medium transition-all duration-200 flex items-center justify-center gap-3 border shadow-sm hover:shadow-md"
                                style={{
                                    backgroundColor: "#111827",
                                    borderColor: "#374151",
                                    color: "#F9FAFB",
                                    borderRadius: "0",
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#1F2937";
                                    e.target.style.borderColor = "#4B5563";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#111827";
                                    e.target.style.borderColor = "#374151";
                                }}
                            >
                                {isClosePopup ? (
                                    <>
                                        <Spinner size="small" color="white" />
                                        <span>Đang đăng nhập với Facebook...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
                                        </svg>
                                        Continue with Facebook
                                    </>
                                )}
                            </button>
                        </div>

                        <p
                            className="mt-5 md:mt-6 text-center text-sm"
                            style={{ color: "#9CA3AF" }}
                        >
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold transition-colors duration-200 hover:underline"
                                style={{ color: "#22C55E" }}
                                onMouseEnter={(e) => (e.target.style.color = "#16A34A")}
                                onMouseLeave={(e) => (e.target.style.color = "#22C55E")}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
