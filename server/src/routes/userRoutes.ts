import express from 'express'
import { createStudent, getAllStudents, updateStudent, deleteStudent } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Admin faqat
router.post('/create', protect, createStudent)
router.get('/', protect, getAllStudents)
router.put('/:id', protect, updateStudent)
router.delete('/:id', protect, deleteStudent)

export default router
