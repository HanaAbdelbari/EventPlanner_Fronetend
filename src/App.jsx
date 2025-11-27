import React, { useState } from 'react';
import HomePage from './components/pages/HomePage';
import AuthPage from './components/pages/AuthPage';
import DashboardPage from './components/pages/DashboardPage';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [authMode, setAuthMode] = useState('login');
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleGetStarted = () => {
        setAuthMode('signup');
        setCurrentPage('auth');
    };

    const handleLogin = () => {
        setAuthMode('login');
        setCurrentPage('auth');
    };

    const handleLoginSuccess = (userData) => {
        console.log('Login data received:', userData);

        // Backend now returns: { message, user_id, name, email, token }
        const name = userData?.name || 'User';

        setUserName(name);
        setIsLoggedIn(true);
        setCurrentPage('dashboard');
    };

    const handleLogout = () => {
        setUserName('');
        setIsLoggedIn(false);
        setCurrentPage('home');
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
    };

    const handleGoToDashboard = () => {
        if (isLoggedIn) {
            setCurrentPage('dashboard');
        } else {
            setAuthMode('login');
            setCurrentPage('auth');
        }
    };

    return (
        <>
            {currentPage === 'home' && (
                <HomePage
                    onGetStarted={handleGetStarted}
                    onLogin={handleLogin}
                    isLoggedIn={isLoggedIn}
                    onGoToDashboard={handleGoToDashboard}
                />
            )}
            {currentPage === 'auth' && (
                <AuthPage
                    onLoginSuccess={handleLoginSuccess}
                    onBackToHome={handleBackToHome}
                    initialMode={authMode}
                />
            )}
            {currentPage === 'dashboard' && (
                <DashboardPage
                    userName={userName}
                    onLogout={handleLogout}
                    onGoHome={handleBackToHome}
                />
            )}
        </>
    );
}

export default App;