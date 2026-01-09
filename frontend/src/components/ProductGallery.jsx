import React, { useState, useEffect } from 'react';

const ProductGallery = ({ images, productName }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        // Preload images
        images?.forEach((img, index) => {
            const image = new Image();
            image.src = img;
            image.onload = () => {
                setLoadedImages(prev => ({ ...prev, [index]: true }));
            };
            image.onerror = () => {
                setLoadedImages(prev => ({ ...prev, [index]: false }));
            };
        });
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="rounded-lg overflow-hidden bg-gray-800 h-[400px]">
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <span className="text-gray-400 text-base">
                        {productName}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Main Image */}
            <div className="rounded-lg overflow-hidden mb-4 bg-gray-800 h-[400px] relative">
                {loadedImages[selectedImage] === true ? (
                    <img
                        src={images[selectedImage]}
                        alt={`${productName} - Hình ${selectedImage + 1}`}
                        className="w-full h-full object-contain bg-gray-900"
                        loading="eager"
                    />
                ) : loadedImages[selectedImage] === false ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <span className="text-gray-400 text-base">
                            Không thể tải ảnh
                        </span>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <div className="animate-pulse text-gray-400">
                            Đang tải...
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105 relative focus:outline-none focus:ring-2 focus:ring-green-500 ${selectedImage === index ? 'ring-2 ring-green-500' : ''
                            }`}
                        style={{ height: '100px' }}
                    >
                        {loadedImages[index] === true ? (
                            <img
                                src={img}
                                alt={`${productName} - Ảnh ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                <span className="text-gray-400 text-xs">
                                    {loadedImages[index] === false ? 'Lỗi' : 'Đang tải...'}
                                </span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;