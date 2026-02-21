import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Task modelini yaratamiz
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: String,
  category: String,
  stepNumber: Number,
  icon: String,
  taskType: String,
  parentStep: Number,
  orderInStep: Number,
  deadline: Date,
  status: String,
  difficulty: String,
  points: Number,
  content: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
})

const Task = mongoose.model('Task', TaskSchema)

async function checkNewSteps() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB ulandi')

    // 6-15 qadamlar uchun vazifalarni tekshirish
    const steps = await Task.find({ 
      category: 'HTML', 
      stepNumber: { $gte: 6, $lte: 15 } 
    }).sort({ stepNumber: 1, orderInStep: 1 })

    console.log(`\n📊 Jami topilgan vazifalar: ${steps.length}`)

    // Qadamlar bo'yicha guruhlash
    const stepGroups = {}
    steps.forEach(task => {
      const stepNum = task.stepNumber
      if (!stepGroups[stepNum]) {
        stepGroups[stepNum] = []
      }
      stepGroups[stepNum].push(task)
    })

    // Har bir qadamni ko'rsatish
    for (let stepNum = 6; stepNum <= 15; stepNum++) {
      const stepTasks = stepGroups[stepNum] || []
      console.log(`\n${stepNum}-qadam:`)
      
      if (stepTasks.length === 0) {
        console.log('  ❌ Vazifalar topilmadi')
        continue
      }

      const lesson = stepTasks.find(t => t.taskType === 'lesson')
      const tests = stepTasks.filter(t => t.taskType === 'test')
      const practical = stepTasks.find(t => t.taskType === 'practical')

      console.log(`  📚 Dars: ${lesson ? '✅' : '❌'} ${lesson ? lesson.title : 'Topilmadi'}`)
      console.log(`  📝 Testlar: ${tests.length}/10 ta`)
      console.log(`  💻 Amaliyot: ${practical ? '✅' : '❌'} ${practical ? practical.title : 'Topilmadi'}`)
      console.log(`  🎯 Jami vazifalar: ${stepTasks.length}`)
      
      const totalPoints = stepTasks.reduce((sum, task) => sum + (task.points || 0), 0)
      console.log(`  💰 Jami ball: ${totalPoints}`)
    }

    // Umumiy statistika
    const totalTasks = steps.length
    const totalPoints = steps.reduce((sum, task) => sum + (task.points || 0), 0)
    const lessonCount = steps.filter(t => t.taskType === 'lesson').length
    const testCount = steps.filter(t => t.taskType === 'test').length
    const practicalCount = steps.filter(t => t.taskType === 'practical').length

    console.log(`\n📈 UMUMIY STATISTIKA:`)
    console.log(`  📚 Darslar: ${lessonCount} ta`)
    console.log(`  📝 Testlar: ${testCount} ta`)
    console.log(`  💻 Amaliyotlar: ${practicalCount} ta`)
    console.log(`  🎯 Jami vazifalar: ${totalTasks} ta`)
    console.log(`  💰 Jami ball: ${totalPoints}`)
    console.log(`  📊 Qadamlar: 6-15 (10 ta qadam)`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

checkNewSteps()