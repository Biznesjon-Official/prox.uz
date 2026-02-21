import mongoose from 'mongoose'
import Task from '../models/Task.js'
import dotenv from 'dotenv'

dotenv.config()

async function checkStep1Tasks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ga ulanildi')

    const step1Tasks = await Task.find({ stepNumber: 1 }).sort({ orderInStep: 1 })
    
    console.log('\n📋 1-qadam vazifalar:')
    console.log(`Jami: ${step1Tasks.length} ta vazifa`)
    
    step1Tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.taskType}: ${task.title} (order: ${task.orderInStep})`)
    })

    const lessonTasks = step1Tasks.filter(t => t.taskType === 'lesson')
    const testTasks = step1Tasks.filter(t => t.taskType === 'test')
    const practicalTasks = step1Tasks.filter(t => t.taskType === 'practical')

    console.log(`\n📊 Statistika:`)
    console.log(`- Darslar: ${lessonTasks.length}`)
    console.log(`- Testlar: ${testTasks.length}`)
    console.log(`- Amaliyotlar: ${practicalTasks.length}`)

  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('\n📤 MongoDB aloqasi uzildi')
  }
}

checkStep1Tasks()