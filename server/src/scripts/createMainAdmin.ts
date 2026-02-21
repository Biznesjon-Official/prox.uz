import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'

dotenv.config()

const createMainAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Murodjon admin foydalanuvchi yaratish
    const existingUser = await User.findOne({ username: 'murodjon' })
    
    if (existingUser) {
      console.log('⚠️  Murodjon allaqachon mavjud')
      console.log('\n📋 Mavjud ma\'lumotlar:')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('👤 Ism:', existingUser.fullName)
      console.log('🔑 Username:', existingUser.username)
      console.log('👔 Role:', existingUser.role)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
      process.exit(0)
    }

    const admin = await User.create({
      fullName: 'Murodjon',
      username: 'murodjon',
      password: '123456',
      role: 'admin',
    })

    console.log('\n✅ Murodjon admin foydalanuvchi yaratildi:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('👤 Ism:', admin.fullName)
    console.log('🔑 Username:', admin.username)
    console.log('🔒 Parol: 123456')
    console.log('👔 Role:', admin.role)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    console.log('🎉 Endi login qilishingiz mumkin:')
    console.log('   http://localhost:5173/login')
    console.log('   Username: murodjon')
    console.log('   Parol: 123456\n')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Xatolik:', error.message)
    process.exit(1)
  }
}

createMainAdmin()
