import React from 'react';

/**
 * Spinner Component
 * Small loading spinner designed for use inside buttons
 * 
 * @param {Object} props
 * @param {string} [props.size='w-4 h-4'] - Size of spinner (Tailwind size classes)
 * @param {string} [props.className=''] - Additional CSS classes
 */
const Spinner = ({ size = 'w-4 h-4', className = '' }) => {
    return (
        <div
            className={`${size} border-2 border-white/40 border-t-white rounded-full animate-spin ${className}`}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Spinner;

