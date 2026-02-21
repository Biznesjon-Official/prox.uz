import mongoose from 'mongoose'
import Task from '../models/Task.js'
import dotenv from 'dotenv'

dotenv.config()

// Har bir qadam uchun lesson va practical tasklar
const lessonAndPracticalTasks = {
  step1: [
    {
      title: "HTML Asoslari - Dars",
      description: "HTML ning asosiy tuzilishi va elementlari haqida o'rganing",
      course: "HTML/CSS Asoslari",
      taskType: "lesson",
      stepNumber: 1,
      orderInStep: 1,
      points: 50,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        instructions: "HTML hujjatining asosiy strukturasini yarating. DOCTYPE, html, head, title va body elementlarini ishlatib oddiy veb sahifa yarating.",
        example: `<!DOCTYPE html>
<html>
<head>
    <title>Mening birinchi sahifam</title>
</head>
<body>
    <h1>Salom Dunyo!</h1>
    <p>Bu mening birinchi HTML sahifam.</p>
</body>
</html>`
      }
    },
    {
      title: "HTML Asoslari - Amaliyot",
      description: "HTML asoslarini amalda qo'llash",
      course: "HTML/CSS Asoslari",
      taskType: "practical",
      stepNumber: 1,
      orderInStep: 12,
      points: 30,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        task: "O'zingiz haqingizda oddiy HTML sahifa yarating. Sahifada ismingiz, yoshingiz va qiziqishlaringiz haqida ma'lumot bo'lsin.",
        requirements: [
          "DOCTYPE deklaratsiyasini qo'shing",
          "title elementida sahifa nomini yozing",
          "h1 tegida ismingizni yozing",
          "p tegida o'zingiz haqida ma'lumot bering",
          "Kamida 3 ta paragraf bo'lsin"
        ]
      }
    }
  ],

  step2: [
    {
      title: "Matn Formatlash - Dars",
      description: "HTML da matnni formatlash usullari",
      course: "HTML/CSS Asoslari",
      taskType: "lesson",
      stepNumber: 2,
      orderInStep: 1,
      points: 50,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        instructions: "Turli xil sarlavha teglari, paragraflar va matn formatlash elementlarini ishlatib sahifa yarating.",
        example: `<h1>Asosiy sarlavha</h1>
<h2>Ikkinchi darajali sarlavha</h2>
<p>Bu oddiy paragraf. <strong>Bu qalin matn</strong> va <em>bu kursiv matn</em>.</p>
<p>Bu yangi paragraf. <u>Bu ostiga chizilgan matn</u>.</p>
<hr>
<p>Gorizontal chiziqdan keyingi matn.</p>`
      }
    },
    {
      title: "Matn Formatlash - Amaliyot",
      description: "Matn formatlash elementlarini amalda qo'llash",
      course: "HTML/CSS Asoslari",
      taskType: "practical",
      stepNumber: 2,
      orderInStep: 12,
      points: 30,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        task: "Sevimli kitabingiz haqida maqola yozing. Turli xil matn formatlash elementlarini ishlating.",
        requirements: [
          "h1 tegida kitob nomini yozing",
          "h2 tegida muallif nomini yozing",
          "Kamida 3 ta paragraf yozing",
          "Ba'zi so'zlarni qalin (strong) qiling",
          "Ba'zi so'zlarni kursiv (em) qiling",
          "Gorizontal chiziq (hr) qo'shing"
        ]
      }
    }
  ],

  step3: [
    {
      title: "Havolalar va Rasmlar - Dars",
      description: "HTML da havolalar va rasmlar bilan ishlash",
      course: "HTML/CSS Asoslari",
      taskType: "lesson",
      stepNumber: 3,
      orderInStep: 1,
      points: 50,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        instructions: "Havolalar, rasmlar va ro'yxatlar yaratishni o'rganing.",
        example: `<h1>Mening sevimli saytlarim</h1>
<ul>
    <li><a href="https://www.google.com" target="_blank">Google</a></li>
    <li><a href="https://www.youtube.com">YouTube</a></li>
</ul>

<h2>Rasm namunasi</h2>
<img src="rasm.jpg" alt="Tavsif" width="300" height="200">

<ol>
    <li>Birinchi element</li>
    <li>Ikkinchi element</li>
    <li>Uchinchi element</li>
</ol>`
      }
    },
    {
      title: "Havolalar va Rasmlar - Amaliyot",
      description: "Havolalar va rasmlarni amalda qo'llash",
      course: "HTML/CSS Asoslari",
      taskType: "practical",
      stepNumber: 3,
      orderInStep: 12,
      points: 30,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        task: "Sevimli veb-saytlaringiz ro'yxatini yarating va har birini tavsif qiling.",
        requirements: [
          "Kamida 5 ta veb-sayt havolasini qo'shing",
          "Har bir havola yangi oynada ochilsin",
          "Tartibli ro'yxat (ol) ishlating",
          "Har bir sayt haqida qisqa tavsif yozing",
          "Agar mumkin bo'lsa, bitta rasm qo'shing"
        ]
      }
    }
  ],

  step4: [
    {
      title: "Jadvallar va Formalar - Dars",
      description: "HTML da jadvallar va formalar yaratish",
      course: "HTML/CSS Asoslari",
      taskType: "lesson",
      stepNumber: 4,
      orderInStep: 1,
      points: 50,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        instructions: "Jadvallar va formalar yaratishni o'rganing.",
        example: `<h2>Talabalar jadvali</h2>
<table border="1">
    <tr>
        <th>Ism</th>
        <th>Yosh</th>
        <th>Sinf</th>
    </tr>
    <tr>
        <td>Ali</td>
        <td>20</td>
        <td>10-A</td>
    </tr>
</table>

<h2>Ro'yxatga olish formasi</h2>
<form>
    <label>Ism: <input type="text" name="name"></label><br>
    <label>Email: <input type="email" name="email"></label><br>
    <label>Parol: <input type="password" name="password"></label><br>
    <input type="submit" value="Yuborish">
</form>`
      }
    },
    {
      title: "Jadvallar va Formalar - Amaliyot",
      description: "Jadvallar va formalarni amalda qo'llash",
      course: "HTML/CSS Asoslari",
      taskType: "practical",
      stepNumber: 4,
      orderInStep: 12,
      points: 30,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        task: "O'quvchilar haqida jadval va ro'yxatga olish formasi yarating.",
        requirements: [
          "Kamida 3 ustun va 4 qatorli jadval yarating",
          "Jadval sarlavhalarini (th) ishlating",
          "Forma yarating: ism, familiya, email, telefon maydonlari",
          "Parol maydoni qo'shing",
          "Yuborish tugmasini qo'shing"
        ]
      }
    }
  ],

  step5: [
    {
      title: "Semantik HTML - Dars",
      description: "HTML5 semantik elementlari",
      course: "HTML/CSS Asoslari",
      taskType: "lesson",
      stepNumber: 5,
      orderInStep: 1,
      points: 50,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        instructions: "HTML5 semantik elementlarini ishlatib sahifa strukturasini yarating.",
        example: `<header>
    <h1>Sayt sarlavhasi</h1>
    <nav>
        <ul>
            <li><a href="#home">Bosh sahifa</a></li>
            <li><a href="#about">Biz haqimizda</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>Maqola sarlavhasi</h2>
        <p>Maqola matni...</p>
    </article>
</main>

<footer>
    <p>&copy; 2024 Mening saytim</p>
</footer>`
      }
    },
    {
      title: "Semantik HTML - Amaliyot",
      description: "Semantik elementlarni amalda qo'llash",
      course: "HTML/CSS Asoslari",
      taskType: "practical",
      stepNumber: 5,
      orderInStep: 12,
      points: 30,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        task: "To'liq veb-sahifa yarating, barcha semantik elementlarni ishlating.",
        requirements: [
          "header elementi bilan sahifa sarlavhasi",
          "nav elementi bilan navigatsiya menyusi",
          "main elementi bilan asosiy kontent",
          "article elementi bilan maqola",
          "footer elementi bilan sahifa pastki qismi",
          "Kamida 3 ta sahifa bo'limi bo'lsin"
        ]
      }
    }
  ]
}

