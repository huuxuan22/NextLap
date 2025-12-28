import React, { useState } from 'react';

/**
 * ProductGallery - Component gallery hình ảnh sản phẩm
 */
const ProductGallery = ({ images, productName }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: '#1F2937', height: '400px' }}
            >
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#374151' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '16px' }}>
                        {productName}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Main Image */}
            <div
                className="rounded-lg overflow-hidden mb-4"
                style={{ backgroundColor: '#1F2937', height: '400px' }}
            >
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#374151' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '16px' }}>
                        {images[selectedImage] ? `Hình ảnh ${selectedImage + 1}` : productName}
                    </span>
                </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className="rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105"
                        style={{
                            backgroundColor: '#1F2937',
                            height: '100px',
                            border: selectedImage === index ? '2px solid #22C55E' : '2px solid transparent'
                        }}
                    >
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#374151' }}>
                            <span style={{ color: '#9CA3AF', fontSize: '12px' }}>
                                Ảnh {index + 1}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
