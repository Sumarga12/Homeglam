// routes/paymentRoutes.js
const express = require('express');
const {
  processPayment,
  getPaymentById,
  getUserPayments,
  getPaymentByAppointment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/', processPayment);
router.get('/', getUserPayments);
router.get('/:id', getPaymentById);
router.get('/appointment/:appointmentId', getPaymentByAppointment);

module.exports = router; 