import { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import brandApi from '../api/brandApi';
import TableBrand from '../components/brand/TableBrand';
import ModalCreateBrand from '../components/brand/ModalCreateBrand';
import ModalUpdateBrand from '../components/brand/ModalUpdateBrand';

const BrandAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [dataBrands, setDataBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadBrands();
  }, [currentPage, pageSize, searchText]);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const res = await brandApi.getAll({
        page: currentPage,
        limit: pageSize,
        search: searchText,
      });

      if (res.data) {
        setDataBrands(res.data);
        const totalBrands = res.pagination?.total || res.data.length;
        setTotal(totalBrands);
      }
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu thương hiệu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setIsModalUpdateOpen(true);
  };

  const handleUpdateSuccess = () => {
    setIsModalUpdateOpen(false);
    setSelectedBrand(null);
    loadBrands();
  };

  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
    setSelectedBrand(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Danh sách nhãn hàng
          </h1>
          <Button
            onClick={() => {
              setIsModalCreateOpen(true);
            }}
            type="primary"
            size="large"
            className="rounded-lg"
          >
            Tạo mới nhãn hàng
          </Button>
        </div>

        <div style={{ width: 300 }}>
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
      </div>

      <TableBrand
        loading={loading}
        dataBrands={dataBrands}
        loadBrands={loadBrands}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        onEdit={handleEdit}
      />

      <ModalCreateBrand
        loadBrands={loadBrands}
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
      />
      {selectedBrand && (
        <ModalUpdateBrand
          brand={selectedBrand}
          isModalUpdateOpen={isModalUpdateOpen}
          onSuccess={handleUpdateSuccess}
          onCancel={handleUpdateCancel}
        />
      )}
    </>
  );
};

export default BrandAdmin;
