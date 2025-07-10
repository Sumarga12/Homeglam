
import React, { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Contact: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('sent');
        }, 1500);
    };

    return (
        <AnimatedPage>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Left Side: Contact Info */}
                    <motion.div
                         initial={{ opacity: 0, x: -50 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-serif text-[#4E443C] mb-2">Contact Information</h2>
                        <p className="text-[#4E443C]/80 mb-8">For any inquiries or to get in touch, please use the form or reach out directly. Our team is dedicated to providing you with exceptional beauty and grooming services.</p>
                        
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <EnvelopeIcon className="h-6 w-6 text-[#D97706]"/>
                                <span className="text-[#4E443C]">hglam0052@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <PhoneIcon className="h-6 w-6 text-[#D97706]"/>
                                <span className="text-[#4E443C]">+977-9864921463</span>
                            </div>
                        </div>

                        <div className="flex space-x-6 mt-10">
                            <a href="#" className="text-[#4E443C]/70 hover:text-[#D97706] transition-colors"><FaTwitter size={24} /></a>
                            <a href="#" className="text-[#4E443C]/70 hover:text-[#D97706] transition-colors"><FaInstagram size={24} /></a>
                            <a href="#" className="text-[#4E443C]/70 hover:text-[#D97706] transition-colors"><FaYoutube size={24} /></a>
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                         initial={{ opacity: 0, x: 50 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-serif text-[#4E443C] mb-2">How Can We Help You?</h2>
                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="text" placeholder="Your Name" required className="w-full p-3 bg-white border border-[#4E443C]/20 rounded-lg focus:ring-2 ring-accent-color focus:border-transparent transition" />
                                <input type="email" placeholder="Email" required className="w-full p-3 bg-white border border-[#4E443C]/20 rounded-lg focus:ring-2 ring-accent-color focus:border-transparent transition" />
                                <input type="text" placeholder="Phone" required className="w-full p-3 bg-white border border-[#4E443C]/20 rounded-lg focus:ring-2 ring-accent-color focus:border-transparent transition" />
                                <input type="text" placeholder="What service are you looking for?" className="w-full p-3 bg-white border border-[#4E443C]/20 rounded-lg focus:ring-2 ring-accent-color focus:border-transparent transition" />
                            </div>
                            <textarea placeholder="Message" rows={5} required className="w-full p-3 bg-white border border-[#4E443C]/20 rounded-lg focus:ring-2 ring-accent-color focus:border-transparent transition"></textarea>
                            <motion.button
                                type="submit"
                                className="w-full py-3 px-6 bg-accent-color text-white font-bold rounded-lg shadow-lg hover:bg-orange-700 transition-colors duration-300 disabled:bg-gray-400"
                                disabled={status === 'sending'}
                                whileHover={{ scale: status !== 'sending' ? 1.05 : 1 }}
                                whileTap={{ scale: status !== 'sending' ? 0.95 : 1 }}
                            >
                                {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send'}
                            </motion.button>
                            {status === 'sent' && <p className="text-green-600 text-center mt-2">Thank you! We'll be in touch soon.</p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Contact;