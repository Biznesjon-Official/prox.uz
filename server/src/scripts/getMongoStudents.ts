import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const getMongoStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Get the actual students collection from MongoDB
    const studentsCollection = mongoose.connection.db.collection('students')
    
    // Get all real students from MongoDB
    const realStudents = await studentsCollection.find({}).toArray()
    
    console.log(`\n📊 MONGODB'DAGI REAL O'QUVCHILAR: ${realStudents.length} ta`)
    console.log('=' .repeat(70))

    if (realStudents.length > 0) {
      realStudents.forEach((student, index) => {
        console.log(`\n${index + 1}. 👤 ${student.fullName || student.name || 'Noma\'lum'}`)
        console.log(`   🆔 ID: ${student._id}`)
        console.log(`   👤 Username: ${student.username || 'Yo\'q'}`)
        console.log(`   📧 Email: ${student.email || 'Yo\'q'}`)
        console.log(`   📱 Telefon: ${student.phone || 'Yo\'q'}`)
        console.log(`   🎓 Kurs: ${student.course || 'Noma\'lum'}`)
        console.log(`   📊 Progress: ${student.progress || 0}%`)
        console.log(`   🔄 Status: ${student.status || 'Noma\'lum'}`)
        console.log(`   💰 Jami to\'lov: ${student.totalPayment || 0}`)
        console.log(`   ✅ To\'langan: ${student.paidAmount || 0}`)
        console.log(`   ❌ Qarz: ${student.remainingAmount || 0}`)
        console.log(`   📅 Ro\'yxatdan o\'tgan: ${student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString('uz-UZ') : 'Noma\'lum'}`)
        console.log('   ' + '-'.repeat(60))
      })

      // Show field structure of first student
      console.log('\n🔍 BIRINCHI O\'QUVCHINING BARCHA FIELDLARI:')
      const firstStudent = realStudents[0]
      Object.keys(firstStudent).forEach(key => {
        console.log(`   ${key}: ${firstStudent[key]}`)
      })
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

getMongoStudents()