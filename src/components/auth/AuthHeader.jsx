import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

const AuthHeader = ({ isLogin }) => {
    return (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 animate-float"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12 animate-float-delay"></div>

            <div className="relative flex items-center justify-center mb-2 animate-fadeIn">
                <Calendar className="w-12 h-12 mr-2 animate-bounce-slow" />
                <Sparkles className="w-6 h-6 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-center animate-slideDown">EventPlanner</h1>
            <p className="text-center text-purple-100 mt-2 text-sm animate-fadeIn animation-delay-300">
                {isLogin ? 'Welcome back! Ready to plan?' : 'Start your journey with us'}
            </p>
        </div>
    );
};

export default AuthHeader;