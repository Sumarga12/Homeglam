
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
        className="bg-[#FFFBF5] border-t border-[#4E443C]/10 mt-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#4E443C] mb-4">Brand</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Our Story</Link></li>
              <li><Link to="#" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#4E443C] mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Booking</Link></li>
              <li><Link to="#" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Exchange & Returns</Link></li>
              <li><Link to="#" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#4E443C] mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="text-[#4E443C]/80 hover:text-[#D97706] transition-colors">Youtube</a></li>
            </ul>
          </div>
           <div className="md:col-span-1">
             <h3 className="text-3xl font-serif font-bold text-[#4E443C]">HomeGlam</h3>
             <p className="text-[#4E443C]/80 text-sm mt-2">Luxurious care, effortless access. Beauty that comes home to you.</p>
           </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#4E443C]/10 text-center text-[#4E443C]/60 text-sm">
          <p>&copy; {new Date().getFullYear()} HomeGlam. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;