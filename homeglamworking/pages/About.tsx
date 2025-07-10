
import React from 'react';
import AnimatedPage from '../components/AnimatedPage.tsx';
import { motion, Variants } from 'framer-motion';

// Import founder's photo
import founderPhoto from '../src/assets/myphoto.jpg';

const About: React.FC = () => {
    
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };
    
    return (
        <AnimatedPage>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Our Story Section */}
                <motion.div 
                    className="text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-serif text-[#4E443C]">Our Story</h1>
                     <div className="w-24 h-1 bg-[#D97706] mx-auto mt-4 mb-6"></div>
                    <p className="text-lg text-[#4E443C]/80 leading-relaxed">
                        Since its inception, HomeGlam has blossomed into a trusted destination for at-home beauty and grooming services. Founded by Sumarga Puri, a passionate tech innovator, HomeGlam was made from a simple yet powerful vision: to bring professional beauty care—ranging from haircuts and hair spa to waxing, manicure, pedicure, makeup, bridal, and pampering—directly to your doorstep, making self-care effortless and accessible.
                    </p>
                    <p className="mt-4 text-lg text-[#4E443C]/80 leading-relaxed">
                        Over time, HomeGlam has grown into a vibrant platform, connecting users with skilled beauty professionals while creating a seamless, relaxing experience in the comfort of home. Known for its dedication to quality and convenience, HomeGlam is not just a service, but a community committed to enhancing beauty and confidence with care and compassion.
                    </p>
                </motion.div>
                
                {/* Image Gallery */}
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 max-w-5xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.img src="https://teamnamesidea.com/wp-content/uploads/Salon-Team-Names.webp" alt="Salon interior" className="rounded-lg shadow-xl object-cover w-full h-80" variants={itemVariants} />
                    <motion.img src="https://st4.depositphotos.com/1441511/20448/i/450/depositphotos_204483536-stock-photo-men-haircut-barber-cutting-man.jpg" alt="Hair styling" className="rounded-lg shadow-xl object-cover w-full h-80" variants={itemVariants} />
                </motion.div>

                {/* Visionary Section */}
                <div className="grid md:grid-cols-5 gap-12 items-start max-w-6xl mx-auto">
                     <motion.div 
                        className="md:col-span-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={founderPhoto} alt="Sumarga Puri" className="w-full h-auto rounded-lg shadow-xl object-cover" />
                    </motion.div>
                    <motion.div 
                        className="md:col-span-3"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                         <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-semibold tracking-widest text-[#4E443C]/70 uppercase">The Visionary Behind HomeGlam</h3>
                            <h2 className="text-4xl font-serif text-[#4E443C] mt-2">Sumarga Puri</h2>
                            <p className="mt-4 text-[#4E443C]/80 leading-relaxed">Meet Sumarga—a forward-thinking tech enthusiast passionate about solving real-world problems through design and innovation. As the mind behind HomeGlam, he's on a mission to make a full spectrum of at-home beauty and grooming services simple, accessible, and elegant.</p>
                        </motion.div>

                        <div className="mt-8 space-y-8">
                            <motion.div className="flex items-start gap-6" variants={itemVariants}>
                                <div className="flex-shrink-0 w-12 h-12 bg-[#4E443C] text-white flex items-center justify-center rounded-lg font-bold text-xl">1</div>
                                <div>
                                    <h4 className="font-bold text-lg text-[#4E443C]">Driven by Simplicity & Impact</h4>
                                    <p className="mt-1 text-[#4E443C]/80">Sumarga's journey began with a simple question — Why can't professional grooming and beauty services come to us? This curiosity grew into a comprehensive platform offering haircut, hair spa, waxing, manicure, pedicure, bridal services, and more, bridging the gap between modern users and trusted beauty professionals.</p>
                                </div>
                            </motion.div>
                             <motion.div className="flex items-start gap-6" variants={itemVariants}>
                                <div className="flex-shrink-0 w-12 h-12 bg-[#4E443C] text-white flex items-center justify-center rounded-lg font-bold text-xl">2</div>
                                <div>
                                    <h4 className="font-bold text-lg text-[#4E443C]">A Beginner's Leap into Innovation</h4>
                                    <p className="mt-1 text-[#4E443C]/80">With no prior industry background but a strong drive to create meaningful digital experiences, Sumarga took his first step into the beauty-tech space as a student. HomeGlam is his vision brought to life — designed from scratch to deliver convenience, quality, and class.</p>
                                </div>
                            </motion.div>
                             <motion.div className="flex items-start gap-6" variants={itemVariants}>
                                <div className="flex-shrink-0 w-12 h-12 bg-[#4E443C] text-white flex items-center justify-center rounded-lg font-bold text-xl">3</div>
                                <div>
                                    <h4 className="font-bold text-lg text-[#4E443C]">Building with Purpose</h4>
                                    <p className="mt-1 text-[#4E443C]/80">As a fresh face in tech, Sumarga blends empathy, user research, and creativity to craft a platform that empowers users and beauticians alike. HomeGlam reflects his belief that great ideas don't require years of experience — just heart, purpose, and execution.</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </AnimatedPage>
    );
};

export default About;
