import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera, FiSave, FiX, FiArrowLeft, FiLoader } from 'react-icons/fi';
import userApi from '../api/userApi';
import { toast } from 'react-toastify';

const ProfileEdit = () => {
    const navigate = useNavigate();

    // Form state
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        avatar: null
    });

    const [previewAvatar, setPreviewAvatar] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await userApi.getProfile();
            const user = response.data;
            setFormData({
                full_name: user.full_name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                avatar: user.avatar || null
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            if (error.response?.status === 401) {
                window.location.href = '/login';
            } else {
                toast.error('Không thể tải thông tin người dùng');
            }
        } finally {
            setLoading(false);
        }
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const updateData = {
                full_name: formData.full_name,
                phone: formData.phone,
                address: formData.address,
                // avatar upload will be handled separately
            };

            await userApi.updateProfile(updateData);
            toast.success('Cập nhật thông tin thành công!');

            // Update localStorage
            const userPrincipal = JSON.parse(localStorage.getItem('user_principal') || '{}');
            const newUserPrincipal = { ...userPrincipal, ...updateData };
            localStorage.setItem('user_principal', JSON.stringify(newUserPrincipal));

            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(error.response?.data?.message || 'Cập nhật thất bại!');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

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
                            <div className="relative gfull_roup mb-4">
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
                                    name="full_name"
                                    value={formData.full_name}
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
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                                    placeholder="Nhập email"
                                    disabled
                                    readOnly
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
                                disabled={saving}
                                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <FiX />
                                <span>Hủy bỏ</span>
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="relative group px-6 py-3 rounded-lg overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500" />
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition" />
                                <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                                    {saving ? (
                                        <>
                                            <FiLoader className="animate-spin" />
                                            <span>Đang lưu...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiSave />
                                            <span>Lưu thay đổi</span>
                                        </>
                                    )}
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
