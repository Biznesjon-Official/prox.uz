import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const showStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    const studentsCollection = mongoose.connection.db.collection('students')
    const students = await studentsCollection.find({}).toArray()

    console.log('\n👥 STUDENTS COLLECTION\'DAGI BARCHA O\'QUVCHILAR:')
    console.log('=' .repeat(80))

    if (students.length === 0) {
      console.log('❌ Hech qanday o\'quvchi topilmadi')
    } else {
      students.forEach((student, index) => {
        console.log(`\n${index + 1}. 👤 ${student.fullName || 'Noma\'lum'}`)
        console.log(`   📧 Email: ${student.email || 'Yo\'q'}`)
        console.log(`   📱 Telefon: ${student.phone || 'Yo\'q'}`)
        console.log(`   🎓 Kurs: ${student.course || 'Noma\'lum'}`)
        console.log(`   📊 Progress: ${student.progress || 0}%`)
        console.log(`   🔄 Status: ${student.status || 'Noma\'lum'}`)
        console.log(`   💰 Jami to\'lov: ${student.totalPayment || 0} so\'m`)
        console.log(`   ✅ To\'langan: ${student.paidAmount || 0} so\'m`)
        console.log(`   ❌ Qarz: ${student.remainingAmount || 0} so\'m`)
        console.log(`   📅 Ro\'yxatdan o\'tgan: ${student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'}`)
        console.log(`   🆔 ID: ${student._id}`)
        console.log('   ' + '-'.repeat(60))
      })

      console.log(`\n📊 JAMI: ${students.length} ta o'quvchi`)
      
      // Statistics
      const activeCount = students.filter(s => s.status === 'active').length
      const inactiveCount = students.filter(s => s.status === 'inactive').length
      const graduatedCount = students.filter(s => s.status === 'graduated').length
      const totalProgress = students.reduce((sum, s) => sum + (s.progress || 0), 0)
      const avgProgress = students.length > 0 ? Math.round(totalProgress / students.length) : 0

      console.log('\n📈 STATISTIKA:')
      console.log(`   ✅ Faol: ${activeCount}`)
      console.log(`   ❌ Nofaol: ${inactiveCount}`)
      console.log(`   🎓 Bitirgan: ${graduatedCount}`)
      console.log(`   📊 O'rtacha progress: ${avgProgress}%`)
    }

    console.log('=' .repeat(80))
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

showStudents()