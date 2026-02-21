import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    const usersCollection = mongoose.connection.db.collection('users')

    // Create a test user with known password
    const testUsername = 'test'
    const testPassword = 'test123'
    const hashedPassword = await bcrypt.hash(testPassword, 10)

    // Check if test user already exists
    const existingUser = await usersCollection.findOne({ username: testUsername })
    
    if (existingUser) {
      console.log('⚠️ Test foydalanuvchi allaqachon mavjud')
      
      // Update password
      await usersCollection.updateOne(
        { username: testUsername },
        { 
          $set: { 
            password: hashedPassword,
            updatedAt: new Date()
          }
        }
      )
      console.log('✅ Test foydalanuvchi paroli yangilandi')
    } else {
      // Create new test user
      const testUser = {
        fullName: 'Test User',
        username: testUsername,
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await usersCollection.insertOne(testUser)
      console.log('✅ Yangi test foydalanuvchi yaratildi')
    }

    console.log('\n🔐 TEST LOGIN MA\'LUMOTLARI:')
    console.log('=' .repeat(50))
    console.log('Username: test')
    console.log('Password: test123')
    console.log('Role: admin')
    console.log('=' .repeat(50))

    // Also try to create a simple admin user
    const adminUsername = 'admin'
    const adminPassword = 'admin123'
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10)

    const existingAdmin = await usersCollection.findOne({ username: adminUsername })
    
    if (existingAdmin) {
      // Update admin password
      await usersCollection.updateOne(
        { username: adminUsername },
        { 
          $set: { 
            password: hashedAdminPassword,
            updatedAt: new Date()
          }
        }
      )
      console.log('✅ Admin foydalanuvchi paroli yangilandi')
    }

    console.log('\n🔐 ADMIN LOGIN MA\'LUMOTLARI:')
    console.log('=' .repeat(50))
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('Role: admin')
    console.log('=' .repeat(50))

    console.log('\n💡 SAYTGA KIRISH:')
    console.log('1. http://localhost:5173/login ga o\'ting')
    console.log('2. Username: test, Password: test123 kiriting')
    console.log('3. Yoki Username: admin, Password: admin123 kiriting')
    console.log('4. Login tugmasini bosing')

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

createTestUser()