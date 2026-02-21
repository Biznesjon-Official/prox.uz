import { Request, Response } from 'express'
import Student from '../models/Student.js'
import User from '../models/User.js'
import Submission from '../models/Submission.js'
import Task from '../models/Task.js'

// Get all students
export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 })
    res.json(students)
  } catch (error) {
    console.error('Get students error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }
    res.json(student)
  } catch (error) {
    console.error('Get student error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Create new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      username,
      email,
      phone,
      course,
      totalPayment,
      paidAmount
    } = req.body

    // Check if username already exists
    const existingStudent = await Student.findOne({ username })
    if (existingStudent) {
      return res.status(400).json({ message: 'Bu username allaqachon mavjud' })
    }

    const student = new Student({
      fullName,
      username,
      email,
      phone,
      course,
      totalPayment,
      paidAmount
    })

    await student.save()
    res.status(201).json(student)
  } catch (error) {
    console.error('Create student error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Update student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }

    const formatDayKey = (d: Date) => {
      try {
        return new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Tashkent',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(d)
      } catch {
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd}`
      }
    }

    const normalizeDayKey = (raw: string) => {
      const s = (raw || '').toString().trim()
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
      const dt = new Date(s)
      if (Number.isNaN(dt.getTime())) return null
      return formatDayKey(dt)
    }

    const prevTotal = Number(student.totalBall || 0)
    const prevTodayBallRaw = (student.todayBall || '0').toString()
    const prevTodayBallNum = Number.parseFloat(prevTodayBallRaw)
    const prevToday = Number.isFinite(prevTodayBallNum) ? prevTodayBallNum : 0

    const hasIncomingTotalBall = Object.prototype.hasOwnProperty.call(req.body || {}, 'totalBall')
    const incomingTotalBall = hasIncomingTotalBall ? Number((req.body as any).totalBall) : null

    Object.assign(student, req.body)

    if (hasIncomingTotalBall && Number.isFinite(incomingTotalBall as any)) {
      const newTotal = Number(incomingTotalBall)
      const delta = newTotal - prevTotal

      const now = new Date()
      const dayKey = formatDayKey(now)

      const hasIncomingDays = Object.prototype.hasOwnProperty.call(req.body || {}, 'days')

      if (!hasIncomingDays) {
        const existingDays = Array.isArray(student.days) ? student.days : []
        const hasTodayInHistory = existingDays.some((x) => normalizeDayKey(x) === dayKey)

        if (delta > 0) {
          const pushCount = Math.min(delta, 5000)
          student.days = existingDays.concat(new Array(pushCount).fill(dayKey))
          student.todayBall = String(hasTodayInHistory ? (prevToday + delta) : delta)
        } else if (delta === 0 && existingDays.length === 0 && newTotal > 0) {
          const pushCount = Math.min(newTotal, 5000)
          student.days = new Array(pushCount).fill(dayKey)
          student.todayBall = String(newTotal)
        }
      }
    }

    await student.save()
    res.json(student)
  } catch (error) {
    console.error('Update student error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }
    res.json({ message: 'O\'quvchi o\'chirildi' })
  } catch (error) {
    console.error('Delete student error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get students statistics
export const getStudentsStats = async (req: Request, res: Response) => {
  try {
    const total = await Student.countDocuments()

    const students = await Student.find({}, { step: 1, joinDate: 1, created_at: 1 })
    const now = Date.now()
    const sum = students.reduce((acc, s: any) => {
      const step = Number(s?.step || 0)
      const dateStr = s?.joinDate || s?.created_at
      const dt = dateStr ? new Date(dateStr) : null
      const base = dt && !Number.isNaN(dt.getTime()) ? dt.getTime() : now
      const diffDays = Math.floor((now - base) / (1000 * 60 * 60 * 24))
      const daysSinceJoin = Math.max(1, diffDays + 1)
      const raw = Math.round((step / daysSinceJoin) * 100)
      const pct = Math.max(0, raw)
      return acc + pct
    }, 0)
    const averageProgress = students.length > 0 ? Math.round(sum / students.length) : 0

    res.json({ total, averageProgress })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get student daily balls (last 7 days) - har kunning qo'shilgan balli
export const getStudentDailyBalls = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    
    // O'quvchini olish
    const student = await Student.findById(studentId)
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }

    const now = new Date()

    // StudentProgress collection'dan oxirgi 7 kunlik ma'lumotlarni olish
    const mongoose = await import('mongoose')
    const db = mongoose.default.connection.db
    
    if (!db) {
      console.warn('⚠️  Database ulanmagan')
      return res.json({ 
        dailyBalls: Array.from({ length: 7 }, (_, i) => {
          const d = new Date(now)
          d.setDate(d.getDate() - (6 - i))
          return { date: d.toISOString().split('T')[0], ball: 0 }
        }),
        totalBall: Number(student.totalBall || 0),
        todayBall: 0
      })
    }

    const progressCollection = db.collection('studentprogresses')
    
    // StudentProgress'dan barcha ma'lumotlarni olish (sana bo'yicha tartiblangan)
    const allProgress = await progressCollection
      .find({ studentId: studentId })
      .sort({ completedAt: 1, createdAt: 1 })
      .toArray()

    // Har kunning oxirgi umumiy ballini hisoblash
    const dailyTotalBalls: Record<string, number> = {}
    
    for (const progress of allProgress) {
      const date = new Date(progress.completedAt || progress.createdAt)
      const dateKey = date.toISOString().split('T')[0] // YYYY-MM-DD
      
      // Bu progress yozuvida umumiy ball saqlanganmi?
      const totalBallInProgress = progress.totalBall || progress.score || 0
      
      // Har kunning oxirgi umumiy ballini saqlaymiz
      dailyTotalBalls[dateKey] = totalBallInProgress
    }

    // Agar bugungi kun uchun progress yo'q bo'lsa, hozirgi totalBall'ni qo'shamiz
    const todayKey = now.toISOString().split('T')[0]
    if (!dailyTotalBalls[todayKey] && student.totalBall) {
      // Oxirgi ma'lum ball'dan keyin qo'shilgan ball
      const lastKnownBall = Math.max(...Object.values(dailyTotalBalls), 0)
      if (student.totalBall > lastKnownBall) {
        dailyTotalBalls[todayKey] = student.totalBall
      }
    }

    // Oxirgi 7 kun uchun kunlik qo'shilgan ballni hisoblash
    const result = []
    let previousDayTotal = 0
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateKey = d.toISOString().split('T')[0]
      
      // Bu kundagi oxirgi umumiy ball
      const dayEndTotal = dailyTotalBalls[dateKey] || previousDayTotal
      
      // Bu kunda qo'shilgan ball = bugun oxirgi - kecha oxirgi
      const addedBall = dayEndTotal - previousDayTotal
      
      result.push({
        date: dateKey,
        ball: Math.max(0, addedBall)
      })
      
      // Keyingi kun uchun
      if (dailyTotalBalls[dateKey]) {
        previousDayTotal = dailyTotalBalls[dateKey]
      }
    }

    // Bugungi qo'shilgan ball
    const todayBall = result[result.length - 1]?.ball || 0
    
    // Jami ball (hozirgi umumiy ball)
    const totalBall = Number(student.totalBall || 0)

    res.json({ 
      dailyBalls: result,
      totalBall: totalBall,
      todayBall: todayBall
    })
  } catch (error) {
    console.error('Get daily balls error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get all students with their current step from task submissions
export const getStudentsWithSteps = async (req: Request, res: Response) => {
  try {
    // Barcha Student ma'lumotlarini olish
    const students = await Student.find().select('_id name username step totalBall created_at joinDate').lean()
    
    console.log(`📊 Jami ${students.length} ta o'quvchi topildi`)
    
    // Har bir o'quvchi uchun oxirgi topshirgan qadamni aniqlash
    const result = await Promise.all(students.map(async (student: any) => {
      let currentStep = 0
      
      // Avval Student ID bilan submission topishga harakat qilamiz
      let submissions = await Submission.find({ 
        studentId: student._id,
        status: { $in: ['approved', 'reviewed'] }
      })
        .populate('taskId')
        .sort({ submittedAt: -1 })
        .lean()
      
      // Agar Student ID bilan topilmasa, User ID bilan topamiz
      if (submissions.length === 0) {
        const user = await User.findOne({ username: student.username }).select('_id').lean()
        if (user) {
          submissions = await Submission.find({ 
            studentId: user._id,
            status: { $in: ['approved', 'reviewed'] }
          })
            .populate('taskId')
            .sort({ submittedAt: -1 })
            .lean()
        }
      }
      
      // Topshiriqlardan qadam raqamlarini olish
      const completedSteps = new Set<number>()
      
      for (const submission of submissions) {
        const task = submission.taskId as any
        if (task && task.stepNumber) {
          completedSteps.add(task.stepNumber)
        }
      }
      
      // Agar topshiriqlar topilsa, eng katta qadam raqamini olish
      if (completedSteps.size > 0) {
        currentStep = Math.max(...Array.from(completedSteps))
        console.log(`✅ ${student.name}: ${completedSteps.size} ta qadam topshirgan, oxirgi qadam: ${currentStep}`)
      } else {
        console.log(`⚠️  ${student.name}: Hech qanday topshiriq topilmadi`)
      }
      
      // Progress hisoblash (step / kelgan kunlar * 100)
      const now = Date.now()
      const joinDate = student.joinDate || student.created_at || now
      const diffDays = Math.floor((now - new Date(joinDate).getTime()) / (1000 * 60 * 60 * 24))
      const daysSinceJoin = Math.max(1, diffDays + 1)
      const progress = Math.round(((student.step || 0) / daysSinceJoin) * 100)
      
      return {
        _id: student._id,
        fullName: student.name || 'Noma\'lum',
        login: student.username || 'noma\'lum',
        currentStep: currentStep, // Qadam topshirish'dan kelgan qadam
        step: student.step || 0, // Student model'dagi qadam
        totalBall: student.totalBall || 0,
        progress: Math.max(0, progress),
        daysSinceJoin: daysSinceJoin // Debug uchun
      }
    }))
    
    console.log(`✅ ${result.length} ta o'quvchi ma'lumotlari qaytarildi`)
    res.json(result)
  } catch (error) {
    console.error('Get students with steps error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get student warnings
export const getStudentWarnings = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).select('warnings')
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }
    res.json({ warnings: student.warnings || [] })
  } catch (error) {
    console.error('Get warnings error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Add warning to student
export const addWarning = async (req: Request, res: Response) => {
  try {
    const { reason } = req.body
    const user = (req as any).user

    if (!reason || !reason.trim()) {
      return res.status(400).json({ message: 'Ogohlantirish sababi kiritilishi shart' })
    }

    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }

    // Maksimal 3 ta ogohlantirish
    if (student.warnings && student.warnings.length >= 3) {
      return res.status(400).json({ message: 'Maksimal 3 ta ogohlantirish berish mumkin' })
    }

    // Yangi ogohlantirish qo'shish
    const newWarning = {
      reason: reason.trim(),
      date: new Date(),
      given_by: user.fullName || user.username || 'Mentor'
    }

    if (!student.warnings) {
      student.warnings = []
    }
    student.warnings.push(newWarning)

    // Agar 3 ta ogohlantirish bo'lsa, o'quvchini bloklash
    if (student.warnings.length >= 3) {
      student.is_blocked = true
      student.blocked_at = new Date()
    }

    await student.save()

    res.json({ 
      message: 'Ogohlantirish qo\'shildi',
      warnings: student.warnings,
      is_blocked: student.is_blocked
    })
  } catch (error) {
    console.error('Add warning error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Remove warning from student
export const removeWarning = async (req: Request, res: Response) => {
  try {
    const { warningId } = req.params

    const student = await Student.findById(req.params.id)
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }

    if (!student.warnings || student.warnings.length === 0) {
      return res.status(404).json({ message: 'Ogohlantirish topilmadi' })
    }

    // Warning ni o'chirish (index bo'yicha)
    const warningIndex = parseInt(warningId)
    if (isNaN(warningIndex) || warningIndex < 0 || warningIndex >= student.warnings.length) {
      return res.status(400).json({ message: 'Noto\'g\'ri ogohlantirish ID' })
    }

    student.warnings.splice(warningIndex, 1)

    // Agar ogohlantirish qolmasa, blokni olib tashlash
    if (student.warnings.length < 3 && student.is_blocked) {
      student.is_blocked = false
      student.blocked_at = undefined as any
    }

    await student.save()

    res.json({ 
      message: 'Ogohlantirish o\'chirildi',
      warnings: student.warnings,
      is_blocked: student.is_blocked
    })
  } catch (error) {
    console.error('Remove warning error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}