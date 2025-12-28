/**
 * Mock data cho sản phẩm laptop
 */
export const productsData = [
    {
        id: 1,
        name: 'Dell XPS 15',
        price: 45990000,
        category: 'dell',
        specs: 'Intel i7, 16GB RAM, 512GB SSD',
        cpu: 'Intel Core i7',
        ram: '16GB',
        gpu: 'Integrated',
        storage: '512GB SSD',
        rating: 4.5,
        reviews: 128,
        inStock: true,
        description: 'Dell XPS 15 là laptop cao cấp với thiết kế sang trọng, màn hình InfinityEdge 15.6" sắc nét, hiệu năng mạnh mẽ cho công việc và giải trí. Được trang bị bộ vi xử lý Intel Core i7 thế hệ mới nhất, 16GB RAM và ổ SSD 512GB cho tốc độ xử lý vượt trội.',
        features: [
            'Màn hình 15.6" FHD+ (1920x1200) InfinityEdge',
            'Intel Core i7-13700H (14 nhân, 20 luồng)',
            'RAM 16GB DDR5 4800MHz (có thể nâng cấp 32GB)',
            'SSD 512GB PCIe Gen 4 NVMe',
            'Card đồ họa Intel Iris Xe Graphics',
            'Pin 86WHr, sạc nhanh 130W',
            'Bàn phím có đèn nền, vỏ nhôm nguyên khối',
            'Windows 11 Pro bản quyền',
        ],
        images: [
            'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
            'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        ]
    },
    {
        id: 2,
        name: 'MacBook Pro 14"',
        price: 52990000,
        category: 'apple',
        specs: 'M3 Pro, 18GB RAM, 512GB SSD',
        cpu: 'Apple M3 Pro',
        ram: '18GB',
        gpu: 'Apple M3 Pro GPU',
        storage: '512GB SSD',
        rating: 4.8,
        reviews: 256,
        inStock: true,
        description: 'MacBook Pro 14" với chip M3 Pro mang đến hiệu năng đột phá, màn hình Liquid Retina XDR tuyệt đẹp, và thời lượng pin ấn tượng. Hoàn hảo cho các chuyên gia sáng tạo, lập trình viên và người dùng cần hiệu năng cao.',
        features: [
            'Chip Apple M3 Pro (12-core CPU, 18-core GPU)',
            'Bộ nhớ thống nhất 18GB',
            'SSD 512GB siêu nhanh',
            'Màn hình Liquid Retina XDR 14.2" (3024x1964)',
            'ProMotion 120Hz, HDR, 1000 nits',
            'Pin lên đến 18 giờ',
            '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3',
            'macOS Sonoma với Apple Intelligence',
        ],
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
            'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800',
        ]
    },
    {
        id: 3,
        name: 'Asus ROG Strix G15',
        price: 35990000,
        category: 'asus',
        specs: 'AMD Ryzen 7, RTX 3060, 16GB RAM',
        cpu: 'AMD Ryzen 7',
        ram: '16GB',
        gpu: 'NVIDIA RTX 3060',
        storage: '512GB SSD',
        rating: 4.3,
        reviews: 89,
        inStock: true,
        description: 'Asus ROG Strix G15 là laptop gaming mạnh mẽ với thiết kế thể thao, hiệu năng đỉnh cao từ AMD Ryzen và NVIDIA RTX. Trang bị màn hình 144Hz mượt mà, hệ thống tản nhiệt thông minh cho trải nghiệm gaming tuyệt vời.',
        features: [
            'AMD Ryzen 7 6800H (8 nhân, 16 luồng)',
            'NVIDIA GeForce RTX 3060 6GB GDDR6',
            'RAM 16GB DDR5 4800MHz',
            'SSD 512GB NVMe PCIe 4.0',
            'Màn hình 15.6" FHD 144Hz IPS-level',
            'Bàn phím RGB Aura Sync',
            'Hệ thống tản nhiệt ROG Intelligent Cooling',
            'Windows 11 Home',
        ],
        images: [
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
            'https://images.unsplash.com/photo-1625019030820-e4ed970a6c95?w=800',
            'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800',
        ]
    },
    {
        id: 4,
        name: 'Lenovo ThinkPad X1',
        price: 42990000,
        category: 'lenovo',
        specs: 'Intel i7, 16GB RAM, 1TB SSD',
        cpu: 'Intel Core i7',
        ram: '16GB',
        gpu: 'Integrated',
        storage: '1TB SSD',
        rating: 4.6,
        reviews: 167,
        inStock: true,
        description: 'Lenovo ThinkPad X1 Carbon là laptop doanh nhân cao cấp với độ bền chuẩn quân đội, bảo mật tối ưu, và hiệu năng mạnh mẽ. Siêu mỏng nhẹ chỉ 1.12kg, pin lâu cả ngày, hoàn hảo cho người di động.',
        features: [
            'Intel Core i7-1355U (10 nhân, 12 luồng)',
            'RAM 16GB LPDDR5',
            'SSD 1TB PCIe Gen 4 NVMe',
            'Màn hình 14" WUXGA (1920x1200) IPS',
            'Độ bền chuẩn quân đội MIL-STD-810H',
            'Bảo mật vân tay, camera IR, dTPM 2.0',
            'Pin 57WHr lên đến 15 giờ',
            'Bàn phím ThinkPad huyền thoại có đèn nền',
        ],
        images: [
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
            'https://images.unsplash.com/photo-1593642532400-2682810df593?w=800',
            'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
        ]
    },
    {
        id: 5,
        name: 'HP Pavilion Gaming',
        price: 25990000,
        category: 'hp',
        specs: 'Intel i5, GTX 1650, 8GB RAM',
        cpu: 'Intel Core i5',
        ram: '8GB',
        gpu: 'NVIDIA GTX 1650',
        storage: '512GB SSD',
        rating: 4.0,
        reviews: 75,
        inStock: true,
        description: 'HP Pavilion Gaming là lựa chọn tuyệt vời cho game thủ và người dùng cần hiệu năng tốt với mức giá phải chăng. Thiết kế trẻ trung, cấu hình đủ mạnh cho gaming và làm việc đa nhiệm.',
        features: [
            'Intel Core i5-12450H (8 nhân, 12 luồng)',
            'NVIDIA GeForce GTX 1650 4GB GDDR6',
            'RAM 8GB DDR4 3200MHz (nâng cấp được)',
            'SSD 512GB NVMe',
            'Màn hình 15.6" FHD IPS',
            'Bàn phím có đèn nền xanh',
            'Hệ thống tản nhiệt kép',
            'Windows 11 Home',
        ],
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800',
        ]
    },
    {
        id: 6,
        name: 'MSI Prestige 14',
        price: 38990000,
        category: 'msi',
        specs: 'Intel i7, 16GB RAM, 512GB SSD',
        cpu: 'Intel Core i7',
        ram: '16GB',
        gpu: 'Integrated',
        storage: '512GB SSD',
        rating: 4.4,
        reviews: 93,
        inStock: true,
        description: 'MSI Prestige 14 là laptop cao cấp dành cho sáng tạo nội dung với màn hình có độ phủ màu cao, cấu hình mạnh mẽ và thiết kế sang trọng. Tối ưu cho designer, editor video và lập trình viên.',
        features: [
            'Intel Core i7-1360P (12 nhân, 16 luồng)',
            'RAM 16GB LPDDR5',
            'SSD 512GB NVMe',
            'Màn hình 14" FHD+ 100% sRGB',
            'Intel Iris Xe Graphics',
            'Pin 63WHr lên đến 10 giờ',
            'Vỏ nhôm sang trọng, chỉ 1.29kg',
            'Thunderbolt 4, Wi-Fi 6E',
        ],
        images: [
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        ]
    },
];

/**
 * Lấy sản phẩm theo ID
 * @param {number} id - ID sản phẩm
 * @returns {object|null} Sản phẩm hoặc null nếu không tìm thấy
 */
export const getProductById = (id) => {
    return productsData.find(product => product.id === parseInt(id)) || null;
};
