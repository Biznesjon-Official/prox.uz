import { Request, Response } from 'express'
import Student from '../models/Student.js'

// Get all academic debtors (students behind in their studies)
export const getAllDebtors = async (req: Request, res: Response) => {
  try {
    const allStudents = await Student.find().sort({ enrollmentDate: 1 })

    // Calculate academic debt for each student
    const debtorsWithAcademicDebt = allStudents.map(student => {
      const enrollmentDate = new Date(student.enrollmentDate || student.joinDate)
      const now = new Date()
      const daysSinceEnrollment = Math.floor((now.getTime() - enrollmentDate.getTime()) / (1000 * 60 * 60 * 24))
      
      // Expected progress: 1% per day (can be adjusted)
      const expectedProgress = Math.min(100, daysSinceEnrollment * 1.5) // 1.5% per day
      const actualProgress = student.progress || 0
      
      // Calculate debt percentage
      const debtPercentage = Math.max(0, expectedProgress - actualProgress)
      const isDebtor = debtPercentage > 10 // Consider debtor if more than 10% behind
      
      return {
        ...student.toObject(),
        daysSinceEnrollment,
        expectedProgress: Math.round(expectedProgress),
        actualProgress,
        debtPercentage: Math.round(debtPercentage),
        isDebtor
      }
    })

    // Filter only debtors
    const debtors = debtorsWithAcademicDebt.filter(student => student.isDebtor)

    res.json(debtors)
  } catch (error) {
    console.error('Get debtors error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Get academic debtors statistics
export const getDebtorsStats = async (req: Request, res: Response) => {
  try {
    const allStudents = await Student.find()
    
    let totalDebtors = 0
    let totalDebtPercentage = 0
    let avgDaysOverdue = 0
    
    const now = new Date()
    
    allStudents.forEach(student => {
      const enrollmentDate = new Date(student.enrollmentDate || student.joinDate)
      const daysSinceEnrollment = Math.floor((now.getTime() - enrollmentDate.getTime()) / (1000 * 60 * 60 * 24))
      
      const expectedProgress = Math.min(100, daysSinceEnrollment * 1.5)
      const actualProgress = student.progress || 0
      const debtPercentage = Math.max(0, expectedProgress - actualProgress)
      
      if (debtPercentage > 10) {
        totalDebtors++
        totalDebtPercentage += debtPercentage
        avgDaysOverdue += daysSinceEnrollment
      }
    })
    
    const avgDebtPercentage = totalDebtors > 0 ? Math.round(totalDebtPercentage / totalDebtors) : 0
    const avgDays = totalDebtors > 0 ? Math.round(avgDaysOverdue / totalDebtors) : 0
    const debtorPercentage = allStudents.length > 0 ? Math.round((totalDebtors / allStudents.length) * 100) : 0

    res.json({
      totalDebtors,
      avgDebtPercentage,
      avgDaysOverdue: avgDays,
      debtorPercentage
    })
  } catch (error) {
    console.error('Get debtors stats error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}

// Update payment
export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body
    const student = await Student.findById(req.params.id)
    
    if (!student) {
      return res.status(404).json({ message: 'O\'quvchi topilmadi' })
    }

    student.paidAmount = (student.paidAmount || 0) + amount
    student.remainingAmount = Math.max(0, (student.totalPayment || 0) - (student.paidAmount || 0))
    
    await student.save()
    res.json(student)
  } catch (error) {
    console.error('Update payment error:', error)
    res.status(500).json({ message: 'Server xatoligi' })
  }
}