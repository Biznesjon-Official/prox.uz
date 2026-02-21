import { Request, Response } from 'express'
import Submission from '../models/Submission.js'
import Task from '../models/Task.js'
import { HTMLValidator } from '../services/htmlValidator.js'

// Vazifa topshirish
export const submitTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const { submissionType, content, testAnswers } = req.body
    const studentId = (req as any).user?.id // Auth middleware'dan

    console.log('Submit task request:', {
      taskId,
      submissionType,
      studentId,
      userFromAuth: (req as any).user
    })

    if (!studentId) {
      console.log('No student ID found in request')
      return res.status(401).json({ message: 'Foydalanuvchi autentifikatsiya qilinmagan' })
    }

    // Taskni tekshirish
    const task = await Task.findById(taskId)
    console.log('Task found:', task ? task.title : 'Not found')
    
    if (!task) {
      return res.status(404).json({ message: 'Vazifa topilmadi' })
    }

    // Oldingi submission'ni tekshirish
    const existingSubmission = await Submission.findOne({ taskId, studentId })
    if (existingSubmission && existingSubmission.status === 'approved') {
      return res.status(400).json({ message: 'Bu vazifa allaqachon muvaffaqiyatli topshirilgan' })
    }

    let normalizedContent = content
    let normalizedTestAnswers = testAnswers
    let normalizedStatus: any = 'submitted'
    let normalizedAiReview: any = undefined

    if (submissionType === 'test') {
      const correctAnswer = (task as any)?.content?.correctAnswer

      const raw = Array.isArray(testAnswers) && testAnswers.length > 0 ? testAnswers[0] : null
      const selectedIndexRaw =
        (typeof content === 'string' || typeof content === 'number')
          ? content
          : (raw?.answer ?? raw?.selectedAnswer)

      const selectedIndex = Number(selectedIndexRaw)

      if (!Number.isFinite(selectedIndex)) {
        return res.status(400).json({ message: 'Test javobi noto‘g‘ri formatda' })
      }
      if (!Number.isFinite(Number(correctAnswer))) {
        return res.status(400).json({ message: 'Test uchun to‘g‘ri javob topilmadi' })
      }

      const isCorrect = selectedIndex === Number(correctAnswer)
      normalizedContent = selectedIndex.toString()
      normalizedTestAnswers = [{ questionId: taskId, answer: selectedIndex.toString(), isCorrect }]
      normalizedStatus = 'reviewed'
      normalizedAiReview = {
        score: isCorrect ? 100 : 0,
        feedback: isCorrect ? "To‘g‘ri javob" : "Noto‘g‘ri javob",
        suggestions: isCorrect ? [] : ["Test savolini qayta ko‘rib chiqing"],
        reviewedAt: new Date()
      }
    }

    // Yangi submission yaratish
    const submission = new Submission({
      taskId,
      studentId,
      submissionType,
      content: normalizedContent,
      testAnswers: normalizedTestAnswers,
      status: normalizedStatus,
      aiReview: normalizedAiReview
    })

    await submission.save()
    console.log('Submission saved:', submission._id)

    // HTML kod uchun - avtomatik tekshirish
    if (submissionType === 'code' || submissionType === 'html') {
      const requiredTags = HTMLValidator.getRequiredTagsForTask(task.title)
      const validation = HTMLValidator.validateHTML(content, requiredTags)
      
      // Submission ni yangilash
      submission.status = validation.success ? 'approved' : 'rejected'
      submission.aiReview = {
        score: validation.score,
        feedback: validation.feedback,
        suggestions: validation.errors,
        reviewedAt: new Date()
      }
      await submission.save()
      
      console.log('HTML validation result:', {
        success: validation.success,
        score: validation.score,
        foundTags: validation.foundTags,
        missingTags: validation.missingTags
      })
    }

    // Task statusini yangilash
    await Task.findByIdAndUpdate(taskId, { status: 'submitted' })

    res.status(201).json({
      message: submissionType === 'test'
        ? (normalizedAiReview?.score === 100 ? "✅ To'g'ri javob!" : "❌ Noto'g'ri javob")
        : (submission.status === 'approved' 
            ? '✅ Kod to\'g\'ri! Qadam yakunlandi.' 
            : '⚠️ Kodda xatolar bor. Tuzatib qayta yuboring.'),
      submission: {
        _id: submission._id,
        status: submission.status,
        submittedAt: submission.submittedAt,
        testAnswers: submission.testAnswers,
        aiReview: submission.aiReview
      }
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server xatoligi'
    console.error('Submit task error:', err)
    res.status(500).json({ message: 'Server xatoligi', error: message })
  }
}

// Submission natijasini olish
export const getSubmissionResult = async (req: Request, res: Response) => {
  try {
    const { submissionId } = req.params
    const studentId = (req as any).user.id

    const submission = await Submission.findOne({ 
      _id: submissionId, 
      studentId 
    }).populate('taskId')

    if (!submission) {
      return res.status(404).json({ message: 'Topshiriq topilmadi' })
    }

    res.json(submission)
  } catch (err) {
    console.error('Get submission result error:', err)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// O'quvchining barcha submission'larini olish
export const getStudentSubmissions = async (req: Request, res: Response) => {
  try {
    const studentId = (req as any).user.id
    const { taskId } = req.query

    const filter: any = { studentId }
    if (taskId) filter.taskId = taskId

    const submissions = await Submission.find(filter)
      .populate('taskId')
      .sort({ createdAt: -1 })

    res.json(submissions)
  } catch (err) {
    console.error('Get student submissions error:', err)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Vazifa statusini yangilash
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params
    const { status } = req.body
    const studentId = (req as any).user.id

    // Bu yerda o'quvchi faqat 'in-progress' statusini o'rnatishi mumkin
    if (status !== 'in-progress') {
      return res.status(400).json({ message: 'Faqat "jarayonda" statusini o\'rnatish mumkin' })
    }

    const task = await Task.findById(taskId)
    if (!task) {
      return res.status(404).json({ message: 'Vazifa topilmadi' })
    }

    // Task statusini yangilash (bu yerda student-specific status kerak bo'ladi)
    // Hozircha oddiy implementatsiya
    res.json({ message: 'Status yangilandi', status })
  } catch (err) {
    console.error('Update task status error:', err)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Fayl yuklash
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Fayl yuklanmadi' })
    }

    const fileUrls = files.map(file => `/uploads/${file.filename}`)
    
    res.json({
      message: 'Fayllar muvaffaqiyatli yuklandi',
      files: fileUrls
    })
  } catch (err) {
    console.error('Upload file error:', err)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}