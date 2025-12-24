import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * ProductDetail - Product detail page with dynamic route parameter
 */
const ProductDetail = () => {
    const { id } = useParams();

    // Mock product data
    const product = {
        id: id,
        name: `Product ${id}`,
        price: '$99.99',
        description: 'This is a detailed description of the product.',
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                to="/products"
                className="inline-block mb-4 transition-colors hover:underline"
                style={{ color: '#22C55E' }}
            >
                ← Back to Products
            </Link>
            <div
                className="p-8 rounded-lg"
                style={{ backgroundColor: '#1F2937' }}
            >
                <h1
                    className="text-3xl font-bold mb-4"
                    style={{ color: '#F9FAFB' }}
                >
                    {product.name}
                </h1>
                <p
                    className="text-2xl font-semibold mb-4"
                    style={{ color: '#22C55E' }}
                >
                    {product.price}
                </p>
                <p
                    className="mb-6"
                    style={{ color: '#9CA3AF' }}
                >
                    {product.description}
                </p>
                <button
                    className="px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                    style={{
                        backgroundColor: '#22C55E',
                        color: '#F9FAFB'
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;

