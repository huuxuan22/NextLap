-- ============================================
-- DEMO DATA FOR PHONE STORE DATABASE
-- ============================================
-- Thứ tự insert: Bảng cha trước, bảng con sau
-- ============================================

-- 1. ROLES (Bảng không có Foreign Key)
INSERT INTO roles (id, name, description) VALUES
(1, 'Admin', 'Quản trị viên hệ thống'),
(2, 'Customer', 'Khách hàng'),
(3, 'Staff', 'Nhân viên cửa hàng');

-- 2. BRANDS (Bảng không có Foreign Key)
INSERT INTO brands (id, name, country) VALUES
(1, 'Apple', 'USA'),
(2, 'Samsung', 'South Korea'),
(3, 'Xiaomi', 'China'),
(4, 'OPPO', 'China'),
(5, 'Vivo', 'China'),
(6, 'Realme', 'China'),
(7, 'Huawei', 'China'),
(8, 'OnePlus', 'China');

-- 3. CATEGORIES (Bảng không có Foreign Key)
INSERT INTO categories (id, name) VALUES
(1, 'Smartphone'),
(2, 'Tablet'),
(3, 'Smartwatch'),
(4, 'Accessories');

-- 4. USERS (FK: role_id)
INSERT INTO users (id, full_name, email, phone, address, avatar, role_id) VALUES
(1, 'Nguyễn Văn A', 'nguyenvana@example.com', '0901234567', '123 Đường ABC, Quận 1, TP.HCM', 'https://example.com/avatar1.jpg', 1),
(2, 'Trần Thị B', 'tranthib@example.com', '0902345678', '456 Đường XYZ, Quận 2, TP.HCM', 'https://example.com/avatar2.jpg', 2),
(3, 'Lê Văn C', 'levanc@example.com', '0903456789', '789 Đường DEF, Quận 3, TP.HCM', 'https://example.com/avatar3.jpg', 2),
(4, 'Phạm Thị D', 'phamthid@example.com', '0904567890', '321 Đường GHI, Quận 4, TP.HCM', 'https://example.com/avatar4.jpg', 2),
(5, 'Hoàng Văn E', 'hoangvane@example.com', '0905678901', '654 Đường JKL, Quận 5, TP.HCM', 'https://example.com/avatar5.jpg', 3);

-- 5. PRODUCTS (FK: brand_id, category_id)
INSERT INTO products (id, name, brand_id, category_id, price, description) VALUES
(1, 'iPhone 15 Pro Max', 1, 1, 29990000, 'iPhone 15 Pro Max 256GB - Flagship mới nhất từ Apple với chip A17 Pro'),
(2, 'iPhone 14', 1, 1, 19990000, 'iPhone 14 128GB - Điện thoại Apple với chip A15 Bionic'),
(3, 'Samsung Galaxy S24 Ultra', 2, 1, 27990000, 'Samsung Galaxy S24 Ultra 256GB - Flagship Android với S Pen'),
(4, 'Samsung Galaxy A54', 2, 1, 8990000, 'Samsung Galaxy A54 128GB - Điện thoại tầm trung chất lượng'),
(5, 'Xiaomi 14 Pro', 3, 1, 18990000, 'Xiaomi 14 Pro 256GB - Flagship với camera Leica'),
(6, 'Xiaomi Redmi Note 13', 3, 1, 5990000, 'Xiaomi Redmi Note 13 128GB - Điện thoại giá rẻ hiệu năng tốt'),
(7, 'OPPO Find X7', 4, 1, 21990000, 'OPPO Find X7 256GB - Flagship với camera Hasselblad'),
(8, 'Vivo X100 Pro', 5, 1, 22990000, 'Vivo X100 Pro 256GB - Flagship với camera Zeiss'),
(9, 'Realme GT 5 Pro', 6, 1, 14990000, 'Realme GT 5 Pro 256GB - Flagship giá tốt'),
(10, 'OnePlus 12', 8, 1, 19990000, 'OnePlus 12 256GB - Flagship với OxygenOS');

