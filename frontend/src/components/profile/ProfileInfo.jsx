import React from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ProfileInfo = ({ user }) => {
    const infoItems = [
        { icon: FiUser, label: 'Họ tên', value: user?.name || 'Chưa cập nhật' },
        { icon: FiMail, label: 'Email', value: user?.email || 'Chưa cập nhật' },
        { icon: FiPhone, label: 'Số điện thoại', value: user?.phone || 'Chưa cập nhật' },
        { icon: FiMapPin, label: 'Địa chỉ', value: user?.address || 'Chưa cập nhật' },
    ];

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                Thông tin cá nhân
            </h3>
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
                                <div className="font-medium text-gray-200">{item.value}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileInfo;
