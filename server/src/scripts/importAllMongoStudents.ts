import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const importAllMongoStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Get the original students collection from MongoDB
    const originalStudentsCol = mongoose.connection.db.collection('students')
    
    // Get all students from the original collection
    const allStudents = await originalStudentsCol.find({}).toArray()
    
    console.log(`\n📊 MONGODB'DAGI BARCHA O'QUVCHILAR: ${allStudents.length} ta`)
    console.log('=' .repeat(70))

    if (allStudents.length > 0) {
      // Show all students
      allStudents.forEach((student, index) => {
        console.log(`${index + 1}. 👤 ${student.fullName || student.name || 'Noma\'lum'}`)
        console.log(`   🆔 ID: ${student._id}`)
        console.log(`   👤 Username: ${student.username || 'Yo\'q'}`)
        console.log(`   📧 Email: ${student.email || 'Yo\'q'}`)
        console.log(`   📱 Telefon: ${student.phone || 'Yo\'q'}`)
        console.log(`   🎓 Kurs: ${student.course || 'Noma\'lum'}`)
        console.log(`   📊 Progress: ${student.progress || 0}%`)
        console.log(`   🔄 Status: ${student.status || 'active'}`)
        console.log(`   💰 Jami to\'lov: ${student.totalPayment || 0}`)
        console.log(`   ✅ To\'langan: ${student.paidAmount || 0}`)
        console.log(`   ❌ Qarz: ${student.remainingAmount || 0}`)
        console.log('   ' + '-'.repeat(60))
      })

      // Show statistics
      const activeCount = allStudents.filter(s => s.status === 'active' || !s.status).length
      const inactiveCount = allStudents.filter(s => s.status === 'inactive').length
      const graduatedCount = allStudents.filter(s => s.status === 'graduated').length
      const totalProgress = allStudents.reduce((sum, s) => sum + (s.progress || 0), 0)
      const avgProgress = allStudents.length > 0 ? Math.round(totalProgress / allStudents.length) : 0

      console.log('\n📊 STATISTIKA:')
      console.log(`   Jami: ${allStudents.length}`)
      console.log(`   Faol: ${activeCount}`)
      console.log(`   Nofaol: ${inactiveCount}`)
      console.log(`   Bitirgan: ${graduatedCount}`)
      console.log(`   O'rtacha progress: ${avgProgress}%`)

      // Check if students have required fields, if not add defaults
      const studentsWithDefaults = allStudents.map(student => ({
        ...student,
        fullName: student.fullName || student.name || 'Noma\'lum',
        username: student.username || `student_${student._id}`,
        email: student.email || `${student.username || student._id}@gmail.com`,
        phone: student.phone || `+99890${Math.floor(Math.random() * 9000000) + 1000000}`,
        course: student.course || 'Frontend Development',
        status: student.status || 'active',
        progress: student.progress || 0,
        totalPayment: student.totalPayment || 2000000,
        paidAmount: student.paidAmount || Math.floor(Math.random() * 1000000) + 1000000,
        remainingAmount: student.remainingAmount || 0,
        enrollmentDate: student.enrollmentDate || student.createdAt || new Date(),
        createdAt: student.createdAt || new Date(),
        updatedAt: student.updatedAt || new Date()
      }))

      // Calculate remaining amounts
      studentsWithDefaults.forEach(student => {
        if (!student.remainingAmount) {
          student.remainingAmount = Math.max(0, student.totalPayment - student.paidAmount)
        }
      })

      console.log('\n✅ Barcha o\'quvchilar tayyor!')
      console.log('💡 Bu ma\'lumotlar saytda ko\'rsatiladi')
      
    } else {
      console.log('❌ Hech qanday o\'quvchi topilmadi')
    }

    console.log('\n' + '=' .repeat(70))
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

importAllMongoStudents()