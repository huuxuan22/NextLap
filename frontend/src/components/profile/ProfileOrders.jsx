import React from 'react';
import { FiShoppingBag, FiPackage, FiCheckCircle, FiClock } from 'react-icons/fi';

const ProfileOrders = ({ orders = [] }) => {
    // Demo data nếu không có orders
    const demoOrders = orders.length > 0 ? orders : [
        { id: '001', date: '15/12/2025', total: '2.500.000đ', status: 'Đã giao', icon: FiCheckCircle, color: 'green' },
        { id: '002', date: '20/12/2025', total: '1.800.000đ', status: 'Đang giao', icon: FiPackage, color: 'blue' },
        { id: '003', date: '28/12/2025', total: '3.200.000đ', status: 'Chờ xử lý', icon: FiClock, color: 'yellow' },
    ];

    return (
        <div className="rounded-xl p-6" style={{ backgroundColor: '#1F2937' }}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                    Đơn hàng gần đây
                </h3>
                <button className="text-green-400 hover:text-green-300 text-sm font-medium transition">
                    Xem tất cả →
                </button>
            </div>

            {demoOrders.length === 0 ? (
                <div className="text-center py-12">
                    <FiShoppingBag className="mx-auto text-gray-600 mb-3" size={48} />
                    <p className="text-gray-400">Chưa có đơn hàng nào</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {demoOrders.map((order) => {
                        const StatusIcon = order.icon || FiShoppingBag;
                        return (
                            <div
                                key={order.id}
                                className="group p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all hover:bg-gray-800/50 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-${order.color}-500/20 text-${order.color}-400`}>
                                            <StatusIcon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">Đơn hàng #{order.id}</div>
                                            <div className="text-sm text-gray-400">{order.date}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-400">{order.total}</div>
                                        <div className={`text-xs text-${order.color}-400`}>{order.status}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProfileOrders;