async function seedLessonAndPracticalTasks() {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ga ulanildi')

    // Eski lesson va practical tasklarni o'chirish
    await Task.deleteMany({ 
      taskType: { $in: ['lesson', 'practical'] }
    })
    console.log('🗑️ Eski lesson va practical tasklar o\'chirildi')

    let totalTasks = 0

    // Har bir qadam uchun tasklarni qo'shish
    for (const [stepKey, tasks] of Object.entries(lessonAndPracticalTasks)) {
      const stepNumber = parseInt(stepKey.replace('step', ''))
      console.log(`\n📚 ${stepNumber}-qadam lesson va practical tasklarini qo'shish...`)
      
      const createdTasks = await Task.insertMany(tasks)
      totalTasks += createdTasks.length
      
      console.log(`✅ ${createdTasks.length} ta task qo'shildi`)
      createdTasks.forEach((task, index) => {
        console.log(`  ${index + 1}. ${task.title} (${task.taskType}) - ${task.points} ball`)
      })
    }

    console.log(`\n🎉 Jami ${totalTasks} ta lesson va practical task qo'shildi!`)
    console.log('📊 Har bir qadam uchun 1 ta lesson va 1 ta practical task mavjud')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('📤 MongoDB aloqasi uzildi')
  }
}

// Script ni ishga tushirish
seedLessonAndPracticalTasks()