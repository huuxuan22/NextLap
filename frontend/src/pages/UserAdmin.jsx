import { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import userApi from '../api/userApi';
import TableUser from '../components/user/TableUser';

const UserAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadUsers();
  }, [currentPage, pageSize, searchText]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await userApi.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchText,
      });

      if (res.data) {
        setDataUsers(res.data);
        const totalUsers = res.pagination?.total || res.data.length;
        setTotal(totalUsers);
      }
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu người dùng');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        Danh sách người dùng
      </h1>
      <div style={{ width: 300 }} className="mb-4">
        <Input.Search
          placeholder="Tìm kiếm theo tên"
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          onChange={(e) => {
            if (e.target.value === '') {
              handleSearch('');
            }
          }}
        />
      </div>
      <TableUser
        loading={loading}
        dataUsers={dataUsers}
        currentPage={currentPage}
        pageSize={pageSize}
        total={total}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loadUsers={loadUsers}
      />
    </div>
  );
};

export default UserAdmin;
