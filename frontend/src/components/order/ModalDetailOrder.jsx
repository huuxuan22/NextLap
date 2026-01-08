import { Modal, Divider, Table, Tag, Spin, Empty, Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

const ModalDetailOrder = (props) => {
  const { isModalOpen, orderDetail, loading, onCancel } = props;

  const STATUS_OPTIONS = [
    { value: 'PENDING', label: 'Chờ xác nhận', color: '#FBBF24' },
    { value: 'PROCESSING', label: 'Đang xử lý', color: '#3B82F6' },
    { value: 'SHIPPED', label: 'Đã gửi hàng', color: '#8B5CF6' },
    { value: 'DELIVERED', label: 'Đã giao', color: '#10B981' },
    { value: 'CANCELLED', label: 'Đã hủy', color: '#EF4444' },
  ];

  const getStatusLabel = (status) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.label || status;
  };

  const getStatusColor = (status) => {
    const option = STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.color || '#6B7280';
  };

  const itemColumns = [
    {
      title: 'Sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'product_name',
      width: '35%',
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
      align: 'center',
      render: (quantity) => <span className="font-medium">{quantity}</span>,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      width: '20%',
      align: 'right',
      render: (price) => (
        <span className="font-medium">
          {Number(price || 0).toLocaleString('vi-VN')} ₫
        </span>
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      width: '20%',
      align: 'right',
      render: (_, record) => (
        <span className="font-medium text-green-600">
          {Number(record.quantity * record.price || 0).toLocaleString('vi-VN')}{' '}
          ₫
        </span>
      ),
    },
  ];

  return (
    <Modal
      title={
        orderDetail ? (
          <div>
            Chi tiết đơn hàng #{orderDetail.id}
            <Tag
              color={getStatusColor(orderDetail.status)}
              style={{ marginLeft: '10px' }}
            >
              {getStatusLabel(orderDetail.status)}
            </Tag>
          </div>
        ) : (
          'Chi tiết đơn hàng'
        )
      }
      open={isModalOpen}
      onCancel={onCancel}
      width={900}
      footer={[
        <Button
          key="print"
          icon={<PrinterOutlined />}
          onClick={() => window.print()}
        >
          In
        </Button>,
        <Button key="close" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        {orderDetail ? (
          <div>
            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-600">Khách hàng</p>
                <p className="text-base font-semibold">
                  {orderDetail.user?.fullname || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-base">{orderDetail.user?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Số điện thoại
                </p>
                <p className="text-base">{orderDetail.user?.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Ngày tạo</p>
                <p className="text-base">
                  {new Date(orderDetail.created_at).toLocaleDateString(
                    'vi-VN',
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </p>
              </div>
            </div>

            <Divider>Chi tiết sản phẩm</Divider>

            {/* Order Items Table */}
            {orderDetail.order_items && orderDetail.order_items.length > 0 ? (
              <Table
                columns={itemColumns}
                dataSource={orderDetail.order_items}
                rowKey="id"
                pagination={false}
                bordered
                className="mb-6"
              />
            ) : (
              <Empty description="Không có sản phẩm" className="mb-6" />
            )}

            <Divider>Thông tin thanh toán</Divider>

            {/* Payment Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tổng tiền hàng
                </p>
                <p className="text-lg font-bold text-blue-600">
                  {Number(orderDetail.total || 0).toLocaleString('vi-VN')} ₫
                </p>
              </div>
              {orderDetail.payment && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Phương thức thanh toán
                    </p>
                    <p className="text-base font-semibold">
                      {orderDetail.payment.payment_method || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Trạng thái thanh toán
                    </p>
                    <Tag
                      color={
                        orderDetail.payment.status === 'COMPLETED'
                          ? 'green'
                          : 'orange'
                      }
                    >
                      {orderDetail.payment.status === 'COMPLETED'
                        ? 'Đã thanh toán'
                        : 'Chưa thanh toán'}
                    </Tag>
                  </div>
                  {orderDetail.payment.transaction_id && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Mã giao dịch
                      </p>
                      <p className="text-base font-mono">
                        {orderDetail.payment.transaction_id}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Spin>
    </Modal>
  );
};

export default ModalDetailOrder;
