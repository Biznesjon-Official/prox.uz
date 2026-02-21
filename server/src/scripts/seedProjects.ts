import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project'

dotenv.config()

const sampleProjects = [
  {
    title: 'E-commerce Website',
    description: 'Zamonaviy onlayn do\'kon yaratish loyihasi React va Node.js yordamida',
    technology: 'React, Node.js, MongoDB, Express',
    students: 8,
    status: 'active',
    progress: 75,
    deadline: new Date('2024-03-15')
  },
  {
    title: 'Mobile Banking App',
    description: 'Bank xizmatlari uchun mobil ilova React Native da',
    technology: 'React Native, Firebase, Redux',
    students: 6,
    status: 'active',
    progress: 60,
    deadline: new Date('2024-04-01')
  },
  {
    title: 'Learning Management System',
    description: 'Ta\'lim boshqaruv tizimi Vue.js va Laravel bilan',
    technology: 'Vue.js, Laravel, MySQL, Tailwind CSS',
    students: 10,
    status: 'completed',
    progress: 100,
    deadline: new Date('2024-01-20')
  },
  {
    title: 'Social Media Dashboard',
    description: 'Ijtimoiy tarmoqlar analitikasi va boshqaruv paneli',
    technology: 'Angular, .NET Core, PostgreSQL',
    students: 5,
    status: 'planning',
    progress: 15,
    deadline: new Date('2024-05-10')
  },
  {
    title: 'Restaurant Management System',
    description: 'Restoran buyurtmalari va inventar boshqaruv tizimi',
    technology: 'Next.js, Prisma, PostgreSQL',
    students: 7,
    status: 'active',
    progress: 45,
    deadline: new Date('2024-04-20')
  },
  {
    title: 'Real Estate Platform',
    description: 'Ko\'chmas mulk sotish va ijaraga berish platformasi',
    technology: 'React, Django, PostgreSQL, Redis',
    students: 9,
    status: 'completed',
    progress: 100,
    deadline: new Date('2024-02-10')
  }
]

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️ Mavjud loyihalar o\'chirildi')

    // Insert sample projects
    await Project.insertMany(sampleProjects)
    console.log(`✅ ${sampleProjects.length} ta loyiha qo'shildi`)

    // Show added projects
    console.log('\n📁 QO\'SHILGAN LOYIHALAR:')
    sampleProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} - ${project.status} (${project.progress}%)`)
    })

    console.log('\n🎉 Loyihalar muvaffaqiyatli qo\'shildi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

seedProjects()