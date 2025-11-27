import React from 'react';
import { Calendar, LogOut, Menu, X, Home } from 'lucide-react';
import { clearAuthToken } from '../services/api';

const Navbar = ({ userName, onLogout, onGoHome }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        clearAuthToken();
        onLogout();
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Clickable */}
                    <button
                        onClick={onGoHome}
                        className="flex items-center space-x-3 animate-slideRight hover:opacity-80 transition-opacity duration-300"
                    >
                        <Calendar className="w-8 h-8" />
                        <span className="text-xl font-bold">EventPlanner</span>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={onGoHome}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </button>
                        <span className="text-sm">Welcome, {userName}!</span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white bg-opacity-10 animate-slideDown">
                    <div className="px-4 py-3 space-y-2">
                        <button
                            onClick={() => {
                                onGoHome();
                                setIsMenuOpen(false);
                            }}
                            className="flex items-center space-x-2 w-full bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300"
                        >
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                        </button>
                        <p className="text-sm px-4 py-2">Welcome, {userName}!</p>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 w-full bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-300"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;