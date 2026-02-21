import express from 'express'
import { 
  getAllProjects, 
  getProjectById,
  getProjectsStats,
  createProject,
  updateProject
} from '../controllers/projectsController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllProjects)
router.get('/stats', getProjectsStats)
router.get('/:id', getProjectById)

// Protected routes
router.post('/', authenticateToken, createProject)
router.put('/:id', authenticateToken, updateProject)

export default router