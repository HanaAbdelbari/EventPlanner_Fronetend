import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import InputField from './InputField';
import ModeToggle from './ModeToggle';
import SubmitButton from './SubmitButton';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import AuthFooter from './AuthFooter';
import useAuthForm from '../hooks/useAuthForm';

const AuthForm = ({ isLogin, onToggleMode }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { formData, errors, success, loading, handleChange, handleSubmit, resetForm } = useAuthForm(isLogin);

    const handleModeToggle = () => {
        resetForm();
        onToggleMode();
    };

    return (
        <div className="p-8">
            <ModeToggle isLogin={isLogin} onToggle={handleModeToggle} />

            <div className="space-y-5">
                {!isLogin && (
                    <div className="animate-slideIn">
                        <InputField
                            label="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            placeholder="Enter your full name"
                            icon={User}
                        />
                    </div>
                )}

                <div className={isLogin ? "animate-slideIn" : "animate-slideIn animation-delay-100"}>
                    <InputField
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="your.email@example.com"
                        icon={Mail}
                    />
                </div>

                <div className={isLogin ? "animate-slideIn animation-delay-100" : "animate-slideIn animation-delay-200"}>
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        placeholder="Enter your password"
                        icon={Lock}
                        showPasswordToggle={true}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        showPassword={showPassword}
                    />
                </div>

                {!isLogin && (
                    <div className="animate-slideIn animation-delay-300">
                        <InputField
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            placeholder="Confirm your password"
                            icon={Lock}
                            showPasswordToggle={true}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            showPassword={showPassword}
                        />
                    </div>
                )}

                <ErrorMessage message={errors.submit} />
                <SuccessMessage message={success} />

                <div className="animate-slideIn animation-delay-400">
                    <SubmitButton
                        loading={loading}
                        isLogin={isLogin}
                        onClick={handleSubmit}
                    />
                </div>
            </div>

            <AuthFooter isLogin={isLogin} onToggle={handleModeToggle} />
        </div>
    );
};

export default AuthForm;