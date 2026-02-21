import { Router, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import StepProgress from '../models/StepProgress.js'
import { authenticateToken } from '../middleware/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

interface CodeTask {
  instruction: string
  starterCode: string
  solution: string
  hints: string[]
}

interface Test {
  question: string
  options: string[]
  correctAnswer: number
}

interface Step {
  stepNumber: number
  title: string
  category: string
  points: number
  tests: Test[]
  codeTask?: CodeTask
}

let stepsCache: Step[] | null = null

function loadSteps(): Step[] {
  if (stepsCache) return stepsCache
  
  const possiblePaths = [
    path.join(process.cwd(), 'public/data/steps.json'),
    path.join(process.cwd(), '../public/data/steps.json'),
    path.join(__dirname, '../../../public/data/steps.json'),
    path.join(__dirname, '../../../../public/data/steps.json')
  ]
  
  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8')
        stepsCache = JSON.parse(data).steps
        console.log('Steps JSON yuklandi:', filePath)
        return stepsCache!
      }
    } catch (err) {
      console.error('Steps JSON yuklashda xatolik:', filePath, err)
    }
  }
  
  console.error('Steps JSON topilmadi!')
  return []
}


// GET /api/steps - Pagination bilan qadamlar
router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const steps = loadSteps()
  
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedSteps = steps.slice(start, end).map(s => ({
    stepNumber: s.stepNumber,
    title: s.title,
    category: s.category,
    points: s.points,
    testsCount: s.tests?.length || 0
  }))
  
  res.json({
    steps: paginatedSteps,
    total: steps.length,
    page,
    limit,
    hasMore: end < steps.length
  })
})

// GET /api/steps/progress - O'quvchining yakunlagan qadamlari
router.get('/progress', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    if (!user) {
      return res.status(401).json({ message: 'Avtorizatsiya kerak' })
    }
    
    const progress = await StepProgress.find({ studentId: user.id })
      .select('stepNumber status score completedAt')
      .sort({ stepNumber: 1 })
    
    res.json({ progress })
  } catch (err) {
    console.error('Progress olishda xatolik:', err)
    res.status(500).json({ message: 'Server xatosi' })
  }
})

// GET /api/steps/:stepNumber - Bitta qadam
router.get('/:stepNumber', (req: Request, res: Response) => {
  const stepNumber = parseInt(req.params.stepNumber)
  const steps = loadSteps()
  const step = steps.find(s => s.stepNumber === stepNumber)
  
  if (!step) {
    return res.status(404).json({ message: 'Qadam topilmadi' })
  }
  
  res.json(step)
})

// GET /api/steps/:stepNumber/tests - Qadam testlari
router.get('/:stepNumber/tests', (req: Request, res: Response) => {
  const stepNumber = parseInt(req.params.stepNumber)
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 1
  
  const steps = loadSteps()
  const step = steps.find(s => s.stepNumber === stepNumber)
  
  if (!step) {
    return res.status(404).json({ message: 'Qadam topilmadi' })
  }
  
  const start = (page - 1) * limit
  const end = start + limit
  const tests = (step.tests || []).slice(start, end)
  
  res.json({
    tests,
    total: step.tests?.length || 0,
    page,
    limit,
    hasMore: end < (step.tests?.length || 0)
  })
})


// POST /api/steps/:stepNumber/submit - Qadam kodini topshirish
router.post('/:stepNumber/submit', authenticateToken, async (req: Request, res: Response) => {
  try {
    const stepNumber = parseInt(req.params.stepNumber)
    const { content } = req.body
    const user = (req as any).user
    
    if (!user) {
      return res.status(401).json({ message: 'Avtorizatsiya kerak' })
    }
    
    const steps = loadSteps()
    const step = steps.find(s => s.stepNumber === stepNumber)
    
    if (!step) {
      return res.status(404).json({ message: 'Qadam topilmadi' })
    }
    
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ message: 'Kod mazmuni kerak' })
    }
    
    // AI tekshiruvi
    const solution = step.codeTask?.solution || ''
    const errors: { message: string; line?: number }[] = []
    let score = 100
    
    const normalizeCode = (code: string): string => {
      return code.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim().toLowerCase()
    }
    
    const normalizedContent = normalizeCode(content)
    const normalizedSolution = normalizeCode(solution)
    
    if (!content.trim()) {
      errors.push({ message: 'Kod bo\'sh bo\'lmasligi kerak' })
      score = 0
    } else if (normalizedContent === normalizedSolution) {
      score = 100
    } else {
      const solutionParts: string[] = solution.match(/<[^>]+>|[^<]+/g) || []
      const contentParts: string[] = content.match(/<[^>]+>|[^<]+/g) || []
      
      let matchCount = 0
      const totalParts = solutionParts.length
      
      for (const part of solutionParts) {
        const normalizedPart = part.trim().toLowerCase()
        if (normalizedPart) {
          const found = contentParts.some((cp: string) => {
            const normalizedCp = cp.trim().toLowerCase()
            return normalizedCp.includes(normalizedPart) || normalizedPart.includes(normalizedCp)
          })
          if (found) matchCount++
        }
      }
      
      score = Math.round((matchCount / Math.max(totalParts, 1)) * 100)
      
      if (score < 70) {
        if (content.includes('___')) {
          errors.push({ message: 'Barcha bo\'sh joylarni (___) to\'ldiring' })
        }
        
        const tagMatches = solution.match(/<(\w+)/g)
        const requiredTags: string[] = tagMatches ? tagMatches.map((t: string) => t.slice(1)) : []
        const uniqueTags = [...new Set(requiredTags)]
        
        for (const tag of uniqueTags) {
          const tagRegex = new RegExp(`<${tag}[\\s>]`, 'i')
          if (!tagRegex.test(content)) {
            errors.push({ message: `<${tag}> tegi topilmadi` })
          }
        }
      }
    }
    
    const isPassed = score >= 70 && errors.length === 0
    
    // MongoDB ga saqlash
    if (isPassed) {
      try {
        await StepProgress.findOneAndUpdate(
          { studentId: user.id, stepNumber },
          { 
            studentId: user.id,
            stepNumber,
            status: 'completed',
            score,
            content,
            completedAt: new Date()
          },
          { upsert: true, new: true }
        )
        console.log(`✅ Step ${stepNumber} completed by user ${user.id}`)
      } catch (dbErr: any) {
        if (dbErr.code !== 11000) {
          console.error('MongoDB saqlashda xatolik:', dbErr)
        }
      }
    }
    
    res.status(201).json({
      message: isPassed ? 'Qadam muvaffaqiyatli yakunlandi!' : 'Kodda xatolar topildi',
      submission: {
        _id: `step-${stepNumber}-${Date.now()}`,
        stepNumber,
        status: isPassed ? 'approved' : 'reviewed',
        submittedAt: new Date(),
        aiReview: {
          score,
          feedback: isPassed ? 'Kod tekshirildi va qabul qilindi' : 'Kodda xatolar topildi',
          errors: isPassed ? [] : errors,
          suggestions: [],
          reviewedAt: new Date()
        }
      }
    })
  } catch (err) {
    console.error('Submit xatolik:', err)
    res.status(500).json({ message: 'Server xatosi' })
  }
})

export default router