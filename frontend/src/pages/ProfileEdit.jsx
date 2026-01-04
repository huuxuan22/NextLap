import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave, FiX, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../features/auth/useAuth';

const ProfileEdit = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || 'Nguyễn Văn A',
        email: user?.email || 'nguyenvana@example.com',
        phone: user?.phone || '0123456789',
        address: user?.address || '123 Đường ABC, Quận 1, TP.HCM',
        avatar: user?.avatar || null
    });

    const [previewAvatar, setPreviewAvatar] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrate with API
        alert('Cập nhật thông tin thành công! (demo)');
        navigate('/profile');
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#111827' }}>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition mb-6"
                >
                    <FiArrowLeft />
                    <span>Quay lại</span>
                </button>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        Chỉnh sửa thông tin
                    </h1>
                    <p className="text-gray-400">Cập nhật thông tin cá nhân của bạn</p>
                </div>

                {/* Edit Form */}
                <form onSubmit={handleSubmit}>
                    <div className="rounded-xl p-8" style={{ backgroundColor: '#1F2937' }}>
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group mb-4">
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur opacity-30 group-hover:opacity-50 transition" />
                                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden border-4 border-gray-800">
                                    {previewAvatar || formData.avatar ? (
                                        <img
                                            src={previewAvatar || formData.avatar}
                                            alt="avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                            {formData.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </div>
                                {/* Camera Icon Overlay */}
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute bottom-0 right-0 p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-pointer hover:scale-110 transition shadow-lg"
                                >
                                    <FiCamera size={20} />
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-400">Click vào icon để thay đổi ảnh đại diện</p>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Name Field */}
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                                    <FiUser className="text-green-400" />
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition"
                                    placeholder="Nhập họ và tên"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                                    <FiMail className="text-green-400" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition"
                                    placeholder="Nhập email"
                                    required
                                />
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                                    <FiPhone className="text-green-400" />
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>

                            {/* Address Field - Full Width */}
                            <div className="md:col-span-2">
                                <label className="text-sm text-gray-400 mb-2 block flex items-center gap-2">
                                    <FiMapPin className="text-green-400" />
                                    Địa chỉ
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-green-500 focus:outline-none transition resize-none"
                                    placeholder="Nhập địa chỉ đầy đủ"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-700">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition flex items-center justify-center gap-2"
                            >
                                <FiX />
                                <span>Hủy bỏ</span>
                            </button>
                            <button
                                type="submit"
                                className="relative group px-6 py-3 rounded-lg overflow-hidden transition-all hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                                <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                                    <FiSave />
                                    <span>Lưu thay đổi</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;
