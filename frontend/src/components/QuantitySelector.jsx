import React from 'react';

/**
 * QuantitySelector - Component chọn số lượng sản phẩm
 */
const QuantitySelector = ({ quantity, setQuantity, min = 1, max = 99 }) => {
    const handleIncrease = () => {
        if (quantity < max) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > min) {
            setQuantity(quantity - 1);
        }
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= min && value <= max) {
            setQuantity(value);
        }
    };

    return (
        <div>
            <p className="text-sm mb-2" style={{ color: '#F9FAFB' }}>Số lượng:</p>
            <div className="flex items-center">
                <button
                    onClick={handleDecrease}
                    className="px-4 py-2 rounded-l-lg font-bold transition-colors hover:opacity-80"
                    style={{
                        backgroundColor: '#374151',
                        color: '#F9FAFB',
                        cursor: quantity <= min ? 'not-allowed' : 'pointer',
                        opacity: quantity <= min ? 0.5 : 1
                    }}
                    disabled={quantity <= min}
                >
                    −
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    className="px-6 py-2 font-semibold text-center outline-none"
                    style={{
                        backgroundColor: '#111827',
                        color: '#F9FAFB',
                        width: '80px',
                        border: 'none',
                        MozAppearance: 'textfield'
                    }}
                    min={min}
                    max={max}
                />
                <button
                    onClick={handleIncrease}
                    className="px-4 py-2 rounded-r-lg font-bold transition-colors hover:opacity-80"
                    style={{
                        backgroundColor: '#374151',
                        color: '#F9FAFB',
                        cursor: quantity >= max ? 'not-allowed' : 'pointer',
                        opacity: quantity >= max ? 0.5 : 1
                    }}
                    disabled={quantity >= max}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
