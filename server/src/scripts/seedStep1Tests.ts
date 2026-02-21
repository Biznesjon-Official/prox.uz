import mongoose from 'mongoose'
import Task from '../models/Task.js'
import dotenv from 'dotenv'

dotenv.config()

const step1Tests = [
  {
    title: "HTML Asoslari - Test 1",
    description: "HTML nima va u nima uchun ishlatiladi?",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 2,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 kun
    content: {
      question: "HTML ning to'liq nomi nima?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language", 
        "Home Tool Markup Language",
        "Hyperlink and Text Markup Language"
      ],
      correctAnswer: 0
    }
  },
  {
    title: "HTML Struktura - Test 2", 
    description: "HTML hujjatining asosiy strukturasi haqida",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 3,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "HTML hujjatining eng yuqori darajadagi elementi qaysi?",
      options: [
        "<body>",
        "<head>",
        "<html>",
        "<title>"
      ],
      correctAnswer: 2
    }
  },
  {
    title: "DOCTYPE - Test 3",
    description: "DOCTYPE deklaratsiyasi haqida",
    course: "HTML/CSS Asoslari",
    taskType: "test", 
    stepNumber: 1,
    orderInStep: 4,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "HTML5 uchun to'g'ri DOCTYPE deklaratsiyasi qaysi?",
      options: [
        "<!DOCTYPE HTML PUBLIC>",
        "<!DOCTYPE html>",
        "<!DOCTYPE HTML5>",
        "<!DOCTYPE>"
      ],
      correctAnswer: 1
    }
  },
  {
    title: "HEAD elementi - Test 4",
    description: "HEAD elementi va uning vazifasi",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 5,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "<head> elementi ichida qaysi ma'lumotlar joylashadi?",
      options: [
        "Faqat sahifa sarlavhasi",
        "Meta ma'lumotlar va sahifa sarlavhasi",
        "Sahifaning ko'rinadigan qismi",
        "Faqat CSS ulanishlari"
      ],
      correctAnswer: 1
    }
  },
  {
    title: "TITLE elementi - Test 5",
    description: "TITLE elementining ahamiyati",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 6,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "<title> elementi qayerda ko'rinadi?",
      options: [
        "Sahifaning yuqori qismida",
        "Brauzer tabida",
        "Sahifaning pastki qismida",
        "Sahifa o'rtasida"
      ],
      correctAnswer: 1
    }
  },
  {
    title: "BODY elementi - Test 6",
    description: "BODY elementi va uning roli",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 7,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "<body> elementi nima uchun ishlatiladi?",
      options: [
        "Meta ma'lumotlar uchun",
        "Sahifaning ko'rinadigan qismi uchun",
        "CSS kodlari uchun",
        "JavaScript kodlari uchun"
      ],
      correctAnswer: 1
    }
  },
  {
    title: "HTML Teglar - Test 7",
    description: "HTML teglarining yozilishi",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 8,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "HTML teglar qanday yoziladi?",
      options: [
        "(tagname)",
        "[tagname]",
        "<tagname>",
        "{tagname}"
      ],
      correctAnswer: 2
    }
  },
  {
    title: "Yopuvchi Teglar - Test 8",
    description: "HTML teglarni yopish qoidalari",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 9,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "HTML tegni qanday yopish kerak?",
      options: [
        "<tagname\\>",
        "</tagname>",
        "<\\tagname>",
        "<tagname/>"
      ],
      correctAnswer: 1
    }
  },
  {
    title: "HTML Atributlar - Test 9",
    description: "HTML atributlari haqida",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 10,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "HTML atributlari qayerda yoziladi?",
      options: [
        "Yopuvchi tegda",
        "Ochuvchi tegda",
        "Teg tashqarisida",
        "Alohida qatorda"
      ],
      correctAnswer: 1
    }
  },
  {
    title: "HTML Sintaksis - Test 10",
    description: "HTML sintaksisining to'g'riligi",
    course: "HTML/CSS Asoslari",
    taskType: "test",
    stepNumber: 1,
    orderInStep: 11,
    points: 10,
    difficulty: "beginner",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    content: {
      question: "Quyidagilardan qaysi biri to'g'ri HTML sintaksisi?",
      options: [
        "<h1>Sarlavha<h1>",
        "<h1>Sarlavha</h1>",
        "<h1 Sarlavha />",
        "h1>Sarlavha</h1>"
      ],
      correctAnswer: 1
    }
  }
]

async function seedStep1Tests() {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ga ulanildi')

    // 1-qadam testlarini o'chirish
    await Task.deleteMany({ 
      stepNumber: 1, 
      taskType: 'test' 
    })
    console.log('🗑️ Eski 1-qadam testlari o\'chirildi')

    // Yangi testlarni qo'shish
    const createdTests = await Task.insertMany(step1Tests)
    console.log(`✅ ${createdTests.length} ta test qo'shildi`)

    // Har bir test haqida ma'lumot
    createdTests.forEach((test, index) => {
      console.log(`${index + 1}. ${test.title} - ${test.points} ball`)
    })

    console.log('\n🎉 1-qadam testlari muvaffaqiyatli qo\'shildi!')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('📤 MongoDB aloqasi uzildi')
  }
}

// Script ni ishga tushirish
seedStep1Tests()