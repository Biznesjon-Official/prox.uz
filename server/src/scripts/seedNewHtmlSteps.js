import mongoose from 'mongoose'
// Task modelini to'g'ridan-to'g'ri yaratamiz
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  stepNumber: {
    type: Number,
    min: 1
  },
  icon: {
    type: String,
    trim: true
  },
  taskType: {
    type: String,
    enum: ['lesson', 'test', 'practical'],
    default: 'lesson'
  },
  parentStep: {
    type: Number,
    min: 1
  },
  orderInStep: {
    type: Number,
    min: 1
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'in-progress', 'submitted', 'completed'],
    default: 'pending'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'beginner', 'intermediate', 'advanced'],
    default: 'medium'
  },
  points: {
    type: Number,
    min: 0,
    default: 50
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', TaskSchema)
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Yangi HTML qadamlari (6-15)
const newHtmlSteps = [
  {
    step: 6,
    title: "Amaliy loyiha",
    description: "O'tilgan HTML mavzular asosida oddiy web sahifa loyihasi qilish",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "💻"
  },
  {
    step: 7,
    title: "Rasmlar bilan ishlash",
    description: "Web sahifaga rasmlar joylash va img atributlari bilan ishlash",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "🖼️"
  },
  {
    step: 8,
    title: "Listlar bilan ishlash",
    description: "Tartibli va tartibsiz ro'yxatlar yaratish",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "📝"
  },
  {
    step: 9,
    title: "Jadvallar bilan ishlash",
    description: "HTML jadval tuzilmasi, qator va ustunlar bilan ishlash",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "📊"
  },
  {
    step: 10,
    title: "Inputlar bilan ishlash",
    description: "Input turlari orqali foydalanuvchidan ma'lumot olish",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "⌨️"
  },
  {
    step: 11,
    title: "Inputlar bilan ishlash (2-qism)",
    description: "Email, number, select, textarea va label bilan ishlash",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "📧"
  },
  {
    step: 12,
    title: "Formlar bilan ishlash",
    description: "Form tuzilmasi va inputlarni birlashtirib ishlatish",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "📋"
  },
  {
    step: 13,
    title: "Div va Span farqi",
    description: "Block va inline elementlar o'rtasidagi farqni o'rganish",
    course: "Frontend Development",
    category: "HTML",
    level: "beginner",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "📦"
  },
  {
    step: 14,
    title: "Semantic Markuplar",
    description: "Semantic HTML taglari yordamida to'g'ri sahifa tuzilmasi yaratish",
    course: "Frontend Development",
    category: "HTML",
    level: "intermediate",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "🏗️"
  },
  {
    step: 15,
    title: "Iframe tag",
    description: "Iframe orqali tashqi sahifa va videolarni joylashtirish",
    course: "Frontend Development",
    category: "HTML",
    level: "intermediate",
    score: 10,
    testCount: 10,
    practice: true,
    icon: "🖥️"
  }
]

// Test savollari generatori
const generateTestQuestions = (stepData) => {
  const { step, title } = stepData
  
  const testQuestions = [
    {
      question: `${title} mavzusida asosiy teg nima?`,
      options: [
        step === 6 ? "Barcha teglar" : step === 7 ? "img tegi" : step === 8 ? "ul/ol tegi" : step === 9 ? "table tegi" : step === 10 ? "input tegi" : step === 11 ? "label tegi" : step === 12 ? "form tegi" : step === 13 ? "div tegi" : step === 14 ? "semantic teglar" : "iframe tegi",
        "div tegi",
        "span tegi",
        "p tegi"
      ],
      correctAnswer: 0
    },
    {
      question: `${title} da qaysi atribut muhim?`,
      options: [
        "class",
        "id", 
        step === 7 ? "src va alt" : step === 10 || step === 11 ? "type" : step === 15 ? "src" : "name",
        "style"
      ],
      correctAnswer: 2
    },
    {
      question: `${title} ning to'g'ri sintaksisi qaysi?`,
      options: [
        "Noto'g'ri sintaksis",
        step === 7 ? "<img src='rasm.jpg' alt='tavsif'>" : step === 8 ? "<ul><li>element</li></ul>" : step === 9 ? "<table><tr><td>katak</td></tr></table>" : step === 10 ? "<input type='text'>" : step === 12 ? "<form><input></form>" : "To'g'ri sintaksis",
        "Aralash sintaksis",
        "Murakkab sintaksis"
      ],
      correctAnswer: 1
    },
    {
      question: `${title} da xatolik qilmaslik uchun nima qilish kerak?`,
      options: [
        "Teglarni yopish",
        "Atributlarni to'g'ri yozish",
        "Sintaksisni tekshirish",
        "Barchasi to'g'ri"
      ],
      correctAnswer: 3
    },
    {
      question: `${title} ning amaliy qo'llanilishi qayerda?`,
      options: [
        "Faqat test sahifalarda",
        "Haqiqiy web sahifalarda",
        "Faqat o'quv maqsadida",
        "Hech qayerda"
      ],
      correctAnswer: 1
    },
    {
      question: `${title} bilan bog'liq qaysi teg ham ishlatiladi?`,
      options: [
        step === 7 ? "figure" : step === 8 ? "li" : step === 9 ? "tr, td" : step === 11 ? "label" : step === 12 ? "input" : "div",
        "span",
        "p",
        "Mavzuga bog'liq"
      ],
      correctAnswer: 0
    },
    {
      question: `${title} da accessibility uchun nima muhim?`,
      options: [
        step === 7 ? "alt atributi" : step === 11 ? "label tegi" : "aria-label",
        "title atributi",
        "role atributi",
        "Barchasi muhim"
      ],
      correctAnswer: 3
    },
    {
      question: `${title} ning afzalligi nimada?`,
      options: [
        "Oson yoziladi",
        "Tez ishlaydi",
        "Ko'p imkoniyat beradi",
        "Barchasi to'g'ri"
      ],
      correctAnswer: 3
    },
    {
      question: `${title} da eng ko'p uchraydigan xatolik nima?`,
      options: [
        step === 7 ? "alt atributini yozmaslik" : step === 8 ? "li tegini yopmaslik" : step === 9 ? "tr ichida td yozmaslik" : "Tegni yopmaslik",
        "Atributni noto'g'ri yozish",
        "Sintaksis xatoligi",
        "Barchasi mumkin"
      ],
      correctAnswer: 0
    },
    {
      question: `${title} ni o'rganishdan keyin nimani o'rganish kerak?`,
      options: [
        "CSS",
        "JavaScript",
        step < 15 ? "Keyingi HTML mavzu" : "CSS kirish",
        "Loyiha qilish"
      ],
      correctAnswer: 2
    }
  ]

  return testQuestions
}

// Amaliy vazifa generatori
const generatePracticalTask = (stepData) => {
  const practicalTasks = {
    6: "O'tilgan barcha HTML teglarni ishlatib birinchi to'liq web sahifangizni yarating",
    7: "Rasmlar bilan portfolio sahifasi yarating. Kamida 3 ta rasm joylashtiring",
    8: "Nested listlar bilan sayt menyusi yarating",
    9: "O'quvchilar ro'yxati jadvali yarating",
    10: "Login forma yarating (username, password, button)",
    11: "To'liq ro'yxatdan o'tish formasi yarating (email, number, select, textarea)",
    12: "Aloqa formasi yarating va barcha input turlarini ishlating",
    13: "Div va span ishlatib sahifa layoutini yarating",
    14: "Semantic teglar bilan blog sahifasi yarating",
    15: "YouTube video va Google Maps ni iframe bilan joylashtiring"
  }
  
  return {
    title: `${stepData.title} - Amaliy vazifa`,
    description: practicalTasks[stepData.step] || `${stepData.title} bo'yicha amaliy vazifa`,
    type: 'practical',
    points: 50
  }
}

// Dars mazmuni generatori
const generateLessonContent = (stepData) => {
  const lessonContents = {
    6: {
      instruction: "O'tilgan barcha HTML mavzularni ishlatib oddiy web sahifa yarating",
      hint: "DOCTYPE, html, head, body, h1-h6, p, a, strong, em teglarini ishlating",
      example: `<!DOCTYPE html>
<html>
<head>
  <title>Mening birinchi sahifam</title>
</head>
<body>
  <h1>Salom Dunyo!</h1>
  <p>Bu mening <strong>birinchi</strong> web sahifam.</p>
  <a href="https://example.com">Havola</a>
</body>
</html>`
    },
    7: {
      instruction: "IMG tegi yordamida rasmlarni web sahifaga joylashtiring",
      hint: "img, src, alt, width, height atributlarini ishlating",
      example: `<img src="rasm.jpg" alt="Tavsif" width="300" height="200">`
    },
    8: {
      instruction: "UL, OL va LI teglarini ishlatib ro'yxatlar yarating",
      hint: "ul (tartibsiz), ol (tartibli), li (element) teglarini ishlating",
      example: `<ul>
  <li>Birinchi element</li>
  <li>Ikkinchi element</li>
</ul>`
    },
    9: {
      instruction: "TABLE, TR, TD, TH teglarini ishlatib jadval yarating",
      hint: "table, tr (qator), td (katak), th (sarlavha) teglarini ishlating",
      example: `<table>
  <tr>
    <th>Ism</th>
    <th>Yosh</th>
  </tr>
  <tr>
    <td>Ali</td>
    <td>25</td>
  </tr>
</table>`
    },
    10: {
      instruction: "Turli xil INPUT teglarini ishlatib forma elementlari yarating",
      hint: "input type='text', type='password', type='button' ishlatish",
      example: `<input type="text" placeholder="Ismingizni kiriting">
<input type="password" placeholder="Parol">
<input type="button" value="Bosish">`
    },
    11: {
      instruction: "Email, number, select, textarea va label teglarini ishlating",
      hint: "input type='email', type='number', select, textarea, label teglarini ishlating",
      example: `<label for="email">Email:</label>
<input type="email" id="email">
<select>
  <option>Tanlang</option>
</select>
<textarea placeholder="Xabar"></textarea>`
    },
    12: {
      instruction: "FORM tegi ichida turli inputlarni birlashtirib to'liq forma yarating",
      hint: "form, input, label, button teglarini birgalikda ishlating",
      example: `<form>
  <label>Ism: <input type="text" name="name"></label>
  <label>Email: <input type="email" name="email"></label>
  <button type="submit">Yuborish</button>
</form>`
    },
    13: {
      instruction: "DIV (block) va SPAN (inline) elementlarning farqini ko'rsating",
      hint: "div - block element, span - inline element",
      example: `<div>Bu block element</div>
<span>Bu inline element</span> <span>Bu ham inline</span>`
    },
    14: {
      instruction: "Header, nav, main, section, article, footer teglarini ishlating",
      hint: "header, nav, main, section, article, aside, footer semantic teglarini ishlating",
      example: `<header>
  <nav>Menyu</nav>
</header>
<main>
  <section>
    <article>Maqola</article>
  </section>
</main>
<footer>Footer</footer>`
    },
    15: {
      instruction: "IFRAME tegi orqali tashqi sahifa yoki videolarni joylashtiring",
      hint: "iframe, src, width, height atributlarini ishlating",
      example: `<iframe src="https://example.com" width="600" height="400"></iframe>`
    }
  }
  
  return lessonContents[stepData.step] || {
    instruction: `${stepData.title} mavzusini o'rganing`,
    hint: "HTML teglarini to'g'ri ishlating",
    example: "<div>Misol</div>"
  }
}

async function seedNewHtmlSteps() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB ulandi')

    // Clear existing tasks for steps 6-15
    await Task.deleteMany({ 
      category: 'HTML', 
      stepNumber: { $gte: 6, $lte: 15 } 
    })
    console.log('🗑️ 6-15 qadamlar uchun eski vazifalar o\'chirildi')

    const allTasks = []

    // Har bir qadam uchun vazifalar yaratish
    for (const stepData of newHtmlSteps) {
      console.log(`📝 ${stepData.step}-qadam yaratilmoqda: ${stepData.title}`)

      // 1. Asosiy dars vazifasi (lesson)
      const lessonContent = generateLessonContent(stepData)
      const mainTask = {
        title: `${stepData.step}-qadam: ${stepData.title}`,
        description: stepData.description,
        course: stepData.course,
        category: stepData.category,
        stepNumber: stepData.step,
        icon: stepData.icon,
        difficulty: stepData.level,
        status: 'pending',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        points: stepData.score,
        taskType: 'lesson',
        orderInStep: 1,
        content: lessonContent
      }
      allTasks.push(mainTask)

      // 2. Test savollari
      const testQuestions = generateTestQuestions(stepData)
      testQuestions.forEach((question, index) => {
        const testTask = {
          title: `${stepData.step}-qadam Test ${index + 1}`,
          description: `${stepData.title} mavzusi bo'yicha test savoli`,
          course: stepData.course,
          category: stepData.category,
          stepNumber: stepData.step,
          icon: "📝",
          difficulty: stepData.level,
          status: "pending",
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          points: 5,
          taskType: 'test',
          parentStep: stepData.step,
          orderInStep: index + 2,
          content: {
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer
          }
        }
        allTasks.push(testTask)
      })

      // 3. Amaliy vazifa (agar kerak bo'lsa)
      if (stepData.practice) {
        const practicalTask = generatePracticalTask(stepData)
        const practicalTaskObj = {
          title: `${stepData.step}-qadam Amaliyot: ${practicalTask.title}`,
          description: practicalTask.description,
          course: stepData.course,
          category: stepData.category,
          stepNumber: stepData.step,
          icon: "💻",
          difficulty: stepData.level,
          status: "pending",
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          points: practicalTask.points,
          taskType: 'practical',
          parentStep: stepData.step,
          orderInStep: 12
        }
        allTasks.push(practicalTaskObj)
      }
    }

    // Insert all tasks
    const insertedTasks = await Task.insertMany(allTasks)
    console.log(`✅ ${insertedTasks.length} ta HTML vazifa qo'shildi`)

    // Show summary
    console.log('\n📊 Qo\'shilgan vazifalar xulosasi:')
    for (const stepData of newHtmlSteps) {
      const stepTasks = insertedTasks.filter(task => task.stepNumber === stepData.step)
      console.log(`${stepData.step}-qadam "${stepData.title}":`)
      console.log(`  - 1 ta asosiy dars (${stepData.score} ball)`)
      console.log(`  - ${stepData.testCount} ta test savoli (har biri 5 ball)`)
      if (stepData.practice) {
        console.log(`  - 1 ta amaliy vazifa (50 ball)`)
      }
      console.log(`  - Jami: ${stepTasks.length} ta vazifa`)
      console.log(`  - Jami ball: ${stepData.score + (stepData.testCount * 5) + (stepData.practice ? 50 : 0)}`)
    }

    const totalTasks = insertedTasks.length
    const totalPoints = newHtmlSteps.reduce((sum, step) => 
      sum + step.score + (step.testCount * 5) + (step.practice ? 50 : 0), 0
    )

    console.log(`\n🎉 Jami ${totalTasks} ta tuzilgan HTML vazifa qo'shildi!`)
    console.log(`💰 Jami ball: ${totalPoints}`)
    console.log(`📚 Qadamlar: 6-15 (10 ta qadam)`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Xatolik:', error)
    process.exit(1)
  }
}

// Script ishga tushirish
seedNewHtmlSteps()