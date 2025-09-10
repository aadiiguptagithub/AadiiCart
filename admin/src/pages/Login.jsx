import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContex.jsx';
import { adminDataContext } from '../context/AdminContex.jsx';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
    const { serverUrl, login } = useContext(authDataContext);
    const { setAdminData } = useContext(adminDataContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${serverUrl}/api/auth/adminLogin`, {
                email: formData.email,
                password: formData.password
            }, { withCredentials: true });

            if (response.status === 200) {
                login(response.data.user);
                setAdminData(response.data.user); // Update admin context
                toast.success('Admin login successful!');
                navigate('/admin/dashboard');
                setFormData({ email: '', password: '' });
            } else {
                setErrors({ submit: response.data.message || 'Login failed' });
            }
        } catch (error) {
            if (error.response) {
                setErrors({ submit: error.response.data.message || 'Login failed' });
            } else {
                setErrors({ submit: 'Network error. Please try again.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <Toaster position="top-right" />
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <FiUser className="text-teal-500 text-4xl mr-3" />
                        <h1 className="text-3xl font-bold text-white">Admin Login</h1>
                    </div>
                    <p className="text-gray-400 text-lg">Welcome back Admin</p>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl">
                    {/* Error */}
                    {errors.submit && (
                        <div className="bg-red-900/50 border border-red-500 text-red-400 px-4 py-3 rounded-md text-sm mb-6">
                            {errors.submit}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-slate-700 border ${
                                        errors.email ? 'border-red-500' : 'border-slate-600'
                                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
                                    placeholder="Admin Email"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-12 py-3 bg-slate-700 border ${
                                        errors.password ? 'border-red-500' : 'border-slate-600'
                                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
                                    placeholder="Admin Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-500 transition-colors"
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                                loading
                                    ? 'bg-gray-600 cursor-not-allowed opacity-70'
                                    : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                            }`}
                        >
                            {loading ? (
                                <div className='flex items-center justify-center'>
                                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                                    Logging in...
                                </div>
                            ) : (
                                'Login as Admin'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
