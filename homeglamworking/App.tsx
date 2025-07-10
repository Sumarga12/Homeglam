
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Layout from './components/Layout.tsx';
import AuthLayout from './components/AuthLayout.tsx';
import NotificationContainer from './components/Notification.tsx';
import { AnimatePresence } from 'framer-motion';

// Static imports to fix module resolution issues
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Services from './pages/Services.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Profile from './pages/Profile.tsx';
import Appointment from './pages/Appointment.tsx';
import Payment from './pages/Payment.tsx';
import Contact from './pages/Contact.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import ChangePassword from './pages/ChangePassword.tsx';
import Cart from './pages/Cart.tsx';
import NotFound from './pages/NotFound.tsx';

const RouteManager = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
                    <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}

const App: React.FC = () => {
    return (
        <NotificationProvider>
            <CartProvider>
                <AuthProvider>
                    <HashRouter>
                        <NotificationContainer />
                        <RouteManager />
                    </HashRouter>
                </AuthProvider>
            </CartProvider>
        </NotificationProvider>
    );
};

export default App;
