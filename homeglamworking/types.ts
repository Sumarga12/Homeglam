
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePhoto?: string;
}

export interface Service {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface Appointment {
  _id: string;
  id?: string; // For compatibility
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Pending';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message?: string;
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    quote: string;
    imageUrl: string;
}