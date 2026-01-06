import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Upload,
  InputNumber,
  Divider,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import productApi from '../../api/productApi';
import { useToast } from '../../components/Toast';

const ModalCreateProduct = (props) => {
  const { loadProducts, isModalCreateOpen, setIsModalCreateOpen } = props;
  const [form] = Form.useForm();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleCreateProduct = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name.trim());
      formData.append('price', values.price);
      formData.append('description', values.description || '');
      formData.append('quantity_in_stock', values.quantity_in_stock || 0);

      if (values.brand_id) formData.append('brand_id', values.brand_id);
      if (values.ram) formData.append('ram', values.ram);
      if (values.chip) formData.append('chip', values.chip);
      if (values.screen) formData.append('screen', values.screen);
      if (values.battery) formData.append('battery', values.battery);
      if (values.camera) formData.append('camera', values.camera);

      // Append files
      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('files', file.originFileObj);
        }
      });

      await productApi.create(formData);

      showToast({
        type: 'success',
        message: 'Tạo mới sản phẩm thành công',
        duration: 3000,
      });
      handleCloseAndResetModal();
      await loadProducts();
    } catch (error) {
      console.log('Create Product Error:', error);

      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Không thể kết nối đến server';

      showToast({
        type: 'error',
        message: `Tạo mới thất bại: ${errorMessage}`,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleCloseAndResetModal = () => {
    setIsModalCreateOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <>
      <Modal
        title={
          <div className="text-lg font-semibold text-gray-800">
            Tạo mới sản phẩm
          </div>
        }
        open={isModalCreateOpen}
        onOk={handleModalOk}
        onCancel={handleCloseAndResetModal}
        okText="Tạo mới"
        cancelText="Hủy bỏ"
        confirmLoading={loading}
        width={700}
        className="top-8"
        styles={{
          body: { padding: '24px 0' },
        }}
      >
        <div className="px-6 max-h-96 overflow-y-auto">
          <Form
            layout="vertical"
            form={form}
            autoComplete="off"
            initialValues={{
              quantity_in_stock: 0,
            }}
            onFinish={handleCreateProduct}
            className="space-y-3"
          >
            <Form.Item
              name="name"
              label={
                <span className="font-medium text-gray-700">Tên sản phẩm</span>
              }
              rules={[
                { required: true, message: 'Không được để trống tên sản phẩm' },
                { min: 1, max: 150, message: 'Tên từ 1-150 ký tự' },
              ]}
              className="mb-4"
            >
              <Input
                placeholder="Nhập tên sản phẩm"
                disabled={loading}
                className="h-10 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label={
                <span className="font-medium text-gray-700">Giá (VNĐ)</span>
              }
              rules={[
                { required: true, message: 'Không được để trống giá' },
                { type: 'number', min: 0, message: 'Giá phải lớn hơn 0' },
              ]}
              className="mb-4"
            >
              <InputNumber
                min={0}
                disabled={loading}
                className="w-full h-10 rounded-lg"
                placeholder="0"
              />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="brand_id"
                label={
                  <span className="font-medium text-gray-700">ID Hãng</span>
                }
                className="mb-4"
              >
                <InputNumber
                  min={0}
                  disabled={loading}
                  className="w-full h-10 rounded-lg"
                  placeholder="Nhập ID hãng"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="description"
              label={
                <span className="font-medium text-gray-700">
                  Mô tả chi tiết
                </span>
              }
              className="mb-4"
            >
              <Input.TextArea
                placeholder="Nhập mô tả sản phẩm"
                disabled={loading}
                rows={3}
              />
            </Form.Item>

            <Form.Item
              name="quantity_in_stock"
              label={<span className="font-medium text-gray-700">Tồn kho</span>}
              className="mb-4"
            >
              <InputNumber
                min={0}
                disabled={loading}
                className="w-full h-10 rounded-lg"
                placeholder="0"
              />
            </Form.Item>

            <Divider orientation="left" className="mt-6 mb-4">
              <span className="text-base font-semibold text-gray-700">
                Thông số kỹ thuật
              </span>
            </Divider>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item label="RAM" name="ram" className="mb-4">
                <Input placeholder="VD: 8GB" disabled={loading} />
              </Form.Item>

              <Form.Item label="Chip" name="chip" className="mb-4">
                <Input placeholder="VD: Snapdragon 888" disabled={loading} />
              </Form.Item>

              <Form.Item label="Màn hình" name="screen" className="mb-4">
                <Input placeholder="VD: 6.7 inch" disabled={loading} />
              </Form.Item>

              <Form.Item label="Pin" name="battery" className="mb-4">
                <Input placeholder="VD: 5000mAh" disabled={loading} />
              </Form.Item>
            </div>

            <Form.Item label="Camera" name="camera" className="mb-4">
              <Input placeholder="VD: 50MP + 12MP" disabled={loading} />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-medium text-gray-700">
                  Hình ảnh sản phẩm
                </span>
              }
              className="mb-0"
            >
              <Form.Item noStyle>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  multiple
                  maxCount={5}
                  disabled={loading}
                  accept="image/*"
                  className="avatar-uploader"
                >
                  {fileList.length < 5 && (
                    <div className="flex flex-col items-center justify-center">
                      <PlusOutlined className="text-lg mb-2" />
                      <div className="text-sm text-gray-600">Tải ảnh</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateProduct;
