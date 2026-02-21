import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

// Real o'quvchilar ma'lumotlari (sizning real ma'lumotlaringizni kiriting)
const realStudents = [
  {
    fullName: 'Abdullayev Javohir',
    username: 'javohir_a',
    email: 'javohir@gmail.com',
    phone: '+998901234567',
    course: 'Frontend Development',
    progress: 75,
    totalPayment: 2000000,
    paidAmount: 1500000,
    status: 'active'
  },
  {
    fullName: 'Karimova Dilnoza',
    username: 'dilnoza_k',
    email: 'dilnoza@gmail.com',
    phone: '+998907654321',
    course: 'Backend Development',
    progress: 88,
    totalPayment: 2500000,
    paidAmount: 2500000,
    status: 'active'
  },
  {
    fullName: 'Toshmatov Bekzod',
    username: 'bekzod_t',
    email: 'bekzod@gmail.com',
    phone: '+998909876543',
    course: 'Full Stack Development',
    progress: 92,
    totalPayment: 3000000,
    paidAmount: 2000000,
    status: 'active'
  },
  {
    fullName: 'Yusupova Madina',
    username: 'madina_y',
    email: 'madina@gmail.com',
    phone: '+998901111111',
    course: 'UI/UX Design',
    progress: 65,
    totalPayment: 1800000,
    paidAmount: 1200000,
    status: 'active'
  },
  {
    fullName: 'Rahimov Otabek',
    username: 'otabek_r',
    email: 'otabek@gmail.com',
    phone: '+998902222222',
    course: 'Mobile Development',
    progress: 100,
    totalPayment: 2200000,
    paidAmount: 2200000,
    status: 'graduated'
  },
  {
    fullName: 'Saidova Gulnoza',
    username: 'gulnoza_s',
    email: 'gulnoza@gmail.com',
    phone: '+998903333333',
    course: 'Frontend Development',
    progress: 30,
    totalPayment: 2000000,
    paidAmount: 800000,
    status: 'inactive'
  },
  {
    fullName: 'Nazarov Sherzod',
    username: 'sherzod_n',
    email: 'sherzod@gmail.com',
    phone: '+998904444444',
    course: 'Backend Development',
    progress: 82,
    totalPayment: 2500000,
    paidAmount: 2000000,
    status: 'active'
  },
  {
    fullName: 'Mirzayeva Feruza',
    username: 'feruza_m',
    email: 'feruza@gmail.com',
    phone: '+998905555555',
    course: 'UI/UX Design',
    progress: 95,
    totalPayment: 1800000,
    paidAmount: 1800000,
    status: 'graduated'
  }
]

const addRealStudents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Insert real students
    await Student.insertMany(realStudents)
    console.log(`✅ ${realStudents.length} ta real o'quvchi qo'shildi`)

    // Show stats
    const stats = {
      total: await Student.countDocuments(),
      active: await Student.countDocuments({ status: 'active' }),
      inactive: await Student.countDocuments({ status: 'inactive' }),
      graduated: await Student.countDocuments({ status: 'graduated' })
    }

    console.log('📊 Statistika:')
    console.log(`   Jami: ${stats.total}`)
    console.log(`   Faol: ${stats.active}`)
    console.log(`   Nofaol: ${stats.inactive}`)
    console.log(`   Bitirgan: ${stats.graduated}`)

    console.log('🎉 Real o\'quvchilar muvaffaqiyatli qo\'shildi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

addRealStudents()