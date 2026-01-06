import { useState, useEffect } from "react";
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user_principal");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { user, loading };
};
