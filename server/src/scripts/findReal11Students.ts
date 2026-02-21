import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const findReal11Students = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    const collections = await mongoose.connection.db.listCollections().toArray()
    
    console.log('\n🔍 11 TA REAL O\'QUVCHINI QIDIRISH:')
    console.log('=' .repeat(60))

    let foundStudents: any[] = []

    // Check each collection for student-like data
    for (const col of collections) {
      const collection = mongoose.connection.db.collection(col.name)
      const count = await collection.countDocuments()
      
      if (count > 0) {
        console.log(`\n📁 ${col.name} - ${count} ta ma'lumot`)
        
        // Get all documents from this collection
        const docs = await collection.find({}).toArray()
        
        // Check if documents look like students
        const studentLikeDocs = docs.filter(doc => {
          return (
            doc.fullName || 
            doc.name || 
            doc.firstName || 
            doc.student_name ||
            (doc.username && (doc.course || doc.email || doc.phone)) ||
            (doc.phone && doc.email)
          )
        })

        if (studentLikeDocs.length > 0) {
          console.log(`   ✅ ${studentLikeDocs.length} ta o'quvchi topildi:`)
          
          studentLikeDocs.forEach((student, index) => {
            const name = student.fullName || student.name || student.firstName || student.student_name || student.username || 'Noma\'lum'
            const course = student.course || student.subject || student.branch || 'Kurs noma\'lum'
            const phone = student.phone || 'Telefon yo\'q'
            
            console.log(`   ${index + 1}. ${name} - ${course} - ${phone}`)
            
            // Add to found students array
            foundStudents.push({
              collection: col.name,
              data: student,
              name: name,
              course: course
            })
          })
        }
      }
    }

    console.log('\n' + '=' .repeat(60))
    console.log(`🎓 JAMI TOPILGAN O'QUVCHILAR: ${foundStudents.length}`)
    
    if (foundStudents.length >= 11) {
      console.log('\n📋 BIRINCHI 11 TA O\'QUVCHI:')
      foundStudents.slice(0, 11).forEach((student, index) => {
        console.log(`${index + 1}. ${student.name} (${student.collection} collection'dan)`)
      })
    }

    // Show detailed info for potential students
    if (foundStudents.length > 0) {
      console.log('\n🔍 BATAFSIL MA\'LUMOT (birinchi 3 ta):')
      foundStudents.slice(0, 3).forEach((student, index) => {
        console.log(`\n${index + 1}. Collection: ${student.collection}`)
        console.log('   Ma\'lumotlar:')
        Object.keys(student.data).forEach(key => {
          if (key !== '_id' && key !== '__v') {
            console.log(`     ${key}: ${student.data[key]}`)
          }
        })
        console.log('   ' + '-'.repeat(40))
      })
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

findReal11Students()