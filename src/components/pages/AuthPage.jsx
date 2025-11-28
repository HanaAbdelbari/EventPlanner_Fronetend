import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import AuthHeader from '../auth/AuthHeader';
import AuthForm from '../auth/AuthForm';
import BackgroundDecorations from '../auth/BackgroundDecorations';
import '../styles/animations.css';

const AuthPage = ({ onLoginSuccess, onBackToHome, initialMode = 'login' }) => {
    const [isLogin, setIsLogin] = useState(initialMode === 'login');

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Enhanced Background Decorations */}
            <BackgroundDecorations />

            {/* Additional Floating Elements */}
            <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-blue-300/30 to-cyan-400/20 animate-float-bubble cursor-pointer hover:scale-150 hover:bg-blue-400/40 transition-all duration-1000"
                        style={{
                            width: `${10 + Math.random() * 30}px`,
                            height: `${10 + Math.random() * 30}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                        onClick={(e) => {
                            e.currentTarget.style.transform = 'scale(2)';
                            e.currentTarget.style.opacity = '0';
                            setTimeout(() => {
                                e.currentTarget.style.display = 'none';
                            }, 500);
                        }}
                    />
                ))}
            </div>

            {/* Wave Background */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/30 to-transparent wave-pattern"></div>
            <div className="absolute bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-sky-200/20 to-transparent wave-pattern animation-delay-2000"></div>

            {/* Enhanced Back to Home Button */}
            <button
                onClick={onBackToHome}
                className="fixed top-6 left-6 flex items-center space-x-2 px-4 py-3 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 text-blue-700 hover:text-blue-900 z-50 group border border-blue-200/50"
            >
                <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium group-hover:translate-x-0.5 transition-transform duration-300">Back to Home</span>
                <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <div className="w-full max-w-md relative animate-fadeIn">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-blue-200/50 group">
                    {/* Floating Orbiting Elements around the card */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-orbit opacity-60"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-orbit animation-delay-1000 opacity-60"></div>

                    <AuthHeader isLogin={isLogin} />
                    <AuthForm
                        isLogin={isLogin}
                        onToggleMode={() => setIsLogin(!isLogin)}
                        onSuccess={onLoginSuccess}
                    />
                </div>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes float-bubble {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
                        opacity: 0.3;
                    }
                    33% { 
                        transform: translateY(-20px) translateX(10px) scale(1.1) rotate(120deg);
                        opacity: 0.5;
                    }
                    66% { 
                        transform: translateY(10px) translateX(-15px) scale(0.9) rotate(240deg);
                        opacity: 0.2;
                    }
                }
                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(20px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
                }
                .wave-pattern {
                    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25'/%3E%3C/svg%3E");
                    mask-size: 1200px 100px;
                }
                .animate-float-bubble {
                    animation: float-bubble 12s ease-in-out infinite;
                }
                .animate-orbit {
                    animation: orbit 3s linear infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
};

export default AuthPage;