import React from 'react';
import { CheckCircle } from 'lucide-react';

const SubmitButton = ({ loading, isLogin, onClick }) => {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
        >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">
        {loading ? (
            <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing...
          </span>
        ) : (
            <span className="flex items-center justify-center">
            {isLogin ? 'Login' : 'Create Account'}
                <CheckCircle className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </span>
        )}
      </span>
        </button>
    );
};

export default SubmitButton;