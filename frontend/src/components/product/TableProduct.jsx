import { App, Button, Popconfirm, Table, Tag, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import productApi from '../../api/productApi';

const TableProduct = (props) => {
  const {
    dataProducts,
    loading,
    loadProducts,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
    onEdit,
  } = props;

  const { message, notification } = App.useApp();

  const handleDeleteProduct = async (id) => {
    try {
      await productApi.delete(id);
      message.success('Xóa sản phẩm thành công');
      await loadProducts();
    } catch (error) {
      console.log('Delete Product Error:', error);
      notification.error({
        message: 'Xóa sản phẩm thất bại',
        description:
          error.response?.data?.detail || 'Không thể kết nối đến server',
        duration: 5,
      });
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text) => <span className="font-medium">{text}</span>,
      ellipsis: true,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      width: '12%',
      render: (price) => (
        <span className="text-gray-700">
          {price?.toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Tồn kho',
      dataIndex: ['spec', 'quantity_in_stock'],
      key: 'quantity_in_stock',
      width: '12%',
      render: (quantity) => <span>{quantity || 0}</span>,
    },
    {
      title: 'Hãng',
      dataIndex: ['brand', 'name'],
      key: 'brand_id',
      width: '15%',
      render: (text) => <span className="text-gray-600">{text || 'N/A'}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: ['category', 'name'],
      key: 'category_id',
      width: '15%',
      render: (text) => <span className="text-gray-600">{text || 'N/A'}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '18%',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            className="rounded-lg"
            onClick={() => onEdit?.(record)}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              className="rounded-lg"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className="space-y-4">
      <Table
        columns={columns}
        dataSource={dataProducts}
        loading={loading}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          showTotal: (total) => `Tổng cộng ${total} sản phẩm`,
        }}
        onChange={handleTableChange}
        className="rounded-lg overflow-hidden shadow-sm"
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default TableProduct;
