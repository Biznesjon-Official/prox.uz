import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const clearDemoStudents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear all demo students
    const result = await Student.deleteMany({})
    console.log(`🗑️ ${result.deletedCount} ta demo o'quvchi o'chirildi`)

    console.log('🎉 Demo o\'quvchilar tozalandi!')
    console.log('💡 Endi real o\'quvchilarni qo\'shishingiz mumkin')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

clearDemoStudents()