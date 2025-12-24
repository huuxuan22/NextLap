import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Products - Product listing page
 */
const Products = () => {
    // Mock products data
    const products = [
        { id: 1, name: 'Product 1', price: '$99.99' },
        { id: 2, name: 'Product 2', price: '$149.99' },
        { id: 3, name: 'Product 3', price: '$199.99' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <h1
                className="text-3xl font-bold mb-8"
                style={{ color: '#F9FAFB' }}
            >
                Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/products/${product.id}`}
                        className="block p-6 rounded-lg transition-transform hover:scale-105"
                        style={{
                            backgroundColor: '#1F2937',
                            color: '#F9FAFB'
                        }}
                    >
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-lg" style={{ color: '#22C55E' }}>
                            {product.price}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;

