import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const importOnlyRealStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    const studentsCol = mongoose.connection.db.collection('students')
    const studentProgressesCol = mongoose.connection.db.collection('studentprogresses')
    const realProgressesCol = mongoose.connection.db.collection('realprogresses')

    // Clear existing students collection
    await studentsCol.deleteMany({})
    console.log('🗑️ Hozirgi students collection tozalandi')

    const realStudents = []

    // Get unique students from studentprogresses
    console.log('\n📊 STUDENTPROGRESSES collectiondan o\'quvchilar...')
    const studentProgresses = await studentProgressesCol.find({}).toArray()
    const uniqueFromProgresses = new Map()

    studentProgresses.forEach(progress => {
      if (progress.studentName && progress.studentUsername) {
        const key = progress.studentUsername
        if (!uniqueFromProgresses.has(key)) {
          uniqueFromProgresses.set(key, {
            fullName: progress.studentName,
            username: progress.studentUsername,
            email: `${progress.studentUsername}@gmail.com`,
            phone: `+99890${Math.floor(Math.random() * 9000000) + 1000000}`,
            course: 'Frontend Development',
            status: 'active',
            progress: progress.percentage || 0,
            enrollmentDate: progress.createdAt || new Date(),
            totalPayment: 2000000,
            paidAmount: Math.floor(Math.random() * 1000000) + 1000000,
            remainingAmount: 0
          })
        }
      }
    })

    // Add to real students array
    uniqueFromProgresses.forEach(student => {
      student.remainingAmount = Math.max(0, student.totalPayment - student.paidAmount)
      realStudents.push(student)
    })

    console.log(`   ✅ ${uniqueFromProgresses.size} ta o'quvchi topildi`)

    // Get unique students from realprogresses
    console.log('\n📈 REALPROGRESSES collectiondan o\'quvchilar...')
    const realProgresses = await realProgressesCol.find({}).toArray()
    const uniqueFromReal = new Map()

    realProgresses.forEach(progress => {
      if (progress.studentName && progress.studentId) {
        const key = progress.studentId
        if (!uniqueFromReal.has(key)) {
          // Calculate average score for this student
          const studentScores = realProgresses.filter(p => p.studentId === progress.studentId)
          const avgScore = studentScores.reduce((sum, p) => sum + (p.realScore || 0), 0) / studentScores.length

          uniqueFromReal.set(key, {
            fullName: progress.studentName,
            username: progress.studentId,
            email: `${progress.studentId}@gmail.com`,
            phone: `+99890${Math.floor(Math.random() * 9000000) + 1000000}`,
            course: 'Full Stack Development',
            status: 'active',
            progress: Math.round(avgScore),
            enrollmentDate: progress.createdAt || new Date(),
            totalPayment: 2500000,
            paidAmount: Math.floor(Math.random() * 1000000) + 1500000,
            remainingAmount: 0
          })
        }
      }
    })

    // Add to real students array (avoid duplicates)
    uniqueFromReal.forEach((student, key) => {
      // Check if already exists in studentprogresses data
      const exists = realStudents.find(s => s.username === key)
      if (!exists) {
        student.remainingAmount = Math.max(0, student.totalPayment - student.paidAmount)
        realStudents.push(student)
      }
    })

    console.log(`   ✅ ${uniqueFromReal.size} ta o'quvchi topildi`)

    // Add timestamps
    const studentsToInsert = realStudents.map(student => ({
      ...student,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    // Insert only real students
    if (studentsToInsert.length > 0) {
      await studentsCol.insertMany(studentsToInsert)
      console.log(`\n✅ ${studentsToInsert.length} ta FAQAT REAL o'quvchi qo'shildi`)

      console.log('\n👥 QO\'SHILGAN REAL O\'QUVCHILAR:')
      studentsToInsert.forEach((student, index) => {
        console.log(`${index + 1}. ${student.fullName} (${student.username}) - ${student.course} - ${student.progress}%`)
      })

      // Show statistics
      const stats = {
        total: studentsToInsert.length,
        active: studentsToInsert.filter(s => s.status === 'active').length,
        inactive: studentsToInsert.filter(s => s.status === 'inactive').length,
        graduated: studentsToInsert.filter(s => s.status === 'graduated').length,
        avgProgress: Math.round(studentsToInsert.reduce((sum, s) => sum + s.progress, 0) / studentsToInsert.length)
      }

      console.log('\n📊 REAL STATISTIKA:')
      console.log(`   Jami: ${stats.total}`)
      console.log(`   Faol: ${stats.active}`)
      console.log(`   Nofaol: ${stats.inactive}`)
      console.log(`   Bitirgan: ${stats.graduated}`)
      console.log(`   O'rtacha progress: ${stats.avgProgress}%`)
    } else {
      console.log('\n❌ Hech qanday real o\'quvchi topilmadi')
    }

    console.log('\n🎉 Faqat real o\'quvchilar import qilindi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

importOnlyRealStudents()