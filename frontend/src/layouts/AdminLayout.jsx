import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

/**
 * AdminLayout - Layout with sidebar, header, and content area
 * Used for admin/dashboard pages
 */
const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/brands', label: 'Thương hiệu' },
    { path: '/admin/products', label: 'Sản phẩm' },
    { path: '/admin/users', label: 'Người dùng' },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#111827' }}>
      {/* Sidebar */}
      <aside
        className="w-64 border-r sticky top-0 h-screen flex flex-col"
        style={{
          backgroundColor: '#1F2937',
          borderColor: '#374151',
        }}
      >
        <div className="p-6">
          <Link
            to="/admin"
            className="text-2xl font-bold block mb-8"
            style={{ color: '#22C55E' }}
          >
            NextLap Admin
          </Link>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  color: isActive(item.path) ? '#22C55E' : '#F9FAFB',
                  backgroundColor: isActive(item.path)
                    ? '#374151'
                    : 'transparent',
                  fontWeight: isActive(item.path) ? '600' : '400',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div
          className="mt-auto p-6 border-t"
          style={{ borderColor: '#374151' }}
        >
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            style={{
              backgroundColor: '#DC2626',
              color: '#F9FAFB',
            }}
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header
          className="border-b"
          style={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
          }}
        >
          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold" style={{ color: '#F9FAFB' }}>
              Admin Dashboard
            </h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
