import { App, Button, Popconfirm, Table, Tag, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import productApi from '../../api/productApi';
import { useToast } from '../Toast';

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
    brands,
  } = props;

  const { showToast } = useToast();

  const getBrandName = (brandId) => {
    if (!brandId) return 'N/A';
    const brand = brands?.find((b) => b.id === brandId);
    return brand?.name || 'N/A';
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productApi.delete(id);
      showToast({
        type: 'success',
        message: 'Xóa sản phẩm thành công',
        duration: 3000,
      });
      await loadProducts();
    } catch (error) {
      console.log('Delete Product Error:', error);
      showToast({
        type: 'error',
        message: `Xóa thất bại`,
        duration: 5000,
      });
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: '8%',
      align: 'center',
      render: (_, record, index) => {
        return index + 1 + (Number(currentPage) - 1) * Number(pageSize);
      },
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
      sorter: (a, b) => Number(a.price) - Number(b.price),
    },
    {
      title: 'Tồn kho',
      dataIndex: ['spec', 'quantity_in_stock'],
      key: 'quantity_in_stock',
      width: '12%',
      render: (quantity) => <span>{quantity || 0}</span>,
      sorter: (a, b) =>
        Number(a.spec?.quantity_in_stock || 0) -
        Number(b.spec?.quantity_in_stock || 0),
    },
    {
      title: 'Hãng',
      dataIndex: 'brand_id',
      key: 'brand_id',
      width: '15%',
      render: (brandId) => (
        <span className="text-gray-600">{getBrandName(brandId)}</span>
      ),
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
