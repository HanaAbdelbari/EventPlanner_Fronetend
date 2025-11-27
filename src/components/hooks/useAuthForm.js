import { useState } from 'react';
import { signup, login } from '../services/authService';

const useAuthForm = (isLogin, onSuccess) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setSuccess('');
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setErrors({});
        setSuccess('');
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setSuccess('');

        try {
            let data;
            if (isLogin) {
                data = await login(formData.email, formData.password);
            } else {
                data = await signup(formData.name, formData.email, formData.password);
            }

            setSuccess(`${isLogin ? 'Login' : 'Sign up'} successful! Redirecting...`);

            // Call onSuccess immediately with the data
            if (onSuccess) {
                setTimeout(() => {
                    resetForm();
                    onSuccess(data);
                }, 1000); // Reduced to 1 second for faster redirect
            }
        } catch (error) {
            setErrors({ submit: error.message });
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        errors,
        success,
        loading,
        handleChange,
        handleSubmit,
        resetForm
    };
};

export default useAuthForm;