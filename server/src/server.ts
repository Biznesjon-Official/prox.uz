import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import authRoutes from './routes/authRoutes.js'

// Environment variables
dotenv.config()

// Express app
const app = express()

// Middleware
app.use(cors({
  origin: true, // Barcha origin'lardan ruxsat
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files for uploads
app.use('/uploads', express.static('uploads'))

// Database connection
connectDB()

// Routes
import userRoutes from './routes/userRoutes.js'
import studentsRoutes from './routes/studentsRoutes.js'
import debtorsRoutes from './routes/debtorsRoutes.js'
import projectsRoutes from './routes/projectsRoutes.js'
import tasksRoutes from './routes/tasksRoutes.js'
import submissionRoutes from './routes/submissionRoutes.js'
import stepsRoutes from './routes/stepsRoutes.js'

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`, req.body);
  next();
});

// JSON parsing debug middleware
app.use((req, res, next) => {
  if (req.method === 'POST' && req.headers['content-type']?.includes('application/json')) {
    console.log('🔍 JSON request detected:', {
      contentType: req.headers['content-type'],
      contentLength: req.headers['content-length'],
      hasBody: !!req.body
    });
  }
  next();
});

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/debtors', debtorsRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api', submissionRoutes) // submissions va tasks/submit uchun
app.use('/api/steps', stepsRoutes) // JSON-based steps API

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'proX Academy API ishlamoqda!' })
})

// Server
const PORT = parseInt(process.env.PORT || '5000', 10)
const HOST = '0.0.0.0'
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server ${HOST}:${PORT} da ishlamoqda`)
})
