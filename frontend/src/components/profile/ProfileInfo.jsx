import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import userApi from '../../api/userApi';
import { toast } from 'react-toastify';

const ProfileInfo = ({ user, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: user?.full_name || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await userApi.updateProfile(formData);
            toast.success('Cập nhật thông tin thành công!');
            setIsEditing(false);
            if (onUpdate) {
                onUpdate(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Cập nhật thất bại!');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            full_name: user?.full_name || '',
            phone: user?.phone || '',
            address: user?.address || '',
        });
        setIsEditing(false);
    };

    const infoItems = [
        { icon: FiUser, label: 'Họ tên', value: isEditing ? null : (user?.full_name || 'Chưa cập nhật'), name: 'full_name' },
        { icon: FiMail, label: 'Email', value: user?.email || 'Chưa cập nhật', name: 'email', disabled: true },
        { icon: FiPhone, label: 'Số điện thoại', value: isEditing ? null : (user?.phone || 'Chưa cập nhật'), name: 'phone' },
        { icon: FiMapPin, label: 'Địa chỉ', value: isEditing ? null : (user?.address || 'Chưa cập nhật'), name: 'address' },
    ];

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                    Thông tin cá nhân
                </h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition"
                    >
                        <FiEdit2 size={16} />
                        Chỉnh sửa
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50"
                        >
                            <FiCheck size={16} />
                            Lưu
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
                        >
                            <FiX size={16} />
                            Hủy
                        </button>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {infoItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="group p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all hover:bg-gray-800/50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 group-hover:scale-110 transition">
                                <item.icon size={20} />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                                {isEditing && !item.disabled ? (
                                    <input
                                        type="text"
                                        name={item.name}
                                        value={formData[item.name]}
                                        onChange={handleChange}
                                        className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-gray-200 focus:border-green-500 focus:outline-none"
                                    />
                                ) : (
                                    <div className="font-medium text-gray-200">{item.value}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileInfo;
