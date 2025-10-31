import React from 'react';

const BackgroundDecorations = () => {
    return (
        <>
            <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-50 blur-xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-50 blur-xl animate-float-delay"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-50 blur-xl animate-pulse-slow"></div>
            <div className="absolute top-1/4 left-1/3 w-24 h-24 bg-purple-300 rounded-full opacity-30 blur-2xl animate-float"></div>
        </>
    );
};

export default BackgroundDecorations;