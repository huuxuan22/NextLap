import React from 'react';
import { ProfileHeader, ProfileInfo, ProfileOrders, ProfileAddress, ProfileSecurity } from '../components/profile';
import { useAuth } from '../features/auth/useAuth';
import { FiLoader } from 'react-icons/fi';

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
                <div className="text-center">
                    <FiLoader className="animate-spin text-green-400 mx-auto mb-4" size={48} />
                    <p className="text-gray-400">Đang tải thông tin...</p>
                </div>
            </div>
        );
    }

    // Demo user data if not logged in
    const profileUser = user || {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        joined: 'Tháng 1, 2026'
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#111827' }}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        Trang cá nhân
                    </h1>
                    <p className="text-gray-400">Quản lý thông tin tài khoản và đơn hàng của bạn</p>
                </div>

                <div className="space-y-6">
                    {/* Header Section */}
                    <ProfileHeader user={profileUser} />

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - 2/3 width */}
                        <div className="lg:col-span-2 space-y-6">
                            <ProfileInfo user={profileUser} />
                            <ProfileOrders />
                        </div>

                        {/* Right Column - 1/3 width */}
                        <div className="space-y-6">
                            <ProfileAddress />
                            <ProfileSecurity />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
