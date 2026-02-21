import mongoose from 'mongoose'
import Task from '../models/Task'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Barcha kurs modullari
const courseModules = [
  {
    name: "HTML Fundamentals",
    category: "Frontend",
    stepCount: 10,
    icon: "🌐",
    color: "orange"
  },
  {
    name: "Python Fundamentals", 
    category: "Backend",
    stepCount: 60,
    icon: "🐍",
    color: "blue"
  },
  {
    name: "Web Backend (Flask/FastAPI)",
    category: "Backend", 
    stepCount: 40,
    icon: "⚡",
    color: "green"
  },
  {
    name: "Data Analytics",
    category: "Data Science",
    stepCount: 60,
    icon: "📊",
    color: "purple"
  },
  {
    name: "Next.js Fullstack",
    category: "Fullstack",
    stepCount: 70,
    icon: "⚛️",
    color: "cyan"
  },
  {
    name: "AI Integration",
    category: "AI/ML",
    stepCount: 40,
    icon: "🤖",
    color: "pink"
  },
  {
    name: "Frontend-Backend Integration",
    category: "Fullstack",
    stepCount: 40,
    icon: "🔗",
    color: "indigo"
  },
  {
    name: "Electron Desktop Apps",
    category: "Desktop",
    stepCount: 25,
    icon: "💻",
    color: "gray"
  },
  {
    name: "DevOps & Docker",
    category: "DevOps",
    stepCount: 15,
    icon: "🐳",
    color: "blue"
  },
  {
    name: "Final Capstone",
    category: "Project",
    stepCount: 5,
    icon: "🎓",
    color: "gold"
  }
]

// Har bir modul uchun qadamlar yaratish
const generateStepsForModule = (moduleName: string, category: string, stepCount: number, icon: string) => {
  const steps = []
  
  for (let i = 1; i <= stepCount; i++) {
    // Asosiy dars
    const lessonTask = {
      title: `${i}-qadam: ${moduleName} - Dars ${i}`,
      description: `${moduleName} kursining ${i}-qadami. Asosiy tushunchalar va amaliy mashqlar.`,
      course: "ProX Academy",
      category: category,
      stepNumber: i,
      icon: icon,
      difficulty: "beginner",
      status: i === 1 ? "pending" : "pending",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      points: 20,
      taskType: 'lesson',
      moduleId: moduleName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }
    steps.push(lessonTask)

    // 10 ta test savoli
    for (let j = 1; j <= 10; j++) {
      const testTask = {
        title: `${i}-qadam Test ${j}: ${moduleName}`,
        description: `${moduleName} ${i}-qadam bo'yicha test savoli ${j}`,
        course: "ProX Academy",
        category: category,
        stepNumber: i,
        icon: "📝",
        difficulty: "beginner",
        status: "pending",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        points: 5,
        taskType: 'test',
        parentStep: i,
        orderInStep: j,
        moduleId: moduleName.toLowerCase().replace(/[^a-z0-9]/g, '-')
      }
      steps.push(testTask)
    }

    // 1 ta amaliy vazifa
    const practicalTask = {
      title: `${i}-qadam Amaliyot: ${moduleName}`,
      description: `${moduleName} ${i}-qadam bo'yicha amaliy vazifa. O'tilgan mavzularni amalda qo'llash.`,
      course: "ProX Academy",
      category: category,
      stepNumber: i,
      icon: "💻",
      difficulty: "beginner",
      status: "pending",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      points: 50,
      taskType: 'practical',
      parentStep: i,
      orderInStep: 11,
      moduleId: moduleName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    }
    steps.push(practicalTask)
  }
  
  return steps
}

async function seedAllCourseModules() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Barcha eski vazifalarni o'chirish
    await Task.deleteMany({})
    console.log('🗑️ Barcha eski vazifalar o\'chirildi')

    const allTasks = []

    // Har bir modul uchun vazifalar yaratish
    for (const module of courseModules) {
      console.log(`📚 ${module.name} moduli yaratilmoqda...`)
      
      const moduleTasks = generateStepsForModule(
        module.name,
        module.category, 
        module.stepCount,
        module.icon
      )
      
      allTasks.push(...moduleTasks)
      console.log(`   ✅ ${moduleTasks.length} ta vazifa yaratildi`)
    }

    // Barcha vazifalarni ma'lumotlar bazasiga saqlash
    const insertedTasks = await Task.insertMany(allTasks)
    console.log(`\n🎉 Jami ${insertedTasks.length} ta vazifa muvaffaqiyatli qo'shildi!`)

    // Xulosani ko'rsatish
    console.log('\n📊 Modullar xulosasi:')
    for (const module of courseModules) {
      const moduleTaskCount = module.stepCount * 12 // har qadam: 1 dars + 10 test + 1 amaliyot
      console.log(`${module.icon} ${module.name}: ${module.stepCount} qadam, ${moduleTaskCount} vazifa`)
    }

    const totalSteps = courseModules.reduce((sum, module) => sum + module.stepCount, 0)
    const totalTasks = courseModules.reduce((sum, module) => sum + (module.stepCount * 12), 0)
    
    console.log(`\n🏆 JAMI: ${totalSteps} qadam, ${totalTasks} vazifa`)
    console.log('💡 Barcha modullar tayyor!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

seedAllCourseModules()