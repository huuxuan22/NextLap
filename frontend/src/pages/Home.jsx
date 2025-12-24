import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home - Landing page component
 */
const Home = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <section className="text-center py-16">
                <h1
                    className="text-5xl font-bold mb-4"
                    style={{ color: '#F9FAFB' }}
                >
                    Welcome to NextLap
                </h1>
                <p
                    className="text-xl mb-8"
                    style={{ color: '#9CA3AF' }}
                >
                    Your one-stop shop for the latest technology
                </p>
                <Link
                    to="/products"
                    className="inline-block px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                    style={{
                        backgroundColor: '#22C55E',
                        color: '#F9FAFB'
                    }}
                >
                    Browse Products
                </Link>
            </section>
        </div>
    );
};

export default Home;

