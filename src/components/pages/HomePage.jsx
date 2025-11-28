import React from 'react';
import { Calendar, Users, Search, Bell, ArrowRight, Sparkles, LogIn, LayoutDashboard } from 'lucide-react';
import Button from '../common/Button';

const HomePage = ({ onGetStarted, onLogin, isLoggedIn, onGoToDashboard }) => {
    const features = [
        {
            icon: Calendar,
            title: 'Create Events',
            description: 'Organize events with dates, times, locations, and descriptions'
        },
        {
            icon: Users,
            title: 'Invite Attendees',
            description: 'Send invitations to your friends and track their responses'
        },
        {
            icon: Bell,
            title: 'Track Responses',
            description: 'See who is going, maybe, or not attending your events'
        },
        {
            icon: Search,
            title: 'Advanced Search',
            description: 'Find events quickly with powerful search and filtering'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-50 relative overflow-hidden">
            {/* Animated Wave Background */}
            <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-200/40 to-transparent wave-pattern"></div>
                <div className="absolute bottom-10 left-0 right-0 h-20 bg-gradient-to-t from-sky-200/30 to-transparent wave-pattern animation-delay-2000"></div>
            </div>

            {/* Floating Interactive Bubbles */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-br from-blue-300/40 to-cyan-400/30 animate-float-bubble cursor-pointer hover:scale-150 hover:bg-blue-400/50 transition-all duration-1000"
                        style={{
                            width: `${15 + Math.random() * 45}px`,
                            height: `${15 + Math.random() * 45}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 8}s`,
                            animationDuration: `${12 + Math.random() * 12}s`
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

            {/* Floating Islands */}
            <div className="absolute top-20 left-10 w-24 h-8 bg-blue-200/60 rounded-full blur-sm animate-float-island"></div>
            <div className="absolute top-40 right-20 w-32 h-6 bg-cyan-200/50 rounded-full blur-sm animate-float-island animation-delay-3000"></div>
            <div className="absolute bottom-40 left-1/4 w-28 h-7 bg-sky-200/40 rounded-full blur-sm animate-float-island animation-delay-1500"></div>

            {/* Glass Navigation with Floating Effect */}
            <nav className="relative z-50 bg-white/30 backdrop-blur-xl border-b border-blue-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                                <Calendar className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <span className="text-xl font-semibold text-blue-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                EventPlanner
                            </span>
                        </div>
                        <div className="flex items-center space-x-3">
                            {isLoggedIn ? (
                                <Button
                                    onClick={onGoToDashboard}
                                    className="bg-white/50 accent-white border border-blue-200/60 hover:bg-white/70 hover:border-blue-300 hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-500 rounded-2xl group"
                                    icon={LayoutDashboard}
                                >
                                    <span className="group-hover:translate-x-1 transition-transform duration-300">Dashboard</span>
                                </Button>
                            ) : (
                                <>
                                    <button
                                        onClick={onLogin}
                                        className="text-blue-600 hover:text-blue-800 px-4 py-2 font-medium transition-all duration-500 rounded-2xl hover:bg-white/50 hover:shadow-md transform hover:scale-105"
                                    >
                                        Login
                                    </button>
                                    <Button
                                        onClick={onGetStarted}
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 transition-all duration-500 rounded-2xl shadow-lg group overflow-hidden relative"
                                        icon={ArrowRight}
                                    >
                                        <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Sign Up</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    {/* Hero Section with Floating Animation */}
                    <div className="text-center mb-20">
                        <div className="flex items-center justify-center mb-8">
                            <div className="relative group">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl animate-float hover:shadow-3xl transition-all duration-500 cursor-pointer">
                                    <Calendar className="w-16 h-16 text-white transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="absolute -inset-4 bg-blue-300/30 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-500"></div>
                                <Sparkles className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-bounce group-hover:animate-spin transition-all duration-500" />

                                {/* Orbiting elements */}
                                <div className="absolute -top-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full animate-orbit"></div>
                                <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-blue-400 rounded-full animate-orbit animation-delay-1000"></div>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6 animate-fade-in-up">
                            Welcome to <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text hover:from-cyan-600 hover:to-blue-600 transition-all duration-500 cursor-pointer">EventPlanner</span>
                        </h1>
                        <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
                            Your all-in-one platform for organizing events, inviting attendees, and tracking responses with ease
                        </p>

                        <div className="flex items-center justify-center space-x-4 animate-fade-in-up animation-delay-400">
                            {isLoggedIn ? (
                                <Button
                                    onClick={onGoToDashboard}
                                    className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden"
                                    icon={LayoutDashboard}
                                >
                                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Go to Dashboard</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </Button>
                            ) : (
                                <Button
                                    onClick={onGetStarted}
                                    className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 group relative overflow-hidden"
                                    icon={ArrowRight}
                                >
                                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Get Started</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Interactive Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-blue-200/50 hover:border-cyan-300/70 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:scale-105 group cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
                                }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4 shadow-inner transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                    <feature.icon className="w-7 h-7 text-blue-600 transform group-hover:scale-125 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-900 mb-2 group-hover:text-cyan-700 transition-colors duration-300">{feature.title}</h3>
                                <p className="text-blue-700/80 text-sm leading-relaxed group-hover:text-blue-900 transition-colors duration-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Animated Why Choose Section */}
                    <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-12 mb-20 border border-blue-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-blue-900 mb-4 hover:scale-105 transition-transform duration-300 inline-block cursor-pointer">
                                Why Choose EventPlanner?
                            </h2>
                            <p className="text-blue-700 text-lg">Simple, powerful, and built for everyone</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {['Easy to Use', 'Real-time', 'Organized'].map((item, index) => (
                                <div key={index} className="text-center group transform hover:scale-110 transition-transform duration-500 cursor-pointer">
                                    <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text mb-3 group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-500">
                                        {item}
                                    </div>
                                    <p className="text-blue-700/80 group-hover:text-blue-900 transition-colors duration-300">
                                        {item === 'Easy to Use' && 'Intuitive interface for everyone'}
                                        {item === 'Real-time' && 'Instant updates and notifications'}
                                        {item === 'Organized' && 'Keep all events in one place'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final Interactive CTA */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-300/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer">
                            <h3 className="text-3xl font-bold text-blue-900 mb-4 group-hover:scale-105 transition-transform duration-300">Ready to Start Planning?</h3>
                            <p className="text-blue-700 text-lg mb-8 group-hover:text-blue-900 transition-colors duration-300">Join EventPlanner today and organize your events effortlessly</p>
                            {isLoggedIn ? (
                                <Button
                                    onClick={onGoToDashboard}
                                    className="px-12 py-4 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 group relative overflow-hidden"
                                    icon={LayoutDashboard}
                                >
                                    <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">View My Events</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </Button>
                            ) : (
                                <Button
                                    onClick={onGetStarted}
                                    className="px-12 py-4 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600 transition-all duration-500 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 group relative overflow-hidden"
                                    icon={Calendar}
                                >
                                    <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">Create Your First Event</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Footer */}
            <div className="bg-white/30 backdrop-blur-xl border-t border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="max-w-7xl mx-auto px-4 py-8 text-center">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text mb-4 hover:scale-105 transition-transform duration-300 inline-block cursor-pointer">
                        ❤️Our Repo❤️
                    </div>
                    <div className="flex justify-center space-x-8">
                        <a
                            href="https://github.com/HanaAbdelbari/EventPlanner_Fronetend"
                            className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-500 hover:scale-110 hover:-translate-y-0.5 transform"
                        >
                            GitHub Frontend
                        </a>
                        <a
                            href="https://github.com/HanaAbdelbari/EventPlanner_Backend"
                            className="text-blue-600 hover:text-blue-800 font-semibold transition-all duration-500 hover:scale-110 hover:-translate-y-0.5 transform"
                        >
                            GitHub Backend
                        </a>
                    </div>
                </div>
            </div>

            {/* Enhanced Custom Animations */}
            <style jsx>{`
                @keyframes float-bubble {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
                        opacity: 0.4;
                    }
                    33% { 
                        transform: translateY(-25px) translateX(15px) scale(1.1) rotate(120deg);
                        opacity: 0.6;
                    }
                    66% { 
                        transform: translateY(15px) translateX(-20px) scale(0.9) rotate(240deg);
                        opacity: 0.3;
                    }
                }
                @keyframes float-island {
                    0%, 100% { transform: translateX(0px) scale(1); }
                    50% { transform: translateX(20px) scale(1.05); }
                }
                @keyframes orbit {
                    0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                    100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
                }
                @keyframes fade-in-up {
                    0% { 
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .wave-pattern {
                    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25'/%3E%3C/svg%3E");
                    mask-size: 1200px 100px;
                }
                .animate-float-bubble {
                    animation: float-bubble 15s ease-in-out infinite;
                }
                .animate-float-island {
                    animation: float-island 8s ease-in-out infinite;
                }
                .animate-orbit {
                    animation: orbit 4s linear infinite;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-3000 {
                    animation-delay: 3s;
                }
                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
            `}</style>
        </div>
    );
};

export default HomePage;