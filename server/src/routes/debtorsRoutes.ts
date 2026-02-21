import express from 'express'
import { 
  getAllDebtors, 
  getDebtorsStats,
  updatePayment
} from '../controllers/debtorsController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllDebtors)
router.get('/stats', getDebtorsStats)

// Protected routes
router.put('/:id/payment', authenticateToken, updatePayment)

export default router