import mongoose from 'mongoose'
import Task from '../models/Task'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// HTML qadamlari uchun tuzilgan vazifalar
const htmlSteps = [
  {
    stepNumber: 1,
    title: "HTML KIRISH",
    description: "HTML nima va u qanday ishlaydi. Web sahifalar yaratishning asoslari.",
    icon: "✅",
    status: "completed"
  },
  {
    stepNumber: 2,
    title: "HTML STRUKTURASI",
    description: "HTML hujjatining asosiy strukturasi: DOCTYPE, html, head, body teglari.",
    icon: "⚙️",
    status: "in-progress"
  },
  {
    stepNumber: 3,
    title: "<h1> va <p> teglari",
    description: "Sarlavhalar va paragraflar bilan ishlash. Matn tuzilishini yaratish.",
    icon: "⚙️",
    status: "in-progress"
  },
  {
    stepNumber: 4,
    title: "Matnni formatlash uchun taglar",
    description: "Bold, italic, underline va boshqa matn formatlash teglari.",
    icon: "⚙️",
    status: "in-progress"
  },
  {
    stepNumber: 5,
    title: "Giperlinklar bilan ishlash",
    description: "Anchor tegi va havolalar yaratish. Internal va external linklar.",
    icon: "⚙️",
    status: "in-progress"
  },
  {
    stepNumber: 6,
    title: "O'tilgan mavzular orqali loyihani qilish",
    description: "Birinchi HTML loyiha yaratish. O'tilgan barcha mavzularni amalda qo'llash.",
    icon: "❗️",
    status: "pending"
  },
  {
    stepNumber: 7,
    title: "Rasmlar bilan ishlash",
    description: "IMG tegi, rasmlarni qo'shish va sozlash. Alt atributi va accessibility.",
    icon: "🚀",
    status: "pending"
  },
  {
    stepNumber: 8,
    title: "Listlar bilan ishlash",
    description: "Ordered va unordered listlar. Nested listlar yaratish.",
    icon: "🚀",
    status: "pending"
  },
  {
    stepNumber: 9,
    title: "Jadvallar bilan ishlash",
    description: "Table, tr, td, th teglari. Jadval strukturasini yaratish.",
    icon: "🚀",
    status: "pending"
  },
  {
    stepNumber: 10,
    title: "Inputlar bilan ishlash",
    description: "Form elementlari: input, textarea, select. Asosiy input turlari.",
    icon: "🚀",
    status: "pending"
  }
]

// Test savollari generatori
const generateTestQuestions = (stepNumber: number, title: string) => {
  const baseQuestions = [
    `${title} mavzusida asosiy tushunchalar`,
    `${title} da ishlatiladigan teglar`,
    `${title} ning sintaksisi`,
    `${title} da atributlar`,
    `${title} ning amaliy qo'llanilishi`,
    `${title} da xatoliklarni tuzatish`,
    `${title} ning afzalliklari`,
    `${title} da best practices`,
    `${title} ning boshqa teglar bilan bog'lanishi`,
    `${title} da accessibility qoidalari`
  ]
  
  return baseQuestions.map((question, index) => ({
    questionNumber: index + 1,
    question: question,
    type: 'multiple-choice',
    points: 5
  }))
}

// Amaliyot vazifasi generatori
const generatePracticalTask = (stepNumber: number, title: string) => {
  const practicalTasks = {
    1: "HTML hujjat yarating va asosiy strukturani ko'rsating",
    2: "To'liq HTML5 hujjat strukturasini yarating",
    3: "Turli darajadagi sarlavhalar va paragraflar yarating",
    4: "Matnni turli usullar bilan formatlang",
    5: "Internal va external havolalar yarating",
    6: "Birinchi to'liq HTML sahifangizni yarating",
    7: "Rasmlar bilan portfolio sahifasi yarating",
    8: "Nested listlar bilan menyu yarating",
    9: "Ma'lumotlar jadvali yarating",
    10: "To'liq form yarating"
  }
  
  return {
    title: `${title} - Amaliy vazifa`,
    description: practicalTasks[stepNumber] || `${title} bo'yicha amaliy vazifa`,
    type: 'practical',
    points: 50
  }
}

async function seedStructuredHtmlTasks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear existing HTML tasks
    await Task.deleteMany({ category: 'HTML' })
    console.log('🗑️ Eski HTML topshiriqlari o\'chirildi')

    const allTasks = []

    // Har bir qadam uchun vazifalar yaratish
    for (const step of htmlSteps) {
      // 1. Asosiy qadam vazifasi
      const mainTask = {
        title: `${step.stepNumber}-qadam: ${step.title}`,
        description: step.description,
        course: "Frontend Development",
        category: "HTML",
        stepNumber: step.stepNumber,
        icon: step.icon,
        difficulty: "beginner",
        status: step.status,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        points: 20,
        taskType: 'lesson'
      }
      allTasks.push(mainTask)

      // 2. Test savollari (10 ta)
      const testQuestions = generateTestQuestions(step.stepNumber, step.title)
      testQuestions.forEach((question, index) => {
        const testTask = {
          title: `${step.stepNumber}-qadam Test ${question.questionNumber}: ${question.question}`,
          description: `${step.title} mavzusi bo'yicha test savoli`,
          course: "Frontend Development",
          category: "HTML",
          stepNumber: step.stepNumber,
          icon: "📝",
          difficulty: "beginner",
          status: "pending",
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          points: question.points,
          taskType: 'test',
          parentStep: step.stepNumber,
          orderInStep: index + 1
        }
        allTasks.push(testTask)
      })

      // 3. Amaliy vazifa (1 ta)
      const practicalTask = generatePracticalTask(step.stepNumber, step.title)
      const practicalTaskObj = {
        title: `${step.stepNumber}-qadam Amaliyot: ${practicalTask.title}`,
        description: practicalTask.description,
        course: "Frontend Development",
        category: "HTML",
        stepNumber: step.stepNumber,
        icon: "💻",
        difficulty: "beginner",
        status: "pending",
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        points: practicalTask.points,
        taskType: 'practical',
        parentStep: step.stepNumber,
        orderInStep: 11
      }
      allTasks.push(practicalTaskObj)
    }

    // Insert all tasks
    const insertedTasks = await Task.insertMany(allTasks)
    console.log(`✅ ${insertedTasks.length} ta HTML vazifa qo'shildi`)

    // Show summary
    console.log('\n📊 Qo\'shilgan vazifalar xulosasi:')
    for (const step of htmlSteps) {
      const stepTasks = insertedTasks.filter(task => task.stepNumber === step.stepNumber)
      console.log(`${step.stepNumber}-qadam "${step.title}":`)
      console.log(`  - 1 ta asosiy dars`)
      console.log(`  - 10 ta test savoli`)
      console.log(`  - 1 ta amaliy vazifa`)
      console.log(`  - Jami: ${stepTasks.length} ta vazifa`)
    }

    console.log(`\n🎉 Jami ${insertedTasks.length} ta tuzilgan HTML vazifa qo'shildi!`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

seedStructuredHtmlTasks()