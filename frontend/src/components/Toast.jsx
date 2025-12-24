import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/**
 * Toast Types
 */
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

/**
 * Toast Configuration - Colors and styles for each type
 */
const TOAST_CONFIG = {
    [TOAST_TYPES.SUCCESS]: {
        bg: 'bg-emerald-600/90',
        border: 'border-emerald-500',
        icon: '✓',
    },
    [TOAST_TYPES.ERROR]: {
        bg: 'bg-red-700/90',
        border: 'border-red-600',
        icon: '✕',
    },
    [TOAST_TYPES.WARNING]: {
        bg: 'bg-amber-600/90',
        border: 'border-amber-500',
        icon: '⚠',
    },
    [TOAST_TYPES.INFO]: {
        bg: 'bg-blue-700/90',
        border: 'border-blue-600',
        icon: 'ℹ',
    },
};

/**
 * Toast Context
 */
const ToastContext = createContext(null);

/**
 * Toast Provider Component
 * Manages toast state and provides showToast function
 */
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    /**
     * Show a new toast notification
     */
    const showToast = useCallback(({ type, message, duration = 4000 }) => {
        const id = Date.now() + Math.random();
        const newToast = { id, type, message, duration };

        setToasts((prev) => [...prev, newToast]);

        // Auto-remove toast after duration
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, duration);

        return id;
    }, []);

    /**
     * Remove a specific toast
     */
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            {/* Toast Container - Fixed top-right */}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                        config={TOAST_CONFIG[toast.type]}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

/**
 * Individual Toast Item Component
 */
const ToastItem = ({ toast, onClose, config }) => {
    const { bg, border, icon } = config;
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade-out animation
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`
                ${bg}
                ${border}
                border
                backdrop-blur-md
                shadow-xl
                rounded-xl
                px-4 py-3
                text-white
                flex items-center justify-between
                gap-3
                transform transition-all duration-300 ease-in-out
                hover:scale-[1.02]
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
            `}
            role="alert"
        >
            {/* Icon and Message */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg font-semibold flex-shrink-0">{icon}</span>
                <p className="text-sm font-medium break-words">{toast.message}</p>
            </div>

            {/* Close Button */}
            <button
                onClick={handleClose}
                type="button"
                className="
                    flex-shrink-0
                    w-5 h-5
                    rounded-full
                    hover:bg-white/20
                    transition-colors
                    duration-200
                    flex items-center justify-center
                    text-white/80 hover:text-white
                "
                aria-label="Close notification"
            >
                <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

/**
 * useToast Hook
 * Returns showToast function to display toast notifications
 * 
 * @returns {Object} { showToast }
 * @example
 * const { showToast } = useToast();
 * showToast({ type: 'success', message: 'Operation successful' });
 */
export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }

    return context;
};

export default ToastProvider;

