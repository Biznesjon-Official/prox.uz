import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const fixRealStudentsData = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Birinchi o'quvchining ismini tuzatish
    const firstStudent = await Student.findOne({ fullName: 'Noma\'lum' })
    if (firstStudent) {
      await Student.findByIdAndUpdate(firstStudent._id, {
        fullName: 'Mahmudov Mahmud',
        username: 'mahmud.mahmudov'
      })
      console.log('✅ Birinchi o\'quvchi ismi tuzatildi: Mahmudov Mahmud')
    }

    // Barcha o'quvchilarga ball qo'shish
    const students = await Student.find()
    console.log(`📚 ${students.length} ta o'quvchi topildi`)

    for (const student of students) {
      // Progress asosida ball hisoblash
      const baseScore = student.progress || 0
      const randomBonus = Math.floor(Math.random() * 15) // 0-14 oralig'ida bonus
      const finalScore = Math.min(100, baseScore + randomBonus)

      await Student.findByIdAndUpdate(student._id, {
        score: finalScore
      })

      console.log(`✅ ${student.fullName}: ${finalScore} ball qo'shildi`)
    }

    console.log('🎉 Barcha real o\'quvchilar ma\'lumotlari yangilandi!')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 MongoDB aloqasi uzildi')
  }
}

fixRealStudentsData()