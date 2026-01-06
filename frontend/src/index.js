import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from './components';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={viVN}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </ConfigProvider>
);

reportWebVitals();
