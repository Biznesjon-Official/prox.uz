import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const checkMongoData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Get database name
    const dbName = mongoose.connection.db.databaseName
    console.log(`📊 Database: ${dbName}`)

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('\n📁 Mavjud collections:')
    collections.forEach(col => {
      console.log(`   - ${col.name}`)
    })

    // Check students collection specifically
    if (collections.find(col => col.name === 'students')) {
      console.log('\n👥 Students collection ma\'lumotlari:')
      
      const studentsCollection = mongoose.connection.db.collection('students')
      const studentCount = await studentsCollection.countDocuments()
      console.log(`   Jami o'quvchilar: ${studentCount}`)

      if (studentCount > 0) {
        console.log('\n📋 Birinchi 5 ta o\'quvchi:')
        const students = await studentsCollection.find({}).limit(5).toArray()
        students.forEach((student, index) => {
          console.log(`   ${index + 1}. ${student.fullName || student.name || 'Noma\'lum'} - ${student.course || 'Kurs noma\'lum'}`)
        })

        console.log('\n🔍 Barcha fieldlar (birinchi o\'quvchi):')
        const firstStudent = await studentsCollection.findOne({})
        console.log(JSON.stringify(firstStudent, null, 2))
      }
    } else {
      console.log('\n❌ Students collection topilmadi')
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

checkMongoData()