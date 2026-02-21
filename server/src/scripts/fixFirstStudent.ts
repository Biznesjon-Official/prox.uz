import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const fixFirstStudent = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Birinchi o'quvchini topish (Noma'lum)
    const firstStudent = await Student.findOne({ fullName: 'Noma\'lum' })
    
    if (firstStudent) {
      await Student.findByIdAndUpdate(firstStudent._id, {
        fullName: 'Mahmudov Mahmud',
        username: 'mahmud.mahmudov'
      })
      console.log('✅ Birinchi o\'quvchi ma\'lumotlari yangilandi')
    }

    console.log('🎉 Tuzatish tugallandi!')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 MongoDB aloqasi uzildi')
  }
}

fixFirstStudent()