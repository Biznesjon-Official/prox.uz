import mongoose from 'mongoose'
import Task from '../models/Task.js'
import dotenv from 'dotenv'

dotenv.config()

// HTML mavzulari bo'yicha har bir qadam uchun 10 ta test
const comprehensiveTests = {
  step1: [
    {
      title: "HTML Asoslari - Test 1",
      description: "HTML ning asosiy tushunchasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 1,
      orderInStep: 2,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "HTML ning to'liq nomi nima?",
        options: [
          "A) Hyper Text Markup Language",
          "B) High Tech Modern Language", 
          "C) Home Tool Markup Language",
          "D) Hyperlink and Text Markup Language"
        ],
        correctAnswer: 0
      }
    },
    {
      title: "HTML Struktura - Test 2", 
      description: "HTML hujjatining asosiy strukturasi",
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
      description: "DOCTYPE deklaratsiyasi",
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
  ],
  
  step2: [
    {
      title: "Sarlavha Teglari - Test 1",
      description: "HTML sarlavha teglari haqida",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 2,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Eng katta sarlavha uchun qaysi teg ishlatiladi?",
        options: [
          "<h6>",
          "<h3>",
          "<h1>",
          "<header>"
        ],
        correctAnswer: 2
      }
    },
    {
      title: "Paragraf Teglari - Test 2",
      description: "HTML paragraf elementi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 3,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Paragraf yaratish uchun qaysi teg ishlatiladi?",
        options: [
          "<paragraph>",
          "<p>",
          "<para>",
          "<text>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Qator Uzilishi - Test 3",
      description: "HTML da qator uzilishi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 4,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Qator uzilishi uchun qaysi teg ishlatiladi?",
        options: [
          "<break>",
          "<br>",
          "<line>",
          "<newline>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Gorizontal Chiziq - Test 4",
      description: "HTML da gorizontal chiziq",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 5,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Gorizontal chiziq uchun qaysi teg ishlatiladi?",
        options: [
          "<line>",
          "<hr>",
          "<horizontal>",
          "<rule>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Matn Formatlash - Test 5",
      description: "HTML da matn formatlash",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 6,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matnni qalin qilish uchun qaysi teg ishlatiladi?",
        options: [
          "<bold>",
          "<b>",
          "<strong>",
          "B va C to'g'ri"
        ],
        correctAnswer: 3
      }
    },
    {
      title: "Kursiv Matn - Test 6",
      description: "HTML da kursiv matn",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 7,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matnni kursiv qilish uchun qaysi teg ishlatiladi?",
        options: [
          "<italic>",
          "<i>",
          "<em>",
          "B va C to'g'ri"
        ],
        correctAnswer: 3
      }
    },
    {
      title: "Chizilgan Matn - Test 7",
      description: "HTML da chizilgan matn",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 8,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matnni chizib tashlash uchun qaysi teg ishlatiladi?",
        options: [
          "<strike>",
          "<del>",
          "<s>",
          "Hammasi to'g'ri"
        ],
        correctAnswer: 3
      }
    },
    {
      title: "Ostiga Chizilgan Matn - Test 8",
      description: "HTML da ostiga chizilgan matn",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 9,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matn ostiga chiziq chizish uchun qaysi teg ishlatiladi?",
        options: [
          "<underline>",
          "<u>",
          "<under>",
          "<line-under>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Kichik Matn - Test 9",
      description: "HTML da kichik matn",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 10,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matnni kichik qilish uchun qaysi teg ishlatiladi?",
        options: [
          "<small>",
          "<mini>",
          "<tiny>",
          "<little>"
        ],
        correctAnswer: 0
      }
    },
    {
      title: "Katta Matn - Test 10",
      description: "HTML da katta matn",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 2,
      orderInStep: 11,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matnni katta qilish uchun qaysi teg ishlatiladi?",
        options: [
          "<big>",
          "<large>",
          "<huge>",
          "CSS ishlatish kerak"
        ],
        correctAnswer: 3
      }
    }
  ],

  step3: [
    {
      title: "Havolalar - Test 1",
      description: "HTML da havolalar yaratish",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 2,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Havola yaratish uchun qaysi teg ishlatiladi?",
        options: [
          "<link>",
          "<a>",
          "<href>",
          "<url>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Havola Atributi - Test 2",
      description: "Havola atributlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 3,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Havola manzilini belgilash uchun qaysi atribut ishlatiladi?",
        options: [
          "src",
          "href",
          "link",
          "url"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Yangi Oynada Ochish - Test 3",
      description: "Havolani yangi oynada ochish",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 4,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Havolani yangi oynada ochish uchun qaysi atribut ishlatiladi?",
        options: [
          "target=\"_new\"",
          "target=\"_blank\"",
          "window=\"new\"",
          "open=\"new\""
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Rasmlar - Test 4",
      description: "HTML da rasmlar",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 5,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Rasm qo'yish uchun qaysi teg ishlatiladi?",
        options: [
          "<image>",
          "<img>",
          "<picture>",
          "<photo>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Rasm Manzili - Test 5",
      description: "Rasm manzilini belgilash",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 6,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Rasm manzilini belgilash uchun qaysi atribut ishlatiladi?",
        options: [
          "href",
          "src",
          "url",
          "path"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Alt Atributi - Test 6",
      description: "Rasm uchun alt atributi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 7,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Alt atributi nima uchun ishlatiladi?",
        options: [
          "Rasm o'lchamini belgilash uchun",
          "Rasm yuklanmasa, matn ko'rsatish uchun",
          "Rasm rangini belgilash uchun",
          "Rasm formatini belgilash uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Ro'yxatlar - Test 7",
      description: "HTML da ro'yxatlar",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 8,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Tartibsiz ro'yxat uchun qaysi teg ishlatiladi?",
        options: [
          "<ol>",
          "<ul>",
          "<list>",
          "<items>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Tartibli Ro'yxat - Test 8",
      description: "Tartibli ro'yxatlar",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 9,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Tartibli ro'yxat uchun qaysi teg ishlatiladi?",
        options: [
          "<ul>",
          "<ol>",
          "<ordered>",
          "<numbered>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Ro'yxat Elementi - Test 9",
      description: "Ro'yxat elementlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 10,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Ro'yxat elementi uchun qaysi teg ishlatiladi?",
        options: [
          "<item>",
          "<li>",
          "<element>",
          "<point>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Ichma-ich Ro'yxatlar - Test 10",
      description: "Ichma-ich ro'yxatlar yaratish",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 3,
      orderInStep: 11,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Ichma-ich ro'yxat yaratish uchun nima qilish kerak?",
        options: [
          "Yangi <ul> tegni <li> ichiga qo'yish",
          "Maxsus atribut ishlatish",
          "CSS ishlatish",
          "JavaScript ishlatish"
        ],
        correctAnswer: 0
      }
    }
  ],

  step4: [
    {
      title: "Jadvallar - Test 1",
      description: "HTML da jadvallar yaratish",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 2,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Jadval yaratish uchun qaysi teg ishlatiladi?",
        options: [
          "A) <table>",
          "B) <tab>",
          "C) <grid>",
          "D) <data>"
        ],
        correctAnswer: 0
      }
    },
    {
      title: "Jadval Qatori - Test 2",
      description: "Jadval qatorlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 3,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Jadval qatori uchun qaysi teg ishlatiladi?",
        options: [
          "A) <row>",
          "B) <tr>",
          "C) <table-row>",
          "D) <trow>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Jadval Katagi - Test 3",
      description: "Jadval kataklari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 4,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Jadval katagi uchun qaysi teg ishlatiladi?",
        options: [
          "A) <cell>",
          "B) <td>",
          "C) <data>",
          "D) <column>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Jadval Sarlavhasi - Test 4",
      description: "Jadval sarlavha kataklari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 5,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Jadval sarlavha katagi uchun qaysi teg ishlatiladi?",
        options: [
          "A) <header>",
          "B) <th>",
          "C) <title>",
          "D) <head>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Formalar - Test 5",
      description: "HTML formalar",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 6,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Forma yaratish uchun qaysi teg ishlatiladi?",
        options: [
          "A) <input>",
          "B) <form>",
          "C) <field>",
          "D) <data>"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Matn Kiritish - Test 6",
      description: "Matn kiritish maydonlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 7,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Matn kiritish uchun qaysi input turi ishlatiladi?",
        options: [
          "A) type=\"string\"",
          "B) type=\"text\"",
          "C) type=\"input\"",
          "D) type=\"field\""
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Parol Kiritish - Test 7",
      description: "Parol kiritish maydonlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 8,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Parol kiritish uchun qaysi input turi ishlatiladi?",
        options: [
          "A) type=\"hidden\"",
          "B) type=\"password\"",
          "C) type=\"secret\"",
          "D) type=\"secure\""
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Tugmalar - Test 8",
      description: "HTML tugmalari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 9,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Tugma yaratish uchun qaysi teg ishlatiladi?",
        options: [
          "A) <input type=\"button\">",
          "B) <button>",
          "C) Ikkalasi ham to'g'ri",
          "D) Hech biri to'g'ri emas"
        ],
        correctAnswer: 2
      }
    },
    {
      title: "Checkbox - Test 9",
      description: "Checkbox elementlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 10,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Checkbox yaratish uchun qaysi input turi ishlatiladi?",
        options: [
          "A) type=\"check\"",
          "B) type=\"checkbox\"",
          "C) type=\"tick\"",
          "D) type=\"select\""
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Radio Button - Test 10",
      description: "Radio button elementlari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 4,
      orderInStep: 11,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Radio button yaratish uchun qaysi input turi ishlatiladi?",
        options: [
          "A) type=\"radio\"",
          "B) type=\"option\"",
          "C) type=\"choice\"",
          "D) type=\"select\""
        ],
        correctAnswer: 0
      }
    }
  ]
}

async function seedComprehensiveTests() {
  try {
    // MongoDB ga ulanish
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('✅ MongoDB ga ulanildi')

    // Barcha eski testlarni o'chirish
    await Task.deleteMany({ taskType: 'test' })
    console.log('🗑️ Barcha eski testlar o\'chirildi')

    let totalTests = 0

    // Har bir qadam uchun testlarni qo'shish
    for (const [stepKey, tests] of Object.entries(comprehensiveTests)) {
      const stepNumber = parseInt(stepKey.replace('step', ''))
      console.log(`\n📝 ${stepNumber}-qadam testlarini qo'shish...`)
      
      const createdTests = await Task.insertMany(tests)
      totalTests += createdTests.length
      
      console.log(`✅ ${createdTests.length} ta test qo'shildi`)
      createdTests.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.title} - ${test.points} ball`)
      })
    }

    console.log(`\n🎉 Jami ${totalTests} ta test muvaffaqiyatli qo'shildi!`)
    console.log('📊 Har bir qadam uchun 10 tadan test mavjud')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('📤 MongoDB aloqasi uzildi')
  }
}

// Script ni ishga tushirish
seedComprehensiveTests()