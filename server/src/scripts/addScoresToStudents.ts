import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const addScoresToStudents = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Barcha o'quvchilarni olish
    const students = await Student.find()
    console.log(`📚 ${students.length} ta o'quvchi topildi`)

    // Har bir o'quvchiga tasodifiy ball qo'shish
    for (const student of students) {
      // Progress asosida ball hisoblash (progress + tasodifiy qo'shimcha)
      const baseScore = student.progress || 0
      const randomBonus = Math.floor(Math.random() * 20) // 0-19 oralig'ida tasodifiy bonus
      const finalScore = Math.min(100, baseScore + randomBonus) // 100 dan oshmasin

      await Student.findByIdAndUpdate(student._id, {
        score: finalScore
      })

      console.log(`✅ ${student.fullName || student.name}: ${finalScore} ball qo'shildi`)
    }

    console.log('🎉 Barcha o\'quvchilarga ball qo\'shildi!')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 MongoDB aloqasi uzildi')
  }
}

addScoresToStudents()