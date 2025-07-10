import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../src/api/auth'; // <-- Only import, do not redefine

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const success = await signup(name, email, password);

        if (success) {
            navigate('/profile');
        } else {
            setError('Could not create account. Please try again.');
        }
        setLoading(false);
    };
    
    const inputField = (label: string, type: string, value: string, setter: (val:string)=>void, placeholder: string) => (
         <div className="relative">
            <label className="text-sm font-medium text-gray-400">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ring-accent-color"
                placeholder={placeholder}
            />
        </div>
    );

    return (
        <AnimatedPage>
            <motion.div
                className="w-full max-w-md p-10 space-y-8 dark-theme-bg rounded-xl shadow-lg text-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-left">
                    <h1 className="text-3xl font-serif font-bold">Register</h1>
                    <p className="mt-2 text-gray-400">Create your HomeGlam account to get started.</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-6">
                    {inputField("Your Name", "text", name, setName, "Enter your full name")}
                    {inputField("Email", "email", email, setEmail, "Enter your email")}
                    {inputField("Password", "password", password, setPassword, "Create a password")}
                    
                    <div>
                        <motion.button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent-color hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-accent-color disabled:opacity-50"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </motion.button>
                    </div>
                </form>

                <p className="text-sm text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-[#D97706] hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>
        </AnimatedPage>
    );
};

export default SignUp;