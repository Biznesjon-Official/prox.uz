import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const findAllStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)

    const collections = await mongoose.connection.db.listCollections().toArray()
    
    console.log('\n🔍 BARCHA COLLECTION\'LARDAGI O\'QUVCHILAR:')
    console.log('=' .repeat(60))

    let totalStudentsFound = 0

    for (const col of collections) {
      const collection = mongoose.connection.db.collection(col.name)
      const count = await collection.countDocuments()
      
      console.log(`\n📁 ${col.name.toUpperCase()} collection:`)
      console.log(`   Jami ma'lumotlar: ${count}`)
      
      if (count > 0) {
        // Get a sample document to understand structure
        const sample = await collection.findOne({})
        
        // Check if this looks like student data
        const hasStudentFields = sample && (
          sample.fullName || 
          sample.name || 
          sample.firstName || 
          sample.student_name ||
          sample.student ||
          (sample.username && sample.course) ||
          (sample.phone && sample.email)
        )
        
        if (hasStudentFields) {
          console.log(`   ✅ Bu o'quvchi ma'lumotlari!`)
          totalStudentsFound += count
          
          // Show first few students
          const students = await collection.find({}).limit(3).toArray()
          students.forEach((student, index) => {
            const name = student.fullName || student.name || student.firstName || student.student_name || 'Noma\'lum'
            const course = student.course || student.subject || student.branch || 'Kurs noma\'lum'
            console.log(`   ${index + 1}. ${name} - ${course}`)
          })
          
          if (count > 3) {
            console.log(`   ... va yana ${count - 3} ta o'quvchi`)
          }
        } else if (count < 10) {
          // Show sample for small collections
          console.log(`   Namuna:`)
          const keys = Object.keys(sample || {}).slice(0, 3)
          keys.forEach(key => {
            if (key !== '_id') {
              console.log(`     ${key}: ${sample[key]}`)
            }
          })
        }
      }
    }

    console.log('\n' + '=' .repeat(60))
    console.log(`🎓 JAMI TOPILGAN O'QUVCHILAR: ${totalStudentsFound}`)
    console.log('=' .repeat(60))

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

findAllStudents()