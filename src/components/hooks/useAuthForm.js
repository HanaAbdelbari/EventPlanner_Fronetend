import { useState } from 'react';

const useAuthForm = (isLogin) => {
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
            const endpoint = isLogin ? '/api/login' : '/api/signup';
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, password: formData.password };

            const response = await fetch(`http://localhost:8080${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(`${isLogin ? 'Login' : 'Sign up'} successful! Redirecting...`);
                setTimeout(() => {
                    resetForm();
                }, 2000);
            } else {
                setErrors({ submit: data.message || 'Login failed, email or password is incorrect' });
            }
        } catch (error) {
            setErrors({ submit: 'Network error. Please try again.' });
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