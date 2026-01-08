/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Button, Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import productApi from '../api/productApi';
import brandApi from '../api/brandApi';
import TableProduct from '../components/product/TableProduct';
import ModalCreateProduct from '../components/product/ModalCreateProduct';
import ModalUpdateProduct from '../components/product/ModalUpdateProduct';

const ProductsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadProducts();
    loadBrands();
  }, [currentPage, pageSize, searchText]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;
      const res = await productApi.getAll(
        skip,
        pageSize,
        null,
        searchText || null
      );

      if (res.data) {
        setDataProducts(res.data);
        // Extract total from pagination info if available
        const totalProducts = res.pagination?.total || res.data.length;
        setTotal(totalProducts);
      }
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu sản phẩm');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async () => {
    try {
      const res = await brandApi.getAll({ page: 1, limit: 1000 });
      if (res.data) {
        setBrands(res.data);
      }
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalUpdateOpen(true);
  };

  const handleUpdateSuccess = () => {
    setIsModalUpdateOpen(false);
    setSelectedProduct(null);
    loadProducts();
  };

  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Danh sách sản phẩm
          </h1>
          <Button
            onClick={() => {
              setIsModalCreateOpen(true);
            }}
            type="primary"
            size="large"
            className="rounded-lg"
          >
            Tạo mới sản phẩm
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

      <TableProduct
        dataProducts={dataProducts}
        loading={loading}
        loadProducts={loadProducts}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        onEdit={handleEdit}
        brands={brands}
      />

      <ModalCreateProduct
        loadProducts={loadProducts}
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
        brands={brands}
      />

      {selectedProduct && (
        <ModalUpdateProduct
          product={selectedProduct}
          isModalOpen={isModalUpdateOpen}
          onCancel={handleUpdateCancel}
          onSuccess={handleUpdateSuccess}
          brands={brands}
        />
      )}
    </>
  );
};

export default ProductsAdmin;
