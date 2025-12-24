import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authApi from '../api/authApi';

const registerSchema = yup.object({
    full_name: yup
        .string()
        .required('Full name is required')
        .min(2, 'Full name must be at least 2 characters')
        .max(150, 'Full name must not exceed 150 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email format'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits'),
    address: yup
        .string()
        .required('Address is required')
        .min(5, 'Address must be at least 5 characters'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: 'onBlur', // Validate on blur for better UX
    });

    const onSubmit = async (data) => {
        try {
            debugger;
            setErrorMessage('');
            const { confirmPassword, ...submitData } = data;
            const response = await authApi.register(submitData);

            if (response && (response.code === '201' || response.message === 'register success')) {
                // navigate('/login', {
                //     state: { message: 'Registration successful! Please login.' }
                // });
            }
        } catch (error) {
            debugger;
            console.error('Register error:', error);
            const errorDetail = error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.message ||
                'Registration failed. Please try again.';
            setErrorMessage(errorDetail);
        }
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
                        className="backdrop-blur-md border border-white/10 shadow-2xl p-5 md:p-6"
                        style={{ backgroundColor: '#1F2937', borderRadius: '0' }}
                    >
                        {/* Header Section */}
                        <div className="text-center mb-4 md:mb-5">
                            <h1
                                className="text-xl md:text-2xl font-bold mb-1"
                                style={{ color: '#9CA3AF' }}
                            >
                                REGISTER
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                            {errorMessage && (
                                <div
                                    className="p-3 text-sm rounded"
                                    style={{
                                        backgroundColor: '#7F1D1D',
                                        borderColor: '#EF4444',
                                        borderWidth: '1px',
                                        color: '#FCA5A5'
                                    }}
                                >
                                    {errorMessage}
                                </div>
                            )}

                            <div>
                                <input
                                    type="text"
                                    id="full_name"
                                    {...register('full_name')}
                                    className="w-full px-3 py-2 text-sm border transition-all duration-200 focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: '#111827',
                                        borderColor: errors.full_name ? '#EF4444' : '#374151',
                                        color: '#F9FAFB',
                                        borderRadius: '0',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22C55E';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.full_name ? '#EF4444' : '#374151';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Full Name"
                                />
                                {errors.full_name && (
                                    <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                                        {errors.full_name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email')}
                                    className="w-full px-3 py-2 text-sm border transition-all duration-200 focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: '#111827',
                                        borderColor: errors.email ? '#EF4444' : '#374151',
                                        color: '#F9FAFB',
                                        borderRadius: '0',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22C55E';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.email ? '#EF4444' : '#374151';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Email"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone Input */}
                            <div>
                                <input
                                    type="tel"
                                    id="phone"
                                    {...register('phone')}
                                    className="w-full px-3 py-2 text-sm border transition-all duration-200 focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: '#111827',
                                        borderColor: errors.phone ? '#EF4444' : '#374151',
                                        color: '#F9FAFB',
                                        borderRadius: '0',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22C55E';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.phone ? '#EF4444' : '#374151';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Phone Number"
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Address Input */}
                            <div>
                                <textarea
                                    id="address"
                                    {...register('address')}
                                    rows={2}
                                    className="w-full px-3 py-2 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                                    style={{
                                        backgroundColor: '#111827',
                                        borderColor: errors.address ? '#EF4444' : '#374151',
                                        color: '#F9FAFB',
                                        borderRadius: '0',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#22C55E';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = errors.address ? '#EF4444' : '#374151';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    placeholder="Address"
                                />
                                {errors.address && (
                                    <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        {...register('password')}
                                        className="w-full px-3 py-2 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 pr-10"
                                        style={{
                                            backgroundColor: '#111827',
                                            borderColor: errors.password ? '#EF4444' : '#374151',
                                            color: '#F9FAFB',
                                            borderRadius: '0',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#22C55E';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.password ? '#EF4444' : '#374151';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                        placeholder="Password"
                                    />
                                    {/* Show/Hide Password Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors"
                                        style={{ color: '#9CA3AF' }}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        {...register('confirmPassword')}
                                        className="w-full px-3 py-2 text-sm border transition-all duration-200 focus:outline-none focus:ring-2 pr-10"
                                        style={{
                                            backgroundColor: '#111827',
                                            borderColor: errors.confirmPassword ? '#EF4444' : '#374151',
                                            color: '#F9FAFB',
                                            borderRadius: '0',
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#22C55E';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = errors.confirmPassword ? '#EF4444' : '#374151';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                        placeholder="Confirm Password"
                                    />
                                    {/* Show/Hide Confirm Password Button */}
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-colors"
                                        style={{ color: '#9CA3AF' }}
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-xs" style={{ color: '#EF4444' }}>
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 text-sm font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                style={{
                                    backgroundColor: '#22C55E',
                                    borderRadius: '0',
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.backgroundColor = '#16A34A';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSubmitting) {
                                        e.target.style.backgroundColor = '#22C55E';
                                    }
                                }}
                            >
                                {isSubmitting ? 'Signing up...' : 'Sign Up'}
                            </button>
                        </form>

                        <p
                            className="mt-4 md:mt-5 text-center text-xs md:text-sm"
                            style={{ color: '#9CA3AF' }}
                        >
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold transition-colors duration-200 hover:underline"
                                style={{ color: '#22C55E' }}
                                onMouseEnter={(e) => e.target.style.color = '#16A34A'}
                                onMouseLeave={(e) => e.target.style.color = '#22C55E'}
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