-- 6. PRODUCT_SPECS (FK: product_id)
-- Lưu ý: images là JSON field, cần format đúng JSON string
INSERT INTO product_specs (id, product_id, ram, chip, screen, battery, camera, quantity_in_stock, images) VALUES
(1, 1, '8GB', 'Apple A17 Pro', '6.7 inch Super Retina XDR', '4422 mAh', '48MP + 12MP + 12MP', 50, JSON_ARRAY('https://example.com/iphone15-1.jpg', 'https://example.com/iphone15-2.jpg')),
(2, 2, '6GB', 'Apple A15 Bionic', '6.1 inch Super Retina XDR', '3279 mAh', '12MP + 12MP', 100, JSON_ARRAY('https://example.com/iphone14-1.jpg', 'https://example.com/iphone14-2.jpg')),
(3, 3, '12GB', 'Snapdragon 8 Gen 3', '6.8 inch Dynamic AMOLED 2X', '5000 mAh', '200MP + 50MP + 12MP + 10MP', 30, JSON_ARRAY('https://example.com/s24ultra-1.jpg', 'https://example.com/s24ultra-2.jpg')),
(4, 4, '8GB', 'Exynos 1380', '6.4 inch Super AMOLED', '5000 mAh', '50MP + 12MP + 5MP', 200, JSON_ARRAY('https://example.com/a54-1.jpg', 'https://example.com/a54-2.jpg')),
(5, 5, '12GB', 'Snapdragon 8 Gen 3', '6.73 inch AMOLED', '4880 mAh', '50MP + 50MP + 50MP', 80, JSON_ARRAY('https://example.com/xiaomi14-1.jpg', 'https://example.com/xiaomi14-2.jpg')),
(6, 6, '8GB', 'Snapdragon 685', '6.67 inch AMOLED', '5000 mAh', '108MP + 8MP + 2MP', 150, JSON_ARRAY('https://example.com/redmi13-1.jpg', 'https://example.com/redmi13-2.jpg')),
(7, 7, '16GB', 'Snapdragon 8 Gen 3', '6.78 inch AMOLED', '5000 mAh', '50MP + 50MP + 64MP', 40, JSON_ARRAY('https://example.com/oppo-1.jpg', 'https://example.com/oppo-2.jpg')),
(8, 8, '16GB', 'MediaTek Dimensity 9300', '6.78 inch AMOLED', '5400 mAh', '50MP + 50MP + 64MP', 35, JSON_ARRAY('https://example.com/vivo-1.jpg', 'https://example.com/vivo-2.jpg')),
(9, 9, '16GB', 'Snapdragon 8 Gen 3', '6.78 inch AMOLED', '5400 mAh', '50MP + 8MP + 2MP', 60, JSON_ARRAY('https://example.com/realme-1.jpg', 'https://example.com/realme-2.jpg')),
(10, 10, '16GB', 'Snapdragon 8 Gen 3', '6.82 inch AMOLED', '5400 mAh', '50MP + 64MP + 48MP', 45, JSON_ARRAY('https://example.com/oneplus-1.jpg', 'https://example.com/oneplus-2.jpg'));

-- 7. CARTS (FK: user_id)
INSERT INTO carts (id, user_id) VALUES
(1, 2),
(2, 3),
(3, 4);

-- 8. ORDERS (FK: user_id)
INSERT INTO orders (id, user_id, status, total) VALUES
(1, 2, 'COMPLETED', 29990000),
(2, 2, 'PENDING', 8990000),
(3, 3, 'COMPLETED', 19990000),
(4, 4, 'PROCESSING', 27990000);

-- 9. ORDER_ITEMS (FK: order_id, product_id)
INSERT INTO order_items (id, order_id, product_id, quantity, price) VALUES
(1, 1, 1, 1, 29990000),
(2, 2, 4, 1, 8990000),
(3, 3, 2, 1, 19990000),
(4, 4, 3, 1, 27990000);

-- 10. PAYMENTS (FK: order_id)
INSERT INTO payments (id, order_id, method, amount, status, paid_at) VALUES
(1, 1, 'Credit Card', 29990000, 'PAID', '2024-01-15 10:30:00'),
(2, 2, 'Bank Transfer', 8990000, 'PENDING', NULL),
(3, 3, 'Cash', 19990000, 'PAID', '2024-01-16 14:20:00'),
(4, 4, 'Credit Card', 27990000, 'PROCESSING', NULL);

-- 11. CART_ITEMS (FK: cart_id, product_id)
INSERT INTO cart_items (id, cart_id, product_id, quantity, price) VALUES
(1, 1, 5, 1, 18990000),
(2, 1, 6, 2, 5990000),
(3, 2, 7, 1, 21990000),
(4, 3, 8, 1, 22990000),
(5, 3, 9, 1, 14990000);

-- ============================================
-- END OF DEMO DATA
-- ============================================

