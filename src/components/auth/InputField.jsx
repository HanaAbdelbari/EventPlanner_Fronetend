import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
                        label,
                        type,
                        name,
                        value,
                        onChange,
                        error,
                        placeholder,
                        icon: Icon,
                        showPasswordToggle,
                        onTogglePassword,
                        showPassword
                    }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                isFocused ? 'text-purple-600' : 'text-gray-700'
            }`}>
                {label}
            </label>
            <div className="relative">
                <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                    isFocused ? 'text-purple-500 scale-110' : 'text-gray-400'
                }`} />
                <input
                    type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full pl-12 ${showPasswordToggle ? 'pr-12' : 'pr-4'} py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                        error ? 'border-red-300 shake' : isFocused ? 'border-purple-300 shadow-lg' : 'border-gray-200'
                    }`}
                    placeholder={placeholder}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1 animate-slideIn">{error}</p>
            )}
        </div>
    );
};

export default InputField;