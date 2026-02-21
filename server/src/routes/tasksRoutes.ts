import express from 'express'
import { 
  getAllTasks, 
  getTasksStats,
  updateTaskStatus
} from '../controllers/tasksController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Public routes (login bo'lmagan holat uchun ham ko'rish mumkin)
router.get('/', getAllTasks)
router.get('/stats', getTasksStats)

// Protected routes (faqat login bo'lgan holat uchun)
router.put('/:id/status', authenticateToken, updateTaskStatus)

export default router