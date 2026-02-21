import mongoose from 'mongoose'
import { Task } from '../models/Task'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://CRM_group_12coder:HxFIrM4Ge66tde9Z@cluster1.viyjahc.mongodb.net/prox_crm?retryWrites=true&w=majority'

async function removeStepZero() {
  try {
    console.log('🔌 MongoDB ga ulanmoqda...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB ga muvaffaqiyatli ulandi')

    // 0-qadamli vazifalarni topish
    const stepZeroTasks = await Task.find({ stepNumber: 0 })
    console.log(`📊 Topilgan 0-qadam vazifalar: ${stepZeroTasks.length} ta`)

    if (stepZeroTasks.length > 0) {
      console.log('\n📋 0-qadam vazifalar:')
      stepZeroTasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.title} (${task.taskType})`)
      })

      // 0-qadamli vazifalarni o'chirish
      const deleteResult = await Task.deleteMany({ stepNumber: 0 })
      console.log(`\n🗑️ O'chirilgan vazifalar: ${deleteResult.deletedCount} ta`)
      console.log('✅ 0-qadam muvaffaqiyatli olib tashlandi!')
    } else {
      console.log('ℹ️ 0-qadam vazifalar topilmadi')
    }

  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 MongoDB aloqasi uzildi')
  }
}

// Scriptni ishga tushirish
removeStepZero()