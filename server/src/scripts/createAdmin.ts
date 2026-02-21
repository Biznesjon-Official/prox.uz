import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Admin foydalanuvchi yaratish
    const admin = await User.create({
      fullName: 'Admin',
      username: 'admin',
      password: 'admin123',
      role: 'admin',
    })

    console.log('\n✅ Admin foydalanuvchi yaratildi:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('👤 Ism:', admin.fullName)
    console.log('🔑 Username:', admin.username)
    console.log('🔒 Parol: admin123')
    console.log('👔 Role:', admin.role)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error: any) {
    if (error.code === 11000) {
      console.log('⚠️  Admin allaqachon mavjud')
    } else {
      console.error('❌ Xatolik:', error.message)
    }
    process.exit(1)
  }
}

createAdmin()
