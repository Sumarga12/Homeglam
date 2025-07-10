
import React, { useState, useMemo } from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../data/services.ts';
import { Service } from '../types.ts';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.tsx';

const categories = ['Makeup', 'Hair', 'Skincare', 'Spa', 'Waxing'];

const ServiceCard: React.FC<{ service: Service, onBook: (service: Service) => void, onAddToCart: (service: Service) => void }> = ({ service, onBook, onAddToCart }) => {
    return (
        <motion.div
            className="bg-white rounded-lg overflow-hidden group flex flex-col"
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <img src={service.imageUrl} alt={service.name} className="w-full h-56 object-cover" />
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-serif font-semibold text-[#4E443C]">{service.name}</h3>
                <p className="text-lg font-bold text-[#D97706] mt-1">Rs{service.price}</p>
                <div className="flex-grow mt-2">
                     <p className="text-sm text-[#4E443C]/80 line-clamp-2">{service.description}</p>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                    <button onClick={() => onBook(service)} className="flex-1 px-4 py-2 text-sm font-bold bg-accent-color text-white rounded-lg hover:bg-orange-700 transition">
                        Book Now
                    </button>
                    <button onClick={() => onAddToCart(service)} className="flex-1 px-4 py-2 text-sm font-bold bg-gray-200 text-[#4E443C] rounded-lg hover:bg-gray-300 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Services: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';
    const activeTab = searchParams.get('category') || 'Makeup';
    
    const setActiveTab = (tab: string) => {
        setSearchParams({ category: tab });
    };
    
    const handleBookNow = (service: Service) => {
        navigate('/appointment', { state: { service } });
    };

    const handleAddToCart = (service: Service) => {
        addToCart(service);
    }

    const displayedServices = useMemo(() => {
        if (query) {
             return services.filter(s => 
                s.name.toLowerCase().includes(query) ||
                s.category.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query)
            );
        }
        return services.filter(s => s.category.includes(activeTab));
    }, [query, activeTab]);

    return (
        <AnimatedPage>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-center text-[#4E443C] mb-4">Services / Categories</h1>
                 </div>

                {/* Categories Tabs */}
                <div className="flex justify-center border-b border-[#4E443C]/10 my-8">
                    {categories.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-[#D97706]' : 'text-[#4E443C]/70 hover:text-[#D97706]'}`}
                        >
                            {tab}
                             {activeTab === tab && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706]" layoutId="category-underline" />}
                        </button>
                    ))}
                </div>

                {query && (
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-serif">Search Results for "{searchParams.get('q')}"</h2>
                        <button onClick={() => setSearchParams({})} className="text-sm text-[#D97706] hover:underline mt-1">Clear search</button>
                    </div>
                )}
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={query || activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {displayedServices.length > 0 ? (
                           displayedServices.map((service) => (
                                <ServiceCard key={service.id} service={service} onBook={handleBookNow} onAddToCart={handleAddToCart} />
                            ))
                        ) : (
                             <div className="col-span-full text-center py-10">
                                <h2 className="text-2xl font-serif text-[#4E443C]">No services found</h2>
                                <p className="text-[#4E443C]/70 mt-2">Please try another category or search term.</p>
                             </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </AnimatedPage>
    );
};

export default Services;
