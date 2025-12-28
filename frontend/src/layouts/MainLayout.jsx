import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  // State cho dropdown sản phẩm
  const [productsDropdown, setProductsDropdown] = useState(false);

  // State cho search input
  const [showSearch, setShowSearch] = useState(false);

  // Refs để xử lý click ra ngoài
  const productsDropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Xử lý click ra ngoài dropdown sản phẩm
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target)
      ) {
        setProductsDropdown(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        showSearch
      ) {
        setShowSearch(false);
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo với hình ảnh */}
            <Link to="/" className="group flex items-center gap-3 relative">
              {/* Logo container với gradient border */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-black p-2 rounded-xl shadow-lg">
                  <img
                    src="/logo.png"
                    alt="NextLap Logo"
                    className="h-9 w-9 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      // Hiển thị fallback icon nếu logo không load được
                      const parent = e.target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
              <svg class="h-9 w-9 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 16V20H11V16H8L12 12L16 16H13Z" />
                <path d="M13 8V4H11V8H8L12 12L16 8H13Z" />
              </svg>
            `;
                      }
                    }}
                  />
                </div>
              </div>

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
                className="transition-colors hover:underline"
                style={{ color: "#F9FAFB" }}
              >
                Trang chủ
              </Link>

              {/* Sản phẩm với dropdown */}
              <div className="relative" ref={productsDropdownRef}>
                <button
                  onClick={() => setProductsDropdown(!productsDropdown)}
                  className="transition-colors hover:underline flex items-center gap-1"
                  style={{ color: "#F9FAFB" }}
                >
                  Sản phẩm
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      productsDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown sản phẩm */}
                {productsDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link
                      to="/products/laptop"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setProductsDropdown(false)}
                    >
                      Laptop
                    </Link>
                    <Link
                      to="/products/phone"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setProductsDropdown(false)}
                    >
                      Phone
                    </Link>
                    <Link
                      to="/products/headphone"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setProductsDropdown(false)}
                    >
                      Headphone
                    </Link>
                    <Link
                      to="/products/tablet"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setProductsDropdown(false)}
                    >
                      Tablet
                    </Link>
                    <Link
                      to="/products/accessories"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                      onClick={() => setProductsDropdown(false)}
                    >
                      Phụ kiện
                    </Link>
                  </div>
                )}
              </div>

              {/* Liên hệ */}
              <Link
                to="/contact"
                className="transition-colors hover:underline"
                style={{ color: "#F9FAFB" }}
              >
                Liên hệ
              </Link>

              {/* Giới thiệu */}
              <Link
                to="/about"
                className="transition-colors hover:underline"
                style={{ color: "#F9FAFB" }}
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

              {/* Yêu thích icon */}
              <Link
                to="/wishlist"
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </Link>

              {/* Người dùng/avatar icon */}
              <Link
                to="/profile"
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
              </Link>

              {/* Login button */}
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="border-t mt-auto"
        style={{
          backgroundColor: "#1F2937",
          borderColor: "#374151",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <p className="text-center" style={{ color: "#9CA3AF" }}>
            © 2024 NextLap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
