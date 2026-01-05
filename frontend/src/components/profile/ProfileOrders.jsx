import React, { useEffect, useState } from 'react';
import { FiShoppingBag, FiPackage, FiCheckCircle, FiClock, FiTruck, FiXCircle } from 'react-icons/fi';
import userApi from '../../api/userApi';
import { toast } from 'react-toastify';

const ProfileOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await userApi.getOrders({ page: 1, limit: 5 });
            setOrders(response.data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (error.response?.status !== 401) {
                toast.error('Không thể tải đơn hàng');
            }
        } finally {
            setLoading(false);
        }
    };

    const getStatusInfo = (status) => {
        const statusMap = {
            'PENDING': { icon: FiClock, color: 'yellow', text: 'Chờ xử lý' },
            'CONFIRMED': { icon: FiPackage, color: 'blue', text: 'Đã xác nhận' },
            'SHIPPING': { icon: FiTruck, color: 'purple', text: 'Đang giao' },
            'DELIVERED': { icon: FiCheckCircle, color: 'green', text: 'Đã giao' },
            'CANCELLED': { icon: FiXCircle, color: 'red', text: 'Đã hủy' },
        };
        return statusMap[status] || statusMap['PENDING'];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

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

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin mx-auto w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full"></div>
                    <p className="text-gray-400 mt-4">Đang tải...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-12">
                    <FiShoppingBag className="mx-auto text-gray-600 mb-3" size={48} />
                    <p className="text-gray-400">Chưa có đơn hàng nào</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => {
                        const statusInfo = getStatusInfo(order.status);
                        const StatusIcon = statusInfo.icon;
                        return (
                            <div
                                key={order.id}
                                className="group p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-all hover:bg-gray-800/50 cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-${statusInfo.color}-500/20 text-${statusInfo.color}-400`}>
                                            <StatusIcon size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">Đơn hàng #{order.id}</div>
                                            <div className="text-sm text-gray-400">{formatDate(order.created_at)}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-400">{formatPrice(order.total)}</div>
                                        <div className={`text-xs text-${statusInfo.color}-400`}>{statusInfo.text}</div>
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
