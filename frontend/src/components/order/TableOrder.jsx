import { Table, Space, Button, Tag, Popconfirm, message, Select } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import orderApi from '../../api/orderApi';
import { useToast } from '../Toast';

const TableOrder = (props) => {
  const {
    dataOrders,
    loading,
    loadOrders,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
    onViewDetail,
  } = props;

  const { showToast } = useToast();
  const [updatingId, setUpdatingId] = useState(null);

  const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'Chờ xác nhận', color: '#FBBF24' },
    { value: 'PROCESSING', label: 'Đang xử lý', color: '#3B82F6' },
    { value: 'SHIPPED', label: 'Đã gửi hàng', color: '#8B5CF6' },
    { value: 'DELIVERED', label: 'Đã giao', color: '#10B981' },
    { value: 'CANCELLED', label: 'Đã hủy', color: '#EF4444' },
  ];

  const getStatusColor = (status) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.color || '#6B7280';
  };

  const getStatusLabel = (status) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.label || status;
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await orderApi.updateStatus(orderId, { status: newStatus });
      showToast({
        type: 'success',
        message: 'Cập nhật trạng thái đơn hàng thành công',
        duration: 3000,
      });
      await loadOrders();
    } catch (error) {
      console.log('Update Status Error:', error);
      showToast({
        type: 'error',
        message: `Cập nhật thất bại: ${
          error.response?.data?.detail || error.message
        }`,
        duration: 5000,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: '6%',
      align: 'center',
      render: (_, record, index) => {
        return index + 1 + (Number(currentPage) - 1) * Number(pageSize);
      },
    },
    {
      title: 'ID Đơn hàng',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (id) => <span className="font-medium">#{id}</span>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Khách hàng',
      key: 'user',
      width: '15%',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.user?.fullname || 'N/A'}</div>
          <div className="text-sm text-gray-500">
            {record.user?.email || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      width: '12%',
      render: (total) => (
        <span className="text-gray-700 font-medium">
          {Number(total || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
      sorter: (a, b) => Number(a.total) - Number(b.total),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status, record) => (
        <Select
          style={{
            width: '100%',
            borderColor: getStatusColor(status),
          }}
          value={status}
          onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
          loading={updatingId === record.id}
          options={STATUS_OPTIONS}
          optionLabelProp="label"
          className="font-medium"
        />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '14%',
      render: (date) => {
        if (!date) return 'N/A';
        try {
          return new Date(date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch {
          return date;
        }
      },
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '12%',
      align: 'center',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => onViewDetail(record)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataOrders}
      loading={loading}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        onChange: (page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        },
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} của ${total} đơn hàng`,
      }}
      scroll={{ x: 1000 }}
      bordered
      className="bg-white rounded-lg shadow"
    />
  );
};

export default TableOrder;
