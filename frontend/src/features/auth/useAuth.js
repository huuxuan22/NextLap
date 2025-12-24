import { useState, useEffect } from 'react';

/**
 * useAuth - Custom hook for authentication state management
 * Returns user object if logged in, null otherwise
 * TODO: Replace with actual authentication logic (context, Redux, etc.)
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth state
        // In a real app, this would check localStorage, tokens, API calls, etc.
        const checkAuth = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    return { user, loading };
};

