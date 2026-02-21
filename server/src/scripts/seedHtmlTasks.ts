import mongoose from 'mongoose'
import Task from '../models/Task'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const htmlTasks = [
  {
    title: "HTML KIRISH",
    description: "HTML nima va u qanday ishlaydi. Web sahifalar yaratishning asoslari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "completed",
    stepNumber: 1,
    icon: "✅",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 10
  },
  {
    title: "HTML STRUKTURASI",
    description: "HTML hujjatining asosiy strukturasi: DOCTYPE, html, head, body teglari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "in-progress",
    stepNumber: 2,
    icon: "⚙️",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 15
  },
  {
    title: "<h1> va <p> teglari",
    description: "Sarlavhalar va paragraflar bilan ishlash. Matn tuzilishini yaratish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "in-progress",
    stepNumber: 3,
    icon: "⚙️",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 15
  },
  {
    title: "Matnni formatlash uchun taglar",
    description: "Bold, italic, underline va boshqa matn formatlash teglari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "in-progress",
    stepNumber: 4,
    icon: "⚙️",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 20
  },
  {
    title: "Giperlinklar bilan ishlash",
    description: "Anchor tegi va havolalar yaratish. Internal va external linklar.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "in-progress",
    stepNumber: 5,
    icon: "⚙️",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 20
  },
  {
    title: "O'tilgan mavzular orqali loyihani qilish",
    description: "Birinchi HTML loyiha yaratish. O'tilgan barcha mavzularni amalda qo'llash.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 6,
    icon: "❗️",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 50
  },
  {
    title: "Rasmlar bilan ishlash",
    description: "IMG tegi, rasmlarni qo'shish va sozlash. Alt atributi va accessibility.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 7,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Listlar bilan ishlash",
    description: "Ordered va unordered listlar. Nested listlar yaratish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 8,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Jadvallar bilan ishlash",
    description: "Table, tr, td, th teglari. Jadval strukturasini yaratish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 9,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Inputlar bilan ishlash",
    description: "Form elementlari: input, textarea, select. Asosiy input turlari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 10,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Inputlar bilan ishlash - 2-qism",
    description: "Qo'shimcha input turlari va form validatsiyasi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 11,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 35
  },
  {
    title: "HTML Semantik Elementlar",
    description: "Mavzu hali aniqlanmagan. Keyinroq qo'shiladi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 12,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Div va Span farqi",
    description: "Block va inline elementlar. Div va span teglarining farqi va qo'llanilishi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 13,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Semantic Markuplar",
    description: "Header, nav, main, section, article, aside, footer teglari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 14,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Iframe tag",
    description: "Boshqa web sahifalarni o'z sahifangizga joylashtirish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 15,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 20
  },
  {
    title: "Video va Audio taglari",
    description: "Multimedia kontentni web sahifaga qo'shish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 16,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Meta haqida",
    description: "Meta teglari va ularning SEO uchun ahamiyati.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 17,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "HTML Atributlar",
    description: "Mavzu hali aniqlanmagan. Keyinroq qo'shiladi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 18,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Formlar bilan ishlash",
    description: "Form tegi va uning atributlari. Form ma'lumotlarini yuborish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 19,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 35
  },
  {
    title: "Web sahifada manzillar bilan ishlash",
    description: "Relative va absolute URL'lar. File path'lar bilan ishlash.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 20,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Figure va Figcaption taglari",
    description: "Rasmlar va ularning izohlarini semantic tarzda joylashtirish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 21,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 20
  },
  {
    title: "Jadvallar bilan ishlash - Davomi",
    description: "Murakkab jadvallar, colspan, rowspan atributlari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 22,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 35
  },
  {
    title: "Formda Amaliyot",
    description: "To'liq ishlaydigan form yaratish. Amaliy mashq.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 23,
    icon: "🚀",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 50
  },
  {
    title: "HTML Validatsiya",
    description: "Mavzu hali aniqlanmagan. Keyinroq qo'shiladi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 24,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Input turlari",
    description: "Barcha input turlari: email, password, number, date va boshqalar.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 25,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Icon va sayt nomi bilan ishlash",
    description: "Favicon qo'shish va title tegini sozlash.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 26,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 20
  },
  {
    title: "Ranglar va Entities",
    description: "HTML ranglar va maxsus belgilar (entities) bilan ishlash.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 27,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Anchor tagi bilan amaliyot",
    description: "Havolalar bilan amaliy ishlash. Navigation yaratish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 28,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Time va Small taglari bilan ishlash",
    description: "Vaqt va kichik matnlar uchun semantic teglar.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 29,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 20
  },
  {
    title: "HTML Best Practices",
    description: "Mavzu hali aniqlanmagan. Keyinroq qo'shiladi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 30,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 25
  },
  {
    title: "Input type file bilan amaliyot",
    description: "Fayl yuklash input'i bilan ishlash.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 31,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 30
  },
  {
    title: "Amaliyot blog",
    description: "Blog sahifasi yaratish. HTML bilimlarini amalda qo'llash.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 32,
    icon: "🚀",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 60
  },
  {
    title: "Contact form amaliyot",
    description: "Aloqa formasi yaratish. Amaliy loyiha.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 33,
    icon: "🚀",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 50
  },
  {
    title: "Google map amaliyot",
    description: "Google Maps'ni web sahifaga joylashtirish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 34,
    icon: "🚀",
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    points: 35
  },
  {
    title: "Amaliyot",
    description: "Umumiy amaliy mashq. Barcha o'tilgan mavzularni birlashtirish.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 35,
    icon: "🚀",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    points: 100
  },
  {
    title: "Fikrlash darslari 1-9",
    description: "Mantiqiy fikrlash va muammolarni yechish darslari.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 36,
    icon: "🧠",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 40
  },
  {
    title: "Fikrlash darslari 10-17",
    description: "Mantiqiy fikrlash va muammolarni yechish darslari - davomi.",
    course: "Frontend Development",
    category: "HTML",
    difficulty: "beginner",
    status: "pending",
    stepNumber: 37,
    icon: "🧠",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 40
  }
]

async function seedHtmlTasks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ MongoDB ulandi')

    // Clear existing HTML tasks
    await Task.deleteMany({ category: 'HTML' })
    console.log('🗑️ Eski HTML topshiriqlari o\'chirildi')

    // Insert new HTML tasks
    const insertedTasks = await Task.insertMany(htmlTasks)
    console.log(`✅ ${insertedTasks.length} ta HTML topshiriq qo'shildi`)

    console.log('\n📋 Qo\'shilgan HTML topshiriqlari:')
    insertedTasks.forEach((task, index) => {
      console.log(`${task.stepNumber}. ${task.icon} ${task.title} - ${task.status}`)
    })

    console.log('\n🎉 HTML bo\'limi topshiriqlari muvaffaqiyatli qo\'shildi!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

seedHtmlTasks()