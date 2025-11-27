import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon: Icon }) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2";

    const variants = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg",
        success: "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{children}</span>
        </button>
    );
};

export default Button;