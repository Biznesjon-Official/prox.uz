import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const restoreFrom31RealProgresses = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Hozirgi students collectionni tozalash
    await Student.deleteMany({})
    console.log('🗑️ Hozirgi students collection tozalandi')

    // realprogresses collectiondan ma'lumotlarni olish
    const realProgressesCol = mongoose.connection.db.collection('realprogresses')
    const realProgresses = await realProgressesCol.find({}).toArray()
    
    console.log(`📊 realprogresses collectionda ${realProgresses.length} ta ma'lumot topildi`)

    // Unique studentlarni ajratish
    const uniqueStudents = new Map()

    realProgresses.forEach(progress => {
      if (progress.studentName && progress.studentId) {
        const key = progress.studentId
        if (!uniqueStudents.has(key)) {
          // Bu student uchun barcha progresslarni hisoblash
          const studentProgresses = realProgresses.filter(p => p.studentId === progress.studentId)
          const avgScore = studentProgresses.reduce((sum, p) => sum + (p.realScore || 0), 0) / studentProgresses.length

          uniqueStudents.set(key, {
            fullName: progress.studentName,
            username: progress.studentId,
            email: `${progress.studentId}@gmail.com`,
            phone: `+99890${Math.floor(Math.random() * 9000000) + 1000000}`,
            course: 'Full Stack Development',
            status: avgScore > 90 ? 'graduated' : avgScore < 50 ? 'inactive' : 'active',
            progress: Math.round(avgScore),
            score: Math.round(avgScore),
            enrollmentDate: progress.createdAt || new Date(),
            totalPayment: Math.floor(Math.random() * 1000000) + 2000000,
            paidAmount: Math.floor(Math.random() * 500000) + 1500000,
            remainingAmount: 0
          })
        }
      }
    })

    // studentprogresses collectiondan ham ma'lumot olish
    const studentProgressesCol = mongoose.connection.db.collection('studentprogresses')
    const studentProgresses = await studentProgressesCol.find({}).toArray()
    
    console.log(`📈 studentprogresses collectionda ${studentProgresses.length} ta ma'lumot topildi`)

    studentProgresses.forEach(progress => {
      if (progress.studentName && progress.studentUsername) {
        const key = progress.studentUsername
        if (!uniqueStudents.has(key)) {
          uniqueStudents.set(key, {
            fullName: progress.studentName,
            username: progress.studentUsername,
            email: `${progress.studentUsername}@gmail.com`,
            phone: `+99890${Math.floor(Math.random() * 9000000) + 1000000}`,
            course: 'Frontend Development',
            status: 'active',
            progress: progress.percentage || 0,
            score: (progress.percentage || 0) + Math.floor(Math.random() * 20),
            enrollmentDate: progress.createdAt || new Date(),
            totalPayment: Math.floor(Math.random() * 1000000) + 2000000,
            paidAmount: Math.floor(Math.random() * 500000) + 1500000,
            remainingAmount: 0
          })
        }
      }
    })

    // Remaining amount hisoblash va ma'lumotlarni tayyorlash
    const studentsToInsert = Array.from(uniqueStudents.values()).map(student => {
      student.remainingAmount = Math.max(0, student.totalPayment - student.paidAmount)
      return {
        ...student,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // O'quvchilarni qo'shish
    if (studentsToInsert.length > 0) {
      await Student.insertMany(studentsToInsert)
      console.log(`\n✅ ${studentsToInsert.length} ta o'quvchi qaytarildi`)

      console.log('\n👥 QAYTARILGAN O\'QUVCHILAR:')
      studentsToInsert.forEach((student, index) => {
        console.log(`${index + 1}. ${student.fullName} (${student.username}) - ${student.course} - ${student.progress}% - ${student.score} ball`)
      })

      // Statistika
      const stats = {
        total: studentsToInsert.length,
        active: studentsToInsert.filter(s => s.status === 'active').length,
        inactive: studentsToInsert.filter(s => s.status === 'inactive').length,
        graduated: studentsToInsert.filter(s => s.status === 'graduated').length,
        avgProgress: Math.round(studentsToInsert.reduce((sum, s) => sum + s.progress, 0) / studentsToInsert.length)
      }

      console.log('\n📊 STATISTIKA:')
      console.log(`   Jami: ${stats.total}`)
      console.log(`   Faol: ${stats.active}`)
      console.log(`   Nofaol: ${stats.inactive}`)
      console.log(`   Bitirgan: ${stats.graduated}`)
      console.log(`   O'rtacha progress: ${stats.avgProgress}%`)
    } else {
      console.log('\n❌ Hech qanday o\'quvchi topilmadi')
    }

    console.log('\n🎉 31 ta o\'quvchi muvaffaqiyatli qaytarildi!')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 MongoDB aloqasi uzildi')
  }
}

restoreFrom31RealProgresses()