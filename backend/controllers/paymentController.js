// controllers/paymentController.js
const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');

// @desc Process payment
// @route POST /api/payments
exports.processPayment = async (req, res) => {
  try {
    const { 
      appointmentId, 
      paymentMethod, 
      paymentDetails 
    } = req.body;

    if (!appointmentId || !paymentMethod) {
      return res.status(400).json({ error: 'Appointment ID and payment method are required' });
    }

    // Get appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Check if user owns this appointment
    if (appointment.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ appointmentId });
    if (existingPayment) {
      return res.status(400).json({ error: 'Payment already processed for this appointment' });
    }

    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create payment record
    const payment = await Payment.create({
      appointmentId,
      userId: req.user.id,
      amount: appointment.totalPrice,
      paymentMethod,
      transactionId,
      paymentDetails,
      status: 'Completed' // For demo purposes, assume payment is successful
    });

    // Update appointment payment status
    appointment.paymentStatus = 'Paid';
    appointment.status = 'Confirmed';
    await appointment.save();

    // Send payment confirmation email
    try {
      const html = `
        <h2>Payment Confirmation</h2>
        <p>Dear ${appointment.customerName},</p>
        <p>Your payment has been processed successfully!</p>
        <h3>Payment Details:</h3>
        <ul>
          <li><strong>Transaction ID:</strong> ${transactionId}</li>
          <li><strong>Amount:</strong> Rs${appointment.totalPrice}</li>
          <li><strong>Payment Method:</strong> ${paymentMethod}</li>
          <li><strong>Service:</strong> ${appointment.serviceName}</li>
          <li><strong>Date:</strong> ${appointment.date}</li>
          <li><strong>Time:</strong> ${appointment.time}</li>
        </ul>
        <p>Your appointment is now confirmed. We look forward to serving you!</p>
        <p>Thank you for choosing HomeGlam!</p>
      `;
      
      await sendEmail({
        to: appointment.customerEmail,
        subject: 'Payment Confirmation - HomeGlam',
        html
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      payment,
      appointment,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc Get payment by ID
// @route GET /api/payments/:id
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('appointmentId');
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Check if user owns this payment
    if (payment.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc Get user's payments
// @route GET /api/payments
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id })
      .populate('appointmentId')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc Get payment by appointment ID
// @route GET /api/payments/appointment/:appointmentId
exports.getPaymentByAppointment = async (req, res) => {
  try {
    const payment = await Payment.findOne({ 
      appointmentId: req.params.appointmentId,
      userId: req.user.id 
    }).populate('appointmentId');
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}; 