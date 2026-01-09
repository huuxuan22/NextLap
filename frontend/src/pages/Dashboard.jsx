import React, { useState, useEffect } from 'react';
import { Spin, Select, message } from 'antd';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatPrice } from '../utils/formatPrice';
import { TbBrandDatabricks } from 'react-icons/tb';
import { FaLaptop, FaMoneyCheckAlt, FaUser } from 'react-icons/fa';
import dashboardApi from '../api/dashboardApi';

const { Option } = Select;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dashboardData, setDashboardData] = useState({
    total_brands: 0,
    total_products: 0,
    total_revenues: 0,
    total_customers: 0,
    monthlyRevenue: [],
    monthlyProducts: [],
  });

  // Fetch stats và dữ liệu theo năm
  const fetchDashboardData = async (year) => {
    setLoading(true);
    try {
      const [statsRes, revenueRes, productsRes] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getRevenue(year),
        dashboardApi.getProductsSold(year),
      ]);

      setDashboardData({
        total_brands: statsRes.data?.total_brands || 0,
        total_products: statsRes.data?.total_products || 0,
        total_revenues: statsRes.data?.total_revenues || 0,
        total_customers: statsRes.data?.total_customers || 0,
        monthlyRevenue: revenueRes.data || [],
        monthlyProducts: productsRes.data || [],
      });
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu dashboard');
      console.error('Dashboard API error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(selectedYear);
  }, []);

  // Load data khi đổi năm
  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchDashboardData(year);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2020; year--) {
      years.push(year);
    }
    return years;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-700">Thống kê</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Thương hiệu</p>
              <p className="text-2xl font-bold text-highlight">
                {dashboardData.total_brands}
              </p>
            </div>
            <TbBrandDatabricks
              style={{ width: 50, height: 50 }}
              className="text-highlight"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Sản phẩm</p>
              <p className="text-2xl font-bold text-highlight">
                {dashboardData.total_products}
              </p>
            </div>
            <FaLaptop
              style={{ width: 50, height: 50 }}
              className="text-highlight"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Doanh thu</p>
              <p className="text-2xl font-bold text-highlight">
                {formatPrice(dashboardData.total_revenues)}
              </p>
            </div>
            <FaMoneyCheckAlt
              style={{ width: 50, height: 50 }}
              className="text-highlight"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Khách hàng</p>
              <p className="text-2xl font-bold text-highlight">
                {dashboardData.total_customers}
              </p>
            </div>
            <FaUser
              style={{ width: 50, height: 50 }}
              className="text-highlight"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start mb-4">
        <div className="w-48">
          <p className="text-gray-600 text-sm mb-2">Chọn năm</p>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            style={{ width: '100%' }}
            size="large"
          >
            {generateYearOptions().map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-gray-700 text-lg">
              Doanh thu theo tháng
            </h3>
          </div>

          {dashboardData.monthlyRevenue.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] text-gray-400">
              Chưa có dữ liệu doanh thu
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatPrice(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16A34A"
                  name="Doanh thu"
                  strokeWidth={2}
                  dot={{ fill: '#16A34A', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="font-semibold text-gray-700 text-lg">
              Sản phẩm bán theo tháng
            </h3>
          </div>

          {dashboardData.monthlyProducts.length === 0 ? (
            <div className="flex justify-center items-center h-[300px] text-gray-400">
              Chưa có dữ liệu thống kê
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.monthlyProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="total_sold"
                  fill="#16A34A"
                  name="Sản phẩm bán"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
