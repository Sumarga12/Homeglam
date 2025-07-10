// routes/serviceRoutes.js
const express = require('express');
const {
  getServices,
  getServiceById,
  getServicesByCategory,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);
router.get('/category/:category', getServicesByCategory);

// Protected routes (Admin only)
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router; 