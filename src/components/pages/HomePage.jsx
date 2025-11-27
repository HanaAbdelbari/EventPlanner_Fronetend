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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-300 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Glass Navigation */}
            <nav className="bg-white bg-opacity-80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-8 h-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">EventPlanner</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            {isLoggedIn ? (
                                <Button onClick={onGoToDashboard} variant="outline" icon={LayoutDashboard}>
                                    Dashboard
                                </Button>
                            ) : (
                                <>
                                    <button
                                        onClick={onLogin}
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                                    >
                                        Login
                                    </button>
                                    <Button onClick={onGetStarted} icon={ArrowRight}>
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Floating Background Shapes */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-3xl animate-float"></div>
            <div className="absolute top-1/3 right-20 w-40 h-40 bg-indigo-200 rounded-full opacity-30 blur-3xl animate-float animation-delay-300"></div>
            <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-sky-200 rounded-full opacity-30 blur-3xl animate-float animation-delay-200"></div>

            {/* Hero Section */}
            <div className="relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    {/* Header */}
                    <div className="text-center mb-16 animate-fadeIn">
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative">
                                <Calendar className="w-20 h-20 text-blue-600 animate-bounce-slow" />
                                <Sparkles className="w-8 h-8 text-blue-500 absolute -top-2 -right-2 animate-pulse" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slideDown">
                            Welcome to <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">EventPlanner</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-slideDown animation-delay-200">
                            Your all-in-one platform for organizing events, inviting attendees, and tracking responses with ease
                        </p>
                        <div className="flex items-center justify-center space-x-4 animate-slideDown animation-delay-300">
                            {isLoggedIn ? (
                                <Button
                                    onClick={onGoToDashboard}
                                    className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    icon={LayoutDashboard}
                                >
                                    Go to Dashboard
                                </Button>
                            ) : (
                                <Button
                                    onClick={onGetStarted}
                                    className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                    icon={ArrowRight}
                                >
                                    Get Started
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scaleIn border border-blue-100"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-sky-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-scaleIn animation-delay-500 border border-blue-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose EventPlanner?</h2>
                            <p className="text-gray-600">Simple, powerful, and built for everyone</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center transform transition-all duration-300 hover:scale-105">
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
                                    Easy to Use
                                </div>
                                <p className="text-gray-600">Intuitive interface for everyone</p>
                            </div>
                            <div className="text-center transform transition-all duration-300 hover:scale-105">
                                <div className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                    Real-time
                                </div>
                                <p className="text-gray-600">Instant updates and notifications</p>
                            </div>
                            <div className="text-center transform transition-all duration-300 hover:scale-105">
                                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                                    Organized
                                </div>
                                <p className="text-gray-600">Keep all events in one place</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16 animate-fadeIn animation-delay-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Planning?</h3>
                        <p className="text-gray-600 mb-6">Join EventPlanner today and organize your events effortlessly</p>
                        {isLoggedIn ? (
                            <Button
                                onClick={onGoToDashboard}
                                className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                icon={LayoutDashboard}
                            >
                                View My Events
                            </Button>
                        ) : (
                            <Button
                                onClick={onGetStarted}
                                className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                icon={Calendar}
                            >
                                Create Your First Event
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-white bg-opacity-50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">❤️Our Repo❤️</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="https://github.com/HanaAbdelbari/EventPlanner_Fronetend" className="font-bold hover:scale-105 text-blue-600 hover:text-blue-800 transition-transform duration-300">GitHub Frontend</a>
                        <a href="https://github.com/HanaAbdelbari/EventPlanner_Backend" className="font-bold hover:scale-105 text-indigo-600 hover:text-indigo-800 transition-transform duration-300">GitHub Backend</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;