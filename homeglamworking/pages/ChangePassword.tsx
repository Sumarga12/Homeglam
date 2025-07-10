
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext.tsx';


const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { changePassword } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            addNotification('New passwords do not match.', 'error');
            return;
        }
        if (newPassword.length < 8) {
             addNotification('New password must be at least 8 characters long.', 'error');
            return;
        }

        setLoading(true);
        const success = await changePassword(oldPassword, newPassword);
        setLoading(false);

        if (success) {
            setTimeout(() => navigate('/profile'), 1500);
        }
    };
    
    const inputStyle = "w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 ring-accent-color text-white";

    return (
        <AnimatedPage>
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF5] py-12 px-4 sm:px-6 lg:px-8">
                 <motion.div
                    className="w-full max-w-md p-10 space-y-8 dark-theme-bg rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-left">
                        <h1 className="text-3xl font-serif font-bold text-white">Change Password</h1>
                        <p className="mt-2 text-gray-400">Update your password for better security.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                className={inputStyle}
                                placeholder="Current Password"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className={inputStyle}
                                placeholder="New Password"
                            />
                        </div>
                        <div>
                             <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={inputStyle}
                                placeholder="Confirm New Password"
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
                                {loading ? 'Updating...' : 'Update Password'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatedPage>
    );
};

export default ChangePassword;