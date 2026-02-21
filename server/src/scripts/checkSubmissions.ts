import mongoose from 'mongoose'
import Submission from '../models/Submission.js'
import Task from '../models/Task.js'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkSubmissions() {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ga ulanildi')

    // Barcha submissionlarni olish
    const submissions = await Submission.find()
      .populate('taskId', 'title taskType stepNumber points')
      .populate('studentId', 'fullName username')
      .sort({ createdAt: -1 })

    console.log(`\n📊 JAMI TOPSHIRILGAN ISHLAR: ${submissions.length}`)
    console.log('=' .repeat(80))

    if (submissions.length === 0) {
      console.log('❌ Hech qanday topshirilgan ish topilmadi')
      return
    }

    // Har bir submission haqida ma'lumot
    submissions.forEach((submission, index) => {
      console.log(`\n${index + 1}. TOPSHIRILGAN ISH:`)
      console.log(`   📝 Vazifa: ${submission.taskId?.title || 'Noma\'lum'}`)
      console.log(`   👤 O'quvchi: ${submission.studentId?.fullName || 'Noma\'lum'} (@${submission.studentId?.username || 'noma\'lum'})`)
      console.log(`   📋 Turi: ${submission.submissionType}`)
      console.log(`   📅 Topshirilgan: ${submission.submittedAt.toLocaleString('uz-UZ')}`)
      console.log(`   ⭐ Status: ${submission.status}`)
      
      if (submission.submissionType === 'test' && submission.testAnswers) {
        console.log(`   🧪 Test javoblari: ${submission.testAnswers.length} ta javob`)
        submission.testAnswers.forEach((answer, i) => {
          console.log(`      ${i + 1}. Javob: ${answer.answer} ${answer.isCorrect ? '✅' : '❌'}`)
        })
      }
      
      if (submission.submissionType === 'code') {
        console.log(`   💻 Kod uzunligi: ${submission.content.length} belgi`)
        console.log(`   💻 Kod namunasi: ${submission.content.substring(0, 100)}...`)
      }
      
      if (submission.aiReview) {
        console.log(`   🤖 AI baholash:`)
        console.log(`      📊 Ball: ${submission.aiReview.score}/100`)
        console.log(`      💬 Fikr: ${submission.aiReview.feedback}`)
        console.log(`      📅 Baholangan: ${submission.aiReview.reviewedAt.toLocaleString('uz-UZ')}`)
      }
      
      console.log('   ' + '-'.repeat(60))
    })

    // Statistika
    console.log(`\n📈 STATISTIKA:`)
    console.log('=' .repeat(50))
    
    const byType = submissions.reduce((acc, sub) => {
      acc[sub.submissionType] = (acc[sub.submissionType] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('📋 Tur bo\'yicha:')
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} ta`)
    })
    
    const byStatus = submissions.reduce((acc, sub) => {
      acc[sub.status] = (acc[sub.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log('\n⭐ Status bo\'yicha:')
    Object.entries(byStatus).forEach(([status, count]) => {
      console.log(`   ${status}: ${count} ta`)
    })

    // Eng faol o'quvchilar
    const studentStats = submissions.reduce((acc, sub) => {
      const studentName = sub.studentId?.fullName || 'Noma\'lum'
      acc[studentName] = (acc[studentName] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    console.log('\n👥 Eng faol o\'quvchilar:')
    Object.entries(studentStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([student, count]) => {
        console.log(`   ${student}: ${count} ta ish`)
      })

    // Qadamlar bo'yicha statistika
    const stepStats = submissions.reduce((acc, sub) => {
      const stepNumber = sub.taskId?.stepNumber || 0
      acc[stepNumber] = (acc[stepNumber] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    console.log('\n📚 Qadamlar bo\'yicha:')
    Object.entries(stepStats)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .forEach(([step, count]) => {
        console.log(`   ${step}-qadam: ${count} ta ish`)
      })

  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\n📤 MongoDB aloqasi uzildi')
  }
}

// Script ni ishga tushirish
checkSubmissions()