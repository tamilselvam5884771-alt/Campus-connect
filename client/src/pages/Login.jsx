import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`${role} Login attempt:`, formData);

        // Mock authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', formData.username);

        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} logged in successfully! (Mock)`);

        if (role === 'admin') {
            navigate('/dashboard');
        } else {
            navigate('/');
        }

        // Refresh to update Navbar (simple mock approach)
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl flex overflow-hidden max-w-4xl w-full border-2 border-primary/20">

                {/* Left Side - Illustration */}
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-gray-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary-dark/10 z-0"></div>
                    <div className="relative z-10 text-center">
                        <div className="w-48 h-48 mx-auto mb-6 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-t-full opacity-20 blur-xl animate-pulse"></div>
                            <div className="w-24 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-full mx-auto relative overflow-hidden flex items-center justify-center border-t border-l border-r border-gray-600 shadow-lg" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}>
                                <div className="w-8 h-8 bg-primary rounded-full blur-sm opacity-80"></div>
                            </div>
                            <div className="w-4 h-24 bg-gray-700 mx-auto mt-[-1px]"></div>
                            <div className="w-32 h-4 bg-gray-700 mx-auto rounded-full mt-[-1px] shadow-lg"></div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                        <p className="text-gray-400">Log in as a {role} to access campus resources.</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-10 bg-gray-800 flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white">Login</h2>
                        <div className="flex bg-gray-900/50 p-1 rounded-xl mt-6 border border-gray-700">
                            <button
                                onClick={() => setRole('student')}
                                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'student' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Student
                            </button>
                            <button
                                onClick={() => setRole('admin')}
                                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'admin' ? 'bg-primary-dark text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="username">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
                                    placeholder={`Enter your ${role} username`}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-500" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary text-white placeholder-gray-500 transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 px-4 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${role === 'admin' ? 'bg-gradient-to-r from-primary-dark to-primary hover:from-primary-dark hover:to-primary shadow-primary-dark/30' : 'bg-gradient-to-r from-primary to-primary-dark hover:from-primary hover:to-primary-dark shadow-primary/30'}`}
                        >
                            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="#" className="text-sm text-gray-400 hover:text-primary transition-colors">Forgot Password?</a>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:text-primary-dark font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
