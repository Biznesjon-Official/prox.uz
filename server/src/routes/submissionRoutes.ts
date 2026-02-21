import express from 'express'
import multer from 'multer'
import path from 'path'
import { 
  submitTask,
  getSubmissionResult,
  getStudentSubmissions,
  updateTaskStatus,
  uploadFile
} from '../controllers/submissionController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Multer konfiguratsiyasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|html|css|js|txt/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('Fayl turi qo\'llab-quvvatlanmaydi'))
    }
  }
})

// Protected routes - faqat login bo'lgan o'quvchilar uchun
router.use(authenticateToken)

// Vazifa topshirish
router.post('/tasks/:taskId/submit', submitTask)

// Submission natijasini olish
router.get('/submissions/:submissionId', getSubmissionResult)

// O'quvchining barcha submission'larini olish
router.get('/submissions', getStudentSubmissions)

// Vazifa statusini yangilash
router.put('/tasks/:taskId/status', updateTaskStatus)

// Fayl yuklash
router.post('/upload', upload.array('files', 5), uploadFile)

export default router