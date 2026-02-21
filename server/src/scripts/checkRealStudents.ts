import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const checkRealStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Check if there are multiple students collections or different structure
    const collections = await mongoose.connection.db.listCollections().toArray()
    
    console.log('\n🔍 BARCHA COLLECTION\'LAR:')
    collections.forEach(col => {
      console.log(`   - ${col.name}`)
    })

    // Check the actual students collection from MongoDB
    const studentsCollection = mongoose.connection.db.collection('students')
    
    // Get all documents without any filtering
    const allStudents = await studentsCollection.find({}).toArray()
    
    console.log(`\n📊 STUDENTS COLLECTION'DA JAMI: ${allStudents.length} ta ma'lumot`)
    
    if (allStudents.length > 0) {
      console.log('\n📋 HAQIQIY MA\'LUMOTLAR:')
      allStudents.forEach((student, index) => {
        console.log(`\n${index + 1}. 🆔 ID: ${student._id}`)
        
        // Show all available fields
        Object.keys(student).forEach(key => {
          if (key !== '_id' && key !== '__v') {
            console.log(`   ${key}: ${student[key]}`)
          }
        })
        console.log('   ' + '-'.repeat(50))
      })
    }

    // Also check if there might be students in other collections
    console.log('\n🔍 BOSHQA COLLECTION\'LARDA O\'QUVCHI MA\'LUMOTLARI:')
    
    for (const col of collections) {
      if (col.name !== 'students') {
        const collection = mongoose.connection.db.collection(col.name)
        const count = await collection.countDocuments()
        
        if (count > 0 && count < 100) { // Check smaller collections
          const sample = await collection.findOne({})
          if (sample && (sample.name || sample.fullName || sample.student_name)) {
            console.log(`\n📁 ${col.name} collection'da ${count} ta ma'lumot:`)
            const docs = await collection.find({}).limit(3).toArray()
            docs.forEach((doc, i) => {
              const name = doc.name || doc.fullName || doc.student_name || 'Noma\'lum'
              console.log(`   ${i + 1}. ${name}`)
            })
          }
        }
      }
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

checkRealStudents()