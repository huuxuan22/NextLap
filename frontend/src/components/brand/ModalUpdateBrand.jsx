import React, { useEffect, useState } from 'react';
import { message, notification, Button, Form, Input, Modal, Space } from 'antd';
import brandApi from '../../api/brandApi';

const ModalUpdateBrand = ({
  brand,
  isModalUpdateOpen,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (brand && isModalUpdateOpen) {
      form.setFieldsValue({
        name: brand.name,
        country: brand.country,
      });
    }
  }, [brand, isModalUpdateOpen, form]);

  const handleModalUpdateBrand = async (values) => {
    try {
      setLoading(true);

      const payload = {
        name: values.name.trim(),
        country: values.country.trim(),
      };

      await brandApi.update(brand.id, payload);
      message.success('Cập nhật thương hiệu thành công');
      onSuccess();
    } catch (error) {
      notification.error({
        message: 'Cập nhật thương hiệu thất bại',
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="text-lg font-semibold text-gray-800">
          Chỉnh sửa thương hiệu
        </div>
      }
      open={isModalUpdateOpen}
      onCancel={handleCancel}
      footer={null}
      width={700}
      className="top-8"
      styles={{
        body: { padding: '24px 0' },
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleModalUpdateBrand}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[
            { required: true, message: 'Vui lòng nhập tên thương hiệu' },
            {
              max: 100,
              message: 'Tên thương hiệu không được vượt quá 100 ký tự',
            },
          ]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item
          label="Quốc gia"
          name="country"
          rules={[
            { required: true, message: 'Vui lòng nhập quốc gia' },
            { max: 500, message: 'Quốc gia không được vượt quá 50 ký t' },
          ]}
        >
          <Input placeholder="Nhập quốc gia" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Space>
            <Button
              size="large"
              className="rounded-lg"
              onClick={handleCancel}
              disabled={loading}
            >
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
    </Modal>
  );
};
export default ModalUpdateBrand;
