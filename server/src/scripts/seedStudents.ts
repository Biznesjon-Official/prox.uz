import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Student from '../models/Student'

dotenv.config()

const sampleStudents = [
  {
    fullName: 'Alisher Karimov',
    username: 'alisher_k',
    email: 'alisher@example.com',
    phone: '+998901234567',
    course: 'Frontend Development',
    progress: 85,
    totalPayment: 2000000,
    paidAmount: 1500000,
    status: 'active'
  },
  {
    fullName: 'Malika Tosheva',
    username: 'malika_t',
    email: 'malika@example.com',
    phone: '+998907654321',
    course: 'Backend Development',
    progress: 92,
    totalPayment: 2500000,
    paidAmount: 2500000,
    status: 'active'
  },
  {
    fullName: 'Bobur Rahimov',
    username: 'bobur_r',
    email: 'bobur@example.com',
    phone: '+998909876543',
    course: 'Full Stack Development',
    progress: 78,
    totalPayment: 3000000,
    paidAmount: 2000000,
    status: 'active'
  },
  {
    fullName: 'Nilufar Saidova',
    username: 'nilufar_s',
    email: 'nilufar@example.com',
    phone: '+998901111111',
    course: 'UI/UX Design',
    progress: 88,
    totalPayment: 1800000,
    paidAmount: 1800000,
    status: 'active'
  },
  {
    fullName: 'Jasur Abdullayev',
    username: 'jasur_a',
    email: 'jasur@example.com',
    phone: '+998902222222',
    course: 'Mobile Development',
    progress: 95,
    totalPayment: 2200000,
    paidAmount: 2200000,
    status: 'graduated'
  },
  {
    fullName: 'Sardor Umarov',
    username: 'sardor_u',
    email: 'sardor@example.com',
    phone: '+998903333333',
    course: 'Frontend Development',
    progress: 45,
    totalPayment: 2000000,
    paidAmount: 1000000,
    status: 'inactive'
  }
]

const seedStudents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear existing students
    await Student.deleteMany({})
    console.log('🗑️ Mavjud o\'quvchilar o\'chirildi')

    // Insert sample students
    await Student.insertMany(sampleStudents)
    console.log('✅ Demo o\'quvchilar qo\'shildi')

    console.log('🎉 Seed jarayoni tugallandi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed xatoligi:', error)
    process.exit(1)
  }
}

seedStudents()