import React, { useEffect, useState } from 'react';
import {
  App,
  Button,
  Form,
  Input,
  Upload,
  InputNumber,
  Divider,
  Space,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import productApi from '../../api/productApi';

const ModalUpdateProduct = ({ product, isModalOpen, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (product && isModalOpen) {
      form.setFieldsValue({
        name: product.name,
        price: product.price,
        description: product.description,
        brand_id: product.brand_id,
        category_id: product.category_id,
        quantity_in_stock: product.spec?.quantity_in_stock || 0,
        ram: product.spec?.ram,
        chip: product.spec?.chip,
        screen: product.spec?.screen,
        battery: product.spec?.battery,
        camera: product.spec?.camera,
      });

      // Set existing images
      if (product.spec?.images && Array.isArray(product.spec.images)) {
        const existingFiles = product.spec.images.map((url, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: 'done',
          url: url,
          isExisting: true,
        }));
        setFileList(existingFiles);
      } else {
        setFileList([]);
      }
    }
  }, [product, isModalOpen, form]);

  const handleModalUpdateProduct = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name.trim());
      formData.append('price', values.price);
      formData.append('description', values.description || '');
      formData.append('quantity_in_stock', values.quantity_in_stock || 0);

      if (values.brand_id) formData.append('brand_id', values.brand_id);
      if (values.category_id)
        formData.append('category_id', values.category_id);
      if (values.ram) formData.append('ram', values.ram);
      if (values.chip) formData.append('chip', values.chip);
      if (values.screen) formData.append('screen', values.screen);
      if (values.battery) formData.append('battery', values.battery);
      if (values.camera) formData.append('camera', values.camera);

      // Check if there are new files to upload
      const newFiles = fileList.filter((f) => f.originFileObj);
      if (newFiles.length > 0) {
        newFiles.forEach((file) => {
          formData.append('files', file.originFileObj);
        });
        // Replace old images
        formData.append('keep_old_images', false);
      } else {
        // Keep old images
        formData.append('keep_old_images', true);
      }

      await productApi.update(product.id, formData);

      message.success('Cập nhật sản phẩm thành công');
      onSuccess?.();
    } catch (error) {
      console.log('Update Product Error:', error);

      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Không thể kết nối đến server';

      notification.error({
        message: 'Cập nhật thất bại',
        description: errorMessage,
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel?.();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      title={
        <div className="text-lg font-semibold text-gray-800">
          Chỉnh sửa sản phẩm
        </div>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
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
          onFinish={handleModalUpdateProduct}
          className="space-y-1"
        >
          <Form.Item
            name="name"
            label={
              <span className="font-medium text-gray-700">Tên sản phẩm *</span>
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
              <span className="font-medium text-gray-700">Giá (VNĐ) *</span>
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
              label={<span className="font-medium text-gray-700">ID Hãng</span>}
              className="mb-4"
            >
              <InputNumber
                min={0}
                disabled={loading}
                className="w-full h-10 rounded-lg"
                placeholder="Nhập ID hãng"
              />
            </Form.Item>

            <Form.Item
              name="category_id"
              label={
                <span className="font-medium text-gray-700">ID Danh mục</span>
              }
              className="mb-4"
            >
              <InputNumber
                min={0}
                disabled={loading}
                className="w-full h-10 rounded-lg"
                placeholder="Nhập ID danh mục"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={
              <span className="font-medium text-gray-700">Mô tả chi tiết</span>
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
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
              Tải ảnh mới sẽ thay thế ảnh cũ. Để giữ ảnh cũ, hãy không tải ảnh
              mới.
            </p>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel} disabled={loading}>
                Hủy bỏ
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="rounded-lg"
              >
                Cập nhật
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalUpdateProduct;
