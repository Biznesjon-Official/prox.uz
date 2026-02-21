import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const originalStudents = [
  { phone: '+998919752757', fullName: 'Abdullayev Javohir', course: 'Frontend Development', progress: 75, score: 85 },
  { phone: '+998904154141', fullName: 'Karimova Malika', course: 'Backend Development', progress: 82, score: 90 },
  { phone: '+998914457755', fullName: 'Toshmatov Bobur', course: 'Full Stack Development', progress: 68, score: 78 },
  { phone: '+998907441081', fullName: 'Yusupova Madina', course: 'UI/UX Design', progress: 91, score: 95 },
  { phone: '+998914431770', fullName: 'Rahimov Otabek', course: 'Mobile Development', progress: 77, score: 82 },
  { phone: '+998905140949', fullName: 'Saidova Gulnoza', course: 'Frontend Development', progress: 45, score: 55 },
  { phone: '+998912405041', fullName: 'Nazarov Sherzod', course: 'Backend Development', progress: 89, score: 92 },
  { phone: '+998912455380', fullName: 'Mirzayeva Feruza', course: 'UI/UX Design', progress: 95, score: 98 },
  { phone: '+998919734243', fullName: 'Qodirov Aziz', course: 'Mobile Development', progress: 70, score: 75 },
  { phone: '+998907286515', fullName: 'Aliyev Sardor', course: 'Full Stack Development', progress: 86, score: 88 },
  { phone: '+998914005770', fullName: 'Karimova Dilnoza', course: 'Backend Development', progress: 92, score: 95 },
  { phone: '+998918310560', fullName: 'Toshmatov Bekzod', course: 'Full Stack Development', progress: 78, score: 80 },
  { phone: '+998913337771', fullName: 'Abdullayeva Nozima', course: 'Frontend Development', progress: 83, score: 87 },
  { phone: '+99891 922 67 74', fullName: 'Umarov Salohiddin', course: 'Mobile Development', progress: 74, score: 79 },
  { phone: '+99894 115 52 12', fullName: 'Saidova Dilfuza', course: 'UI/UX Design', progress: 88, score: 91 },
  { phone: '+99890 715 48 81', fullName: 'Rahimov Jasur', course: 'Backend Development', progress: 79, score: 84 },
  { phone: '+99850 102 73 51', fullName: 'Karimov Alisher', course: 'Frontend Development', progress: 85, score: 89 },
  { phone: '+99890 415 83 33', fullName: 'Tosheva Malika', course: 'Full Stack Development', progress: 72, score: 76 },
  { phone: '+99891 242 13 08', fullName: 'Abdullayev Bobur', course: 'Mobile Development', progress: 81, score: 85 },
  { phone: '+99890 719 52 41', fullName: 'Yusupova Nilufar', course: 'UI/UX Design', progress: 93, score: 96 },
  { phone: '+99894 880 25 45', fullName: 'Nazarov Jasur', course: 'Backend Development', progress: 76, score: 80 },
  { phone: '+99890 413 57 87', fullName: 'Mirzayev Sardor', course: 'Frontend Development', progress: 67, score: 72 },
  { phone: '+99891 416 42 77', fullName: 'Qodirova Feruza', course: 'Full Stack Development', progress: 84, score: 87 },
  { phone: '+998919808010', fullName: 'Aliyeva Madina', course: 'Mobile Development', progress: 71, score: 75 },
  { phone: '+99888 306 94 44', fullName: 'Karimov Otabek', course: 'UI/UX Design', progress: 89, score: 92 },
  { phone: '+99833 241 80 03', fullName: 'Toshmatova Gulnoza', course: 'Backend Development', progress: 80, score: 83 },
  { phone: '+99850 850 65 75', fullName: 'Abdullayeva Dilnoza', course: 'Frontend Development', progress: 75, score: 78 },
  { phone: '+998912412059', fullName: 'Rahimova Nozima', course: 'Full Stack Development', progress: 87, score: 90 },
  { phone: '+99850 776 2939', fullName: 'Saidov Bekzod', course: 'Mobile Development', progress: 73, score: 77 },
  { phone: '+998916496061', fullName: 'Yusupov Alisher', course: 'UI/UX Design', progress: 90, score: 94 },
  { phone: '+998913337771', fullName: 'Nazarova Malika', course: 'Backend Development', progress: 78, score: 82 }
]

const restoreOriginal31Students = async () => {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ulandi')

    // Mavjud o'quvchilarni o'chirish
    await Student.deleteMany({})
    console.log('🗑️ Mavjud o\'quvchilar o\'chirildi')

    // 31 ta eski o'quvchini qo'shish
    for (let i = 0; i < originalStudents.length; i++) {
      const studentData = originalStudents[i]
      
      const student = new Student({
        fullName: studentData.fullName,
        username: studentData.fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, ''),
        phone: studentData.phone,
        course: studentData.course,
        progress: studentData.progress,
        score: studentData.score,
        status: studentData.progress > 90 ? 'graduated' : studentData.progress < 50 ? 'inactive' : 'active',
        totalPayment: Math.floor(Math.random() * 1000000) + 2000000, // 2-3 million
        paidAmount: Math.floor(Math.random() * 500000) + 1500000, // 1.5-2 million
        enrollmentDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
      })

      await student.save()
      console.log(`✅ ${i + 1}. ${studentData.fullName} qo'shildi`)
    }

    console.log('🎉 31 ta eski o\'quvchi muvaffaqiyatli qaytarildi!')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 MongoDB aloqasi uzildi')
  }
}

restoreOriginal31Students()