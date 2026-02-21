import mongoose from 'mongoose'
import Task from '../models/Task.js'
import dotenv from 'dotenv'

dotenv.config()

// HTML mavzulari bo'yicha har bir qadam uchun 10 ta test (A, B, C, D variantlar bilan)
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
          "A) <body>",
          "B) <head>",
          "C) <html>",
          "D) <title>"
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
          "A) <!DOCTYPE HTML PUBLIC>",
          "B) <!DOCTYPE html>",
          "C) <!DOCTYPE HTML5>",
          "D) <!DOCTYPE>"
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
          "A) Faqat sahifa sarlavhasi",
          "B) Meta ma'lumotlar va sahifa sarlavhasi",
          "C) Sahifaning ko'rinadigan qismi",
          "D) Faqat CSS ulanishlari"
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
          "A) Sahifaning yuqori qismida",
          "B) Brauzer tabida",
          "C) Sahifaning pastki qismida",
          "D) Sahifa o'rtasida"
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
          "A) Meta ma'lumotlar uchun",
          "B) Sahifaning ko'rinadigan qismi uchun",
          "C) CSS kodlari uchun",
          "D) JavaScript kodlari uchun"
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
          "A) (tagname)",
          "B) [tagname]",
          "C) <tagname>",
          "D) {tagname}"
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
          "A) <tagname\\>",
          "B) </tagname>",
          "C) <\\tagname>",
          "D) <tagname/>"
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
          "A) Yopuvchi tegda",
          "B) Ochuvchi tegda",
          "C) Teg tashqarisida",
          "D) Alohida qatorda"
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
          "A) <h1>Sarlavha<h1>",
          "B) <h1>Sarlavha</h1>",
          "C) <h1 Sarlavha />",
          "D) h1>Sarlavha</h1>"
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
          "A) <h6>",
          "B) <h3>",
          "C) <h1>",
          "D) <header>"
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
          "A) <paragraph>",
          "B) <p>",
          "C) <para>",
          "D) <text>"
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
          "A) <break>",
          "B) <br>",
          "C) <line>",
          "D) <newline>"
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
          "A) <line>",
          "B) <hr>",
          "C) <horizontal>",
          "D) <rule>"
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
          "A) <bold>",
          "B) <b>",
          "C) <strong>",
          "D) B va C to'g'ri"
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
          "A) <italic>",
          "B) <i>",
          "C) <em>",
          "D) B va C to'g'ri"
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
          "A) <strike>",
          "B) <del>",
          "C) <s>",
          "D) Hammasi to'g'ri"
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
          "A) <underline>",
          "B) <u>",
          "C) <under>",
          "D) <line-under>"
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
          "A) <small>",
          "B) <mini>",
          "C) <tiny>",
          "D) <little>"
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
          "A) <big>",
          "B) <large>",
          "C) <huge>",
          "D) CSS ishlatish kerak"
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
          "A) <link>",
          "B) <a>",
          "C) <href>",
          "D) <url>"
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
          "A) src",
          "B) href",
          "C) link",
          "D) url"
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
          "A) target=\"_new\"",
          "B) target=\"_blank\"",
          "C) window=\"new\"",
          "D) open=\"new\""
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
          "A) <image>",
          "B) <img>",
          "C) <picture>",
          "D) <photo>"
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
          "A) href",
          "B) src",
          "C) url",
          "D) path"
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
          "A) Rasm o'lchamini belgilash uchun",
          "B) Rasm yuklanmasa, matn ko'rsatish uchun",
          "C) Rasm rangini belgilash uchun",
          "D) Rasm formatini belgilash uchun"
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
          "A) <ol>",
          "B) <ul>",
          "C) <list>",
          "D) <items>"
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
          "A) <ul>",
          "B) <ol>",
          "C) <ordered>",
          "D) <numbered>"
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
          "A) <item>",
          "B) <li>",
          "C) <element>",
          "D) <point>"
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
          "A) Yangi <ul> tegni <li> ichiga qo'yish",
          "B) Maxsus atribut ishlatish",
          "C) CSS ishlatish",
          "D) JavaScript ishlatish"
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
  ],

  step5: [
    {
      title: "Div Elementi - Test 1",
      description: "Div elementi va uning vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 2,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<div> elementi nima uchun ishlatiladi?",
        options: [
          "A) Matnni bo'lish uchun",
          "B) Blok yaratish va guruplash uchun",
          "C) Rasm qo'yish uchun",
          "D) Havola yaratish uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Span Elementi - Test 2",
      description: "Span elementi va uning vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 3,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<span> elementi nima uchun ishlatiladi?",
        options: [
          "A) Blok yaratish uchun",
          "B) Inline elementlarni guruplash uchun",
          "C) Yangi qator yaratish uchun",
          "D) Jadval yaratish uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "ID Atributi - Test 3",
      description: "ID atributining ishlatilishi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 4,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "ID atributi nima uchun ishlatiladi?",
        options: [
          "A) Elementni noyob identifikatsiya qilish uchun",
          "B) Elementni guruplash uchun",
          "C) Elementni yashirish uchun",
          "D) Elementni ko'rsatish uchun"
        ],
        correctAnswer: 0
      }
    },
    {
      title: "Class Atributi - Test 4",
      description: "Class atributining ishlatilishi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 5,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Class atributi nima uchun ishlatiladi?",
        options: [
          "A) Elementni noyob qilish uchun",
          "B) Bir nechta elementni guruplash uchun",
          "C) Elementni yashirish uchun",
          "D) Elementni o'chirish uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Semantik Teglar - Test 5",
      description: "HTML5 semantik teglari",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 6,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "Quyidagilardan qaysi biri HTML5 semantik tegi?",
        options: [
          "A) <div>",
          "B) <span>",
          "C) <header>",
          "D) <p>"
        ],
        correctAnswer: 2
      }
    },
    {
      title: "Header Elementi - Test 6",
      description: "Header elementining vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 7,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<header> elementi nima uchun ishlatiladi?",
        options: [
          "A) Sahifa pastki qismi uchun",
          "B) Sahifa yuqori qismi uchun",
          "C) Sahifa o'rtasi uchun",
          "D) Sahifa yon qismi uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Footer Elementi - Test 7",
      description: "Footer elementining vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 8,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<footer> elementi nima uchun ishlatiladi?",
        options: [
          "A) Sahifa yuqori qismi uchun",
          "B) Sahifa pastki qismi uchun",
          "C) Sahifa o'rtasi uchun",
          "D) Sahifa yon qismi uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Nav Elementi - Test 8",
      description: "Nav elementining vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 9,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<nav> elementi nima uchun ishlatiladi?",
        options: [
          "A) Rasmlar uchun",
          "B) Navigatsiya havolalari uchun",
          "C) Matn uchun",
          "D) Jadvallar uchun"
        ],
        correctAnswer: 1
      }
    },
    {
      title: "Main Elementi - Test 9",
      description: "Main elementining vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 10,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<main> elementi nima uchun ishlatiladi?",
        options: [
          "A) Sahifaning asosiy kontenti uchun",
          "B) Sahifa sarlavhasi uchun",
          "C) Sahifa pastki qismi uchun",
          "D) Navigatsiya uchun"
        ],
        correctAnswer: 0
      }
    },
    {
      title: "Article Elementi - Test 10",
      description: "Article elementining vazifasi",
      course: "HTML/CSS Asoslari",
      taskType: "test",
      stepNumber: 5,
      orderInStep: 11,
      points: 10,
      difficulty: "beginner",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      content: {
        question: "<article> elementi nima uchun ishlatiladi?",
        options: [
          "A) Navigatsiya uchun",
          "B) Mustaqil maqola yoki kontent uchun",
          "C) Sahifa sarlavhasi uchun",
          "D) Sahifa pastki qismi uchun"
        ],
        correctAnswer: 1
      }
    }
  ]
}

async function seedComprehensiveTestsWithVariants() {
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
      
      console.log(`✅ ${createdTests.length} ta test qo'shildi (A, B, C, D variantlar bilan)`)
      createdTests.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.title} - ${test.points} ball`)
      })
    }

    console.log(`\n🎉 Jami ${totalTests} ta test muvaffaqiyatli qo'shildi!`)
    console.log('📊 Har bir qadam uchun 10 tadan test mavjud')
    console.log('🔤 Barcha testlarda A, B, C, D variantlar mavjud')
    
  } catch (error) {
    console.error('❌ Xatolik:', error)
  } finally {
    await mongoose.disconnect()
    console.log('📤 MongoDB aloqasi uzildi')
  }
}

// Script ni ishga tushirish
seedComprehensiveTestsWithVariants()