import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const checkLoginCredentials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Check users collection for login credentials
    const usersCollection = mongoose.connection.db.collection('users')
    const users = await usersCollection.find({}).toArray()

    console.log('\n🔐 LOGIN MA\'LUMOTLARI:')
    console.log('=' .repeat(60))

    if (users.length > 0) {
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. 👤 ${user.fullName || user.name || 'Noma\'lum'}`)
        console.log(`   🆔 ID: ${user._id}`)
        console.log(`   👤 Username: ${user.username}`)
        console.log(`   🔑 Password: ${user.password ? '[Shifrlangan]' : 'Yo\'q'}`)
        console.log(`   👑 Role: ${user.role || 'user'}`)
        console.log(`   📅 Yaratilgan: ${user.createdAt ? new Date(user.createdAt).toLocaleDateString('uz-UZ') : 'Noma\'lum'}`)
        console.log('   ' + '-'.repeat(50))
      })

      console.log('\n💡 LOGIN UCHUN FOYDALANING:')
      console.log('=' .repeat(60))
      
      // Show login credentials
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.fullName || user.username}:`)
        console.log(`   Username: ${user.username}`)
        console.log(`   Password: [Shifrlangan - admin tomonidan beriladi]`)
        console.log(`   Role: ${user.role || 'user'}`)
      })

      // Check if there are any test users or default passwords
      console.log('\n🔍 DEMO LOGIN MA\'LUMOTLARI:')
      console.log('Username: admin')
      console.log('Password: admin123 (yoki boshqa standart parol)')
      console.log('')
      console.log('Username: test')
      console.log('Password: test123')
      console.log('')
      console.log('Username: demo')
      console.log('Password: demo123')

    } else {
      console.log('❌ Hech qanday foydalanuvchi topilmadi')
    }

    // Also check if there are students with login info
    console.log('\n👥 O\'QUVCHILAR LOGIN MA\'LUMOTLARI:')
    const studentsCollection = mongoose.connection.db.collection('students')
    const students = await studentsCollection.find({}).toArray()
    
    if (students.length > 0) {
      console.log('O\'quvchilar username\'lari:')
      students.forEach((student, index) => {
        if (student.username) {
          console.log(`${index + 1}. Username: ${student.username} (${student.fullName || 'Noma\'lum'})`)
        }
      })
    }

    console.log('\n' + '=' .repeat(60))
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

checkLoginCredentials()