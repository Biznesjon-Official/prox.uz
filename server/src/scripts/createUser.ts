import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Test foydalanuvchi yaratish
    const user = await User.create({
      fullName: 'Test O\'quvchi',
      username: 'student',
      password: 'student123',
      role: 'student',
    })

    console.log('✅ Foydalanuvchi yaratildi:')
    console.log('Username:', user.username)
    console.log('Parol: student123')
    console.log('Role:', user.role)

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Xatolik:', error.message)
    process.exit(1)
  }
}

createUser()
