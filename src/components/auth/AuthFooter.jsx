import React from 'react';

const AuthFooter = ({ isLogin, onToggle }) => {
    return (
        <div className="mt-6 text-center text-sm text-gray-600 animate-fadeIn animation-delay-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
                onClick={onToggle}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-all duration-300 hover:underline transform hover:scale-105 inline-block"
            >
                {isLogin ? 'Sign Up' : 'Login'}
            </button>
        </div>
    );
};

export default AuthFooter;