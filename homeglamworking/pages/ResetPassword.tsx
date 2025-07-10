import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext.tsx';
import { authAPI } from '../src/api/auth';

const ResetPassword = () => {
    const { token } = useParams<{ token: string }>();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token) {
            addNotification('Invalid reset link. Please request a new one.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            addNotification('Passwords do not match.', 'error');
            return;
        }

        if (newPassword.length < 8) {
            addNotification('Password must be at least 8 characters long.', 'error');
            return;
        }

        setLoading(true);
        try {
            await authAPI.resetPassword(token, newPassword);
            addNotification('Password reset successful! Please log in with your new password.', 'success');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error: any) {
            addNotification(error.message || 'Password reset failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
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
                    <h1 className="text-3xl font-serif font-bold">Reset Password</h1>
                    <p className="mt-2 text-gray-400">Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-400">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ring-accent-color"
                            placeholder="Enter new password"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-400">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ring-accent-color"
                            placeholder="Confirm new password"
                        />
                    </div>
                    <div>
                        <motion.button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent-color hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 ring-accent-color disabled:opacity-50"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </motion.button>
                    </div>
                </form>

                <p className="text-sm text-center text-gray-400">
                    Remember your password?{' '}
                    <button 
                        onClick={() => navigate('/login')} 
                        className="font-medium text-[#D97706] hover:underline"
                    >
                        Login
                    </button>
                </p>
            </motion.div>
        </AnimatedPage>
    );
};

export default ResetPassword; 