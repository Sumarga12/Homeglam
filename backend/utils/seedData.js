// utils/seedData.js
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const User = require('../models/User');

const services = [
  // Makeup
  {
    id: 'em1',
    category: 'Makeup',
    name: 'Bold Makeup',
    price: 1500,
    description: 'A stunning look for those who love to make a statement. Perfect for parties and events.',
    imageUrl: 'https://picsum.photos/seed/boldmakeup/400/300'
  },
  {
    id: 'em2',
    category: 'Makeup',
    name: 'Softglam Look',
    price: 1200,
    description: 'An elegant and subtle makeup style that enhances your natural beauty. Ideal for daytime events.',
    imageUrl: 'https://picsum.photos/seed/softglam/400/300'
  },
  {
    id: 'bm1',
    category: 'Makeup',
    name: 'Bridal Makeup',
    price: 20000,
    description: 'Traditional and exquisite bridal makeup to make your special day unforgettable.',
    imageUrl: 'https://picsum.photos/seed/nepalibridal/400/300'
  },
  {
    id: 'so1',
    category: 'Makeup',
    name: 'Occasion Makeup',
    price: 2500,
    description: 'Celebrate your special milestone with a beautiful and sophisticated makeup look for any occasion.',
    imageUrl: 'https://picsum.photos/seed/anniversarymakeup/400/300'
  },
  
  // Hair
  {
    id: 'h1',
    category: 'Hair',
    name: 'Deluxe Hair Wash',
    price: 800,
    description: 'A relaxing and thorough hair wash and conditioning treatment, leaving your hair refreshed.',
    imageUrl: 'https://picsum.photos/seed/hair-wash/400/300'
  },
  {
    id: 'h2',
    category: 'Hair',
    name: 'Professional Haircut',
    price: 1200,
    description: 'A stylish haircut from our expert stylists, tailored to your preferences.',
    imageUrl: 'https://picsum.photos/seed/hair-cut/400/300'
  },
  {
    id: 'h3',
    category: 'Hair',
    name: 'Hair Coloring',
    price: 4500,
    description: 'Vibrant, long-lasting hair color from a wide range of shades.',
    imageUrl: 'https://picsum.photos/seed/hair-color/400/300'
  },

  // Skincare
  {
    id: 's1',
    category: 'Skincare',
    name: 'Rejuvenating Facial',
    price: 2500,
    description: 'A facial treatment tailored to your skin type to cleanse, exfoliate, and hydrate.',
    imageUrl: 'https://picsum.photos/seed/facial/400/300'
  },
  {
    id: 's2',
    category: 'Skincare',
    name: 'Anti-Aging Treatment',
    price: 3500,
    description: 'A specialized treatment to reduce fine lines and restore youthful glow.',
    imageUrl: 'https://picsum.photos/seed/anti-aging/400/300'
  },

  // Spa
  {
    id: 'sp1',
    category: 'Spa',
    name: 'Relaxing Massage',
    price: 3500,
    description: 'Unwind with a relaxing spa treatment designed to de-stress your body and mind.',
    imageUrl: 'https://picsum.photos/seed/massage/400/300'
  },
  {
    id: 'sp2',
    category: 'Spa',
    name: 'Manicure & Pedicure',
    price: 2000,
    description: 'Complete nail care for your hands and feet, leaving them beautiful and refreshed.',
    imageUrl: 'https://picsum.photos/seed/manicure/400/300'
  },

  // Waxing
  {
    id: 'w1',
    category: 'Waxing',
    name: 'Full Body Waxing',
    price: 4000,
    description: 'Smooth, hair-free skin with our professional and hygienic full-body waxing service.',
    imageUrl: 'https://picsum.photos/seed/body-wax/400/300'
  },
  {
    id: 'w2',
    category: 'Waxing',
    name: 'Eyebrow Shaping',
    price: 300,
    description: 'Perfectly shaped eyebrows to frame your face, done with precision and care.',
    imageUrl: 'https://picsum.photos/seed/eyebrow/400/300'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    quote: 'Amazing service! The bridal makeup was absolutely perfect for my wedding day. Highly recommended!',
    imageUrl: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    name: 'Priya Sharma',
    quote: 'The facial treatment left my skin glowing for days. The staff is professional and friendly.',
    imageUrl: 'https://picsum.photos/seed/priya/100/100'
  },
  {
    name: 'Maria Garcia',
    quote: 'Best hair styling I\'ve ever had! The stylist really understood what I wanted and delivered beyond expectations.',
    imageUrl: 'https://picsum.photos/seed/maria/100/100'
  },
  {
    name: 'Aisha Patel',
    quote: 'The spa massage was incredibly relaxing. I felt completely rejuvenated afterward. Will definitely return!',
    imageUrl: 'https://picsum.photos/seed/aisha/100/100'
  },
  {
    name: 'Emma Wilson',
    quote: 'Professional service with attention to detail. The eyebrow shaping was perfect and lasted for weeks.',
    imageUrl: 'https://picsum.photos/seed/emma/100/100'
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await Service.deleteMany({});
    await Testimonial.deleteMany({});

    // Insert services
    await Service.insertMany(services);
    console.log('✅ Services seeded successfully');

    // Insert testimonials
    await Testimonial.insertMany(testimonials);
    console.log('✅ Testimonials seeded successfully');

    // Create default admin user if not exists
    const adminEmail = 'admin@homeglam.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: 'admin123'
      });
      console.log('✅ Admin user created successfully');
    }

    console.log('🎉 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

module.exports = seedData; 