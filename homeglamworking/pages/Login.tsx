import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const signupMessage = location.state?.message;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const success = await login(email, password, rememberMe);

        if (success) {
            navigate('/profile');
            navigate('/', { replace: true });
        }
        setLoading(false);
    };

    return (
        <AnimatedPage>
            <motion.div
                className="w-full max-w-md p-10 space-y-8 dark-theme-bg rounded-xl shadow-lg text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-left">
                    <h1 className="text-3xl font-serif font-bold">Login</h1>
                    <p className="mt-2 text-gray-400">Welcome back! Please login to your account.</p>
                </div>

                {signupMessage && (
                    <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg text-center">
                        {signupMessage}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-400">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ring-accent-color"
                            placeholder="Your Email"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-400">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ring-accent-color"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-[#D97706] focus:ring-[#D97706]"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <span className="ml-2 text-gray-400">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="font-medium text-[#D97706] hover:underline">Forgot password?</Link>
                    </div>
                    <div>
                        <motion.button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent-color hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-accent-color disabled:opacity-50"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </motion.button>
                    </div>
                </form>

                <p className="text-sm text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-[#D97706] hover:underline">
                        Register
                    </Link>
                </p>
            </motion.div>
        </AnimatedPage>
    );
};

export default Login;