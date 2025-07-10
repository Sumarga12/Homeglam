// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['Visa / MasterCard', 'PayPal', 'eSewa', 'Khalti'],
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  transactionId: { type: String },
  paymentDetails: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema); 