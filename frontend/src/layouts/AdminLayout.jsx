import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

/**
 * AdminLayout - Layout with sidebar, header, and content area
 * Used for admin/dashboard pages
 */
const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#111827' }}>
      {/* Sidebar */}
      <aside
        className="w-64 border-r sticky top-0 h-screen"
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
            <Link
              to="/admin"
              className="block px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#F9FAFB' }}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="block px-4 py-2 rounded-lg transition-colors"
              style={{ color: '#F9FAFB' }}
            >
              Products
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 rounded-lg transition-colors mt-4"
              style={{
                backgroundColor: '#DC2626',
                color: '#F9FAFB',
              }}
            >
              Logout
            </button>
          </nav>
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
