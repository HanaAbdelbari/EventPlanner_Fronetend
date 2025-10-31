import React, { useState } from 'react';
import AuthHeader from '../auth/AuthHeader';
import AuthForm from '../auth/AuthForm';
import BackgroundDecorations from '../auth/BackgroundDecorations';
import '../styles/animations.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
            <BackgroundDecorations />

            <div className="w-full max-w-md relative animate-fadeIn">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                    <AuthHeader isLogin={isLogin} />
                    <AuthForm isLogin={isLogin} onToggleMode={() => setIsLogin(!isLogin)} />
                </div>
            </div>
        </div>
    );
};

export default AuthPage;