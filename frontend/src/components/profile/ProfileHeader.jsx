import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3, FiMail, FiCalendar } from 'react-icons/fi';

const ProfileHeader = ({ user }) => {
    return (
        <div className="relative overflow-hidden rounded-2xl p-8" style={{ backgroundColor: '#1F2937' }}>
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5" />

            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-50 transition" />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden border-4 border-gray-800">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        {user?.name || 'Người dùng'}
                    </h2>
                    <div className="flex flex-col md:flex-row items-center gap-4 text-gray-300 text-sm">
                        <div className="flex items-center gap-2">
                            <FiMail className="text-green-400" />
                            <span>{user?.email || 'no-reply@example.com'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiCalendar className="text-green-400" />
                            <span>Tham gia: {user?.joined || 'Tháng 1, 2026'}</span>
                        </div>
                    </div>
                </div>

                {/* Edit Button */}
                <Link to="/profile/edit" className="relative group px-6 py-3 rounded-lg overflow-hidden transition-all hover:scale-105">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative flex items-center gap-2 text-white font-medium">
                        <FiEdit3 />
                        <span>Chỉnh sửa</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProfileHeader;
