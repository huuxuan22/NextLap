import { message, notification, Button, Popconfirm, Table, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import brandApi from '../../api/brandApi';

const TableBrand = (props) => {
  const {
    dataBrands,
    loading,
    loadBrands,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
    onEdit,
  } = props;

  const handleDeleteBrand = async (id) => {
    try {
      await brandApi.delete(id);
      message.success('Xóa thương hiệu thành công');
      await loadBrands();
    } catch (error) {
      console.log('Delete Brand Error:', error);
      notification.error({
        message: 'Xóa thương hiệu thất bại',
        description:
          error.response?.data?.detail || 'Không thể kết nối đến server',
        duration: 5,
      });
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: '8%',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text) => <span className="font-medium">{text}</span>,
      ellipsis: true,
    },
    {
      title: 'Quốc gia',
      dataIndex: 'country',
      key: 'country',
      width: '30%',
      render: (text) => <span>{text}</span>,
      ellipsis: true,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '15%',
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
            description="Bạn có chắc chắn muốn xóa thương hiệu này?"
            onConfirm={() => handleDeleteBrand(record.id)}
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
    <Table
      columns={columns}
      dataSource={dataBrands}
      loading={loading}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
      }}
      onChange={handleTableChange}
    />
  );
};

export default TableBrand;
