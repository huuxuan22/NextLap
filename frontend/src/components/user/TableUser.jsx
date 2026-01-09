import { message, notification, Button, Table, Space, Popconfirm } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import userApi from '../../api/userApi';

const TableUser = (props) => {
  const {
    dataUsers,
    loading,
    loadUsers,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
  } = props;

  const handleLockUser = async (id) => {
    try {
      await userApi.lockUser(id);
      message.success('Khóa người dùng thành công');
      await loadUsers();
    } catch (error) {
      notification.error({
        message: 'Khóa người dùng thất bại',
        description:
          error.response?.data?.detail || 'Không thể kết nối đến server',
        duration: 5,
      });
    }
  };

  const handleUnlockUser = async (id) => {
    try {
      await userApi.unlockUser(id);
      message.success('Mở khóa người dùng thành công');
      await loadUsers();
    } catch (error) {
      notification.error({
        message: 'Mở khóa người dùng thất bại',
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
      title: 'Tên người dùng',
      dataIndex: 'full_name',
      key: 'full_name',
      width: '30%',
      render: (text) => <span className="font-medium">{text}</span>,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      render: (text) => <span>{text}</span>,
      ellipsis: true,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
      width: '20%',
      render: (text) => <span>{text}</span>,
      ellipsis: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: '25%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      key: 'is_active',
      width: '15%',
      render: (is_active) =>
        is_active ? (
          <span style={{ color: 'green', fontWeight: 'bold' }}>Hoạt động</span>
        ) : (
          <span style={{ color: 'red', fontWeight: 'bold' }}>Đã khóa</span>
        ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '15%',
      render: (_, record) => (
        <Space size="middle">
          {record.is_active ? (
            <Popconfirm
              title="Xác nhận khóa?"
              description={`Bạn có chắc muốn khóa user "${record.full_name}"?`}
              onConfirm={() => handleLockUser(record.id)}
              okText="Khóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button type="link" danger icon={<LockOutlined />}>
                Khóa
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Xác nhận mở khóa?"
              description={`Bạn có chắc muốn mở khóa user "${record.full_name}"?`}
              onConfirm={() => handleUnlockUser(record.id)}
              okText="Mở khóa"
              cancelText="Hủy"
            >
              <Button
                type="link"
                icon={<UnlockOutlined />}
                style={{ color: '#52c41a' }}
              >
                Mở khóa
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataUsers}
      loading={loading}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50'],
        onChange: (page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        },
      }}
    />
  );
};

export default TableUser;
