import React from 'react';
import { FiMapPin, FiPlus, FiHome } from 'react-icons/fi';

const ProfileAddress = ({ addresses = [] }) => {
    // Demo data
    const demoAddresses = addresses.length > 0 ? addresses : [
        { label: 'Nhà riêng', address: '123 Đường ABC, Quận 1, TP.HCM', isDefault: true },
        { label: 'Văn phòng', address: '456 Đường XYZ, Quận 3, TP.HCM', isDefault: false },
    ];

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                    Địa chỉ
                </h3>
                <button className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition">
                    <FiPlus size={18} />
                </button>
            </div>

            {demoAddresses.length === 0 ? (
                <div className="text-center py-8">
                    <FiMapPin className="mx-auto text-gray-600 mb-2" size={32} />
                    <p className="text-gray-400 text-sm">Chưa có địa chỉ</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {demoAddresses.map((addr, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-green-500/20 text-green-400 group-hover:scale-110 transition">
                                    <FiHome size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-white">{addr.label}</span>
                                        {addr.isDefault && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                                Mặc định
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400">{addr.address}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileAddress;
