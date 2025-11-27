import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import AuthHeader from '../auth/AuthHeader';
import AuthForm from '../auth/AuthForm';
import BackgroundDecorations from '../auth/BackgroundDecorations';
import '../styles/animations.css';

const AuthPage = ({ onLoginSuccess, onBackToHome, initialMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <BackgroundDecorations />

            {/* Back to Home Button */}
            <button
                onClick={onBackToHome}
                className="fixed top-6 left-6 flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-gray-700 hover:text-blue-600 z-50"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Home</span>
            </button>

            <div className="w-full max-w-md relative animate-fadeIn">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                    <AuthHeader isLogin={isLogin} />
                    <AuthForm isLogin={isLogin} onToggleMode={() => setIsLogin(!isLogin)} onSuccess={onLoginSuccess} />
                </div>

                <p className="text-center mt-6 text-gray-600 text-sm animate-fadeIn animation-delay-500">
                    Phase 1 - Complete Event Management System
                </p>
            </div>
        </div>
    );
};

export default AuthPage;