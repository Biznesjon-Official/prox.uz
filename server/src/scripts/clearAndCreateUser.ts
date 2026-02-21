import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()

const clearAndCreateUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Barcha foydalanuvchilarni o'chirish
    await User.deleteMany({})
    console.log('🗑️  Eski foydalanuvchilar o\'chirildi')

    // Yangi test foydalanuvchi yaratish
    const user = await User.create({
      fullName: 'Test O\'quvchi',
      username: 'student',
      password: 'student123',
      role: 'student',
    })

    console.log('\n✅ Yangi foydalanuvchi yaratildi:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('👤 Ism:', user.fullName)
    console.log('🔑 Username:', user.username)
    console.log('🔒 Parol: student123')
    console.log('👔 Role:', user.role)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Xatolik:', error.message)
    process.exit(1)
  }
}

clearAndCreateUser()
