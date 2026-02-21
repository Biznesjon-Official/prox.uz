import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Task from '../models/Task'

dotenv.config()

const sampleTasks = [
  {
    title: 'HTML Asoslari',
    description: 'HTML teglar va strukturasi haqida asosiy bilimlarni o\'rganish va amaliy mashq qilish',
    course: 'Frontend Development',
    deadline: new Date('2024-02-20'),
    status: 'pending',
    difficulty: 'easy',
    points: 30
  },
  {
    title: 'CSS Flexbox Layout',
    description: 'Flexbox yordamida responsive layout yaratish va elementlarni joylashtirishni o\'rganish',
    course: 'Frontend Development',
    deadline: new Date('2024-02-25'),
    status: 'in_progress',
    difficulty: 'medium',
    points: 50
  },
  {
    title: 'JavaScript DOM Manipulation',
    description: 'JavaScript yordamida DOM elementlari bilan ishlash va dinamik sahifalar yaratish',
    course: 'Frontend Development',
    deadline: new Date('2024-03-01'),
    status: 'submitted',
    difficulty: 'hard',
    points: 75
  },
  {
    title: 'React Components',
    description: 'React da functional va class componentlar yaratish, props va state bilan ishlash',
    course: 'Frontend Development',
    deadline: new Date('2024-03-05'),
    status: 'completed',
    difficulty: 'hard',
    points: 80
  },
  {
    title: 'Node.js API yaratish',
    description: 'Express.js yordamida RESTful API yaratish va ma\'lumotlar bazasi bilan bog\'lash',
    course: 'Backend Development',
    deadline: new Date('2024-02-28'),
    status: 'pending',
    difficulty: 'hard',
    points: 90
  },
  {
    title: 'MongoDB CRUD operatsiyalari',
    description: 'MongoDB da ma\'lumotlarni yaratish, o\'qish, yangilash va o\'chirish amallarini bajarish',
    course: 'Backend Development',
    deadline: new Date('2024-03-10'),
    status: 'in_progress',
    difficulty: 'medium',
    points: 60
  },
  {
    title: 'Figma Prototype yaratish',
    description: 'Figma da mobil ilova uchun interaktiv prototip yaratish va dizayn tizimi qurish',
    course: 'UI/UX Design',
    deadline: new Date('2024-02-22'),
    status: 'completed',
    difficulty: 'medium',
    points: 55
  },
  {
    title: 'User Research',
    description: 'Foydalanuvchilar bilan intervyu o\'tkazish va ularning ehtiyojlarini tahlil qilish',
    course: 'UI/UX Design',
    deadline: new Date('2024-03-15'),
    status: 'pending',
    difficulty: 'easy',
    points: 40
  },
  {
    title: 'React Native Navigation',
    description: 'React Native da sahifalar orasida navigatsiya qilish va stack navigation o\'rnatish',
    course: 'Mobile Development',
    deadline: new Date('2024-03-20'),
    status: 'in_progress',
    difficulty: 'medium',
    points: 65
  },
  {
    title: 'Full Stack E-commerce',
    description: 'To\'liq e-commerce loyihasini yaratish: frontend, backend va ma\'lumotlar bazasi',
    course: 'Full Stack Development',
    deadline: new Date('2024-04-01'),
    status: 'pending',
    difficulty: 'hard',
    points: 100
  }
]

const seedTasks = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear existing tasks
    await Task.deleteMany({})
    console.log('🗑️ Mavjud vazifalar o\'chirildi')

    // Insert sample tasks
    await Task.insertMany(sampleTasks)
    console.log(`✅ ${sampleTasks.length} ta vazifa qo'shildi`)

    // Show added tasks
    console.log('\n📋 QO\'SHILGAN VAZIFALAR:')
    sampleTasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.title} - ${task.course} (${task.difficulty}, ${task.points} ball)`)
    })

    // Show statistics
    const stats = {
      total: sampleTasks.length,
      pending: sampleTasks.filter(t => t.status === 'pending').length,
      inProgress: sampleTasks.filter(t => t.status === 'in_progress').length,
      submitted: sampleTasks.filter(t => t.status === 'submitted').length,
      completed: sampleTasks.filter(t => t.status === 'completed').length,
      totalPoints: sampleTasks.reduce((sum, t) => sum + t.points, 0)
    }

    console.log('\n📊 VAZIFALAR STATISTIKASI:')
    console.log(`   Jami: ${stats.total}`)
    console.log(`   Kutilmoqda: ${stats.pending}`)
    console.log(`   Jarayonda: ${stats.inProgress}`)
    console.log(`   Topshirilgan: ${stats.submitted}`)
    console.log(`   Tugallangan: ${stats.completed}`)
    console.log(`   Jami ball: ${stats.totalPoints}`)

    console.log('\n🎉 Vazifalar muvaffaqiyatli qo\'shildi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

seedTasks()