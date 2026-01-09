import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearAuth } from "../utils/storage";
import Footer from "../components/Footer";
import authApi from "../api/authApi";

const MainLayout = () => {
  // State cho search input
  const [showSearch, setShowSearch] = useState(false);

  // State cho user dropdown
  const [userDropdown, setUserDropdown] = useState(false);

  // Refs để xử lý click ra ngoài
  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Xử lý click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        showSearch
      ) {
        setShowSearch(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  // Xử lý toggle search
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Login state (sync with localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user_principal");
    return Boolean(token && user);
  });

  const [userName, setUserName] = useState(() => {
    const user = localStorage.getItem("user_principal");
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.email || userData.full_name || "User";
      } catch {
        return "User";
      }
    }
    return "User";
  });

  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("access_token");
      const user = localStorage.getItem("user_principal");
      setIsLoggedIn(Boolean(token && user));
      if (user) {
        try {
          const userData = JSON.parse(user);
          setUserName(userData.email || userData.full_name || "User");
        } catch {
          setUserName("User");
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    setUserName("User");
    setUserDropdown(false);
    authApi.logout();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#111827" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: "#1F2937",
          borderColor: "#374151",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo với hình ảnh */}
            <Link to="/" className="group flex items-center gap-3 relative">
              {/* Logo container với gradient border */}


              {/* Text với gradient và animation */}
              <div className="relative">
                <div
                  className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 2px 10px rgba(34, 197, 94, 0.3)",
                  }}
                >
                  NextLap
                </div>

                {/* Tagline nhỏ bên dưới */}
                <div className="absolute -bottom-5 left-0">
                  <span className="text-xs font-medium bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Innovation Beyond Speed
                  </span>
                </div>

                {/* Underline effect */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            </Link>

            {/* Menu ở giữa */}
            <nav className="flex items-center gap-6">
              {/* Trang chủ */}
              <Link
                to="/"
                className="text-text-light transition-colors hover:no-underline hover:bg-bg-dark hover:text-highlight-hover px-3 py-2 rounded"
              >
                Trang chủ
              </Link>

              {/* Sản phẩm */}
              <Link
                to="/products"
                className="text-text-light transition-colors hover:no-underline hover:bg-bg-dark hover:text-highlight-hover px-3 py-2 rounded"
              >
                Sản phẩm
              </Link>

              {/* Liên hệ */}
              <Link
                to="/contact"
                className="text-text-light transition-colors hover:no-underline hover:bg-bg-dark hover:text-highlight-hover px-3 py-2 rounded"
              >
                Liên hệ
              </Link>

              {/* Giới thiệu */}
              <Link
                to="/about"
                className="text-text-light transition-colors hover:no-underline hover:bg-bg-dark hover:text-highlight-hover px-3 py-2 rounded"

              >
                Giới thiệu
              </Link>
            </nav>

            {/* Icon bên phải */}
            <div className="flex items-center gap-4">
              {/* Search icon/input */}
              <div className="relative" ref={searchRef}>
                {showSearch ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 transition-colors"
                      style={{ width: "200px" }}
                      autoFocus
                    />
                    <button
                      onClick={() => setShowSearch(false)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={toggleSearch}
                    className="transition-colors hover:text-green-500"
                    style={{ color: "#F9FAFB" }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {isLoggedIn ? (
                <>
                  {/* Giỏ hàng icon */}
                  <Link
                    to="/cart"
                    className="transition-colors hover:text-green-500"
                    style={{ color: "#F9FAFB" }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>

                  {/* Người dùng/avatar icon */}
                  <div ref={userDropdownRef} className="relative">
                    <button
                      onClick={() => setUserDropdown(!userDropdown)}
                      className="transition-colors hover:text-green-500"
                      style={{ color: "#F9FAFB" }}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </button>

                    {/* User dropdown menu */}
                    {userDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-10" style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}>
                        <div className="px-4 py-2 text-sm border-b" style={{ color: "#F9FAFB", borderColor: "#374151" }}>
                          {userName}
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm transition-colors"
                          style={{ color: "#F9FAFB" }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#111827"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                          onClick={() => setUserDropdown(false)}
                        >
                          Thông tin cá nhân
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm transition-colors"
                          style={{ color: "#F9FAFB" }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#111827"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                        >
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "#22C55E",
                    color: "#F9FAFB",
                  }}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>


      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default MainLayout;
