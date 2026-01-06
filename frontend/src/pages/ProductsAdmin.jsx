/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import productApi from "../api/productApi";
import TableProduct from "../components/product/TableProduct";
import ModalCreateProduct from "../components/product/ModalCreateProduct";
import ModalUpdateProduct from "../components/product/ModalUpdateProduct";

const ProductsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadProducts();
  }, [currentPage, pageSize, searchText]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pageSize;
      const res = await productApi.getAll(skip, pageSize);

      if (res.data) {
        setDataProducts(res.data);
        // Extract total from pagination info if available
        const totalProducts = res.pagination?.total || res.data.length;
        setTotal(totalProducts);
      }
    } catch (error) {
      message.error("Lỗi khi tải dữ liệu sản phẩm");
      console.error(error);
    } finally {
      setLoading(false);
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
              if (e.target.value === "") {
                handleSearch("");
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
      />

      <ModalCreateProduct
        loadProducts={loadProducts}
        isModalCreateOpen={isModalCreateOpen}
        setIsModalCreateOpen={setIsModalCreateOpen}
      />

      {selectedProduct && (
        <ModalUpdateProduct
          product={selectedProduct}
          isModalOpen={isModalUpdateOpen}
          onCancel={handleUpdateCancel}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default ProductsAdmin;
