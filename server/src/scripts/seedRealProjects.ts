import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project'

dotenv.config()

const realProjects = [
  {
    title: 'Bolajon',
    description: 'Bolalar uchun rivojlantiruvchi o\'yinlar va ta\'lim platformasi. Ota-onalar va bolalar uchun interaktiv ta\'lim tizimi.',
    technology: 'Next.js, MongoDB, Tailwind CSS',
    students: 8,
    status: 'completed',
    progress: 100,
    deadline: new Date('2024-01-20'),
    url: 'https://bolajoon.uz/',
    logo: '/loyihalar/bolajon.png'
  },
  {
    title: 'Alochi',
    description: 'Zamonaviy restoran va ovqatlanish xizmatlari platformasi. Onlayn buyurtma va yetkazib berish tizimi.',
    technology: 'React, TypeScript, Node.js, PostgreSQL',
    students: 10,
    status: 'completed',
    progress: 100,
    deadline: new Date('2024-02-15'),
    url: 'https://alochibolajon.uz/',
    logo: '/loyihalar/alochi.jpg'
  },
  {
    title: 'MentalJon',
    description: 'Ruhiy salomatlik va psixologik yordam platformasi. Onlayn konsultatsiya va ruhiy salomatlik xizmatlari.',
    technology: 'React, Node.js, MongoDB, Express',
    students: 8,
    status: 'completed',
    progress: 100,
    deadline: new Date('2024-01-15'),
    url: 'https://mentaljon.uz/',
    logo: '/loyihalar/Mentaljon.png'
  },
  {
    title: 'proX Academy',
    description: 'Zamonaviy o\'quv platformasi va dasturlash kurslari. O\'quvchilar uchun interaktiv ta\'lim tizimi.',
    technology: 'React, TypeScript, MongoDB, Express',
    students: 12,
    status: 'active',
    progress: 85,
    deadline: new Date('2024-03-01'),
    url: 'https://prox.uz/',
    logo: '/loyihalar/prox.jpg'
  },
  {
    title: 'Mukammal Ota-Ona',
    description: 'Ota-onalar uchun tarbiya va rivojlantirish bo\'yicha maslahat platformasi. Bolalar tarbiyasi bo\'yicha qo\'llanma.',
    technology: 'Next.js, Strapi, PostgreSQL, Tailwind CSS',
    students: 7,
    status: 'completed',
    progress: 100,
    deadline: new Date('2024-03-10'),
    url: 'https://mukammalotaona.uz/',
    logo: '/loyihalar/mukammalotaona.png'
  },
  {
    title: 'Aliboboqurilish',
    description: 'Qurilish kompaniyasi uchun korporativ veb-sayt. Loyihalar portfoliosi va xizmatlar taqdimoti.',
    technology: 'Vue.js, Laravel, MySQL, Bootstrap',
    students: 6,
    status: 'completed',
    progress: 100,
    deadline: new Date('2023-12-20'),
    url: 'https://aliboboqurilish.uz/',
    logo: '/loyihalar/alibobo.png'
  },
  {
    title: 'BiznesJon',
    description: 'Biznes konsalting va moliyaviy maslahat xizmatlari platformasi. Tadbirkorlar uchun yordam markazi.',
    technology: 'Angular, .NET Core, SQL Server, Material UI',
    students: 9,
    status: 'active',
    progress: 75,
    deadline: new Date('2024-04-15'),
    url: 'https://biznesjon.uz/'
  },
  {
    title: 'Avtofix',
    description: 'Avtomobil ta\'mirlash xizmatlari va ehtiyot qismlar platformasi. Onlayn qidiruv va buyurtma tizimi.',
    technology: 'React, Node.js, MongoDB, Express',
    students: 8,
    status: 'active',
    progress: 80,
    deadline: new Date('2024-05-01'),
    url: 'https://avtofix.uz/',
    logo: '/loyihalar/avtofix.webp'
  },
  {
    title: 'Avtojon',
    description: 'Avtomobil sotish va xarid qilish platformasi. Yangi va ishlatilgan avtomobillar bozori.',
    technology: 'Next.js, PostgreSQL, Prisma, Tailwind CSS',
    students: 11,
    status: 'active',
    progress: 70,
    deadline: new Date('2024-06-01'),
    url: 'https://avtojon.uz/',
    logo: '/loyihalar/avtojon.png'
  }
]

const seedRealProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️ Mavjud loyihalar o\'chirildi')

    // Insert real projects
    await Project.insertMany(realProjects)
    console.log(`✅ ${realProjects.length} ta real loyiha qo'shildi`)

    // Show added projects
    console.log('\n🌐 QO\'SHILGAN REAL LOYIHALAR:')
    realProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`)
      console.log(`   🔗 ${project.url}`)
      console.log(`   📊 ${project.status} (${project.progress}%)`)
      console.log(`   👥 ${project.students} ta o'quvchi`)
      console.log(`   💻 ${project.technology}`)
      console.log('   ' + '-'.repeat(50))
    })

    // Show statistics
    const stats = {
      total: realProjects.length,
      completed: realProjects.filter(p => p.status === 'completed').length,
      active: realProjects.filter(p => p.status === 'active').length,
      planning: realProjects.filter(p => p.status === 'planning').length,
      totalStudents: realProjects.reduce((sum, p) => sum + p.students, 0)
    }

    console.log('\n📊 LOYIHALAR STATISTIKASI:')
    console.log(`   Jami: ${stats.total}`)
    console.log(`   Tugallangan: ${stats.completed}`)
    console.log(`   Faol: ${stats.active}`)
    console.log(`   Rejalashtirilgan: ${stats.planning}`)
    console.log(`   Jami ishtirokchilar: ${stats.totalStudents}`)

    console.log('\n🎉 Real loyihalar muvaffaqiyatli qo\'shildi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

seedRealProjects()