const fs = require('fs');

const steps = [
  // HTML (1-35)
  {
    stepNumber: 1,
    title: "HTML kirish",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "HTML hujjatning asosiy strukturasini yarating",
      starterCode: `<!___ html>
<html>
<___>
  <title>Mening sahifam</title>
</head>
<___>
  <h1>Salom Dunyo!</h1>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Mening sahifam</title>
</head>
<body>
  <h1>Salom Dunyo!</h1>
</body>
</html>`,
      hints: ["DOCTYPE", "head", "body"]
    },
    tests: [
      { question: "HTML qanday til hisoblanadi?", options: ["Dasturlash tili", "Belgilash tili", "Stillar tili", "Skript tili"], correctAnswer: 1 },
      { question: "HTML ning to'liq nomi nima?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"], correctAnswer: 0 },
      { question: "Web sahifa uchun qaysi fayl kengaytmasi ishlatiladi?", options: [".txt", ".doc", ".html", ".pdf"], correctAnswer: 2 },
      { question: "HTML kim tomonidan yaratilgan?", options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"], correctAnswer: 1 },
      { question: "HTML qaysi yilda yaratilgan?", options: ["1991", "1995", "1999", "2000"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 2,
    title: "HTML strukturasi",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "To'liq HTML strukturasini yarating: DOCTYPE, html, head, title, body",
      starterCode: `<!DOCTYPE ___>
<___ lang="uz">
<head>
  <meta charset="___">
  <___>Sahifa nomi</title>
</head>
<body>
  
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>Sahifa nomi</title>
</head>
<body>
  
</body>
</html>`,
      hints: ["html", "html", "UTF-8", "title"]
    },
    tests: [
      { question: "HTML hujjat qaysi teg bilan boshlanadi?", options: ["<html>", "<!DOCTYPE html>", "<head>", "<body>"], correctAnswer: 1 },
      { question: "<head> tegi nima uchun ishlatiladi?", options: ["Kontent uchun", "Meta ma'lumotlar uchun", "Rasm uchun", "Havola uchun"], correctAnswer: 1 },
      { question: "<body> tegi ichida nima joylashadi?", options: ["Meta teglar", "Sahifa kontenti", "CSS kodlar", "Skriptlar"], correctAnswer: 1 },
      { question: "charset atributi nima uchun kerak?", options: ["Rang uchun", "Belgilar kodlash uchun", "Shrift uchun", "O'lcham uchun"], correctAnswer: 1 },
      { question: "lang atributi nimani bildiradi?", options: ["Sahifa tilini", "Sahifa rangini", "Sahifa o'lchamini", "Sahifa nomini"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 3,
    title: "h1 va p teglari",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Sarlavha va paragraf yarating",
      starterCode: `<___>Asosiy sarlavha</h1>
<___>Bu birinchi paragraf matni.</p>
<h2>___sarlavha</h2>
<p>Bu ikkinchi ___ matni.</p>`,
      solution: `<h1>Asosiy sarlavha</h1>
<p>Bu birinchi paragraf matni.</p>
<h2>Ikkinchi sarlavha</h2>
<p>Bu ikkinchi paragraf matni.</p>`,
      hints: ["h1", "p", "Ikkinchi", "paragraf"]
    },
    tests: [
      { question: "Eng katta sarlavha tegi qaysi?", options: ["<h6>", "<h3>", "<h1>", "<h2>"], correctAnswer: 2 },
      { question: "<p> tegi nima uchun ishlatiladi?", options: ["Rasm uchun", "Paragraf uchun", "Havola uchun", "Sarlavha uchun"], correctAnswer: 1 },
      { question: "Nechta sarlavha darajasi mavjud?", options: ["3", "4", "5", "6"], correctAnswer: 3 },
      { question: "<h1> dan <h6> gacha qaysi biri eng kichik?", options: ["h1", "h3", "h5", "h6"], correctAnswer: 3 },
      { question: "Paragraflar orasida qanday bo'shliq hosil bo'ladi?", options: ["Hech qanday", "Avtomatik", "Faqat CSS bilan", "Faqat br bilan"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 4,
    title: "Matnni formatlash uchun teglar",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Matnni qalin, kursiv va tagiga chizilgan qiling",
      starterCode: `<p><___>Bu qalin matn</b></p>
<p><___>Bu kursiv matn</i></p>
<p><___>Bu tagiga chizilgan matn</u></p>
<p><strong>___</strong> va <em>muhim</em> matn</p>`,
      solution: `<p><b>Bu qalin matn</b></p>
<p><i>Bu kursiv matn</i></p>
<p><u>Bu tagiga chizilgan matn</u></p>
<p><strong>Juda muhim</strong> va <em>muhim</em> matn</p>`,
      hints: ["b", "i", "u", "Juda muhim"]
    },
    tests: [
      { question: "Qalin matn uchun qaysi teg ishlatiladi?", options: ["<i>", "<b>", "<u>", "<s>"], correctAnswer: 1 },
      { question: "Kursiv matn uchun qaysi teg ishlatiladi?", options: ["<b>", "<i>", "<u>", "<em>"], correctAnswer: 1 },
      { question: "<strong> va <b> orasidagi farq nima?", options: ["Farqi yo'q", "strong semantik", "b semantik", "Ikkalasi ham semantik"], correctAnswer: 1 },
      { question: "<em> tegi qanday ko'rinadi?", options: ["Qalin", "Kursiv", "Tagiga chizilgan", "O'chirilgan"], correctAnswer: 1 },
      { question: "Matnni o'chirish uchun qaysi teg?", options: ["<del>", "<b>", "<i>", "<u>"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 5,
    title: "Giperlinklar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Turli xil havolalar yarating",
      starterCode: `<a ___="https://google.com">Google</a>
<a href="https://youtube.com" ___="_blank">YouTube</a>
<a href="___">Bosh sahifa</a>
<a href="tel:___">Qo'ng'iroq qilish</a>`,
      solution: `<a href="https://google.com">Google</a>
<a href="https://youtube.com" target="_blank">YouTube</a>
<a href="index.html">Bosh sahifa</a>
<a href="tel:+998901234567">Qo'ng'iroq qilish</a>`,
      hints: ["href", "target", "index.html", "+998901234567"]
    },
    tests: [
      { question: "Havola yaratish uchun qaysi teg?", options: ["<link>", "<a>", "<href>", "<url>"], correctAnswer: 1 },
      { question: "href atributi nima uchun?", options: ["Rang uchun", "Manzil uchun", "O'lcham uchun", "Nom uchun"], correctAnswer: 1 },
      { question: "Yangi oynada ochish uchun qaysi atribut?", options: ["new", "blank", "target='_blank'", "open"], correctAnswer: 2 },
      { question: "Email havola qanday boshlanadi?", options: ["email:", "mailto:", "mail:", "@"], correctAnswer: 1 },
      { question: "Telefon havola qanday boshlanadi?", options: ["phone:", "tel:", "call:", "mob:"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 6,
    title: "O'tilgan mavzular orqali loyiha",
    category: "HTML",
    points: 15,
    codeTask: {
      instruction: "Oddiy veb sahifa yarating: sarlavha, paragraf va havola",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>___</title>
</head>
<body>
  <___>Mening birinchi sahifam</h1>
  <___>Bu mening birinchi veb sahifam. HTML o'rganish juda qiziq!</p>
  <a ___="https://google.com">Google'ga o'tish</a>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Birinchi sahifa</title>
</head>
<body>
  <h1>Mening birinchi sahifam</h1>
  <p>Bu mening birinchi veb sahifam. HTML o'rganish juda qiziq!</p>
  <a href="https://google.com">Google'ga o'tish</a>
</body>
</html>`,
      hints: ["Birinchi sahifa", "h1", "p", "href"]
    },
    tests: [
      { question: "HTML sahifa qaysi teg bilan tugaydi?", options: ["</body>", "</head>", "</html>", "</end>"], correctAnswer: 2 },
      { question: "Title qayerda ko'rinadi?", options: ["Sahifada", "Brauzer tabida", "Footerda", "Headerda"], correctAnswer: 1 },
      { question: "Sahifaning asosiy kontenti qayerda?", options: ["<head>", "<title>", "<body>", "<html>"], correctAnswer: 2 },
      { question: "Havola matni qayerda yoziladi?", options: ["href ichida", "<a> teglar orasida", "target ichida", "src ichida"], correctAnswer: 1 },
      { question: "DOCTYPE nima uchun kerak?", options: ["Stil uchun", "Hujjat turini bildirish", "Havola uchun", "Rasm uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 7,
    title: "Rasmlar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Rasmlarni sahifaga qo'shing",
      starterCode: `<___ src="rasm.jpg" alt="Tavsif">
<img ___="logo.png" ___="Logotip">
<img src="banner.jpg" alt="Banner" ___="300" height="200">`,
      solution: `<img src="rasm.jpg" alt="Tavsif">
<img src="logo.png" alt="Logotip">
<img src="banner.jpg" alt="Banner" width="300" height="200">`,
      hints: ["img", "src", "alt", "width"]
    },
    tests: [
      { question: "Rasm qo'shish uchun qaysi teg?", options: ["<picture>", "<img>", "<image>", "<photo>"], correctAnswer: 1 },
      { question: "src atributi nima uchun?", options: ["O'lcham", "Rasm manzili", "Tavsif", "Nom"], correctAnswer: 1 },
      { question: "alt atributi nima uchun kerak?", options: ["Stil uchun", "Rasm ko'rinmasa tavsif", "Havola uchun", "O'lcham uchun"], correctAnswer: 1 },
      { question: "<img> tegi yopilishi kerakmi?", options: ["Ha, </img>", "Yo'q, o'z-o'zidan yopiq", "Ha, />", "Ixtiyoriy"], correctAnswer: 1 },
      { question: "Rasm o'lchamini qanday o'zgartirish mumkin?", options: ["size atributi", "width va height", "scale atributi", "dimension"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 8,
    title: "Listlar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Tartiblangan va tartibsiz ro'yxatlar yarating",
      starterCode: `<___>
  <li>Birinchi element</li>
  <li>Ikkinchi element</li>
</ul>

<___>
  <___>Birinchi qadam</li>
  <li>Ikkinchi qadam</li>
</ol>`,
      solution: `<ul>
  <li>Birinchi element</li>
  <li>Ikkinchi element</li>
</ul>

<ol>
  <li>Birinchi qadam</li>
  <li>Ikkinchi qadam</li>
</ol>`,
      hints: ["ul", "ol", "li"]
    },
    tests: [
      { question: "Tartibsiz ro'yxat uchun qaysi teg?", options: ["<ol>", "<ul>", "<li>", "<list>"], correctAnswer: 1 },
      { question: "Tartiblangan ro'yxat uchun qaysi teg?", options: ["<ul>", "<ol>", "<li>", "<nl>"], correctAnswer: 1 },
      { question: "Ro'yxat elementi uchun qaysi teg?", options: ["<item>", "<li>", "<el>", "<list>"], correctAnswer: 1 },
      { question: "<ul> qanday belgi ko'rsatadi?", options: ["Raqamlar", "Nuqtalar", "Harflar", "Hech narsa"], correctAnswer: 1 },
      { question: "<ol> qanday belgi ko'rsatadi?", options: ["Nuqtalar", "Raqamlar", "Chiziqlar", "Yulduzlar"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 9,
    title: "Jadvallar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Oddiy jadval yarating",
      starterCode: `<___>
  <tr>
    <___>Ism</th>
    <th>Yosh</th>
  </tr>
  <___>
    <td>Ali</td>
    <___>25</td>
  </tr>
</table>`,
      solution: `<table>
  <tr>
    <th>Ism</th>
    <th>Yosh</th>
  </tr>
  <tr>
    <td>Ali</td>
    <td>25</td>
  </tr>
</table>`,
      hints: ["table", "th", "tr", "td"]
    },
    tests: [
      { question: "Jadval yaratish uchun qaysi teg?", options: ["<grid>", "<table>", "<tab>", "<tbl>"], correctAnswer: 1 },
      { question: "Jadval qatori uchun qaysi teg?", options: ["<td>", "<tr>", "<th>", "<row>"], correctAnswer: 1 },
      { question: "Jadval sarlavha katagi uchun qaysi teg?", options: ["<td>", "<th>", "<tr>", "<head>"], correctAnswer: 1 },
      { question: "Oddiy katak uchun qaysi teg?", options: ["<th>", "<td>", "<tc>", "<cell>"], correctAnswer: 1 },
      { question: "Jadval chegarasi uchun qaysi atribut?", options: ["line", "border", "edge", "frame"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 10,
    title: "Inputlar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Turli input maydonlarini yarating",
      starterCode: `<input ___="text" placeholder="Ismingiz">
<input type="___" placeholder="Email">
<input type="___" placeholder="Parol">
<input type="___" value="Yuborish">`,
      solution: `<input type="text" placeholder="Ismingiz">
<input type="email" placeholder="Email">
<input type="password" placeholder="Parol">
<input type="submit" value="Yuborish">`,
      hints: ["type", "email", "password", "submit"]
    },
    tests: [
      { question: "Matn kiritish uchun qaysi input turi?", options: ["string", "text", "char", "word"], correctAnswer: 1 },
      { question: "Parol uchun qaysi input turi?", options: ["secret", "hidden", "password", "pass"], correctAnswer: 2 },
      { question: "placeholder nima uchun?", options: ["Qiymat uchun", "Ko'rsatma matn", "Nom uchun", "Stil uchun"], correctAnswer: 1 },
      { question: "Email uchun qaysi input turi?", options: ["mail", "email", "e-mail", "text"], correctAnswer: 1 },
      { question: "Tugma yaratish uchun qaysi input turi?", options: ["button", "btn", "click", "press"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 11,
    title: "Inputlar bilan ishlash - 2-qism",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Checkbox, radio va textarea yarating",
      starterCode: `<input type="___" name="tanlov"> Roziman
<input type="___" name="jins" value="erkak"> Erkak
<input type="radio" name="jins" value="___"> Ayol
<___>Xabaringizni yozing...</textarea>`,
      solution: `<input type="checkbox" name="tanlov"> Roziman
<input type="radio" name="jins" value="erkak"> Erkak
<input type="radio" name="jins" value="ayol"> Ayol
<textarea>Xabaringizni yozing...</textarea>`,
      hints: ["checkbox", "radio", "ayol", "textarea"]
    },
    tests: [
      { question: "Bir nechta tanlov uchun qaysi input?", options: ["radio", "checkbox", "select", "multi"], correctAnswer: 1 },
      { question: "Faqat bitta tanlov uchun qaysi input?", options: ["checkbox", "radio", "single", "one"], correctAnswer: 1 },
      { question: "Ko'p qatorli matn uchun qaysi teg?", options: ["<input>", "<textarea>", "<text>", "<multiline>"], correctAnswer: 1 },
      { question: "Radio tugmalar guruhlash uchun qaysi atribut?", options: ["group", "name", "id", "class"], correctAnswer: 1 },
      { question: "Checkbox belgilangan bo'lishi uchun qaysi atribut?", options: ["selected", "checked", "active", "on"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 12,
    title: "HTML atributlari",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Turli atributlar bilan ishlang",
      starterCode: `<p ___="matn1">Birinchi paragraf</p>
<p ___="highlight">Ikkinchi paragraf</p>
<a href="#" ___="Havola haqida">Havola</a>
<img src="rasm.jpg" ___="Rasm tavsifi">`,
      solution: `<p id="matn1">Birinchi paragraf</p>
<p class="highlight">Ikkinchi paragraf</p>
<a href="#" title="Havola haqida">Havola</a>
<img src="rasm.jpg" alt="Rasm tavsifi">`,
      hints: ["id", "class", "title", "alt"]
    },
    tests: [
      { question: "Yagona identifikator uchun qaysi atribut?", options: ["class", "id", "name", "unique"], correctAnswer: 1 },
      { question: "Bir nechta elementga stil berish uchun?", options: ["id", "class", "style", "name"], correctAnswer: 1 },
      { question: "title atributi nima ko'rsatadi?", options: ["Sarlavha", "Tooltip", "Nom", "Tavsif"], correctAnswer: 1 },
      { question: "style atributi nima uchun?", options: ["Class uchun", "Inline CSS", "ID uchun", "Havola uchun"], correctAnswer: 1 },
      { question: "data-* atributlari nima uchun?", options: ["Stil uchun", "Maxsus ma'lumot saqlash", "Havola uchun", "Rasm uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 13,
    title: "Div va Span farqi",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Div va span teglarini to'g'ri ishlating",
      starterCode: `<___>
  <h2>Bo'lim sarlavhasi</h2>
  <p>Bu <___>muhim</span> so'z.</p>
</div>
<div class="___">
  <span class="___">Inline element</span>
</div>`,
      solution: `<div>
  <h2>Bo'lim sarlavhasi</h2>
  <p>Bu <span>muhim</span> so'z.</p>
</div>
<div class="container">
  <span class="highlight">Inline element</span>
</div>`,
      hints: ["div", "span", "container", "highlight"]
    },
    tests: [
      { question: "div qanday element?", options: ["Inline", "Block", "Inline-block", "Flex"], correctAnswer: 1 },
      { question: "span qanday element?", options: ["Block", "Inline", "Inline-block", "Grid"], correctAnswer: 1 },
      { question: "div nima uchun ishlatiladi?", options: ["Matn uchun", "Konteyner sifatida", "Havola uchun", "Rasm uchun"], correctAnswer: 1 },
      { question: "span nima uchun ishlatiladi?", options: ["Bo'lim uchun", "Matn qismini ajratish", "Jadval uchun", "Ro'yxat uchun"], correctAnswer: 1 },
      { question: "Block element xususiyati?", options: ["Yangi qatordan boshlanadi", "Bir qatorda", "O'lchami yo'q", "Faqat matn"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 14,
    title: "Semantic Markuplar",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Semantik teglarni ishlating",
      starterCode: `<___>
  <nav>Navigatsiya</nav>
</header>
<___>
  <article>Maqola kontenti</article>
</main>
<___>
  <p>Mualliflik huquqi</p>
</footer>`,
      solution: `<header>
  <nav>Navigatsiya</nav>
</header>
<main>
  <article>Maqola kontenti</article>
</main>
<footer>
  <p>Mualliflik huquqi</p>
</footer>`,
      hints: ["header", "main", "footer"]
    },
    tests: [
      { question: "Sahifa sarlavhasi uchun qaysi semantik teg?", options: ["<head>", "<header>", "<top>", "<title>"], correctAnswer: 1 },
      { question: "Asosiy kontent uchun qaysi teg?", options: ["<content>", "<main>", "<body>", "<center>"], correctAnswer: 1 },
      { question: "Sahifa pastki qismi uchun?", options: ["<bottom>", "<footer>", "<end>", "<down>"], correctAnswer: 1 },
      { question: "Navigatsiya uchun qaysi teg?", options: ["<menu>", "<nav>", "<links>", "<navigation>"], correctAnswer: 1 },
      { question: "Mustaqil maqola uchun qaysi teg?", options: ["<post>", "<article>", "<blog>", "<text>"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 15,
    title: "Iframe tegi",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Iframe orqali boshqa sahifani joylashtiring",
      starterCode: `<___ src="https://example.com" width="600" height="400"></iframe>
<iframe ___="https://youtube.com/embed/xxx" width="560" ___="315"></iframe>
<iframe src="page.html" ___="Sahifa" style="border:none;"></iframe>`,
      solution: `<iframe src="https://example.com" width="600" height="400"></iframe>
<iframe src="https://youtube.com/embed/xxx" width="560" height="315"></iframe>
<iframe src="page.html" title="Sahifa" style="border:none;"></iframe>`,
      hints: ["iframe", "src", "height", "title"]
    },
    tests: [
      { question: "Boshqa sahifani joylashtirish uchun qaysi teg?", options: ["<embed>", "<iframe>", "<frame>", "<include>"], correctAnswer: 1 },
      { question: "iframe src atributi nima uchun?", options: ["O'lcham", "Manzil", "Nom", "Stil"], correctAnswer: 1 },
      { question: "YouTube video joylashtirish uchun qaysi URL?", options: ["youtube.com/watch", "youtube.com/embed", "youtube.com/video", "youtube.com/play"], correctAnswer: 1 },
      { question: "iframe chegarasini olib tashlash uchun?", options: ["border=0", "style='border:none'", "noborder", "frameborder=0"], correctAnswer: 1 },
      { question: "iframe title atributi nima uchun?", options: ["Ko'rinish uchun", "Accessibility uchun", "SEO uchun", "Stil uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 16,
    title: "Video va Audio teglari",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Video va audio elementlarini qo'shing",
      starterCode: `<___ src="video.mp4" controls width="640"></video>
<video src="movie.mp4" ___ autoplay muted></video>
<___ src="audio.mp3" controls></audio>
<audio src="music.mp3" controls ___></audio>`,
      solution: `<video src="video.mp4" controls width="640"></video>
<video src="movie.mp4" controls autoplay muted></video>
<audio src="audio.mp3" controls></audio>
<audio src="music.mp3" controls loop></audio>`,
      hints: ["video", "controls", "audio", "loop"]
    },
    tests: [
      { question: "Video qo'shish uchun qaysi teg?", options: ["<movie>", "<video>", "<media>", "<film>"], correctAnswer: 1 },
      { question: "Audio qo'shish uchun qaysi teg?", options: ["<sound>", "<audio>", "<music>", "<mp3>"], correctAnswer: 1 },
      { question: "Boshqaruv tugmalarini ko'rsatish uchun?", options: ["buttons", "controls", "player", "ui"], correctAnswer: 1 },
      { question: "Avtomatik ijro uchun qaysi atribut?", options: ["auto", "autoplay", "play", "start"], correctAnswer: 1 },
      { question: "Takrorlash uchun qaysi atribut?", options: ["repeat", "loop", "cycle", "again"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 17,
    title: "Meta haqida",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Meta teglarini to'g'ri yozing",
      starterCode: `<meta ___="UTF-8">
<meta name="___" content="Sahifa tavsifi">
<meta name="___" content="html, css, web">
<meta name="___" content="width=device-width, initial-scale=1.0">`,
      solution: `<meta charset="UTF-8">
<meta name="description" content="Sahifa tavsifi">
<meta name="keywords" content="html, css, web">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
      hints: ["charset", "description", "keywords", "viewport"]
    },
    tests: [
      { question: "Belgilar kodlash uchun qaysi meta?", options: ["encoding", "charset", "code", "lang"], correctAnswer: 1 },
      { question: "Sahifa tavsifi uchun qaysi meta?", options: ["info", "description", "about", "summary"], correctAnswer: 1 },
      { question: "Kalit so'zlar uchun qaysi meta?", options: ["tags", "keywords", "words", "keys"], correctAnswer: 1 },
      { question: "Mobil moslashuv uchun qaysi meta?", options: ["mobile", "viewport", "responsive", "device"], correctAnswer: 1 },
      { question: "Meta teglar qayerda joylashadi?", options: ["<body>", "<head>", "<footer>", "<main>"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 18,
    title: "HTML entities",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Maxsus belgilarni HTML entities bilan yozing",
      starterCode: `<p>5 ___ 3 = 8</p>
<p>10 ___ 5</p>
<p>Mualliflik huquqi ___</p>
<p>Narx: 100___</p>`,
      solution: `<p>5 &lt; 3 = 8</p>
<p>10 &gt; 5</p>
<p>Mualliflik huquqi &copy;</p>
<p>Narx: 100&dollar;</p>`,
      hints: ["&lt;", "&gt;", "&copy;", "&dollar;"]
    },
    tests: [
      { question: "< belgisi uchun entity?", options: ["&less;", "&lt;", "&left;", "&l;"], correctAnswer: 1 },
      { question: "> belgisi uchun entity?", options: ["&more;", "&gt;", "&right;", "&g;"], correctAnswer: 1 },
      { question: "Bo'sh joy uchun entity?", options: ["&space;", "&nbsp;", "&blank;", "&sp;"], correctAnswer: 1 },
      { question: "& belgisi uchun entity?", options: ["&and;", "&amp;", "&et;", "&a;"], correctAnswer: 1 },
      { question: "© belgisi uchun entity?", options: ["&copyright;", "&copy;", "&c;", "&cr;"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 19,
    title: "Formlar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "To'liq forma yarating",
      starterCode: `<___ action="/submit" method="POST">
  <label ___="name">Ism:</label>
  <input type="text" id="name" ___="name">
  <label for="email">Email:</label>
  <input type="___" id="email" name="email">
  <button type="___">Yuborish</button>
</form>`,
      solution: `<form action="/submit" method="POST">
  <label for="name">Ism:</label>
  <input type="text" id="name" name="name">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <button type="submit">Yuborish</button>
</form>`,
      hints: ["form", "for", "name", "email", "submit"]
    },
    tests: [
      { question: "Forma yaratish uchun qaysi teg?", options: ["<input>", "<form>", "<submit>", "<data>"], correctAnswer: 1 },
      { question: "action atributi nima uchun?", options: ["Stil uchun", "Ma'lumot yuborish manzili", "Nom uchun", "Metod uchun"], correctAnswer: 1 },
      { question: "method='POST' nima qiladi?", options: ["URL da ko'rsatadi", "Xavfsiz yuboradi", "Faylni yuklaydi", "Sahifani yangilaydi"], correctAnswer: 1 },
      { question: "label for atributi nima bilan bog'lanadi?", options: ["name", "id", "class", "value"], correctAnswer: 1 },
      { question: "Formani yuborish uchun qaysi tugma turi?", options: ["send", "submit", "post", "form"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 20,
    title: "Web sahifada manzillar bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Manzil va kontakt ma'lumotlarini formatlang",
      starterCode: `<___>
  <p>Kompaniya nomi</p>
  <p>Ko'cha nomi, 123</p>
  <p>Toshkent, O'zbekiston</p>
</address>
<a href="___:+998901234567">Qo'ng'iroq</a>
<a href="___:info@example.com">Email</a>`,
      solution: `<address>
  <p>Kompaniya nomi</p>
  <p>Ko'cha nomi, 123</p>
  <p>Toshkent, O'zbekiston</p>
</address>
<a href="tel:+998901234567">Qo'ng'iroq</a>
<a href="mailto:info@example.com">Email</a>`,
      hints: ["address", "tel", "mailto"]
    },
    tests: [
      { question: "Manzil uchun semantik teg?", options: ["<location>", "<address>", "<place>", "<contact>"], correctAnswer: 1 },
      { question: "Telefon havolasi qanday boshlanadi?", options: ["phone:", "tel:", "call:", "mob:"], correctAnswer: 1 },
      { question: "Email havolasi qanday boshlanadi?", options: ["email:", "mailto:", "mail:", "send:"], correctAnswer: 1 },
      { question: "address tegi qanday ko'rinadi?", options: ["Qalin", "Kursiv", "Oddiy", "Tagiga chizilgan"], correctAnswer: 1 },
      { question: "Kontakt ma'lumotlari qayerda bo'lishi kerak?", options: ["Faqat header", "Faqat footer", "Istalgan joyda", "Faqat aside"], correctAnswer: 2 }
    ]
  },
  {
    stepNumber: 21,
    title: "Figure va Figcaption teglari",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Rasm va uning tavsifini figure bilan o'rang",
      starterCode: `<___>
  <img src="rasm.jpg" alt="Chiroyli manzara">
  <___>Tog'lar manzarasi</figcaption>
</figure>
<figure>
  <img src="___" alt="Kod">
  <figcaption>___</figcaption>
</figure>`,
      solution: `<figure>
  <img src="rasm.jpg" alt="Chiroyli manzara">
  <figcaption>Tog'lar manzarasi</figcaption>
</figure>
<figure>
  <img src="code.png" alt="Kod">
  <figcaption>HTML kod namunasi</figcaption>
</figure>`,
      hints: ["figure", "figcaption", "code.png", "HTML kod namunasi"]
    },
    tests: [
      { question: "Rasm va tavsifni guruhlash uchun qaysi teg?", options: ["<image>", "<figure>", "<picture>", "<photo>"], correctAnswer: 1 },
      { question: "Rasm tavsifi uchun qaysi teg?", options: ["<caption>", "<figcaption>", "<desc>", "<title>"], correctAnswer: 1 },
      { question: "figcaption qayerda joylashadi?", options: ["figure ichida", "figure tashqarisida", "img ichida", "body ichida"], correctAnswer: 0 },
      { question: "figure faqat rasmlar uchunmi?", options: ["Ha", "Yo'q, kod va jadvallar ham", "Faqat video", "Faqat audio"], correctAnswer: 1 },
      { question: "figcaption joylashuvi?", options: ["Faqat yuqorida", "Faqat pastda", "Yuqori yoki pastda", "Faqat chapda"], correctAnswer: 2 }
    ]
  },
  {
    stepNumber: 22,
    title: "Jadvallar bilan ishlash - 2",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Murakkab jadval yarating: thead, tbody, tfoot",
      starterCode: `<table>
  <___>
    <tr><th>Mahsulot</th><th>Narx</th></tr>
  </thead>
  <___>
    <tr><td>Olma</td><td>5000</td></tr>
    <tr><td>Nok</td><td>7000</td></tr>
  </tbody>
  <___>
    <tr><td>Jami:</td><td>12000</td></tr>
  </tfoot>
</table>`,
      solution: `<table>
  <thead>
    <tr><th>Mahsulot</th><th>Narx</th></tr>
  </thead>
  <tbody>
    <tr><td>Olma</td><td>5000</td></tr>
    <tr><td>Nok</td><td>7000</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Jami:</td><td>12000</td></tr>
  </tfoot>
</table>`,
      hints: ["thead", "tbody", "tfoot"]
    },
    tests: [
      { question: "Jadval sarlavhasi uchun qaysi teg?", options: ["<th>", "<thead>", "<header>", "<top>"], correctAnswer: 1 },
      { question: "Jadval tanasi uchun qaysi teg?", options: ["<body>", "<tbody>", "<content>", "<main>"], correctAnswer: 1 },
      { question: "Jadval pastki qismi uchun?", options: ["<bottom>", "<tfoot>", "<footer>", "<end>"], correctAnswer: 1 },
      { question: "colspan atributi nima qiladi?", options: ["Qatorlarni birlashtiradi", "Ustunlarni birlashtiradi", "Chegarani o'chiradi", "Rangni o'zgartiradi"], correctAnswer: 1 },
      { question: "rowspan atributi nima qiladi?", options: ["Ustunlarni birlashtiradi", "Qatorlarni birlashtiradi", "O'lchamni o'zgartiradi", "Joylashuvni o'zgartiradi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 23,
    title: "Formda Amaliyot",
    category: "HTML",
    points: 15,
    codeTask: {
      instruction: "Ro'yxatdan o'tish formasini yarating",
      starterCode: `<form action="/register" method="___">
  <div>
    <label for="fullname">To'liq ism:</label>
    <input type="___" id="fullname" name="fullname" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="___" id="email" name="email" required>
  </div>
  <div>
    <label for="password">Parol:</label>
    <input type="___" id="password" name="password" required>
  </div>
  <button type="submit">Ro'yxatdan o'tish</button>
</form>`,
      solution: `<form action="/register" method="POST">
  <div>
    <label for="fullname">To'liq ism:</label>
    <input type="text" id="fullname" name="fullname" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="password">Parol:</label>
    <input type="password" id="password" name="password" required>
  </div>
  <button type="submit">Ro'yxatdan o'tish</button>
</form>`,
      hints: ["POST", "text", "email", "password"]
    },
    tests: [
      { question: "required atributi nima qiladi?", options: ["Stilni o'zgartiradi", "Majburiy maydon qiladi", "Avtomatik to'ldiradi", "O'chiradi"], correctAnswer: 1 },
      { question: "Parol uchun qaysi input turi?", options: ["text", "password", "secret", "hidden"], correctAnswer: 1 },
      { question: "Forma yuborilganda qaysi metod xavfsizroq?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 1 },
      { question: "Email validatsiyasi qaysi input turida avtomatik?", options: ["text", "email", "mail", "validate"], correctAnswer: 1 },
      { question: "Formani tozalash uchun qaysi tugma turi?", options: ["clear", "reset", "clean", "empty"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 24,
    title: "Select va Option",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Tanlash ro'yxatini yarating",
      starterCode: `<___ name="shahar">
  <___ value="">Shaharni tanlang</option>
  <option ___="toshkent">Toshkent</option>
  <option value="samarqand">___</option>
  <option value="buxoro">Buxoro</option>
</select>`,
      solution: `<select name="shahar">
  <option value="">Shaharni tanlang</option>
  <option value="toshkent">Toshkent</option>
  <option value="samarqand">Samarqand</option>
  <option value="buxoro">Buxoro</option>
</select>`,
      hints: ["select", "option", "value", "Samarqand"]
    },
    tests: [
      { question: "Tanlash ro'yxati uchun qaysi teg?", options: ["<list>", "<select>", "<dropdown>", "<choice>"], correctAnswer: 1 },
      { question: "Ro'yxat elementi uchun qaysi teg?", options: ["<item>", "<option>", "<li>", "<choice>"], correctAnswer: 1 },
      { question: "Ko'p tanlov uchun qaysi atribut?", options: ["multi", "multiple", "many", "several"], correctAnswer: 1 },
      { question: "Oldindan tanlangan qilish uchun?", options: ["checked", "selected", "default", "active"], correctAnswer: 1 },
      { question: "optgroup nima uchun?", options: ["Stillar uchun", "Variantlarni guruhlash", "Validatsiya uchun", "Nom uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 25,
    title: "Input turlari",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Turli input turlarini ishlating",
      starterCode: `<input type="___" name="sana">
<input type="___" name="vaqt">
<input type="___" name="rang">
<input type="___" name="son" min="0" max="100">
<input type="___" name="fayl">`,
      solution: `<input type="date" name="sana">
<input type="time" name="vaqt">
<input type="color" name="rang">
<input type="number" name="son" min="0" max="100">
<input type="file" name="fayl">`,
      hints: ["date", "time", "color", "number", "file"]
    },
    tests: [
      { question: "Sana tanlash uchun qaysi input turi?", options: ["calendar", "date", "day", "datetime"], correctAnswer: 1 },
      { question: "Vaqt tanlash uchun qaysi input turi?", options: ["clock", "time", "hour", "datetime"], correctAnswer: 1 },
      { question: "Rang tanlash uchun qaysi input turi?", options: ["palette", "color", "picker", "rgb"], correctAnswer: 1 },
      { question: "Faqat raqam uchun qaysi input turi?", options: ["digit", "number", "int", "num"], correctAnswer: 1 },
      { question: "Fayl yuklash uchun qaysi input turi?", options: ["upload", "file", "document", "attach"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 26,
    title: "Icon va sayt nomi bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Favicon va title ni sozlang",
      starterCode: `<head>
  <___>Mening saytim</title>
  <link rel="___" href="favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="___">
  <meta name="theme-color" content="___">
</head>`,
      solution: `<head>
  <title>Mening saytim</title>
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="apple-icon.png">
  <meta name="theme-color" content="#3498db">
</head>`,
      hints: ["title", "icon", "apple-icon.png", "#3498db"]
    },
    tests: [
      { question: "Brauzer tabidagi icon uchun qaysi atribut?", options: ["src", "rel='icon'", "href", "type"], correctAnswer: 1 },
      { question: "Favicon qaysi formatda bo'lishi mumkin?", options: ["Faqat .ico", ".ico, .png, .svg", "Faqat .png", "Faqat .jpg"], correctAnswer: 1 },
      { question: "Apple qurilmalari uchun icon?", options: ["apple-icon", "apple-touch-icon", "ios-icon", "iphone-icon"], correctAnswer: 1 },
      { question: "theme-color nima uchun?", options: ["Matn rangi", "Brauzer toolbar rangi", "Fon rangi", "Havola rangi"], correctAnswer: 1 },
      { question: "title tegi qayerda joylashadi?", options: ["<body>", "<head>", "<footer>", "<main>"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 27,
    title: "Ranglar va Entities",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Ranglar va maxsus belgilarni ishlating",
      starterCode: `<p style="color: ___;">Qizil matn</p>
<p style="background-color: ___;">Yashil fon</p>
<p>5 ___ 10</p>
<p>Narx: 100 ___</p>
<p>Mualliflik ___ 2024</p>`,
      solution: `<p style="color: red;">Qizil matn</p>
<p style="background-color: green;">Yashil fon</p>
<p>5 &lt; 10</p>
<p>Narx: 100 &euro;</p>
<p>Mualliflik &copy; 2024</p>`,
      hints: ["red", "green", "&lt;", "&euro;", "&copy;"]
    },
    tests: [
      { question: "HEX rang formati qanday?", options: ["rgb()", "#RRGGBB", "color()", "hex()"], correctAnswer: 1 },
      { question: "RGB rang formati qanday?", options: ["#RRGGBB", "rgb(r,g,b)", "color(r,g,b)", "rgba()"], correctAnswer: 1 },
      { question: "< belgisi uchun entity?", options: ["&less;", "&lt;", "&left;", "&l;"], correctAnswer: 1 },
      { question: "€ belgisi uchun entity?", options: ["&eur;", "&euro;", "&e;", "&money;"], correctAnswer: 1 },
      { question: "Shaffof rang uchun qaysi format?", options: ["rgb()", "rgba()", "hex", "transparent"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 28,
    title: "Anchor tegi bilan amaliyot",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Turli xil havolalar yarating",
      starterCode: `<a href="___">Bosh sahifa</a>
<a href="#___">Bo'limga o'tish</a>
<a href="https://google.com" target="___">Yangi oynada</a>
<a href="file.pdf" ___>Yuklab olish</a>`,
      solution: `<a href="index.html">Bosh sahifa</a>
<a href="#section1">Bo'limga o'tish</a>
<a href="https://google.com" target="_blank">Yangi oynada</a>
<a href="file.pdf" download>Yuklab olish</a>`,
      hints: ["index.html", "section1", "_blank", "download"]
    },
    tests: [
      { question: "Sahifa ichida o'tish uchun qanday havola?", options: ["link:", "#id", "@section", "goto:"], correctAnswer: 1 },
      { question: "Yangi oynada ochish uchun?", options: ["target='new'", "target='_blank'", "new='true'", "open='new'"], correctAnswer: 1 },
      { question: "Faylni yuklab olish uchun qaysi atribut?", options: ["save", "download", "get", "fetch"], correctAnswer: 1 },
      { question: "Joriy oynada ochish uchun target?", options: ["_self", "_blank", "_current", "_same"], correctAnswer: 0 },
      { question: "Ota oynada ochish uchun target?", options: ["_parent", "_top", "_main", "_up"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 29,
    title: "Time va Small teglari bilan ishlash",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Vaqt va kichik matn teglarini ishlating",
      starterCode: `<p>Maqola <___ datetime="2024-01-15">15 yanvar 2024</time> da yozilgan.</p>
<p><___>Eslatma: Bu muhim ma'lumot</small></p>
<p>Yangilik <time ___="2024-06-20T14:30">20 iyun, 14:30</time></p>`,
      solution: `<p>Maqola <time datetime="2024-01-15">15 yanvar 2024</time> da yozilgan.</p>
<p><small>Eslatma: Bu muhim ma'lumot</small></p>
<p>Yangilik <time datetime="2024-06-20T14:30">20 iyun, 14:30</time></p>`,
      hints: ["time", "small", "datetime"]
    },
    tests: [
      { question: "Vaqt va sana uchun semantik teg?", options: ["<date>", "<time>", "<datetime>", "<when>"], correctAnswer: 1 },
      { question: "datetime atributi formati?", options: ["DD-MM-YYYY", "YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YY"], correctAnswer: 1 },
      { question: "Kichik matn uchun qaysi teg?", options: ["<mini>", "<small>", "<tiny>", "<little>"], correctAnswer: 1 },
      { question: "small tegi nima uchun ishlatiladi?", options: ["Sarlavha uchun", "Izoh va huquqiy matn", "Havola uchun", "Rasm uchun"], correctAnswer: 1 },
      { question: "time tegi SEO uchun foydali?", options: ["Yo'q", "Ha", "Faqat Google uchun", "Faqat Bing uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 30,
    title: "Details va Summary",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Yig'iladigan kontent yarating",
      starterCode: `<___>
  <___>Ko'proq ma'lumot</summary>
  <p>Bu yashirin kontent. Foydalanuvchi summary ni bosganda ko'rinadi.</p>
</details>
<details ___>
  <summary>Ochiq holat</summary>
  <p>Bu kontent dastlab ochiq.</p>
</details>`,
      solution: `<details>
  <summary>Ko'proq ma'lumot</summary>
  <p>Bu yashirin kontent. Foydalanuvchi summary ni bosganda ko'rinadi.</p>
</details>
<details open>
  <summary>Ochiq holat</summary>
  <p>Bu kontent dastlab ochiq.</p>
</details>`,
      hints: ["details", "summary", "open"]
    },
    tests: [
      { question: "Yig'iladigan kontent uchun qaysi teg?", options: ["<collapse>", "<details>", "<accordion>", "<toggle>"], correctAnswer: 1 },
      { question: "Sarlavha qismi uchun qaysi teg?", options: ["<title>", "<summary>", "<header>", "<heading>"], correctAnswer: 1 },
      { question: "Dastlab ochiq qilish uchun qaysi atribut?", options: ["expanded", "open", "show", "visible"], correctAnswer: 1 },
      { question: "details ichida nima bo'lishi mumkin?", options: ["Faqat matn", "Istalgan HTML", "Faqat p tegi", "Faqat ro'yxat"], correctAnswer: 1 },
      { question: "summary tegisiz details qanday ko'rinadi?", options: ["Xato beradi", "'Details' yozuvi bilan", "Bo'sh", "Yashirin"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 31,
    title: "Input type file bilan amaliyot",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Fayl yuklash formasi yarating",
      starterCode: `<form enctype="___">
  <input type="file" name="rasm" ___="image/*">
  <input type="file" name="fayllar" ___>
  <input type="file" name="hujjat" accept=".pdf,___">
  <button type="submit">Yuklash</button>
</form>`,
      solution: `<form enctype="multipart/form-data">
  <input type="file" name="rasm" accept="image/*">
  <input type="file" name="fayllar" multiple>
  <input type="file" name="hujjat" accept=".pdf,.doc">
  <button type="submit">Yuklash</button>
</form>`,
      hints: ["multipart/form-data", "accept", "multiple", ".doc"]
    },
    tests: [
      { question: "Fayl yuklash uchun forma enctype?", options: ["text/plain", "multipart/form-data", "application/json", "form-data"], correctAnswer: 1 },
      { question: "Faqat rasmlarni qabul qilish uchun?", options: ["type='image'", "accept='image/*'", "filter='image'", "only='image'"], correctAnswer: 1 },
      { question: "Bir nechta fayl tanlash uchun?", options: ["multi", "multiple", "many", "several"], correctAnswer: 1 },
      { question: "Faqat PDF qabul qilish uchun?", options: ["type='pdf'", "accept='.pdf'", "filter='pdf'", "only='pdf'"], correctAnswer: 1 },
      { question: "Fayl o'lchami chegarasi qayerda qo'yiladi?", options: ["HTML da", "Server tomonida", "CSS da", "JavaScript da"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 32,
    title: "Amaliyot blog",
    category: "HTML",
    points: 15,
    codeTask: {
      instruction: "Blog post strukturasini yarating",
      starterCode: `<___>
  <header>
    <h1>Blog sarlavhasi</h1>
    <p>Muallif: <___>Ali</span> | <time datetime="2024-01-15">15 yanvar</time></p>
  </header>
  <___>
    <p>Bu blog postning asosiy matni...</p>
    <figure>
      <img src="blog-img.jpg" alt="Blog rasmi">
      <___>Rasm tavsifi</figcaption>
    </figure>
  </section>
  <footer>
    <p>Teglar: #html #web</p>
  </footer>
</article>`,
      solution: `<article>
  <header>
    <h1>Blog sarlavhasi</h1>
    <p>Muallif: <span>Ali</span> | <time datetime="2024-01-15">15 yanvar</time></p>
  </header>
  <section>
    <p>Bu blog postning asosiy matni...</p>
    <figure>
      <img src="blog-img.jpg" alt="Blog rasmi">
      <figcaption>Rasm tavsifi</figcaption>
    </figure>
  </section>
  <footer>
    <p>Teglar: #html #web</p>
  </footer>
</article>`,
      hints: ["article", "span", "section", "figcaption"]
    },
    tests: [
      { question: "Mustaqil maqola uchun qaysi teg?", options: ["<post>", "<article>", "<blog>", "<content>"], correctAnswer: 1 },
      { question: "Maqola bo'limi uchun qaysi teg?", options: ["<div>", "<section>", "<part>", "<block>"], correctAnswer: 1 },
      { question: "article ichida header bo'lishi mumkinmi?", options: ["Yo'q", "Ha", "Faqat bitta", "Faqat footer bilan"], correctAnswer: 1 },
      { question: "Blog post uchun eng yaxshi struktura?", options: ["div ichida div", "article ichida section", "section ichida div", "main ichida p"], correctAnswer: 1 },
      { question: "Maqola muallifi uchun qaysi teg yaxshi?", options: ["<author>", "<span> yoki <address>", "<name>", "<writer>"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 33,
    title: "Contact form amaliyot",
    category: "HTML",
    points: 15,
    codeTask: {
      instruction: "Kontakt formasini yarating",
      starterCode: `<form action="/contact" method="POST">
  <div>
    <label for="name">Ism:</label>
    <input type="___" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="___" id="email" name="email" required>
  </div>
  <div>
    <label for="subject">Mavzu:</label>
    <___ id="subject" name="subject">
      <option value="">Tanlang</option>
      <option value="support">Yordam</option>
      <option value="feedback">Fikr-mulohaza</option>
    </select>
  </div>
  <div>
    <label for="message">Xabar:</label>
    <___ id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit">Yuborish</button>
</form>`,
      solution: `<form action="/contact" method="POST">
  <div>
    <label for="name">Ism:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="subject">Mavzu:</label>
    <select id="subject" name="subject">
      <option value="">Tanlang</option>
      <option value="support">Yordam</option>
      <option value="feedback">Fikr-mulohaza</option>
    </select>
  </div>
  <div>
    <label for="message">Xabar:</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit">Yuborish</button>
</form>`,
      hints: ["text", "email", "select", "textarea"]
    },
    tests: [
      { question: "Ko'p qatorli matn uchun qaysi teg?", options: ["<input type='text'>", "<textarea>", "<text>", "<multiline>"], correctAnswer: 1 },
      { question: "textarea qatorlar soni uchun qaysi atribut?", options: ["lines", "rows", "height", "size"], correctAnswer: 1 },
      { question: "Forma validatsiyasi uchun qaysi atribut?", options: ["validate", "required", "check", "must"], correctAnswer: 1 },
      { question: "Email formatini tekshirish uchun?", options: ["type='text'", "type='email'", "validate='email'", "format='email'"], correctAnswer: 1 },
      { question: "Tanlash ro'yxati uchun qaysi teg?", options: ["<list>", "<select>", "<dropdown>", "<options>"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 34,
    title: "Google map amaliyot",
    category: "HTML",
    points: 10,
    codeTask: {
      instruction: "Google Maps ni sahifaga joylashtiring",
      starterCode: `<div class="map-container">
  <___ 
    src="https://www.google.com/maps/embed?pb=!1m18!..."
    width="___"
    height="450"
    style="border:0;"
    ___=""
    loading="lazy">
  </iframe>
</div>`,
      solution: `<div class="map-container">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!..."
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy">
  </iframe>
</div>`,
      hints: ["iframe", "600", "allowfullscreen"]
    },
    tests: [
      { question: "Google Maps joylashtirish uchun qaysi teg?", options: ["<map>", "<iframe>", "<embed>", "<google>"], correctAnswer: 1 },
      { question: "To'liq ekran rejimi uchun qaysi atribut?", options: ["fullscreen", "allowfullscreen", "maximize", "expand"], correctAnswer: 1 },
      { question: "loading='lazy' nima qiladi?", options: ["Tez yuklaydi", "Kerak bo'lganda yuklaydi", "Yuklamaydi", "Keshda saqlaydi"], correctAnswer: 1 },
      { question: "iframe chegarasini olib tashlash?", options: ["border='0'", "style='border:0'", "noborder", "frameborder='0'"], correctAnswer: 1 },
      { question: "Google Maps embed URL qayerdan olinadi?", options: ["google.com", "Google Maps Share > Embed", "maps.google.com/api", "developers.google.com"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 35,
    title: "Amaliyot",
    category: "HTML",
    points: 20,
    codeTask: {
      instruction: "To'liq HTML sahifa yarating",
      starterCode: `<!DOCTYPE html>
<html lang="uz">
<___>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mening saytim</title>
</head>
<___>
  <header>
    <nav>
      <a href="___">Bosh sahifa</a>
      <a href="#about">Biz haqimizda</a>
      <a href="#contact">Aloqa</a>
    </nav>
  </header>
  <main>
    <section id="about">
      <h1>Biz haqimizda</h1>
      <p>Bu bizning kompaniyamiz haqida ma'lumot.</p>
    </section>
    <section id="contact">
      <h2>Aloqa</h2>
      <form>
        <input type="text" placeholder="Ismingiz">
        <input type="___" placeholder="Email">
        <button type="submit">Yuborish</button>
      </form>
    </section>
  </main>
  <___>
    <p>&copy; 2024 Mening saytim</p>
  </footer>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mening saytim</title>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Bosh sahifa</a>
      <a href="#about">Biz haqimizda</a>
      <a href="#contact">Aloqa</a>
    </nav>
  </header>
  <main>
    <section id="about">
      <h1>Biz haqimizda</h1>
      <p>Bu bizning kompaniyamiz haqida ma'lumot.</p>
    </section>
    <section id="contact">
      <h2>Aloqa</h2>
      <form>
        <input type="text" placeholder="Ismingiz">
        <input type="email" placeholder="Email">
        <button type="submit">Yuborish</button>
      </form>
    </section>
  </main>
  <footer>
    <p>&copy; 2024 Mening saytim</p>
  </footer>
</body>
</html>`,
      hints: ["head", "body", "index.html", "email", "footer"]
    },
    tests: [
      { question: "Sahifa tili uchun qaysi atribut?", options: ["language", "lang", "locale", "l"], correctAnswer: 1 },
      { question: "Mobil moslashuv uchun qaysi meta?", options: ["mobile", "viewport", "responsive", "device"], correctAnswer: 1 },
      { question: "Sahifa ichida o'tish uchun havola?", options: ["link:", "#id", "@section", "goto:"], correctAnswer: 1 },
      { question: "Semantik footer tegi?", options: ["<bottom>", "<footer>", "<end>", "<foot>"], correctAnswer: 1 },
      { question: "© belgisi uchun entity?", options: ["&copyright;", "&copy;", "&c;", "&cr;"], correctAnswer: 1 }
    ]
  },
  // Soft Skills (36-37)
  {
    stepNumber: 36,
    title: "Fikrlash darslari 1-9",
    category: "Soft Skills",
    points: 15,
    codeTask: {
      instruction: "O'z maqsadlaringizni HTML formatida yozing",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>Mening maqsadlarim</title>
</head>
<body>
  <h1>___</h1>
  <h2>Qisqa muddatli maqsadlar</h2>
  <___>
    <li>Birinchi maqsad</li>
    <li>Ikkinchi maqsad</li>
  </ul>
  <h2>Uzoq muddatli maqsadlar</h2>
  <___>
    <li>1. Birinchi qadam</li>
    <li>2. Ikkinchi qadam</li>
  </ol>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Mening maqsadlarim</title>
</head>
<body>
  <h1>Mening maqsadlarim</h1>
  <h2>Qisqa muddatli maqsadlar</h2>
  <ul>
    <li>Birinchi maqsad</li>
    <li>Ikkinchi maqsad</li>
  </ul>
  <h2>Uzoq muddatli maqsadlar</h2>
  <ol>
    <li>1. Birinchi qadam</li>
    <li>2. Ikkinchi qadam</li>
  </ol>
</body>
</html>`,
      hints: ["Mening maqsadlarim", "ul", "ol"]
    },
    tests: [
      { question: "Maqsad qo'yishning birinchi qadami nima?", options: ["Yozish", "Aniq belgilash", "Boshqalarga aytish", "Kutish"], correctAnswer: 1 },
      { question: "SMART maqsad qanday bo'lishi kerak?", options: ["Katta", "Aniq va o'lchanadigan", "Oson", "Qiyin"], correctAnswer: 1 },
      { question: "Maqsadga erishish uchun nima kerak?", options: ["Omad", "Reja va harakat", "Pul", "Vaqt"], correctAnswer: 1 },
      { question: "Qisqa muddatli maqsad necha oylik?", options: ["1-3 oy", "1-2 yil", "5-10 yil", "1 hafta"], correctAnswer: 0 },
      { question: "Maqsadlarni yozish nima uchun muhim?", options: ["Chiroyli ko'rinadi", "Esda qoladi va kuzatiladi", "Boshqalar ko'radi", "Majburiy"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 37,
    title: "Fikrlash darslari 10-17",
    category: "Soft Skills",
    points: 15,
    codeTask: {
      instruction: "Kundalik reja jadvalini HTML da yarating",
      starterCode: `<___>
  <thead>
    <tr>
      <th>Vaqt</th>
      <th>Faoliyat</th>
    </tr>
  </thead>
  <___>
    <tr>
      <td>06:00 - 07:00</td>
      <td>___</td>
    </tr>
    <tr>
      <td>07:00 - 08:00</td>
      <td>Nonushta</td>
    </tr>
    <tr>
      <td>08:00 - 12:00</td>
      <td>___</td>
    </tr>
  </tbody>
</table>`,
      solution: `<table>
  <thead>
    <tr>
      <th>Vaqt</th>
      <th>Faoliyat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>06:00 - 07:00</td>
      <td>Uyg'onish va sport</td>
    </tr>
    <tr>
      <td>07:00 - 08:00</td>
      <td>Nonushta</td>
    </tr>
    <tr>
      <td>08:00 - 12:00</td>
      <td>Ish yoki o'qish</td>
    </tr>
  </tbody>
</table>`,
      hints: ["table", "tbody", "Uyg'onish va sport", "Ish yoki o'qish"]
    },
    tests: [
      { question: "Vaqtni boshqarishning asosiy printsipi?", options: ["Ko'p ishlash", "Prioritetlashtirish", "Kam uxlash", "Tez ishlash"], correctAnswer: 1 },
      { question: "Pomodoro texnikasi nima?", options: ["Ovqatlanish usuli", "25 daqiqa ish, 5 daqiqa dam", "Sport mashqi", "O'qish usuli"], correctAnswer: 1 },
      { question: "Eng muhim ishlarni qachon bajarish kerak?", options: ["Kechqurun", "Ertalab", "Tushdan keyin", "Tungi payt"], correctAnswer: 1 },
      { question: "Multitasking samaradorlikka qanday ta'sir qiladi?", options: ["Oshiradi", "Kamaytiradi", "Ta'sir qilmaydi", "Ikki baravar oshiradi"], correctAnswer: 1 },
      { question: "Kundalik reja qachon tuziladi?", options: ["Ertalab", "Oldingi kuni kechqurun", "Hafta boshida", "Oy boshida"], correctAnswer: 1 }
    ]
  },
  // CSS (38-73)
  {
    stepNumber: 38,
    title: "CSS ga kirish",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "CSS ni HTML ga ulang",
      starterCode: `<head>
  <___ rel="stylesheet" href="style.css">
  <style>
    body {
      ___: #f0f0f0;
    }
    h1 {
      ___: blue;
    }
  </style>
</head>`,
      solution: `<head>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      background-color: #f0f0f0;
    }
    h1 {
      color: blue;
    }
  </style>
</head>`,
      hints: ["link", "background-color", "color"]
    },
    tests: [
      { question: "CSS ning to'liq nomi?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: 1 },
      { question: "Tashqi CSS faylni ulash uchun qaysi teg?", options: ["<style>", "<link>", "<css>", "<script>"], correctAnswer: 1 },
      { question: "Ichki CSS qayerda yoziladi?", options: ["<body>", "<style>", "<css>", "<head> tashqarisida"], correctAnswer: 1 },
      { question: "Inline CSS qayerda yoziladi?", options: ["<style> ichida", "style atributida", "CSS faylda", "<head> ichida"], correctAnswer: 1 },
      { question: "CSS faylning kengaytmasi?", options: [".html", ".css", ".style", ".txt"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 39,
    title: "CSS sintaksisi",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "CSS qoidalarini to'g'ri yozing",
      starterCode: `___ {
  color: red;
  font-size: 24px;
}

.___ {
  background-color: yellow;
}

#___ {
  border: 1px solid black;
}

p, ___ {
  margin: 10px;
}`,
      solution: `h1 {
  color: red;
  font-size: 24px;
}

.highlight {
  background-color: yellow;
}

#header {
  border: 1px solid black;
}

p, span {
  margin: 10px;
}`,
      hints: ["h1", "highlight", "header", "span"]
    },
    tests: [
      { question: "CSS selektordan keyin nima keladi?", options: ["()", "[]", "{}", "<>"], correctAnswer: 2 },
      { question: "Class selektor qanday boshlanadi?", options: ["#", ".", "@", "&"], correctAnswer: 1 },
      { question: "ID selektor qanday boshlanadi?", options: [".", "#", "@", "*"], correctAnswer: 1 },
      { question: "Xususiyat va qiymat orasida nima bo'ladi?", options: ["=", ":", "-", "->"], correctAnswer: 1 },
      { question: "Har bir qoida nima bilan tugaydi?", options: [".", ",", ";", ":"], correctAnswer: 2 }
    ]
  },
  {
    stepNumber: 40,
    title: "Ranglar bilan ishlash",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Turli rang formatlarini ishlating",
      starterCode: `.box1 {
  background-color: ___;
}
.box2 {
  background-color: #___;
}
.box3 {
  background-color: rgb(___, 128, 0);
}
.box4 {
  background-color: rgba(0, 0, 255, ___);
}`,
      solution: `.box1 {
  background-color: red;
}
.box2 {
  background-color: #00ff00;
}
.box3 {
  background-color: rgb(255, 128, 0);
}
.box4 {
  background-color: rgba(0, 0, 255, 0.5);
}`,
      hints: ["red", "00ff00", "255", "0.5"]
    },
    tests: [
      { question: "HEX rang nechta belgidan iborat?", options: ["3 yoki 6", "4 yoki 8", "2 yoki 4", "5 yoki 10"], correctAnswer: 0 },
      { question: "RGB da har bir qiymat diapazoni?", options: ["0-100", "0-255", "0-999", "1-256"], correctAnswer: 1 },
      { question: "RGBA da 'A' nimani bildiradi?", options: ["Angle", "Alpha (shaffoflik)", "Absolute", "Add"], correctAnswer: 1 },
      { question: "#000000 qanday rang?", options: ["Oq", "Qora", "Kulrang", "Shaffof"], correctAnswer: 1 },
      { question: "#ffffff qanday rang?", options: ["Qora", "Oq", "Qizil", "Ko'k"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 41,
    title: "Matnga oid xossalar",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Matn stillarini sozlang",
      starterCode: `p {
  font-___: Arial, sans-serif;
  font-___: 16px;
  font-___: bold;
  text-___: center;
  line-___: 1.5;
}`,
      solution: `p {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
}`,
      hints: ["family", "size", "weight", "align", "height"]
    },
    tests: [
      { question: "Shrift turini o'zgartirish uchun?", options: ["font-type", "font-family", "font-name", "font-style"], correctAnswer: 1 },
      { question: "Matn o'lchamini o'zgartirish uchun?", options: ["text-size", "font-size", "size", "font-height"], correctAnswer: 1 },
      { question: "Matnni qalin qilish uchun?", options: ["font-bold", "font-weight: bold", "text-bold", "bold: true"], correctAnswer: 1 },
      { question: "Matnni markazlashtirish uchun?", options: ["text-center", "text-align: center", "align: center", "center: true"], correctAnswer: 1 },
      { question: "Qatorlar orasidagi masofa uchun?", options: ["line-space", "line-height", "row-height", "text-height"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 42,
    title: "Box model tushunchasi",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Box model xossalarini ishlating",
      starterCode: `.box {
  width: 200px;
  height: 150px;
  ___: 20px;
  ___: 1px solid black;
  ___: 10px;
  box-___: border-box;
}`,
      solution: `.box {
  width: 200px;
  height: 150px;
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
  box-sizing: border-box;
}`,
      hints: ["padding", "border", "margin", "sizing"]
    },
    tests: [
      { question: "Box model tarkibiy qismlari?", options: ["content, padding, border, margin", "width, height, color", "top, right, bottom, left", "display, position, float"], correctAnswer: 0 },
      { question: "padding nima?", options: ["Tashqi bo'shliq", "Ichki bo'shliq", "Chegara", "Kontent"], correctAnswer: 1 },
      { question: "margin nima?", options: ["Ichki bo'shliq", "Tashqi bo'shliq", "Chegara", "Kontent"], correctAnswer: 1 },
      { question: "box-sizing: border-box nima qiladi?", options: ["Chegarani o'chiradi", "padding va border ni width ichiga qo'shadi", "margin ni o'chiradi", "Rangni o'zgartiradi"], correctAnswer: 1 },
      { question: "Standart box-sizing qiymati?", options: ["border-box", "content-box", "padding-box", "margin-box"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 43,
    title: "Balandlik va kenglik",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "O'lchamlarni turli birliklarda bering",
      starterCode: `.container {
  width: ___%;
  max-width: ___px;
  min-height: ___vh;
}
.box {
  width: 50___;
  height: 200___;
}`,
      solution: `.container {
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
}
.box {
  width: 50%;
  height: 200px;
}`,
      hints: ["100", "1200", "100", "%", "px"]
    },
    tests: [
      { question: "vh birligi nimani bildiradi?", options: ["Viewport height", "Variable height", "Vertical height", "View height"], correctAnswer: 0 },
      { question: "vw birligi nimani bildiradi?", options: ["Viewport width", "Variable width", "Vertical width", "View width"], correctAnswer: 0 },
      { question: "% birligi nimaga nisbatan?", options: ["Ekranga", "Ota elementga", "Body ga", "HTML ga"], correctAnswer: 1 },
      { question: "max-width nima qiladi?", options: ["Minimal kenglik", "Maksimal kenglik chegarasi", "O'rtacha kenglik", "Aniq kenglik"], correctAnswer: 1 },
      { question: "min-height nima qiladi?", options: ["Maksimal balandlik", "Minimal balandlik chegarasi", "O'rtacha balandlik", "Aniq balandlik"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 44,
    title: "Margin va Paddinglar bilan ishlash",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Margin va padding qisqartmalarini ishlating",
      starterCode: `.box1 {
  margin: ___ ___ ___ ___;
}
.box2 {
  padding: ___ ___;
}
.box3 {
  margin: ___;
}
.box4 {
  margin-___: auto;
  margin-___: auto;
}`,
      solution: `.box1 {
  margin: 10px 20px 10px 20px;
}
.box2 {
  padding: 15px 30px;
}
.box3 {
  margin: 20px;
}
.box4 {
  margin-left: auto;
  margin-right: auto;
}`,
      hints: ["10px", "20px", "10px", "20px", "15px", "30px", "20px", "left", "right"]
    },
    tests: [
      { question: "margin: 10px 20px; qanday ishlaydi?", options: ["Hammasi 10px", "Yuqori-past 10px, chap-o'ng 20px", "Hammasi 20px", "Faqat yuqori 10px"], correctAnswer: 1 },
      { question: "margin: 10px 20px 30px; qanday ishlaydi?", options: ["Yuqori 10, chap-o'ng 20, past 30", "Hammasi 10px", "Yuqori 10, o'ng 20, past 30", "Xato"], correctAnswer: 0 },
      { question: "Elementni markazlashtirish uchun?", options: ["margin: center", "margin: 0 auto", "margin: auto 0", "center: true"], correctAnswer: 1 },
      { question: "Salbiy margin ishlatish mumkinmi?", options: ["Yo'q", "Ha", "Faqat chapda", "Faqat yuqorida"], correctAnswer: 1 },
      { question: "padding: 0; nima qiladi?", options: ["Xato beradi", "Barcha ichki bo'shliqni olib tashlaydi", "Standart qiymat", "Margin ni o'chiradi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 45,
    title: "Border, Outline va Radiuslar bilan ishlash",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Chegara va burchak stillarini sozlang",
      starterCode: `.box {
  border: ___px ___ #333;
  border-___: 10px;
  ___: 2px solid blue;
  outline-___: 5px;
}`,
      solution: `.box {
  border: 2px solid #333;
  border-radius: 10px;
  outline: 2px solid blue;
  outline-offset: 5px;
}`,
      hints: ["2", "solid", "radius", "outline", "offset"]
    },
    tests: [
      { question: "Dumaloq burchak uchun qaysi xossa?", options: ["border-curve", "border-radius", "corner-radius", "round-corner"], correctAnswer: 1 },
      { question: "border: 1px solid red; nima?", options: ["Qalinlik, stil, rang", "Rang, stil, qalinlik", "Stil, qalinlik, rang", "Qalinlik, rang, stil"], correctAnswer: 0 },
      { question: "outline va border farqi?", options: ["Farqi yo'q", "outline box model ga ta'sir qilmaydi", "border ko'rinmaydi", "outline faqat hover da"], correctAnswer: 1 },
      { question: "border-radius: 50%; nima hosil qiladi?", options: ["Kvadrat", "Doira", "Uchburchak", "Oval"], correctAnswer: 1 },
      { question: "border-style turlari?", options: ["solid, dashed, dotted", "thin, medium, thick", "left, right, top", "inside, outside"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 46,
    title: "Display xossalari",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Display turlarini ishlating",
      starterCode: `.block-element {
  display: ___;
}
.inline-element {
  display: ___;
}
.hidden {
  display: ___;
}
.flex-container {
  display: ___;
}`,
      solution: `.block-element {
  display: block;
}
.inline-element {
  display: inline;
}
.hidden {
  display: none;
}
.flex-container {
  display: flex;
}`,
      hints: ["block", "inline", "none", "flex"]
    },
    tests: [
      { question: "display: none; nima qiladi?", options: ["Shaffof qiladi", "Elementni butunlay yashiradi", "O'lchamini 0 qiladi", "Rangini o'chiradi"], correctAnswer: 1 },
      { question: "display: block; xususiyati?", options: ["Bir qatorda", "Yangi qatordan, to'liq kenglik", "Yashirin", "Shaffof"], correctAnswer: 1 },
      { question: "display: inline; xususiyati?", options: ["Yangi qatordan", "Bir qatorda, kontent kengligi", "Yashirin", "To'liq kenglik"], correctAnswer: 1 },
      { question: "display: inline-block; nima?", options: ["Faqat inline", "Faqat block", "inline + block xususiyatlari", "Yashirin"], correctAnswer: 2 },
      { question: "visibility: hidden; va display: none; farqi?", options: ["Farqi yo'q", "visibility joy egallaydi", "display joy egallaydi", "Ikkalasi ham ko'rinadi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 47,
    title: "Position xossalari",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Position turlarini ishlating",
      starterCode: `.relative-box {
  position: ___;
  top: 20px;
  left: 30px;
}
.absolute-box {
  position: ___;
  top: 0;
  right: 0;
}
.fixed-header {
  position: ___;
  top: 0;
  width: 100%;
}
.sticky-nav {
  position: ___;
  top: 0;
}`,
      solution: `.relative-box {
  position: relative;
  top: 20px;
  left: 30px;
}
.absolute-box {
  position: absolute;
  top: 0;
  right: 0;
}
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
}
.sticky-nav {
  position: sticky;
  top: 0;
}`,
      hints: ["relative", "absolute", "fixed", "sticky"]
    },
    tests: [
      { question: "position: relative; nimaga nisbatan?", options: ["Ota elementga", "O'z normal joyiga", "Ekranga", "Body ga"], correctAnswer: 1 },
      { question: "position: absolute; nimaga nisbatan?", options: ["O'z joyiga", "Eng yaqin positioned ota", "Ekranga", "Body ga"], correctAnswer: 1 },
      { question: "position: fixed; nimaga nisbatan?", options: ["Ota elementga", "Viewport (ekran)ga", "Body ga", "HTML ga"], correctAnswer: 1 },
      { question: "position: sticky; qanday ishlaydi?", options: ["Doim fixed", "Scroll qilganda fixed bo'ladi", "Doim relative", "Doim absolute"], correctAnswer: 1 },
      { question: "z-index nima uchun?", options: ["X o'qi", "Y o'qi", "Qatlamlar tartibi (Z o'qi)", "O'lcham"], correctAnswer: 2 }
    ]
  },
  {
    stepNumber: 48,
    title: "Flex container va asosiy tushunchalar",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Flexbox konteyner yarating",
      starterCode: `.container {
  display: ___;
  flex-___: row;
  flex-___: wrap;
  ___: 10px;
}`,
      solution: `.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}`,
      hints: ["flex", "direction", "wrap", "gap"]
    },
    tests: [
      { question: "Flexbox yoqish uchun?", options: ["display: flexbox", "display: flex", "flex: true", "flexbox: on"], correctAnswer: 1 },
      { question: "flex-direction standart qiymati?", options: ["column", "row", "row-reverse", "column-reverse"], correctAnswer: 1 },
      { question: "flex-wrap nima qiladi?", options: ["Elementlarni yashiradi", "Keyingi qatorga o'tkazadi", "O'lchamni o'zgartiradi", "Rangni o'zgartiradi"], correctAnswer: 1 },
      { question: "gap xossasi nima uchun?", options: ["Chegara uchun", "Elementlar orasidagi bo'shliq", "Padding uchun", "Margin uchun"], correctAnswer: 1 },
      { question: "flex-flow nima?", options: ["Animatsiya", "direction + wrap qisqartmasi", "Joylashuv", "O'lcham"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 49,
    title: "Asosiy yo'nalishlar",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Flex yo'nalishlarini sozlang",
      starterCode: `.row {
  display: flex;
  flex-direction: ___;
}
.column {
  display: flex;
  flex-direction: ___;
}
.row-reverse {
  display: flex;
  flex-direction: ___-___;
}`,
      solution: `.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
}
.row-reverse {
  display: flex;
  flex-direction: row-reverse;
}`,
      hints: ["row", "column", "row", "reverse"]
    },
    tests: [
      { question: "flex-direction: row; qanday joylashadi?", options: ["Vertikal", "Gorizontal", "Diagonal", "Random"], correctAnswer: 1 },
      { question: "flex-direction: column; qanday joylashadi?", options: ["Gorizontal", "Vertikal", "Diagonal", "Random"], correctAnswer: 1 },
      { question: "row-reverse nima qiladi?", options: ["Yuqoridan pastga", "O'ngdan chapga", "Pastdan yuqoriga", "Chapdan o'ngga"], correctAnswer: 1 },
      { question: "column-reverse nima qiladi?", options: ["Chapdan o'ngga", "Pastdan yuqoriga", "O'ngdan chapga", "Yuqoridan pastga"], correctAnswer: 1 },
      { question: "Main axis row da qaysi yo'nalish?", options: ["Vertikal", "Gorizontal", "Diagonal", "Yo'q"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 50,
    title: "Joylashtirish: justify-content, align-items, align-content",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Flex elementlarini joylashtiring",
      starterCode: `.container {
  display: flex;
  justify-___: center;
  align-___: center;
  height: 300px;
}
.space-between {
  justify-content: space-___;
}
.flex-end {
  align-items: flex-___;
}`,
      solution: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
.space-between {
  justify-content: space-between;
}
.flex-end {
  align-items: flex-end;
}`,
      hints: ["content", "items", "between", "end"]
    },
    tests: [
      { question: "justify-content qaysi o'qda ishlaydi?", options: ["Cross axis", "Main axis", "Z axis", "Barcha o'qlarda"], correctAnswer: 1 },
      { question: "align-items qaysi o'qda ishlaydi?", options: ["Main axis", "Cross axis", "Z axis", "Barcha o'qlarda"], correctAnswer: 1 },
      { question: "space-between nima qiladi?", options: ["Boshida bo'shliq", "Oxirida bo'shliq", "Orasida teng bo'shliq", "Hammasi markazda"], correctAnswer: 2 },
      { question: "space-around nima qiladi?", options: ["Faqat orasida", "Har element atrofida teng", "Faqat chetlarda", "Bo'shliq yo'q"], correctAnswer: 1 },
      { question: "Elementni markazlashtirish uchun?", options: ["center: true", "justify-content: center; align-items: center", "margin: auto", "position: center"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 51,
    title: "Flex item xossalari",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Flex item xossalarini sozlang",
      starterCode: `.item {
  flex-___: 1;
  flex-___: 0;
  flex-___: 200px;
}
.item-double {
  flex: ___ 0 auto;
}
.item-self {
  align-___: flex-start;
}`,
      solution: `.item {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 200px;
}
.item-double {
  flex: 2 0 auto;
}
.item-self {
  align-self: flex-start;
}`,
      hints: ["grow", "shrink", "basis", "2", "self"]
    },
    tests: [
      { question: "flex-grow nima qiladi?", options: ["Kichraytiradi", "Bo'sh joyni egallash koeffitsienti", "Boshlang'ich o'lcham", "Joylashuv"], correctAnswer: 1 },
      { question: "flex-shrink nima qiladi?", options: ["Kengaytiradi", "Kichrayish koeffitsienti", "Boshlang'ich o'lcham", "Joylashuv"], correctAnswer: 1 },
      { question: "flex-basis nima?", options: ["Kengayish", "Kichrayish", "Boshlang'ich o'lcham", "Joylashuv"], correctAnswer: 2 },
      { question: "flex: 1; nima degani?", options: ["flex-grow: 1", "flex: 1 1 0%", "flex-basis: 1", "flex-shrink: 1"], correctAnswer: 1 },
      { question: "align-self nima qiladi?", options: ["Barcha elementlarni", "Faqat o'zini alohida joylaydi", "Konteyner uchun", "Ota element uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 52,
    title: "Amaliy loyiha: kartochkalarni flex yordamida tartiblash",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Kartochkalar gridini flexbox bilan yarating",
      starterCode: `.cards-container {
  display: ___;
  flex-wrap: ___;
  gap: 20px;
  justify-content: ___;
}
.card {
  flex: 0 1 ___;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
      solution: `.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.card {
  flex: 0 1 300px;
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`,
      hints: ["flex", "wrap", "center", "300px"]
    },
    tests: [
      { question: "flex: 0 1 300px; nima degani?", options: ["grow: 0, shrink: 1, basis: 300px", "grow: 1, shrink: 0, basis: 300px", "Xato", "grow: 300, shrink: 1"], correctAnswer: 0 },
      { question: "flex-wrap: wrap; nima qiladi?", options: ["Yashiradi", "Sig'masa keyingi qatorga", "Kichraytiradi", "Kengaytiradi"], correctAnswer: 1 },
      { question: "gap xossasi qayerda ishlaydi?", options: ["Faqat grid", "Faqat flex", "Flex va grid", "Hech qayerda"], correctAnswer: 2 },
      { question: "box-shadow formati?", options: ["x y blur color", "x y blur spread color", "color x y blur", "blur x y color"], correctAnswer: 1 },
      { question: "Kartochkalarni responsive qilish uchun?", options: ["width: 100%", "flex-wrap + flex-basis", "position: absolute", "display: block"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 53,
    title: "Grid container asoslari",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "CSS Grid konteyner yarating",
      starterCode: `.grid-container {
  display: ___;
  grid-template-___: repeat(3, 1fr);
  grid-template-___: auto auto;
  ___: 20px;
}`,
      solution: `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
}`,
      hints: ["grid", "columns", "rows", "gap"]
    },
    tests: [
      { question: "Grid yoqish uchun?", options: ["display: grid-layout", "display: grid", "grid: true", "layout: grid"], correctAnswer: 1 },
      { question: "1fr nima?", options: ["1 pixel", "1 foiz", "1 fraction (bo'sh joy ulushi)", "1 rem"], correctAnswer: 2 },
      { question: "repeat(3, 1fr) nima degani?", options: ["3 marta 1fr", "1fr 3 marta takrorlanadi", "3fr", "1fr + 3"], correctAnswer: 1 },
      { question: "grid-template-columns nima uchun?", options: ["Qatorlar soni", "Ustunlar soni va o'lchami", "Bo'shliq", "Joylashuv"], correctAnswer: 1 },
      { question: "auto qiymati nima qiladi?", options: ["0 o'lcham", "Kontent o'lchamiga moslashadi", "100%", "Xato"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 54,
    title: "Grid qator va ustunlar",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Grid ustun va qatorlarini sozlang",
      starterCode: `.grid {
  display: grid;
  grid-template-columns: 200px ___ 200px;
  grid-template-rows: 100px ___;
  grid-___-columns: 150px;
  grid-___-rows: 80px;
}`,
      solution: `.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 100px auto;
  grid-auto-columns: 150px;
  grid-auto-rows: 80px;
}`,
      hints: ["1fr", "auto", "auto", "auto"]
    },
    tests: [
      { question: "grid-auto-rows nima uchun?", options: ["Aniq qatorlar", "Avtomatik qo'shilgan qatorlar o'lchami", "Birinchi qator", "Oxirgi qator"], correctAnswer: 1 },
      { question: "minmax(100px, 1fr) nima?", options: ["Faqat 100px", "Faqat 1fr", "Minimal 100px, maksimal 1fr", "100px + 1fr"], correctAnswer: 2 },
      { question: "fit-content(300px) nima?", options: ["Doim 300px", "Kontent o'lchami, max 300px", "Min 300px", "300px + kontent"], correctAnswer: 1 },
      { question: "auto-fill va auto-fit farqi?", options: ["Farqi yo'q", "auto-fill bo'sh joy qoldiradi", "auto-fit bo'sh joy qoldiradi", "Ikkalasi ham xato"], correctAnswer: 1 },
      { question: "repeat(auto-fill, minmax(200px, 1fr)) nima?", options: ["Responsive grid", "Statik grid", "Xato", "Faqat 1 ustun"], correctAnswer: 0 }
    ]
  },
  {
    stepNumber: 55,
    title: "Joylash: gap, grid-column, grid-row",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Grid elementlarini joylashtiring",
      starterCode: `.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  ___: 15px;
}
.wide-item {
  grid-___: span 2;
}
.tall-item {
  grid-___: 1 / 3;
}`,
      solution: `.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
.wide-item {
  grid-column: span 2;
}
.tall-item {
  grid-row: 1 / 3;
}`,
      hints: ["gap", "column", "row"]
    },
    tests: [
      { question: "grid-column: span 2; nima degani?", options: ["2-ustunda", "2 ta ustun egallaydi", "2-ustundan boshlanadi", "2-ustunda tugaydi"], correctAnswer: 1 },
      { question: "grid-row: 1 / 3; nima degani?", options: ["1-qatorda", "1-qatordan 3-qatorgacha", "3 ta qator", "1 va 3 qatorlar"], correctAnswer: 1 },
      { question: "gap: 10px 20px; nima?", options: ["Hammasi 10px", "row-gap: 10px, column-gap: 20px", "Hammasi 20px", "Xato"], correctAnswer: 1 },
      { question: "grid-column: 2 / -1; nima?", options: ["2-ustundan oxirigacha", "2-ustun", "Oxirgi ustun", "-1 ustun"], correctAnswer: 0 },
      { question: "span kalit so'zi nima qiladi?", options: ["O'tkazib yuboradi", "Nechta katak egallashini bildiradi", "Joylashuvni o'zgartiradi", "O'lchamni o'zgartiradi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 56,
    title: "Grid joylashuvni nomlash",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Grid area larni nomlang",
      starterCode: `.grid {
  display: grid;
  grid-template-___:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.header { grid-___: header; }
.sidebar { grid-area: ___; }
.main { grid-area: ___; }`,
      solution: `.grid {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }`,
      hints: ["areas", "area", "sidebar", "main"]
    },
    tests: [
      { question: "grid-template-areas nima uchun?", options: ["O'lcham uchun", "Nomlangan joylar yaratish", "Rang uchun", "Chegara uchun"], correctAnswer: 1 },
      { question: "grid-area nima qiladi?", options: ["Yangi area yaratadi", "Elementni nomlangan joyga joylashtiradi", "O'lchamni o'zgartiradi", "Rangni o'zgartiradi"], correctAnswer: 1 },
      { question: "Bo'sh katak uchun qanday belgi?", options: ["empty", ".", "none", "null"], correctAnswer: 1 },
      { question: "Area nomlari qanday bo'lishi kerak?", options: ["Raqamlar", "Harflar, bir xil nom bir area", "Maxsus belgilar", "Istalgan"], correctAnswer: 1 },
      { question: "grid-template-areas responsive qilish mumkinmi?", options: ["Yo'q", "Ha, media query bilan", "Faqat JavaScript bilan", "Avtomatik"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 57,
    title: "Amaliy loyiha - Galereya sahifa dizayni",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Grid bilan galereya yarating",
      starterCode: `.gallery {
  display: ___;
  grid-template-columns: repeat(auto-___, minmax(250px, 1fr));
  ___: 15px;
}
.gallery-item {
  aspect-___: 1;
  overflow: hidden;
  border-radius: 10px;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-___: cover;
}`,
      solution: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}
.gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
      hints: ["grid", "fill", "gap", "ratio", "fit"]
    },
    tests: [
      { question: "aspect-ratio: 1; nima?", options: ["1px", "1:1 nisbat (kvadrat)", "1%", "1fr"], correctAnswer: 1 },
      { question: "object-fit: cover; nima qiladi?", options: ["Cho'ziladi", "Nisbatni saqlaydi, kesadi", "Kichrayadi", "Takrorlanadi"], correctAnswer: 1 },
      { question: "overflow: hidden; nima qiladi?", options: ["Ko'rsatadi", "Toshib ketgan qismni yashiradi", "Scroll qo'shadi", "Kengaytiradi"], correctAnswer: 1 },
      { question: "auto-fill nima qiladi?", options: ["Avtomatik to'ldiradi", "Imkon qadar ko'p ustun yaratadi", "Bitta ustun", "Xato"], correctAnswer: 1 },
      { question: "minmax(250px, 1fr) responsive uchun yaxshimi?", options: ["Yo'q", "Ha, minimal va maksimal o'lcham beradi", "Faqat desktop uchun", "Faqat mobil uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 58,
    title: "CSS Transition va Transform",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Animatsiya va transformatsiyalarni qo'shing",
      starterCode: `.box {
  transition: all ___s ease;
}
.box:hover {
  transform: ___(-10px);
  transform: ___X(1.1);
  transform: ___(45deg);
}`,
      solution: `.box {
  transition: all 0.3s ease;
}
.box:hover {
  transform: translateY(-10px);
  transform: scaleX(1.1);
  transform: rotate(45deg);
}`,
      hints: ["0.3", "translateY", "scale", "rotate"]
    },
    tests: [
      { question: "transition nima qiladi?", options: ["Bir zumda o'zgartiradi", "O'zgarishni animatsiya qiladi", "Elementni yashiradi", "Rangni o'zgartiradi"], correctAnswer: 1 },
      { question: "transform: translateX(50px); nima?", options: ["Yuqoriga", "O'ngga 50px siljitadi", "Pastga", "Chapga"], correctAnswer: 1 },
      { question: "transform: scale(2); nima?", options: ["2px", "2 marta kattalashtiradi", "2% kichraytiradi", "2 gradus buradi"], correctAnswer: 1 },
      { question: "transform: rotate(90deg); nima?", options: ["90px siljitadi", "90% kattalashtiradi", "90 gradus buradi", "90ms kutadi"], correctAnswer: 2 },
      { question: "transition-timing-function turlari?", options: ["fast, slow", "ease, linear, ease-in, ease-out", "start, end", "begin, finish"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 59,
    title: "Box-shadow va Text-shadow",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Soyalar qo'shing",
      starterCode: `.card {
  box-___: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0 ___px ___px rgba(0, 0, 0, 0.2);
}
h1 {
  text-___: 2px 2px 4px rgba(0, 0, 0, 0.3);
}`,
      solution: `.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}`,
      hints: ["shadow", "10", "20", "shadow"]
    },
    tests: [
      { question: "box-shadow formati?", options: ["color x y blur", "x y blur spread color", "blur x y color", "x color y blur"], correctAnswer: 1 },
      { question: "text-shadow formati?", options: ["x y blur color", "color x y blur", "blur x y color", "x color y blur"], correctAnswer: 0 },
      { question: "Ichki soya uchun qaysi kalit so'z?", options: ["inner", "inset", "inside", "internal"], correctAnswer: 1 },
      { question: "Bir nechta soya qo'shish mumkinmi?", options: ["Yo'q", "Ha, vergul bilan ajratib", "Faqat 2 ta", "Faqat JavaScript bilan"], correctAnswer: 1 },
      { question: "spread qiymati nima?", options: ["Blur o'lchami", "Soya kengayishi", "X pozitsiya", "Y pozitsiya"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 60,
    title: "Gradientlar va Background-image",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Gradient va fon rasmlarini ishlating",
      starterCode: `.gradient-box {
  background: ___-gradient(to right, #667eea, #764ba2);
}
.radial-box {
  background: ___-gradient(circle, #fff, #000);
}
.bg-image {
  background-___: url('bg.jpg');
  background-___: cover;
  background-___: center;
}`,
      solution: `.gradient-box {
  background: linear-gradient(to right, #667eea, #764ba2);
}
.radial-box {
  background: radial-gradient(circle, #fff, #000);
}
.bg-image {
  background-image: url('bg.jpg');
  background-size: cover;
  background-position: center;
}`,
      hints: ["linear", "radial", "image", "size", "position"]
    },
    tests: [
      { question: "linear-gradient yo'nalishi?", options: ["Doira", "To'g'ri chiziq", "Spiral", "Random"], correctAnswer: 1 },
      { question: "radial-gradient yo'nalishi?", options: ["To'g'ri chiziq", "Markazdan tashqariga", "Yuqoridan pastga", "Chapdan o'ngga"], correctAnswer: 1 },
      { question: "background-size: cover; nima?", options: ["Asl o'lcham", "To'liq qoplash, kesish mumkin", "Sig'dirish", "Takrorlash"], correctAnswer: 1 },
      { question: "background-size: contain; nima?", options: ["To'liq qoplash", "To'liq sig'dirish, bo'shliq mumkin", "Asl o'lcham", "Takrorlash"], correctAnswer: 1 },
      { question: "background-repeat: no-repeat; nima?", options: ["Takrorlaydi", "Takrorlamaydi", "Vertikal takrorlaydi", "Gorizontal takrorlaydi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 61,
    title: "Custom Fonts va Google Fonts ulash",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Google Fonts ni ulang va ishlating",
      starterCode: `<link href="https://fonts.googleapis.com/css2?family=___:wght@400;700&display=swap" rel="stylesheet">

<style>
body {
  font-___: 'Roboto', sans-serif;
}
h1 {
  font-___: 700;
}
</style>`,
      solution: `<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'Roboto', sans-serif;
}
h1 {
  font-weight: 700;
}
</style>`,
      hints: ["Roboto", "family", "weight"]
    },
    tests: [
      { question: "Google Fonts qanday ulanadi?", options: ["<script>", "<link>", "<font>", "<style>"], correctAnswer: 1 },
      { question: "font-family da fallback nima?", options: ["Zaxira shrift", "Asosiy shrift", "O'lcham", "Rang"], correctAnswer: 0 },
      { question: "@font-face nima uchun?", options: ["Google Fonts", "Maxsus shrift yuklash", "Shrift o'lchami", "Shrift rangi"], correctAnswer: 1 },
      { question: "font-weight: 700; nima?", options: ["Normal", "Bold", "Light", "Thin"], correctAnswer: 1 },
      { question: "display=swap nima qiladi?", options: ["Shriftni yashiradi", "Yuklanguncha fallback ko'rsatadi", "Animatsiya qo'shadi", "Rangni o'zgartiradi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 62,
    title: "Pseudo-element va Pseudo-classlar",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Pseudo-element va pseudo-classlarni ishlating",
      starterCode: `a:___ {
  color: red;
}
button:___ {
  background: blue;
}
p::___ {
  content: "→ ";
}
li:nth-___(___)  {
  background: #f0f0f0;
}`,
      solution: `a:hover {
  color: red;
}
button:active {
  background: blue;
}
p::before {
  content: "→ ";
}
li:nth-child(odd) {
  background: #f0f0f0;
}`,
      hints: ["hover", "active", "before", "child", "odd"]
    },
    tests: [
      { question: ":hover qachon ishlaydi?", options: ["Bosilganda", "Sichqoncha ustida", "Fokusda", "Yuklanganda"], correctAnswer: 1 },
      { question: "::before nima qiladi?", options: ["Elementdan keyin", "Elementdan oldin kontent qo'shadi", "Elementni yashiradi", "Elementni o'chiradi"], correctAnswer: 1 },
      { question: "::after nima qiladi?", options: ["Elementdan oldin", "Elementdan keyin kontent qo'shadi", "Elementni yashiradi", "Elementni o'chiradi"], correctAnswer: 1 },
      { question: ":nth-child(2n) nima?", options: ["Birinchi", "Juft elementlar", "Toq elementlar", "Oxirgi"], correctAnswer: 1 },
      { question: ":first-child nima?", options: ["Oxirgi bola", "Birinchi bola element", "Barcha bolalar", "Ota element"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 63,
    title: "Viewport va birliklar",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Turli CSS birliklarini ishlating",
      starterCode: `.container {
  width: 90___;
  max-width: 1200___;
}
.hero {
  height: 100___;
}
.text {
  font-size: 1.2___;
}
.spacing {
  padding: 2___;
}`,
      solution: `.container {
  width: 90%;
  max-width: 1200px;
}
.hero {
  height: 100vh;
}
.text {
  font-size: 1.2rem;
}
.spacing {
  padding: 2em;
}`,
      hints: ["%", "px", "vh", "rem", "em"]
    },
    tests: [
      { question: "1rem nima?", options: ["1 pixel", "Root element font-size", "1%", "1 viewport"], correctAnswer: 1 },
      { question: "1em nima?", options: ["Root font-size", "Ota element font-size", "1 pixel", "1%"], correctAnswer: 1 },
      { question: "100vh nima?", options: ["100 pixel", "100% viewport height", "100%", "100 em"], correctAnswer: 1 },
      { question: "100vw nima?", options: ["100 pixel", "100% viewport width", "100%", "100 em"], correctAnswer: 1 },
      { question: "rem va em farqi?", options: ["Farqi yo'q", "rem root ga, em ota ga nisbatan", "em root ga nisbatan", "rem ota ga nisbatan"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 64,
    title: "Media Queries asoslari",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Responsive dizayn uchun media query yozing",
      starterCode: `@___ (max-width: 768px) {
  .container {
    flex-direction: ___;
  }
}
@media (___-width: 1024px) {
  .sidebar {
    display: none;
  }
}
@media (min-width: ___px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}`,
      solution: `@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }
}
@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}`,
      hints: ["media", "column", "max", "1200"]
    },
    tests: [
      { question: "max-width: 768px qachon ishlaydi?", options: ["768px dan katta", "768px va undan kichik", "Faqat 768px", "768px dan katta"], correctAnswer: 1 },
      { question: "min-width: 1024px qachon ishlaydi?", options: ["1024px dan kichik", "1024px va undan katta", "Faqat 1024px", "Hech qachon"], correctAnswer: 1 },
      { question: "Mobile-first yondashuv nima?", options: ["Desktop dan boshlash", "Mobil dan boshlash, min-width", "Faqat mobil", "Faqat desktop"], correctAnswer: 1 },
      { question: "Desktop-first yondashuv nima?", options: ["Mobil dan boshlash", "Desktop dan boshlash, max-width", "Faqat desktop", "Faqat mobil"], correctAnswer: 1 },
      { question: "Breakpoint nima?", options: ["Xato", "Dizayn o'zgaradigan ekran kengligi", "Animatsiya", "Rang"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 65,
    title: "Responsive navigatsiya va sahifa strukturalari",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Responsive navbar yarating",
      starterCode: `.navbar {
  display: ___;
  justify-content: space-___;
  align-items: center;
  padding: 1rem;
}
.nav-links {
  display: flex;
  gap: 20px;
}
@media (max-width: 768px) {
  .nav-links {
    display: ___;
    position: absolute;
    flex-direction: ___;
  }
}`,
      solution: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
.nav-links {
  display: flex;
  gap: 20px;
}
@media (max-width: 768px) {
  .nav-links {
    display: none;
    position: absolute;
    flex-direction: column;
  }
}`,
      hints: ["flex", "between", "none", "column"]
    },
    tests: [
      { question: "Mobilda navbarni qanday yashirish mumkin?", options: ["visibility: hidden", "display: none", "opacity: 0", "Barchasi to'g'ri"], correctAnswer: 3 },
      { question: "Hamburger menu nima?", options: ["Ovqat", "Mobil menu icon (3 chiziq)", "Footer", "Sidebar"], correctAnswer: 1 },
      { question: "position: fixed navbar uchun nima?", options: ["Scroll qilganda yo'qoladi", "Doim ko'rinib turadi", "Yashirinadi", "Pastda bo'ladi"], correctAnswer: 1 },
      { question: "z-index navbar uchun nima uchun kerak?", options: ["Rang uchun", "Boshqa elementlar ustida bo'lishi uchun", "O'lcham uchun", "Animatsiya uchun"], correctAnswer: 1 },
      { question: "Responsive navbar uchun eng yaxshi yondashuv?", options: ["Faqat CSS", "CSS + JavaScript", "Faqat JavaScript", "Faqat HTML"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 66,
    title: "O'zgaruvchilar (:root)",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "CSS o'zgaruvchilarini yarating va ishlating",
      starterCode: `:___ {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing: 1rem;
  --border-radius: 8px;
}
.button {
  background: ___(___, #000);
  padding: var(--___);
  border-radius: var(--___);
}`,
      solution: `:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing: 1rem;
  --border-radius: 8px;
}
.button {
  background: var(--primary-color, #000);
  padding: var(--spacing);
  border-radius: var(--border-radius);
}`,
      hints: ["root", "var", "--primary-color", "spacing", "border-radius"]
    },
    tests: [
      { question: "CSS o'zgaruvchi qanday e'lon qilinadi?", options: ["$name", "--name", "@name", "#name"], correctAnswer: 1 },
      { question: "CSS o'zgaruvchini ishlatish uchun?", options: ["$()", "var()", "@()", "#()"], correctAnswer: 1 },
      { question: ":root nima?", options: ["Body", "HTML elementi (global)", "Head", "Footer"], correctAnswer: 1 },
      { question: "var(--color, red) da red nima?", options: ["Asosiy qiymat", "Fallback (zaxira) qiymat", "Xato", "Ikkinchi rang"], correctAnswer: 1 },
      { question: "CSS o'zgaruvchilar JavaScript da o'zgartirilishi mumkinmi?", options: ["Yo'q", "Ha", "Faqat :root da", "Faqat inline da"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 67,
    title: "Navbar (Header)",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Professional navbar yarating",
      starterCode: `.header {
  background: ___;
  padding: 1rem 2rem;
  position: ___;
  top: 0;
  width: 100%;
  z-index: ___;
}
.nav {
  display: flex;
  justify-content: ___-between;
  align-items: center;
}`,
      solution: `.header {
  background: #1a1a2e;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
      hints: ["#1a1a2e", "fixed", "1000", "space"]
    },
    tests: [
      { question: "Fixed header uchun width nima bo'lishi kerak?", options: ["auto", "100%", "fit-content", "max-content"], correctAnswer: 1 },
      { question: "z-index nima uchun kerak?", options: ["Rang uchun", "Boshqa elementlar ustida", "O'lcham uchun", "Joylashuv uchun"], correctAnswer: 1 },
      { question: "position: sticky va fixed farqi?", options: ["Farqi yo'q", "sticky scroll qilganda fixed bo'ladi", "fixed scroll qilganda sticky bo'ladi", "Ikkalasi ham bir xil"], correctAnswer: 1 },
      { question: "Header uchun yaxshi padding?", options: ["0", "1rem 2rem", "100px", "50%"], correctAnswer: 1 },
      { question: "Dark theme header uchun qanday rang?", options: ["#fff", "#1a1a2e yoki qora", "#f0f0f0", "#ccc"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 68,
    title: "Bellezza hero qismini tuzish",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Hero section yarating",
      starterCode: `.hero {
  height: 100___;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('hero.jpg');
  background-___: cover;
  background-___: center;
  display: flex;
  align-items: ___;
  justify-content: ___;
}
.hero-content {
  text-align: center;
  color: white;
}`,
      solution: `.hero {
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('hero.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-content {
  text-align: center;
  color: white;
}`,
      hints: ["vh", "size", "position", "center", "center"]
    },
    tests: [
      { question: "Hero section odatda qanday balandlikda?", options: ["200px", "100vh (to'liq ekran)", "50%", "auto"], correctAnswer: 1 },
      { question: "Rasm ustiga gradient qo'shish nima uchun?", options: ["Chiroyli ko'rinish", "Matn o'qilishi uchun", "Ikkalasi ham", "Kerak emas"], correctAnswer: 2 },
      { question: "background-size: cover; nima qiladi?", options: ["Takrorlaydi", "To'liq qoplash", "Asl o'lcham", "Kichraytiradi"], correctAnswer: 1 },
      { question: "Hero kontentni markazlashtirish uchun?", options: ["margin: auto", "flex + center", "position: center", "text-align: center"], correctAnswer: 1 },
      { question: "Hero da CTA button nima?", options: ["Yopish tugmasi", "Call to Action (asosiy tugma)", "Menu tugmasi", "Scroll tugmasi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 69,
    title: "About section",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "About section yarating",
      starterCode: `.about {
  padding: 5rem ___;
  background: #f8f9fa;
}
.about-container {
  display: ___;
  grid-template-columns: 1fr ___;
  gap: 3rem;
  align-items: center;
}
.about-image img {
  width: 100%;
  border-___: 10px;
}`,
      solution: `.about {
  padding: 5rem 2rem;
  background: #f8f9fa;
}
.about-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.about-image img {
  width: 100%;
  border-radius: 10px;
}`,
      hints: ["2rem", "grid", "1fr", "radius"]
    },
    tests: [
      { question: "About section uchun yaxshi padding?", options: ["0", "5rem 2rem", "1px", "100%"], correctAnswer: 1 },
      { question: "Ikki ustunli layout uchun?", options: ["float", "grid: 1fr 1fr", "position", "margin"], correctAnswer: 1 },
      { question: "Rasm va matnni vertikal markazlashtirish?", options: ["vertical-align", "align-items: center", "text-align", "margin: auto"], correctAnswer: 1 },
      { question: "Section orasidagi bo'shliq uchun?", options: ["margin", "padding", "gap", "Barchasi to'g'ri"], correctAnswer: 3 },
      { question: "About section odatda qayerda?", options: ["Header da", "Hero dan keyin", "Footer da", "Sidebar da"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 70,
    title: "Products section",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Mahsulotlar bo'limini yarating",
      starterCode: `.products {
  padding: 5rem 2rem;
}
.products-grid {
  display: ___;
  grid-template-columns: repeat(auto-___, minmax(280px, 1fr));
  ___: 2rem;
}
.product-card {
  background: white;
  border-radius: 15px;
  overflow: ___;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  ___: all 0.3s ease;
}`,
      solution: `.products {
  padding: 5rem 2rem;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}
.product-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}`,
      hints: ["grid", "fit", "gap", "hidden", "transition"]
    },
    tests: [
      { question: "auto-fit va auto-fill farqi?", options: ["Farqi yo'q", "auto-fit elementlarni kengaytiradi", "auto-fill elementlarni kengaytiradi", "Ikkalasi ham xato"], correctAnswer: 1 },
      { question: "Product card uchun hover effekt?", options: ["transform: scale(1.05)", "box-shadow kuchaytirish", "Ikkalasi ham", "Kerak emas"], correctAnswer: 2 },
      { question: "overflow: hidden; nima uchun?", options: ["Scrollbar uchun", "Rasm burchaklarini kesish", "Yashirish", "Ko'rsatish"], correctAnswer: 1 },
      { question: "minmax(280px, 1fr) nima?", options: ["Faqat 280px", "Min 280px, max 1fr", "Faqat 1fr", "280fr"], correctAnswer: 1 },
      { question: "Card hover da ko'tarilish effekti?", options: ["margin-top", "transform: translateY(-10px)", "top: -10px", "padding-top"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 71,
    title: "Gallery qismini tuzish",
    category: "CSS",
    points: 10,
    codeTask: {
      instruction: "Galereya yarating",
      starterCode: `.gallery {
  display: ___;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-___: 200px;
  ___: 10px;
}
.gallery-item {
  overflow: hidden;
  border-radius: 8px;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-___: cover;
  transition: transform 0.3s;
}
.gallery-item:hover img {
  transform: ___(1.1);
}`,
      solution: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 10px;
}
.gallery-item {
  overflow: hidden;
  border-radius: 8px;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.gallery-item:hover img {
  transform: scale(1.1);
}`,
      hints: ["grid", "rows", "gap", "fit", "scale"]
    },
    tests: [
      { question: "object-fit: cover; nima qiladi?", options: ["Cho'ziladi", "Nisbatni saqlaydi, kesadi", "Kichrayadi", "Takrorlanadi"], correctAnswer: 1 },
      { question: "Hover da rasm kattalashtirish?", options: ["width: 110%", "transform: scale(1.1)", "zoom: 1.1", "size: 110%"], correctAnswer: 1 },
      { question: "overflow: hidden; hover effekt uchun nima?", options: ["Effektni yashiradi", "Kattalashtirgan rasm toshib ketmasligi uchun", "Animatsiyani to'xtatadi", "Kerak emas"], correctAnswer: 1 },
      { question: "grid-auto-rows nima?", options: ["Birinchi qator", "Avtomatik qo'shilgan qatorlar balandligi", "Oxirgi qator", "Barcha qatorlar"], correctAnswer: 1 },
      { question: "Masonry layout nima?", options: ["Oddiy grid", "Turli balandlikdagi elementlar grid", "Flex layout", "Table layout"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 72,
    title: "Footer, saytni to'liq yakunlash",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Professional footer yarating",
      starterCode: `.footer {
  background: ___;
  color: white;
  padding: 4rem 2rem 2rem;
}
.footer-grid {
  display: ___;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}
.footer-bottom {
  border-___: 1px solid rgba(255,255,255,0.1);
  margin-top: 2rem;
  padding-top: 2rem;
  text-___: center;
}`,
      solution: `.footer {
  background: #1a1a2e;
  color: white;
  padding: 4rem 2rem 2rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
}`,
      hints: ["#1a1a2e", "grid", "top", "align"]
    },
    tests: [
      { question: "Footer odatda qanday rangda?", options: ["Oq", "Qora yoki dark", "Qizil", "Yashil"], correctAnswer: 1 },
      { question: "Footer da nima bo'lishi kerak?", options: ["Faqat copyright", "Linklar, kontakt, ijtimoiy tarmoqlar", "Faqat logo", "Hech narsa"], correctAnswer: 1 },
      { question: "Copyright yili qanday yoziladi?", options: ["(c)", "&copy;", "©", "Barchasi to'g'ri"], correctAnswer: 3 },
      { question: "Footer linklar rangi?", options: ["Qora", "Och rang (oq yoki kulrang)", "Qizil", "Yashil"], correctAnswer: 1 },
      { question: "Sticky footer nima?", options: ["Doim ko'rinadi", "Kontent kam bo'lsa ham pastda", "Scroll qilganda ko'rinadi", "Yashirin footer"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 73,
    title: "Saytning responsiveligini sozlash",
    category: "CSS",
    points: 15,
    codeTask: {
      instruction: "Saytni to'liq responsive qiling",
      starterCode: `@media (max-width: ___px) {
  .nav-links {
    display: none;
  }
  .hero h1 {
    font-size: 2rem;
  }
  .about-container {
    grid-template-columns: ___;
  }
}
@media (max-width: ___px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    text-align: ___;
  }
}`,
      solution: `@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .hero h1 {
    font-size: 2rem;
  }
  .about-container {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  .footer-grid {
    text-align: center;
  }
}`,
      hints: ["768", "1fr", "480", "center"]
    },
    tests: [
      { question: "Tablet breakpoint odatda?", options: ["320px", "768px", "1200px", "1920px"], correctAnswer: 1 },
      { question: "Mobile breakpoint odatda?", options: ["768px", "480px yoki 576px", "1024px", "1200px"], correctAnswer: 1 },
      { question: "grid-template-columns: 1fr; nima?", options: ["Ikki ustun", "Bitta ustun", "Uch ustun", "To'rt ustun"], correctAnswer: 1 },
      { question: "Mobilda font-size qanday bo'lishi kerak?", options: ["Kattaroq", "Kichikroq", "Bir xil", "O'qilishi oson"], correctAnswer: 3 },
      { question: "Responsive test qilish uchun?", options: ["Faqat telefonda", "Browser DevTools", "Faqat kompyuterda", "Kerak emas"], correctAnswer: 1 }
    ]
  },
  // Soft Skills (74-75)
  {
    stepNumber: 74,
    title: "Maqsad qo'yish 1-8",
    category: "Soft Skills",
    points: 15,
    codeTask: {
      instruction: "SMART maqsadlaringizni HTML da yozing",
      starterCode: `<div class="goals">
  <h1>SMART ___</h1>
  <ul>
    <li><strong>S</strong>pecific - ___</li>
    <li><strong>M</strong>easurable - O'lchanadigan</li>
    <li><strong>A</strong>chievable - ___</li>
    <li><strong>R</strong>elevant - Tegishli</li>
    <li><strong>T</strong>ime-bound - ___</li>
  </ul>
</div>`,
      solution: `<div class="goals">
  <h1>SMART Maqsadlar</h1>
  <ul>
    <li><strong>S</strong>pecific - Aniq</li>
    <li><strong>M</strong>easurable - O'lchanadigan</li>
    <li><strong>A</strong>chievable - Erishish mumkin</li>
    <li><strong>R</strong>elevant - Tegishli</li>
    <li><strong>T</strong>ime-bound - Vaqt chegarasi bor</li>
  </ul>
</div>`,
      hints: ["Maqsadlar", "Aniq", "Erishish mumkin", "Vaqt chegarasi bor"]
    },
    tests: [
      { question: "SMART maqsadda S nima?", options: ["Simple", "Specific (Aniq)", "Smart", "Strong"], correctAnswer: 1 },
      { question: "SMART maqsadda M nima?", options: ["Modern", "Measurable (O'lchanadigan)", "Maximum", "Minimum"], correctAnswer: 1 },
      { question: "SMART maqsadda A nima?", options: ["Automatic", "Achievable (Erishish mumkin)", "Advanced", "Active"], correctAnswer: 1 },
      { question: "SMART maqsadda R nima?", options: ["Random", "Relevant (Tegishli)", "Real", "Right"], correctAnswer: 1 },
      { question: "SMART maqsadda T nima?", options: ["Total", "Time-bound (Vaqt chegarasi)", "True", "Top"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 75,
    title: "Vaqtni boshqarish 9-17",
    category: "Soft Skills",
    points: 15,
    codeTask: {
      instruction: "Eisenhower matritsasini HTML da yarating",
      starterCode: `<table class="matrix">
  <tr>
    <th></th>
    <th>Shoshilinch</th>
    <th>Shoshilinch ___</th>
  </tr>
  <tr>
    <th>Muhim</th>
    <td>1. ___ qil</td>
    <td>2. Rejalashtir</td>
  </tr>
  <tr>
    <th>Muhim ___</th>
    <td>3. Topshir</td>
    <td>4. ___</td>
  </tr>
</table>`,
      solution: `<table class="matrix">
  <tr>
    <th></th>
    <th>Shoshilinch</th>
    <th>Shoshilinch emas</th>
  </tr>
  <tr>
    <th>Muhim</th>
    <td>1. Darhol qil</td>
    <td>2. Rejalashtir</td>
  </tr>
  <tr>
    <th>Muhim emas</th>
    <td>3. Topshir</td>
    <td>4. O'chir</td>
  </tr>
</table>`,
      hints: ["emas", "Darhol", "emas", "O'chir"]
    },
    tests: [
      { question: "Eisenhower matritsasi nima?", options: ["Matematika", "Vaqtni boshqarish usuli", "Dasturlash", "Dizayn"], correctAnswer: 1 },
      { question: "Muhim va shoshilinch ishlar bilan nima qilish kerak?", options: ["Keyinga qoldirish", "Darhol bajarish", "Topshirish", "O'chirish"], correctAnswer: 1 },
      { question: "Muhim lekin shoshilinch emas ishlar?", options: ["Darhol qilish", "Rejalashtirib qilish", "Topshirish", "O'chirish"], correctAnswer: 1 },
      { question: "Muhim emas va shoshilinch ishlar?", options: ["O'zim qilish", "Boshqalarga topshirish", "Keyinga qoldirish", "O'chirish"], correctAnswer: 1 },
      { question: "Muhim emas va shoshilinch emas ishlar?", options: ["Darhol qilish", "Rejalashtirib qilish", "Topshirish", "O'chirib tashlash"], correctAnswer: 3 }
    ]
  },
  // Bootstrap (76-86)
  {
    stepNumber: 76,
    title: "Bootstrap kirish",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap ni HTML ga ulang",
      starterCode: `<head>
  <link href="https://cdn.jsdelivr.net/npm/___@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="___">
    <h1>Salom Bootstrap!</h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/___.bundle.min.js"></script>
</body>`,
      solution: `<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Salom Bootstrap!</h1>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>`,
      hints: ["bootstrap", "container", "bootstrap"]
    },
    tests: [
      { question: "Bootstrap nima?", options: ["Dasturlash tili", "CSS framework", "JavaScript library", "Database"], correctAnswer: 1 },
      { question: "Bootstrap CDN orqali qanday ulanadi?", options: ["<script>", "<link> va <script>", "<style>", "<import>"], correctAnswer: 1 },
      { question: "Bootstrap container nima?", options: ["Rasm", "Responsive konteyner", "Tugma", "Forma"], correctAnswer: 1 },
      { question: "Bootstrap hozirgi versiyasi?", options: ["3", "4", "5", "6"], correctAnswer: 2 },
      { question: "Bootstrap bundle.min.js nima uchun?", options: ["Stillar uchun", "JavaScript komponentlar uchun", "Rasmlar uchun", "Shriftlar uchun"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 77,
    title: "Bootstrap grid tizimi",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap grid yarating",
      starterCode: `<div class="container">
  <div class="___">
    <div class="col-___-6 col-md-4">Ustun 1</div>
    <div class="col-sm-6 col-___-4">Ustun 2</div>
    <div class="col-sm-___ col-md-4">Ustun 3</div>
  </div>
</div>`,
      solution: `<div class="container">
  <div class="row">
    <div class="col-sm-6 col-md-4">Ustun 1</div>
    <div class="col-sm-6 col-md-4">Ustun 2</div>
    <div class="col-sm-12 col-md-4">Ustun 3</div>
  </div>
</div>`,
      hints: ["row", "sm", "md", "12"]
    },
    tests: [
      { question: "Bootstrap grid nechta ustundan iborat?", options: ["6", "10", "12", "16"], correctAnswer: 2 },
      { question: "col-md-6 nima degani?", options: ["6 pixel", "Medium ekranda 6 ustun", "6%", "6 qator"], correctAnswer: 1 },
      { question: "row class nima uchun?", options: ["Ustun yaratish", "Qator yaratish", "Konteyner yaratish", "Chegara yaratish"], correctAnswer: 1 },
      { question: "col-sm, col-md, col-lg farqi?", options: ["Rang", "Ekran o'lchami breakpointlari", "Balandlik", "Kenglik"], correctAnswer: 1 },
      { question: "container va container-fluid farqi?", options: ["Farqi yo'q", "fluid to'liq kenglik", "container to'liq kenglik", "Ikkalasi ham bir xil"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 78,
    title: "Ranglar va tugmalar",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap tugmalar va ranglarni ishlating",
      starterCode: `<button class="btn btn-___">Primary</button>
<button class="btn btn-___">Success</button>
<button class="btn btn-___">Danger</button>
<button class="btn btn-outline-___">Outline</button>
<p class="text-___">Muvaffaqiyat matni</p>
<div class="bg-___ text-white p-3">Dark fon</div>`,
      solution: `<button class="btn btn-primary">Primary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-outline-primary">Outline</button>
<p class="text-success">Muvaffaqiyat matni</p>
<div class="bg-dark text-white p-3">Dark fon</div>`,
      hints: ["primary", "success", "danger", "primary", "success", "dark"]
    },
    tests: [
      { question: "btn-primary qanday rang?", options: ["Qizil", "Ko'k", "Yashil", "Sariq"], correctAnswer: 1 },
      { question: "btn-success qanday rang?", options: ["Qizil", "Ko'k", "Yashil", "Sariq"], correctAnswer: 2 },
      { question: "btn-danger qanday rang?", options: ["Qizil", "Ko'k", "Yashil", "Sariq"], correctAnswer: 0 },
      { question: "btn-outline-* nima?", options: ["To'liq rangli", "Faqat chegara rangli", "Yashirin", "Disabled"], correctAnswer: 1 },
      { question: "text-muted nima?", options: ["Qalin matn", "Och kulrang matn", "Qizil matn", "Yashil matn"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 79,
    title: "Matn va Tipografiya",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap tipografiya classlarini ishlating",
      starterCode: `<h1 class="display-___">Katta sarlavha</h1>
<p class="___">Katta paragraf</p>
<p class="text-___">Markazlashgan matn</p>
<p class="fw-___">Qalin matn</p>
<p class="fst-___">Kursiv matn</p>`,
      solution: `<h1 class="display-1">Katta sarlavha</h1>
<p class="lead">Katta paragraf</p>
<p class="text-center">Markazlashgan matn</p>
<p class="fw-bold">Qalin matn</p>
<p class="fst-italic">Kursiv matn</p>`,
      hints: ["1", "lead", "center", "bold", "italic"]
    },
    tests: [
      { question: "display-1 nima?", options: ["Yashirish", "Eng katta sarlavha", "Kichik matn", "O'rtacha matn"], correctAnswer: 1 },
      { question: "lead class nima qiladi?", options: ["Kichraytiradi", "Kattaroq paragraf", "Yashiradi", "Rangini o'zgartiradi"], correctAnswer: 1 },
      { question: "text-center nima?", options: ["Chapga", "Markazga", "O'ngga", "Ikki tomonga"], correctAnswer: 1 },
      { question: "fw-bold nima?", options: ["Font width", "Font weight bold", "Font word", "Font wide"], correctAnswer: 1 },
      { question: "text-truncate nima qiladi?", options: ["Kengaytiradi", "Uzun matnni kesadi (...)", "Yashiradi", "Takrorlaydi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 80,
    title: "Kartalar (Cards)",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap card yarating",
      starterCode: `<div class="___" style="width: 18rem;">
  <img src="rasm.jpg" class="card-img-___" alt="Rasm">
  <div class="card-___">
    <h5 class="card-___">Karta sarlavhasi</h5>
    <p class="card-text">Karta matni</p>
    <a href="#" class="btn btn-primary">Batafsil</a>
  </div>
</div>`,
      solution: `<div class="card" style="width: 18rem;">
  <img src="rasm.jpg" class="card-img-top" alt="Rasm">
  <div class="card-body">
    <h5 class="card-title">Karta sarlavhasi</h5>
    <p class="card-text">Karta matni</p>
    <a href="#" class="btn btn-primary">Batafsil</a>
  </div>
</div>`,
      hints: ["card", "top", "body", "title"]
    },
    tests: [
      { question: "card-img-top nima?", options: ["Pastda rasm", "Yuqorida rasm", "Chapda rasm", "O'ngda rasm"], correctAnswer: 1 },
      { question: "card-body nima?", options: ["Rasm joyi", "Karta kontenti", "Karta sarlavhasi", "Karta footer"], correctAnswer: 1 },
      { question: "card-title nima uchun?", options: ["Matn uchun", "Sarlavha uchun", "Rasm uchun", "Tugma uchun"], correctAnswer: 1 },
      { question: "card-footer nima?", options: ["Yuqori qism", "Pastki qism", "O'rta qism", "Yon qism"], correctAnswer: 1 },
      { question: "card-group nima qiladi?", options: ["Kartalarni yashiradi", "Kartalarni guruhlaydi", "Kartalarni o'chiradi", "Kartalarni aylantiradi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 81,
    title: "Suratlar va Iconlar",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap rasm va icon classlarini ishlating",
      starterCode: `<img src="rasm.jpg" class="img-___" alt="Responsive rasm">
<img src="avatar.jpg" class="rounded-___" alt="Dumaloq rasm">
<img src="photo.jpg" class="img-___" alt="Chegarali rasm">
<i class="bi bi-___"></i>
<i class="bi bi-___-fill"></i>`,
      solution: `<img src="rasm.jpg" class="img-fluid" alt="Responsive rasm">
<img src="avatar.jpg" class="rounded-circle" alt="Dumaloq rasm">
<img src="photo.jpg" class="img-thumbnail" alt="Chegarali rasm">
<i class="bi bi-heart"></i>
<i class="bi bi-heart-fill"></i>`,
      hints: ["fluid", "circle", "thumbnail", "heart", "heart"]
    },
    tests: [
      { question: "img-fluid nima qiladi?", options: ["Rasm o'lchamini oshiradi", "Responsive rasm", "Rasmni yashiradi", "Rasmni aylantiradi"], correctAnswer: 1 },
      { question: "rounded-circle nima?", options: ["Kvadrat", "Dumaloq", "Uchburchak", "Oval"], correctAnswer: 1 },
      { question: "img-thumbnail nima?", options: ["Kichik rasm", "Chegarali rasm", "Katta rasm", "Yashirin rasm"], correctAnswer: 1 },
      { question: "Bootstrap Icons qanday ulanadi?", options: ["Avtomatik", "Alohida CSS/CDN", "JavaScript", "HTML"], correctAnswer: 1 },
      { question: "bi-*-fill nima?", options: ["Bo'sh icon", "To'ldirilgan icon", "Katta icon", "Kichik icon"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 82,
    title: "Navigatsiya paneli (Navbar)",
    category: "Bootstrap",
    points: 15,
    codeTask: {
      instruction: "Bootstrap navbar yarating",
      starterCode: `<nav class="navbar navbar-___ navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-___" href="#">Logo</a>
    <button class="navbar-___" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-___ ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Bosh sahifa</a></li>
      </ul>
    </div>
  </div>
</nav>`,
      solution: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Bosh sahifa</a></li>
      </ul>
    </div>
  </div>
</nav>`,
      hints: ["expand-lg", "brand", "toggler", "nav"]
    },
    tests: [
      { question: "navbar-expand-lg nima?", options: ["Doim yig'iq", "lg dan katta ekranda kengayadi", "Doim keng", "Yashirin"], correctAnswer: 1 },
      { question: "navbar-brand nima?", options: ["Menu", "Logo/Sayt nomi", "Tugma", "Link"], correctAnswer: 1 },
      { question: "navbar-toggler nima?", options: ["Logo", "Hamburger menu tugmasi", "Link", "Dropdown"], correctAnswer: 1 },
      { question: "navbar-dark nima uchun?", options: ["Qora fon", "Oq matn (dark fon uchun)", "Qora matn", "Yashirin"], correctAnswer: 1 },
      { question: "ms-auto nima qiladi?", options: ["Chapga", "O'ngga suradi (margin-start: auto)", "Markazga", "Yuqoriga"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 83,
    title: "Formlar",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap forma yarating",
      starterCode: `<form>
  <div class="mb-3">
    <label for="email" class="form-___">Email</label>
    <input type="email" class="form-___" id="email">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Parol</label>
    <input type="password" class="form-control" id="password">
  </div>
  <div class="mb-3 form-___">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Eslab qolish</label>
  </div>
  <button type="submit" class="btn btn-___">Kirish</button>
</form>`,
      solution: `<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Parol</label>
    <input type="password" class="form-control" id="password">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="remember">
    <label class="form-check-label" for="remember">Eslab qolish</label>
  </div>
  <button type="submit" class="btn btn-primary">Kirish</button>
</form>`,
      hints: ["label", "control", "check", "primary"]
    },
    tests: [
      { question: "form-control nima?", options: ["Tugma stili", "Input stili", "Label stili", "Form stili"], correctAnswer: 1 },
      { question: "form-label nima?", options: ["Input stili", "Label stili", "Tugma stili", "Checkbox stili"], correctAnswer: 1 },
      { question: "mb-3 nima?", options: ["Margin bottom 3", "Margin both 3", "Margin big 3", "Margin base 3"], correctAnswer: 0 },
      { question: "form-check nima uchun?", options: ["Input uchun", "Checkbox/Radio uchun", "Tugma uchun", "Label uchun"], correctAnswer: 1 },
      { question: "form-floating nima?", options: ["Suzuvchi forma", "Floating label input", "Animatsiyali forma", "Yashirin forma"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 84,
    title: "Alerts",
    category: "Bootstrap",
    points: 10,
    codeTask: {
      instruction: "Bootstrap alert yarating",
      starterCode: `<div class="alert alert-___" role="alert">
  Muvaffaqiyatli saqlandi!
</div>
<div class="alert alert-___ alert-dismissible fade show" role="alert">
  Xatolik yuz berdi!
  <button type="button" class="btn-___" data-bs-dismiss="alert"></button>
</div>
<div class="alert alert-___" role="alert">
  <h4 class="alert-heading">Diqqat!</h4>
  <p>Bu muhim xabar.</p>
</div>`,
      solution: `<div class="alert alert-success" role="alert">
  Muvaffaqiyatli saqlandi!
</div>
<div class="alert alert-danger alert-dismissible fade show" role="alert">
  Xatolik yuz berdi!
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Diqqat!</h4>
  <p>Bu muhim xabar.</p>
</div>`,
      hints: ["success", "danger", "close", "warning"]
    },
    tests: [
      { question: "alert-success qanday rang?", options: ["Qizil", "Yashil", "Sariq", "Ko'k"], correctAnswer: 1 },
      { question: "alert-danger qanday rang?", options: ["Yashil", "Qizil", "Sariq", "Ko'k"], correctAnswer: 1 },
      { question: "alert-dismissible nima?", options: ["Yopib bo'lmaydigan", "Yopish tugmali", "Avtomatik yopiladigan", "Yashirin"], correctAnswer: 1 },
      { question: "btn-close nima?", options: ["Katta tugma", "X tugmasi (yopish)", "Submit tugma", "Reset tugma"], correctAnswer: 1 },
      { question: "data-bs-dismiss='alert' nima qiladi?", options: ["Ko'rsatadi", "Alertni yopadi", "Rangini o'zgartiradi", "Animatsiya qo'shadi"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 85,
    title: "Bootstrap sayt amaliyoti",
    category: "Bootstrap",
    points: 20,
    codeTask: {
      instruction: "Bootstrap bilan to'liq sahifa yarating",
      starterCode: `<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-___ bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">MySite</a>
    </div>
  </nav>
  <div class="container ___-5">
    <div class="row">
      <div class="col-md-___">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Karta 1</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">MySite</a>
    </div>
  </nav>
  <div class="container py-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Karta 1</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
      hints: ["dark", "py", "4"]
    },
    tests: [
      { question: "py-5 nima?", options: ["Padding x", "Padding y (top va bottom)", "Padding all", "Padding left"], correctAnswer: 1 },
      { question: "col-md-4 nechta ustun?", options: ["4 ta (12 dan)", "4 pixel", "4%", "4 qator"], correctAnswer: 0 },
      { question: "g-4 nima?", options: ["Grid", "Gap (bo'shliq)", "Group", "Gutter"], correctAnswer: 1 },
      { question: "Bootstrap da responsive breakpointlar?", options: ["sm, md, lg, xl, xxl", "small, medium, large", "1, 2, 3, 4", "a, b, c, d"], correctAnswer: 0 },
      { question: "container va container-fluid farqi?", options: ["Farqi yo'q", "container max-width bor, fluid 100%", "fluid max-width bor", "Ikkalasi ham 100%"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 86,
    title: "Amaliyot 1-86",
    category: "Bootstrap",
    points: 25,
    codeTask: {
      instruction: "O'rganganlaringizni qo'llab portfolio sahifa yarating",
      starterCode: `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="___" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <header class="bg-___ text-white py-5 text-center">
    <h1>Mening ___</h1>
    <p class="lead">Web Developer</p>
  </header>
  <main class="container py-5">
    <section class="row g-4">
      <div class="col-md-4">
        <div class="___">
          <div class="card-body">
            <h5>Loyiha 1</h5>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <header class="bg-primary text-white py-5 text-center">
    <h1>Mening Portfoliom</h1>
    <p class="lead">Web Developer</p>
  </header>
  <main class="container py-5">
    <section class="row g-4">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5>Loyiha 1</h5>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,
      hints: ["viewport", "primary", "Portfoliom", "card"]
    },
    tests: [
      { question: "Portfolio sahifada nima bo'lishi kerak?", options: ["Faqat matn", "Loyihalar, haqida, kontakt", "Faqat rasmlar", "Faqat video"], correctAnswer: 1 },
      { question: "Hero section nima?", options: ["Footer", "Birinchi katta bo'lim", "Sidebar", "Menu"], correctAnswer: 1 },
      { question: "g-4 row da nima qiladi?", options: ["Rangni o'zgartiradi", "Ustunlar orasiga bo'shliq", "Chegarani o'chiradi", "Fontni o'zgartiradi"], correctAnswer: 1 },
      { question: "text-center nima?", options: ["Chapga", "Markazga tekislash", "O'ngga", "Ikki tomonga"], correctAnswer: 1 },
      { question: "lead class nima?", options: ["Kichik matn", "Kattaroq, ajralib turadigan paragraf", "Sarlavha", "Link"], correctAnswer: 1 }
    ]
  },
  // Soft Skills (87-88)
  {
    stepNumber: 87,
    title: "Muloqot 18-27",
    category: "Soft Skills",
    points: 15,
    codeTask: {
      instruction: "Muloqot qoidalarini HTML da yozing",
      starterCode: `<div class="communication-rules">
  <h1>Samarali muloqot ___</h1>
  <ol>
    <li>Diqqat bilan ___</li>
    <li>Aniq va ___ gapiring</li>
    <li>___ tiling bilan gapiring</li>
    <li>Savollar bering</li>
  </ol>
</div>`,
      solution: `<div class="communication-rules">
  <h1>Samarali muloqot qoidalari</h1>
  <ol>
    <li>Diqqat bilan tinglang</li>
    <li>Aniq va qisqa gapiring</li>
    <li>Tana tiling bilan gapiring</li>
    <li>Savollar bering</li>
  </ol>
</div>`,
      hints: ["qoidalari", "tinglang", "qisqa", "Tana"]
    },
    tests: [
      { question: "Samarali muloqotning asosi nima?", options: ["Ko'p gapirish", "Diqqat bilan tinglash", "Tez gapirish", "Baland ovozda gapirish"], correctAnswer: 1 },
      { question: "Tana tili nima?", options: ["Chet tili", "Imo-ishoralar, mimika", "Yozma til", "Dasturlash tili"], correctAnswer: 1 },
      { question: "Aktiv tinglash nima?", options: ["Passiv kutish", "Diqqat bilan, savol berib tinglash", "Gapirmay turish", "Boshqa ish qilish"], correctAnswer: 1 },
      { question: "Muloqotda feedback nima?", options: ["Tanqid", "Qayta aloqa, javob", "Savol", "Taklif"], correctAnswer: 1 },
      { question: "Empati nima?", options: ["Raqobat", "Boshqalarni tushunish", "O'zini maqtash", "Tanqid qilish"], correctAnswer: 1 }
    ]
  },
  {
    stepNumber: 88,
    title: "Mojaroni hal qilish 28-37",
    category: "Soft Skills",
    points: 15,
    codeTask: {
      instruction: "Mojaro hal qilish bosqichlarini HTML da yozing",
      starterCode: `<div class="conflict-resolution">
  <h1>Mojaroni hal qilish ___</h1>
  <ol>
    <li>Muammoni ___</li>
    <li>Barcha tomonlarni ___</li>
    <li>Yechim variantlarini ___</li>
    <li>Eng yaxshi yechimni ___</li>
    <li>Kelishuvga erishish</li>
  </ol>
</div>`,
      solution: `<div class="conflict-resolution">
  <h1>Mojaroni hal qilish bosqichlari</h1>
  <ol>
    <li>Muammoni aniqlash</li>
    <li>Barcha tomonlarni tinglash</li>
    <li>Yechim variantlarini topish</li>
    <li>Eng yaxshi yechimni tanlash</li>
    <li>Kelishuvga erishish</li>
  </ol>
</div>`,
      hints: ["bosqichlari", "aniqlash", "tinglash", "topish", "tanlash"]
    },
    tests: [
      { question: "Mojaro hal qilishning birinchi qadami?", options: ["Janjallashish", "Muammoni aniqlash", "Yechim topish", "Ketish"], correctAnswer: 1 },
      { question: "Win-win yechim nima?", options: ["Bir tomon yutadi", "Ikki tomon ham yutadi", "Hech kim yutmaydi", "Uchinchi tomon yutadi"], correctAnswer: 1 },
      { question: "Kompromiss nima?", options: ["To'liq yutish", "O'zaro kelishuv, yon berish", "To'liq yutqazish", "Janjal"], correctAnswer: 1 },
      { question: "Mojaroda nima qilmaslik kerak?", options: ["Tinglash", "Shaxsiyatga o'tish", "Yechim izlash", "Savol berish"], correctAnswer: 1 },
      { question: "Mediator nima?", options: ["Janjal qiluvchi", "Vositachi, yarashtiruvi", "Raqib", "Kuzatuvchi"], correctAnswer: 1 }
    ]
  }
];

// JSON faylga yozish
const output = { steps };
fs.writeFileSync('./public/data/steps.json', JSON.stringify(output, null, 2), 'utf-8');
console.log('steps.json yaratildi! Jami:', steps.length, 'ta qadam');
