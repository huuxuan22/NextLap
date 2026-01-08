/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Input, message, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import orderApi from '../api/orderApi';
import TableOrder from '../components/order/TableOrder';
import ModalDetailOrder from '../components/order/ModalDetailOrder';

const OrderAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [dataOrders, setDataOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'Chờ xác nhận' },
    { value: 'PROCESSING', label: 'Đang xử lý' },
    { value: 'SHIPPED', label: 'Đã gửi hàng' },
    { value: 'DELIVERED', label: 'Đã giao' },
    { value: 'CANCELLED', label: 'Đã hủy' },
  ];

  useEffect(() => {
    loadOrders();
  }, [currentPage, pageSize, statusFilter]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;
      const res = await orderApi.getAll(skip, pageSize, statusFilter);

      if (res.data) {
        setDataOrders(res.data);
        const totalOrders = res.pagination?.total || res.data.length;
        setTotal(totalOrders);
      }
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu đơn hàng');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (order) => {
    try {
      setDetailLoading(true);
      setSelectedOrder(null);
      setIsModalDetailOpen(true);

      const res = await orderApi.getById(order.id);
      if (res.data) {
        setSelectedOrder(res.data);
      }
    } catch (error) {
      message.error('Lỗi khi tải chi tiết đơn hàng');
      console.error(error);
      setIsModalDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalDetailOpen(false);
    setSelectedOrder(null);
  };

  const handleFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Danh sách đơn hàng
          </h1>
        </div>

        <div className="flex gap-3">
          <Select
            placeholder="Lọc theo trạng thái"
            allowClear
            style={{ width: 200 }}
            options={STATUS_OPTIONS}
            onChange={handleFilterChange}
            size="large"
          />
        </div>
      </div>

      <TableOrder
        dataOrders={dataOrders}
        loading={loading}
        loadOrders={loadOrders}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        onViewDetail={handleViewDetail}
      />

      <ModalDetailOrder
        isModalOpen={isModalDetailOpen}
        orderDetail={selectedOrder}
        loading={detailLoading}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default OrderAdmin;
