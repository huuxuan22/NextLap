import { message, notification, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import brandApi from '../../api/brandApi';

const ModalCreateBrand = (props) => {
  const { loadBrands, isModalCreateOpen, setIsModalCreateOpen } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateBrand = async (values) => {
    try {
      setLoading(true);

      const payload = {
        name: values.name.trim(),
        country: values.country.trim(),
      };

      await brandApi.create(payload);

      message.success('Tạo mới thương hiệu thành công');
      handleCloseAndResetModal();
      await loadBrands();
    } catch (error) {
      console.log('Create Brand Error:', error);

      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Không thể kết nối đến server';

      notification.error({
        message: 'Tạo thương hiệu thất bại',
        description: errorMessage,
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleCloseAndResetModal = () => {
    form.resetFields();
    setIsModalCreateOpen(false);
  };

  return (
    <>
      <Modal
        title="Tạo mới thương hiệu"
        open={isModalCreateOpen}
        onOk={handleModalOk}
        onCancel={handleCloseAndResetModal}
        confirmLoading={loading}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateBrand}>
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
              { max: 50, message: 'Quốc gia không được vượt quá 50 ký tự' },
            ]}
          >
            <Input placeholder="Nhập quốc gia " />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateBrand;
