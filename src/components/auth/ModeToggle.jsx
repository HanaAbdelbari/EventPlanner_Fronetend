import React from 'react';

const ModeToggle = ({ isLogin, onToggle }) => {
    return (
        <div className="flex bg-gray-100 rounded-full p-1 mb-8 animate-fadeIn">
            <button
                onClick={() => isLogin || onToggle()}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 transform ${
                    isLogin
                        ? 'bg-white text-purple-600 shadow-md scale-105'
                        : 'text-gray-600 hover:text-gray-800 hover:scale-105'
                }`}
            >
                Login
            </button>
            <button
                onClick={() => !isLogin || onToggle()}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 transform ${
                    !isLogin
                        ? 'bg-white text-purple-600 shadow-md scale-105'
                        : 'text-gray-600 hover:text-gray-800 hover:scale-105'
                }`}
            >
                Sign Up
            </button>
        </div>
    );
};

export default ModeToggle;