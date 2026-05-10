import express from 'express';
import { body } from 'express-validator';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Reusable validation rules for create and update
const productValidation = [
  body('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),

  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
];

// ─── Public Routes ────────────────────────────────────────────────────────────
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// ─── Protected Routes (login required) ───────────────────────────────────────
router.post('/', protect, productValidation, createProduct);
router.put('/:id', protect, productValidation, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;